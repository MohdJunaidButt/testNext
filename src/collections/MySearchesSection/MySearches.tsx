import { GridContainer, Text } from '@/components';
import Button from '@/components/Button/Button';
import NoDataExists from '@/components/NoData/NoDataExists';
import DataTable, { TableRowDataProp } from '@/components/Table/Table';
import { API_BASE_URL } from '@/config';
import { AppToastContext } from '@/context/Toast/ToastContext';
import { ToastContextInterface } from '@/context/Toast/ToastInterface';
import { deleteSavedSearches, getSavedSearches } from '@/services/api';
import {
  colors,
  displayFlexAlignItemsCenterJustifyContentFlexStart,
  tokens,
} from '@/styles';
import { ISaveSearch } from '@/types/common/saveSearch';
import {
  alpha,
  Box,
  CircularProgress,
  Pagination,
  Stack,
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  TableSortLabel,
  useMediaQuery,
} from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function MySearches() {
  const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down('sm'));

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [searches, setSearches] = useState<Array<ISaveSearch>>([]);

  const { t } = useTranslation();

  let appToast = useContext<ToastContextInterface>(AppToastContext);
  const ToastLikeConfig: any = {
    type: 'success',
    duration: 1000,
  };

  useEffect(() => {
    (async () => {
      await getSavedSearches()
        .then((data) => setSearches(data))
        .catch((er) => {})
        .finally(() => setFetching(false));
    })();
  }, []);

  const handleDeleteSearch = (searchId: string) => async (e: any) => {
    e.stopPropagation();
    setLoading(true);
    await deleteSavedSearches(searchId)
      .then(() => {
        setSearches((st) => st.filter((el) => el.id !== searchId));
        appToast.setToast('Search removed successfully', {
          ...ToastLikeConfig,
        });
      })
      .catch((er) => {
        console.log('er', er);
        appToast.setToast('something went wrong', {
          ...ToastLikeConfig,
        });
      })
      .finally(() => setLoading(false));
  };

  return (
    <>
      <Box
        {...displayFlexAlignItemsCenterJustifyContentFlexStart}
        flexDirection={'column'}
        alignItems={'flex-start'}
        gap={'9px'}
      >
        <Text
          token={
            isMobile ? tokens.FS20FW800LH22_72EB : tokens.FS32FW800LH43_71EB
          }
          text={t('My Searches')}
          color={colors.black21}
          textAlign='left'
        />
        <Text
          token={isMobile ? tokens.FS14FW500LH19R : tokens.FS16FW400LH18R}
          text={t('View & modify your saved searches')}
          color={colors.grey9C}
          textAlign='left'
          styles={{
            fontSize: isMobile ? '16px' : '18px',
          }}
        />
      </Box>
      <Box marginTop={isMobile ? '32px' : '50px'}>
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
                  { label: 'Name', id: 'name' },
                  { label: 'Search Url', id: 'url' },
                  {
                    label: 'Actions',
                    id: 'actions',
                  },
                ].map((el, idx) => (
                  <StyledTableCell
                    key={el.id}
                    align={el.id === 'actions' ? 'center' : 'left'}
                    sx={{
                      padding: {
                        xs: '15px 15px !important',
                        md: `${
                          idx === 0 ? '20px 15px 20px 25px' : '20px 15px'
                        } !important`,
                      },
                    }}
                  >
                    {t(el.label)}
                  </StyledTableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {fetching ? (
                <TableRow
                  style={{
                    height: 65 * 6,
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
              ) : searches?.length > 0 ? (
                searches?.map((search: ISaveSearch) => (
                  <StyledTableRow
                    key={search.id}
                    onClick={() => window.open(search.value, '_blank')}
                    sx={{
                      cursor: 'pointer',
                    }}
                  >
                    <StyledTableCell
                      component='th'
                      scope='row'
                      sx={{
                        minWidth: '170px',
                      }}
                    >
                      <Text
                        text={search.label}
                        token={tokens.FS14FW500LH19R}
                        color={colors.black21}
                        textAlign='left'
                      />
                    </StyledTableCell>
                    <StyledTableCell align='left'>
                      {`${API_BASE_URL}${search.value}`}
                    </StyledTableCell>
                    <StyledTableCell align='center'>
                      <Button
                        text=''
                        variant='red'
                        onClick={handleDeleteSearch(search.id)}
                        justifyContent='center'
                        icon={'/icons/delete.svg'}
                        iconAlt={'/icons/delete-alt.svg'}
                        iconSize={{ width: 15, height: 15 }}
                        token={tokens.FS16FW400LH18R}
                        borderRadius='50px'
                        width='fit-content'
                        style={{
                          padding: '10px',
                          height: 'fit-content',
                          mx: 'auto',
                        }}
                        disabled={loading}
                        tooltip='Remove Search'
                      />
                    </StyledTableCell>
                  </StyledTableRow>
                ))
              ) : (
                <TableRow
                  style={{
                    height: 65 * 4,
                  }}
                >
                  <TableCell colSpan={3}>
                    <Stack
                      alignItems={'center'}
                      justifyContent={'space-between'}
                    >
                      <NoDataExists />
                    </Stack>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: colors.whiteFF,
    color: colors.grey96,
  },
  [`&.${tableCellClasses.body}`]: {
    ...tokens.FS14FW500LH19R,
    color: colors.black21,
    width: 'max-content',
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
  '&:hover': {
    backgroundColor: alpha(colors.blueC2, 0.07),
  },
}));
