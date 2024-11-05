/* eslint-disable react-hooks/exhaustive-deps */
import { GridContainer, SearchBar, Text } from '@/components';
import Button from '@/components/Button/Button';
import Divider from '@/components/Divider/Divider';
import NoDataExists from '@/components/NoData/NoDataExists';
import ResponsiveContainer from '@/components/ResponsiveContainer/ResponsiveContainer';
import { errorCallback } from '@/config';
import { AppToastContext } from '@/context/Toast/ToastContext';
import { ToastContextInterface } from '@/context/Toast/ToastInterface';
import { getDevelopers } from '@/services/api';
import {
  colors,
  displayFlexAlignItemsCenterJustifyContentSpaceBetween,
  tokens,
} from '@/styles';
import { DeveloperBasic } from '@/types/collections/developer';
import ObjectToPrams from '@/utils/ObjectToParams';
import getNonEmptyFields from '@/utils/getNonEmptyFields';
import { getComparator, stableSort } from '@/utils/tableSortUtils';
import {
  Avatar,
  Box,
  CircularProgress,
  Grid,
  Pagination,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  TableSortLabel,
  alpha,
  styled,
  tableCellClasses,
  useMediaQuery,
} from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import { useContext, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function Developers() {
  const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down('sm'));
  const isMd = useMediaQuery((theme: any) => theme.breakpoints.down('md'));

  const { t } = useTranslation();

  let appToast = useContext<ToastContextInterface>(AppToastContext);
  const ToastLikeConfig: any = {
    type: 'success',
    duration: 1000,
  };

  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [orderBy, setOrderBy] = useState<string>('name');
  const [state, setState] = useState<{
    fetchMore: boolean;
    fetching: boolean;
    totalResults: number;
    data: Array<DeveloperBasic> | [];
  }>({
    fetchMore: true,
    fetching: true,
    totalResults: -1,
    data: [],
  });
  const [searchInput, setSearchInput] = useState('');
  const [params, setParams] = useState({
    page: 1,
    limit: 16,
    sort: 'id',
    name: '',
  });

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) =>
    setParams((st) => ({ ...st, page: value }));

  useEffect(() => {
    const fetchUser = async (params?: any) => {
      try {
        setState((st) => ({ ...st, data: [], fetching: true }));
        const resp = await getDevelopers(
          ObjectToPrams(getNonEmptyFields(params))
        );
        setState((st) => ({
          ...st,
          fetchMore: resp.filtered_developers_count <= resp.total_developers,
          data: resp.developers,
          totalResults: resp.filtered_developers_count,
        }));
      } catch (e) {
        console.log(e);
        appToast.setToast(`Error: ${errorCallback(e)}`, {
          ...ToastLikeConfig,
        });
      } finally {
        setState((st) => ({ ...st, fetching: false }));
      }
    };
    fetchUser(params);
  }, [params]);

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (searchInput) {
      setState((st) => ({ ...st, fetchMore: true }));
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        setParams((prevPage) => ({
          ...prevPage,
          page: 1,
          name: searchInput,
        }));
      }, 750);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [searchInput]);

  const handleSortBy = (property: string) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const visibleRows = useMemo(
    () =>
      stableSort(
        state?.data?.map((el) => ({
          id: el.id,
          name: el.name,
          slug: el.slug,
          logo: el.logo,
          selling: el.selling,
          sold_out: el.sold_out,
          pre_construction: el.pre_construction,
          total: el.selling + el.sold_out + el.pre_construction,
        })),
        getComparator(order, orderBy)
      ),
    [order, orderBy, state.data]
  );

  const emptyRows =
    params.page > 0 ? Math.max(0, 1 * params.limit - visibleRows.length) : 0;

  return (
    <Box my={isMobile ? '30px' : '50px'}>
      <ResponsiveContainer>
        <>
          <GridContainer spacing={5}>
            <>
              <Grid item xs={12}>
                <Text
                  text={t('Developers')}
                  color={colors.black21}
                  token={
                    isMobile
                      ? tokens.FS16FW600LH21_86SB
                      : tokens.FS36FW700LH49_18B
                  }
                  textAlign='left'
                  styles={{ marginBottom: '10px' }}
                />
                <Box
                  {...displayFlexAlignItemsCenterJustifyContentSpaceBetween}
                  marginBottom={isMobile ? '30px' : '50px'}
                  gap={'15px'}
                >
                  <SearchBar
                    backGroundColor={colors.greyEB}
                    color={colors.black21}
                    token={tokens.FS16FW500LH21_86R}
                    placeholder={t('Search developer')}
                    width={'30%'}
                    height='50px'
                    borderRadius='8px'
                    allowClear={isMobile ? false : true}
                    value={searchInput}
                    onChange={(value: string) => setSearchInput(value)}
                    handleClear={() => {
                      setSearchInput('');
                      setState((st) => ({ ...st, fetchMore: true }));
                      setTimeout(() => {
                        setParams((prevPage) => ({
                          ...prevPage,
                          name: '',
                          page: 1,
                        }));
                      }, 0);
                    }}
                    styles={{
                      maxWidth: '500px',
                      width: isMd && !isMobile ? '68%' : '100%',
                    }}
                  />
                </Box>
                <Divider />
              </Grid>
              <Grid item xs={12}>
                <TableContainer
                  sx={{
                    border: `1px solid ${colors.greyEB}`,
                    borderRadius: '8px',
                    borderCollapse: 'none',
                  }}
                >
                  <Table
                    sx={{ minWidth: 700, overflowX: 'auto' }}
                    aria-label='customized table'
                  >
                    <TableHead>
                      <TableRow>
                        {[
                          { label: 'Developer', id: 'name' },
                          { label: 'Selling', id: 'selling' },
                          {
                            label: 'Pre Construction',
                            id: 'pre_construction',
                          },
                          {
                            label: 'Sold Out',
                            id: 'sold_out',
                          },
                          {
                            label: 'Total Developments',
                            id: 'total',
                          },
                        ].map((el, idx) => (
                          <StyledTableCell
                            key={el.id}
                            sortDirection={orderBy === el.id ? order : false}
                            align={idx === 0 ? 'left' : 'center'}
                            sx={{
                              padding: {
                                xs: '15px 15px !important',
                                md: `${
                                  idx === 0
                                    ? '20px 15px 20px 25px'
                                    : '20px 15px'
                                } !important`,
                              },
                            }}
                          >
                            <TableSortLabel
                              active={orderBy === el.id}
                              direction={orderBy === el.id ? order : 'asc'}
                              onClick={() => handleSortBy(el.id)}
                              sx={{
                                fontSize: {
                                  xs: '14px',
                                  lg: '16px',
                                },
                              }}
                            >
                              {el.label}
                              {orderBy === el.id ? (
                                <Box component='span' sx={visuallyHidden}>
                                  {order === 'desc'
                                    ? 'sorted descending'
                                    : 'sorted ascending'}
                                </Box>
                              ) : null}
                            </TableSortLabel>
                          </StyledTableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {state.fetching
                        ? emptyRows > 0 && (
                            <TableRow
                              style={{
                                height: 65 * emptyRows,
                              }}
                            >
                              <TableCell colSpan={6}>
                                <Stack
                                  alignItems={'center'}
                                  justifyContent={'space-between'}
                                >
                                  <CircularProgress size={30} />
                                </Stack>
                              </TableCell>
                            </TableRow>
                          )
                        : visibleRows?.length > 0
                        ? visibleRows?.map((developer) => (
                            <StyledTableRow
                              key={developer.id}
                              onClick={() =>
                                window.open(
                                  `/developers/${developer.slug}`,
                                  '_blank'
                                )
                              }
                            >
                              <StyledTableCell component='th' scope='row'>
                                <Stack
                                  direction='row'
                                  spacing={2}
                                  alignItems={'center'}
                                >
                                  <Avatar
                                    src={developer.logo}
                                    alt={developer.name}
                                    sx={{
                                      width: 40,
                                      height: 40,
                                      borderRadius: '9px',
                                      '& img': {
                                        objectFit: 'contain',
                                      },
                                    }}
                                    variant='square'
                                  />
                                  <Text
                                    text={developer.name}
                                    token={tokens.FS16FW600LH21_86R}
                                    color={colors.black21}
                                    textAlign='left'
                                  />
                                </Stack>
                              </StyledTableCell>
                              <StyledTableCell align='center'>
                                {developer.selling}
                              </StyledTableCell>
                              <StyledTableCell align='center'>
                                {developer.pre_construction}
                              </StyledTableCell>
                              <StyledTableCell align='center'>
                                {developer.sold_out}
                              </StyledTableCell>
                              <StyledTableCell align='center'>
                                {developer.selling +
                                  developer.pre_construction +
                                  developer.sold_out}
                              </StyledTableCell>
                            </StyledTableRow>
                          ))
                        : emptyRows > 0 && (
                            <TableRow
                              style={{
                                height: 65 * emptyRows,
                              }}
                            >
                              <TableCell colSpan={6}>
                                {visibleRows.length === 0 && (
                                  <Stack
                                    alignItems={'center'}
                                    justifyContent={'space-between'}
                                  >
                                    <NoDataExists />
                                  </Stack>
                                )}
                              </TableCell>
                            </TableRow>
                          )}
                    </TableBody>
                    <TableFooter>
                      <TableRow
                        style={{
                          height: 65 * emptyRows,
                        }}
                      >
                        <TableCell colSpan={6} padding='none'>
                          <Stack
                            width='100%'
                            p={2.8}
                            direction='row'
                            spacing={2}
                            alignItems='center'
                            justifyContent='space-between'
                          >
                            <Pagination
                              count={Math.ceil(
                                state.totalResults / params.limit
                              )}
                              page={params.page}
                              variant='outlined'
                              shape='rounded'
                              hidePrevButton
                              hideNextButton
                              size='large'
                              boundaryCount={2}
                              onChange={handleChange}
                              sx={{
                                '& *': {
                                  ...tokens.FS14FW600LH16SB,
                                },
                                '& .MuiPaginationItem-root.Mui-selected': {
                                  background: 'transparent',
                                  border: `1px solid ${colors.black21}`,
                                },
                                flexShrink: 0,
                              }}
                            />
                            <Stack
                              direction={'row'}
                              spacing={1}
                              sx={{
                                flexShrink: 0,
                              }}
                            >
                              <Button
                                disabled={state.fetching || params.page === 1}
                                onClick={() =>
                                  setParams((st) => ({
                                    ...st,
                                    page: st.page - 1,
                                  }))
                                }
                                variant='white'
                                token={
                                  isMobile
                                    ? tokens.FS14FW600LH16SB
                                    : tokens.FS16FW500LH18M
                                }
                                text={t('Previous')}
                                justifyContent='center'
                                borderRadius='9px'
                                style={{
                                  minWidth: '120px',
                                  height: '40px',
                                }}
                              />
                              <Button
                                disabled={
                                  state.fetching ||
                                  Math.ceil(
                                    state.totalResults / params.limit
                                  ) <= params.page
                                }
                                onClick={() =>
                                  setParams((st) => ({
                                    ...st,
                                    page: st.page + 1,
                                  }))
                                }
                                variant='white'
                                token={
                                  isMobile
                                    ? tokens.FS14FW600LH16SB
                                    : tokens.FS16FW500LH18M
                                }
                                text={t('Next')}
                                justifyContent='center'
                                maxWidth
                                borderRadius='9px'
                                style={{
                                  minWidth: '120px',
                                  height: '40px',
                                }}
                              />
                            </Stack>
                          </Stack>
                        </TableCell>
                      </TableRow>
                    </TableFooter>
                  </Table>
                </TableContainer>
              </Grid>
            </>
          </GridContainer>
        </>
      </ResponsiveContainer>
    </Box>
  );
}

const StyledTableCell = styled(TableCell)(() => ({
  ...tokens.FS16FW500LH18M,
  [`&.${tableCellClasses.head}`]: {
    color: colors.grey96,
    padding: '21px 25px',
    '(max-width: 600px)': {
      padding: '13px 17px',
    },
  },
  [`&.${tableCellClasses.body}`]: {
    padding: '12px 25px',
  },
}));

const StyledTableRow = styled(TableRow)(() => ({
  border: `1px solid ${colors.greyEB}`,
  '&, & *': {
    cursor: 'pointer !important',
  },
  '&:nth-of-type(odd)': {
    backgroundColor: alpha(colors.blueC2, 0.05),
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));
