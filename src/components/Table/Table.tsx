import { Text } from '@/components/Text';
import { colors, tokens } from '@/styles';
import { Theme } from '@emotion/react';
import {
  Box,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Popover,
} from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { SxProps, alpha, styled } from '@mui/material/styles';
import * as React from 'react';
import { useState } from 'react';
import Image from '../Image/Image';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
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

export interface DataTableProps {
  style?: SxProps<Theme>;
  headers: TableRowDataProp;
  rowData: TableRowDataProp[];
  handleRowSelection?: (rowNumber: number, rowData: any) => void;
  handleColSelection?: (colNumber: number, rowData: any) => void;
  isRenderActionsColumn?: boolean;
  customHeadStyles?: SxProps<Theme>;
  customRowStyles?: SxProps<Theme>;
  onlyApplyCustomCSSToFirstColumn?: boolean;
}

export type TableRowDataProp = {
  align: 'right' | 'left' | 'center';
  data: string | JSX.Element;
  isDisablePadding?: boolean;
}[];

export default function DataTable({
  style,
  headers,
  rowData,
  handleRowSelection,
  handleColSelection,
  isRenderActionsColumn,
  customHeadStyles,
  customRowStyles,
  onlyApplyCustomCSSToFirstColumn = false,
}: DataTableProps) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  React.useEffect(() => {
    const handleScroll = () => {
      setAnchorEl(null);
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [anchorEl]);

  return (
    <TableContainer component={Paper} sx={style}>
      <Table sx={{ minWidth: 700 }} aria-label='customized table'>
        <TableHead>
          <TableRow>
            {headers.map((header, index) => (
              <StyledTableCell
                key={index}
                align={header.align}
                sx={customHeadStyles}
                padding={header.isDisablePadding ? 'none' : 'normal'}
              >
                {header.data}
              </StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rowData.length > 0 ? (
            rowData.map((row, rowIndex) => (
              <StyledTableRow
                key={rowIndex}
                onClick={() =>
                  handleRowSelection && handleRowSelection(rowIndex, row)
                }
                sx={{
                  ...(handleRowSelection && { cursor: 'pointer' }),
                }}
              >
                {row?.map((col, colIndex) => (
                  <StyledTableCell
                    key={colIndex}
                    align={col.align}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleColSelection && handleColSelection(colIndex, row);
                    }}
                    padding={col.isDisablePadding ? 'none' : 'normal'}
                    sx={{
                      ...(col.isDisablePadding && { minWidth: 'unset' }),
                      ...(onlyApplyCustomCSSToFirstColumn && colIndex === 0
                        ? customRowStyles
                        : onlyApplyCustomCSSToFirstColumn && colIndex != 0
                        ? undefined
                        : customRowStyles),
                    }}
                  >
                    {col.data}
                  </StyledTableCell>
                ))}
                {isRenderActionsColumn && (
                  <StyledTableCell align={'center'}>
                    <Popover
                      open={Boolean(anchorEl)}
                      anchorEl={anchorEl}
                      onClose={handleClose}
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                      }}
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      PaperProps={{
                        elevation: 0, // Remove box shadow
                        style: {
                          overflow: 'visible',
                        },
                      }}
                      sx={{
                        '& .MuiPaper-root': {
                          boxShadow: '0px 0px 1px 0px rgb(0 0 0 / 5%)',
                          '& > li': {
                            width: '140px',
                            alignItems: 'baseline',
                            justifyContent: 'center',
                            gap: '10px',
                          },
                          '& > li:not(:last-of-type)': {
                            borderBottom: `1px solid rgba(0, 0, 0, 0.19)`,
                          },
                        },
                      }}
                    >
                      <MenuItem
                        onClick={() => {
                          handleClose();
                          handleColSelection && handleColSelection(-1, rowData);
                        }}
                      >
                        <Image
                          src={'/icons/leads-black.svg'}
                          alt='suite'
                          height={'15px'}
                          width={'15px'}
                        />
                        Leads
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          handleClose();
                          handleColSelection && handleColSelection(-2, rowData);
                        }}
                      >
                        <Image
                          src={'/icons/edit.svg'}
                          alt='suite'
                          height={'15px'}
                          width={'15px'}
                        />
                        Edit
                      </MenuItem>
                    </Popover>
                    <Box onClick={(event) => handleClick(event)}>
                      <Image
                        src={'/icons/horizontal-three-dots.svg'}
                        alt='suite'
                        height={'10px'}
                        width={'10px'}
                      />
                    </Box>
                  </StyledTableCell>
                )}
              </StyledTableRow>
            ))
          ) : (
            <StyledTableRow>
              <TableCell colSpan={headers.length}>
                <Text
                  text={'No Records Found'}
                  token={tokens.FS16FW600LH21_86R}
                  color={colors.grey63}
                />
              </TableCell>
            </StyledTableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
