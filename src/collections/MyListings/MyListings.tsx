import {
  GridContainer,
  SearchBar,
  Text,
  TextInputWithBorder,
} from '@/components';
import Button from '@/components/Button/Button';
import BarChart from '@/components/ChartJS/BarChart/BarChart';
import DialogWrapper from '@/components/Dialog/Dialog';
import DialogCloseButton from '@/components/DialogCloseButton/DialogCloseButton';
import Image from '@/components/Image/Image';
import Select from '@/components/Select/Select';
import DataTable, { TableRowDataProp } from '@/components/Table/Table';

import {
  colors,
  displayFlexAlignItemsCenterJustifyContentCenter,
  displayFlexAlignItemsCenterJustifyContentFlexEnd,
  displayFlexAlignItemsCenterJustifyContentFlexStart,
  displayFlexAlignItemsCenterJustifyContentSpaceBetween,
  tokens,
} from '@/styles';
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  Paper,
  Switch,
  useMediaQuery,
} from '@mui/material';

import { useState } from 'react';

export default function MyListings() {
  const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down('sm'));
  const [isOpenStatsDialog, setIsOpenStatsDialog] = useState(false);
  const [isOpenLeadsDialog, setIsOpenLeadsDialog] = useState(false);

  return (
    <>
      {RenderDialog(
        isOpenStatsDialog,
        () => setIsOpenStatsDialog(!isOpenStatsDialog),
        isMobile
      )}

      {RenderLeadsDialog(
        isOpenLeadsDialog,
        () => setIsOpenLeadsDialog(!isOpenLeadsDialog),
        isMobile
      )}

      <GridContainer>
        <>
          <Grid item xs={12} sm={8}>
            <Box
              {...displayFlexAlignItemsCenterJustifyContentFlexStart}
              flexDirection={'column'}
              alignItems={'flex-start'}
              gap={'9px'}
            >
              <Text
                token={
                  isMobile
                    ? tokens.FS20FW800LH22_72EB
                    : tokens.FS32FW800LH43_71EB
                }
                text='My Listing'
                color={colors.black21}
                textAlign='left'
              />
              <Text
                token={isMobile ? tokens.FS14FW500LH19R : tokens.FS16FW400LH18R}
                text='Edit or Add new properties to your listing'
                color={colors.grey9C}
                textAlign='left'
                styles={{
                  fontSize: isMobile ? '16px' : '18px',
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={4} display={{ xs: 'none', sm: 'block' }}>
            <Box
              height={'100%'}
              {...displayFlexAlignItemsCenterJustifyContentCenter}
              justifyContent={'flex-end'}
            >
              <Button
                token={tokens.FS16FW500LH18M}
                text='Cancel'
                onClick={() => {}}
                variant='blackOutlined'
                justifyContent='center'
                borderRadius='8px'
                style={{ height: '40px' }}
              />
              <Button
                token={tokens.FS16FW500LH18M}
                text='Save'
                onClick={() => {}}
                variant='blue'
                justifyContent='center'
                borderRadius='8px'
                style={{ marginLeft: '10px', height: '40px' }}
              />
            </Box>
          </Grid>
        </>
      </GridContainer>

      <Box
        marginTop={isMobile ? '32px' : '50px'}
        {...displayFlexAlignItemsCenterJustifyContentSpaceBetween}
        gap={'15px'}
        alignItems='start'
      >
        <Box
          {...displayFlexAlignItemsCenterJustifyContentFlexStart}
          flexWrap={'wrap'}
          gap={'10px'}
        >
          <Select
            label='Property Type'
            options={[
              { id: 1, label: 'House', value: 'house' },
              { id: 2, label: 'Condo', value: 'condo' },
            ]}
            innerStyles={{
              minWidth: '150px',
              borderRadius: '50px',
            }}
            isBorderDark={true}
          />
          <Select
            label='Show All'
            options={[
              { id: 1, label: 'Yes', value: 'yes' },
              { id: 2, label: 'No', value: 'no' },
            ]}
            innerStyles={{
              minWidth: '110px',
              borderRadius: '50px',
            }}
            isBorderDark={true}
          />
          <Select
            label='Price Range'
            options={[
              { id: 1, label: '100$-200$', value: '100$-200$' },
              { id: 2, label: '200$-300$', value: '200$-300$' },
              { id: 3, label: '300$-400$', value: '300$-400$' },
              { id: 4, label: '500$-600$', value: '500$-600$' },
            ]}
            innerStyles={{
              minWidth: '135px',
              borderRadius: '50px',
            }}
            isBorderDark={true}
          />{' '}
          <Select
            label='For'
            options={[
              { id: 1, label: 'Rent', value: 'rent' },
              { id: 2, label: 'Ownership', value: 'ownership' },
            ]}
            innerStyles={{
              minWidth: '70px',
              borderRadius: '50px',
            }}
            isBorderDark={true}
          />
        </Box>
        <Button
          token={tokens.FS16FW500LH18M}
          text='+ List New'
          onClick={async () => {}}
          variant='blackOutlined'
          justifyContent='center'
          borderRadius='50px'
          maxWidth
          width='fit-content'
          style={{ height: '40px', minWidth: '120px' }}
        />
      </Box>

      <DataTable
        headers={[
          { align: 'left', data: 'Name' },
          { align: 'center', data: 'Property Type' },
          { align: 'center', data: 'Size' },
          { align: 'center', data: 'Listed On' },
          { align: 'center', data: 'Status' },
          { align: 'center', data: 'Price' },
          { align: 'center', data: 'For' },
          { align: 'center', data: '' },
          { align: 'center', data: '' },
        ]}
        style={{
          marginTop: '20px',
          border: `1px solid ${colors.greyE1}`,
          borderRadius: '8px',
        }}
        rowData={tableData as TableRowDataProp[]}
        handleRowSelection={(data1, data2) => {
          // console.log(data1, data2);
        }}
        handleColSelection={(colIndex, rowData) => {
          if (colIndex === 7) {
            setIsOpenStatsDialog(!isOpenStatsDialog);
          } else if (colIndex === -1) {
            setIsOpenLeadsDialog(true);
          }
        }}
        isRenderActionsColumn
      />
    </>
  );
}

const tableColData = [
  {
    align: 'center',
    data: (
      <Box {...displayFlexAlignItemsCenterJustifyContentFlexStart}>
        <Image
          height={'37px'}
          width={'37px'}
          src={'/images/property/coming-soon.jpg'}
          alt='suite'
          style={{ marginRight: '5px' }}
        />
        John 1
      </Box>
    ),
  },
  {
    align: 'center',
    data: 'Condo',
  },
  {
    align: 'center',
    data: '450 sq ft',
  },
  {
    align: 'center',
    data: '24 aug, 2022',
  },
  {
    align: 'center',
    data: 'Sold',
  },
  {
    align: 'center',
    data: '$450000',
  },
  {
    align: 'center',
    data: 'Rent',
  },
  {
    align: 'center',
    data: (
      <Box
        {...displayFlexAlignItemsCenterJustifyContentCenter}
        style={{ cursor: 'pointer' }}
      >
        <Image
          height={'10px'}
          width={'10px'}
          src={'/icons/bar-chart.svg'}
          alt='suite'
          style={{ marginRight: '5px' }}
        />

        <Text
          color={colors.blueC2}
          text='Stats'
          token={tokens.FS16FW400LH18R}
          cursor='pointer'
        />
      </Box>
    ),
  },
];

const tableData = [
  tableColData,
  tableColData,
  tableColData,
  tableColData,
  tableColData,
  tableColData,
  tableColData,
  tableColData,
  tableColData,
  tableColData,
  tableColData,
  tableColData,
  tableColData,
];

function RenderDialog(
  isOpenStatsDialog: boolean,
  handleCloseModal: () => void,
  isMobile: boolean
) {
  const [statsTimeSpan, setStatsTimeSpan] = useState(0);
  return (
    <>
      <DialogWrapper
        open={isOpenStatsDialog}
        onClose={() => handleCloseModal()}
        fullWidth
        maxWidth='lg'
      >
        <DialogTitle
          sx={{
            padding: { xs: '21px 19px', md: '23px 37px' },
          }}
        >
          <Box {...displayFlexAlignItemsCenterJustifyContentSpaceBetween}>
            <Text
              token={tokens.FS16FW500LH18M}
              text='Property Stats'
              color={colors.black21}
              textAlign='left'
            />
            <DialogCloseButton toggleClose={() => handleCloseModal()} />
          </Box>
        </DialogTitle>
        <DialogContent
          sx={{
            padding: { xs: '0px 17px 17px', md: '0px 37px 23px' },
          }}
        >
          <GridContainer spacing={isMobile ? 1 : 2}>
            <>
              <Grid item xs={6} sm={3}>
                <Box
                  width={'100%'}
                  height={isMobile ? '100px' : '150px'}
                  border={`1px solid ${colors.greyE1}`}
                  borderRadius={'8px'}
                  {...displayFlexAlignItemsCenterJustifyContentCenter}
                  flexDirection={'column'}
                >
                  <Image
                    width={isMobile ? '30px' : '34px'}
                    height={isMobile ? '10px' : '19px'}
                    src='/icons/eye.svg'
                    alt='eye'
                    style={{ marginBottom: '10px' }}
                  />
                  <Text
                    token={
                      isMobile
                        ? tokens.FS12FW600LH18M
                        : tokens.FS16FW600LH21_86SB
                    }
                    text='2500 Views'
                    color={colors.black21}
                    textAlign={isMobile ? 'center' : 'left'}
                    styles={{ marginBottom: '5px' }}
                  />
                  <Text
                    token={
                      isMobile ? tokens.FS11FW400LH18R : tokens.FS13FW400LH18R
                    }
                    text='Total'
                    color={colors.grey96}
                    textAlign={isMobile ? 'center' : 'left'}
                  />
                </Box>
              </Grid>
              <Grid item xs={6} sm={3}>
                {' '}
                <Box
                  width={'100%'}
                  height={isMobile ? '100px' : '150px'}
                  border={`1px solid ${colors.greyE1}`}
                  borderRadius={'8px'}
                  {...displayFlexAlignItemsCenterJustifyContentCenter}
                  flexDirection={'column'}
                >
                  <Image
                    width={isMobile ? '20px' : '34px'}
                    height={isMobile ? '10px' : '19px'}
                    src='/icons/eye.svg'
                    alt='eye'
                    style={{ marginBottom: '10px' }}
                  />
                  <Text
                    token={
                      isMobile
                        ? tokens.FS12FW600LH18M
                        : tokens.FS16FW600LH21_86SB
                    }
                    text='250 Views'
                    color={colors.black21}
                    textAlign={isMobile ? 'center' : 'left'}
                    styles={{ marginBottom: '5px' }}
                  />
                  <Text
                    token={
                      isMobile ? tokens.FS11FW400LH18R : tokens.FS13FW400LH18R
                    }
                    text='This month'
                    color={colors.grey96}
                    textAlign={isMobile ? 'center' : 'left'}
                  />
                </Box>
              </Grid>
              <Grid item xs={6} sm={3}>
                {' '}
                <Box
                  width={'100%'}
                  height={isMobile ? '100px' : '150px'}
                  border={`1px solid ${colors.greyE1}`}
                  borderRadius={'8px'}
                  {...displayFlexAlignItemsCenterJustifyContentCenter}
                  flexDirection={'column'}
                >
                  <Image
                    width={isMobile ? '15px' : '31px'}
                    height={isMobile ? '15px' : '31px'}
                    src='/icons/clicks.svg'
                    alt='clicks'
                    style={{ marginBottom: '10px' }}
                  />
                  <Text
                    token={
                      isMobile
                        ? tokens.FS12FW600LH18M
                        : tokens.FS16FW600LH21_86SB
                    }
                    text='1960 Clicks'
                    color={colors.black21}
                    textAlign={isMobile ? 'center' : 'left'}
                    styles={{ marginBottom: '5px' }}
                  />
                  <Text
                    token={
                      isMobile ? tokens.FS11FW400LH18R : tokens.FS13FW400LH18R
                    }
                    text='Total'
                    color={colors.grey96}
                    textAlign={isMobile ? 'center' : 'left'}
                  />
                </Box>
              </Grid>
              <Grid item xs={6} sm={3}>
                {' '}
                <Box
                  width={'100%'}
                  height={isMobile ? '100px' : '150px'}
                  border={`1px solid ${colors.greyE1}`}
                  borderRadius={'8px'}
                  {...displayFlexAlignItemsCenterJustifyContentCenter}
                  flexDirection={'column'}
                >
                  <Image
                    width={isMobile ? '10px' : '29px'}
                    height={isMobile ? '20px' : '34px'}
                    src='/icons/leads.svg'
                    alt='leads'
                    style={{ marginBottom: '10px' }}
                  />
                  <Text
                    token={
                      isMobile
                        ? tokens.FS12FW600LH18M
                        : tokens.FS16FW600LH21_86SB
                    }
                    text='55 Leads'
                    color={colors.black21}
                    textAlign={isMobile ? 'center' : 'left'}
                    styles={{ marginBottom: '5px' }}
                  />
                  <Text
                    token={
                      isMobile ? tokens.FS11FW400LH18R : tokens.FS13FW400LH18R
                    }
                    text='Total'
                    color={colors.grey96}
                    textAlign={isMobile ? 'center' : 'left'}
                  />
                </Box>
              </Grid>
            </>
          </GridContainer>
          <Box
            border={`1px solid ${colors.greyE1}`}
            borderRadius={'8px'}
            marginTop={isMobile ? '10px' : '30px'}
          >
            <List sx={{ padding: 0, overflow: 'hidden' }}>
              <ListItem
                sx={{
                  padding: isMobile ? '13px 9px' : '13px 19px',
                }}
              >
                <ListItemText sx={{ margin: 0 }}>
                  <Box
                    {...displayFlexAlignItemsCenterJustifyContentSpaceBetween}
                    gap={'15px'}
                    width='100%'
                    sx={{
                      flexWrap: { xs: 'wrap', sm: 'no-wrap' },
                    }}
                  >
                    <Text
                      token={
                        isMobile
                          ? tokens.FS12FW600LH18M
                          : tokens.FS16FW600LH21_86SB
                      }
                      text='Overall stats'
                      color={colors.black21}
                      textAlign='left'
                    />
                    <Box
                      {...displayFlexAlignItemsCenterJustifyContentCenter}
                      gap={isMobile ? '5px' : '10px'}
                    >
                      <Button
                        text='1 year'
                        token={
                          isMobile
                            ? tokens.FS11FW400LH18R
                            : tokens.FS14FW600LH16SB
                        }
                        variant={statsTimeSpan === 0 ? 'black' : 'grey'}
                        onClick={() => {
                          setStatsTimeSpan(0);
                        }}
                        justifyContent='center'
                        borderRadius={isMobile ? '2px' : '10px'}
                        style={{
                          fontSize: { xs: '10px', sm: '14px' },
                          padding: '6px 10px',
                          backgroundColor:
                            statsTimeSpan === 0
                              ? colors.black21
                              : 'rgba(150, 150, 150, 0.56)',
                          '& p': {
                            color: `${colors.whiteFF} !important`,
                          },
                        }}
                      />
                      <Button
                        text='6 months'
                        token={
                          isMobile
                            ? tokens.FS11FW400LH18R
                            : tokens.FS14FW600LH16SB
                        }
                        variant={statsTimeSpan === 1 ? 'black' : 'grey'}
                        onClick={() => {
                          setStatsTimeSpan(1);
                        }}
                        justifyContent='center'
                        borderRadius={isMobile ? '2px' : '10px'}
                        style={{
                          fontSize: { xs: '10px', sm: '14px' },
                          padding: '6px 10px',
                          backgroundColor:
                            statsTimeSpan === 1
                              ? colors.black21
                              : 'rgba(150, 150, 150, 0.56)',
                          '& p': {
                            color: `${colors.whiteFF} !important`,
                          },
                        }}
                      />
                      <Button
                        text='3 months'
                        token={
                          isMobile
                            ? tokens.FS11FW400LH18R
                            : tokens.FS14FW600LH16SB
                        }
                        variant={statsTimeSpan === 2 ? 'black' : 'grey'}
                        onClick={() => {
                          setStatsTimeSpan(2);
                        }}
                        justifyContent='center'
                        borderRadius={isMobile ? '2px' : '10px'}
                        style={{
                          fontSize: { xs: '10px', sm: '14px' },
                          padding: '6px 10px',
                          backgroundColor:
                            statsTimeSpan === 2
                              ? colors.black21
                              : 'rgba(150, 150, 150, 0.56)',
                          '& p': {
                            color: `${colors.whiteFF} !important`,
                          },
                        }}
                      />
                    </Box>
                  </Box>
                </ListItemText>
              </ListItem>
              <Divider />
              <ListItem
                sx={{
                  padding: isMobile ? '13px 9px' : '13px 19px',
                  overflowX: 'auto',
                }}
              >
                <ListItemText sx={{ margin: 0 }}>
                  <Box
                    width='100%'
                    sx={{ minWidth: '650px', overflowX: 'auto' }}
                  >
                    <BarChart
                      dataset={{
                        labels: [
                          'Jan',
                          'Feb',
                          'Mar',
                          'Apr',
                          'May',
                          'Jun',
                          'Jul',
                          'Aug',
                          'Sep',
                          'Oct',
                          'Nov',
                          'Dec',
                        ],
                        datasets: [
                          {
                            label: 'Views',
                            data: [
                              450, 285, 152, 369, 274, 289, 483, 95, 418, 300,
                              150, 463,
                            ],
                            backgroundColor: 'rgba(75, 192, 192, 0.6)',
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 1,
                          },
                          {
                            label: 'Clicks',
                            data: [
                              239, 120, 388, 325, 88, 412, 143, 269, 427, 418,
                              327, 422,
                            ],
                            backgroundColor: 'rgba(180, 63, 63, 0.6)',
                            borderColor: 'rgba(180, 63, 63, 1)',
                            borderWidth: 1,
                          },
                          {
                            label: 'Leads',
                            data: [
                              362, 194, 199, 204, 161, 119, 221, 383, 122, 337,
                              363, 378,
                            ],
                            backgroundColor: 'rgba(20, 100, 192, 0.6)',
                            borderColor: 'rgba(20, 100, 192, 1)',
                            borderWidth: 1,
                          },
                        ],
                      }}
                    />
                  </Box>
                </ListItemText>
              </ListItem>
            </List>
          </Box>
        </DialogContent>
      </DialogWrapper>
    </>
  );
}
function RenderLeadsDialog(
  isOpenLeadsDialog: boolean,
  handleCloseModal: () => void,
  isMobile: boolean
) {
  const [statsTimeSpan, setStatsTimeSpan] = useState(0);
  return (
    <>
      <DialogWrapper
        open={isOpenLeadsDialog}
        onClose={() => handleCloseModal()}
        fullWidth={true}
        maxWidth={'lg'}
        sx={{ minHeight: '80vh' }}
      >
        <DialogTitle
          sx={{
            padding: { xs: '21px 19px', md: '23px 37px' },
          }}
        >
          <Box {...displayFlexAlignItemsCenterJustifyContentSpaceBetween}>
            <Text
              token={tokens.FS16FW500LH18M}
              text='Johns House Leads'
              color={colors.black21}
              textAlign='left'
              styles={{ fontSize: '20px' }}
            />
            <DialogCloseButton toggleClose={() => handleCloseModal()} />
          </Box>
        </DialogTitle>
        <DialogContent
          sx={{
            padding: { xs: '0px 19px 21px', md: '0px 37px 23px' },
          }}
        >
          <Box
            width={'100%'}
            border={`1px solid ${colors.greyE1}`}
            borderRadius={'8px'}
            padding={isMobile ? '30px 12px' : '25px 10px'}
            height='100%'
            sx={{ overflowY: 'auto' }}
          >
            <GridContainer justifyContent='space-between' spacing={2}>
              <>
                <Grid item xs={12} sm={5} md={4}>
                  <Box
                    {...displayFlexAlignItemsCenterJustifyContentFlexStart}
                    height={'100%'}
                  >
                    <SearchBar
                      color={colors.black21}
                      token={tokens.FS14FW400LH19R}
                      backGroundColor={colors.greyEB}
                      placeholder={'Search Properties'}
                      width={'100%'}
                      styles={{ height: '40px' }}
                    />
                  </Box>
                </Grid>
                <Grid item sm={12} md={8} lg={7}>
                  {' '}
                  <Box
                    {...displayFlexAlignItemsCenterJustifyContentFlexEnd}
                    flexWrap={isMobile ? 'wrap' : 'nowrap'}
                    sx={{
                      justifyContent: { xs: 'start', sm: 'end', md: 'end' },
                      columnGap: '10px',
                      rowGap: '10px',
                      marginTop: { xs: '10px', md: '0px' },
                    }}
                  >
                    {' '}
                    <Select
                      label=''
                      options={[
                        {
                          id: 1,
                          label: 'Property Type',
                          value: '-',
                          disabled: true,
                        },
                        { id: 2, label: 'House', value: 'house' },
                        { id: 3, label: 'Condo', value: 'condo' },
                      ]}
                      selectedId={1}
                      innerStyles={{
                        minWidth: '150px',
                        borderRadius: '50px',
                      }}
                      isBorderDark={true}
                    />
                    <Select
                      label=''
                      options={[
                        {
                          id: 1,
                          label: 'Show All',
                          value: '-',
                          disabled: true,
                        },
                        { id: 2, label: 'Yes', value: 'yes' },
                        { id: 3, label: 'No', value: 'no' },
                      ]}
                      innerStyles={{
                        minWidth: '110px',
                        borderRadius: '50px',
                      }}
                      selectedId={1}
                      isBorderDark={true}
                    />
                    <Select
                      label=''
                      options={[
                        {
                          id: 1,
                          label: 'Price Range',
                          value: '-',
                          disabled: true,
                        },
                        { id: 2, label: '100$-200$', value: '100$-200$' },
                        { id: 3, label: '200$-300$', value: '200$-300$' },
                        { id: 4, label: '300$-400$', value: '300$-400$' },
                        { id: 5, label: '500$-600$', value: '500$-600$' },
                      ]}
                      selectedId={1}
                      innerStyles={{
                        minWidth: '140px',
                        borderRadius: '50px',
                      }}
                      isBorderDark={true}
                    />{' '}
                    <Select
                      label=''
                      options={[
                        {
                          id: 1,
                          label: 'For',
                          value: '-',
                          disabled: true,
                        },
                        { id: 2, label: 'Rent', value: 'rent' },
                        { id: 3, label: 'Ownership', value: 'ownership' },
                      ]}
                      selectedId={1}
                      innerStyles={{
                        minWidth: '70px',
                        borderRadius: '50px',
                      }}
                      isBorderDark={true}
                    />
                  </Box>
                </Grid>
              </>
            </GridContainer>
            <DataTable
              headers={[
                { align: 'left', data: 'F Name' },
                { align: 'left', data: 'L Name' },
                { align: 'center', data: 'Email' },
                { align: 'center', data: 'Contact On' },
                { align: 'center', data: 'Type of unit' },
                { align: 'center', data: 'Lwst Range' },
                { align: 'center', data: 'Hgst Range' },
                { align: 'center', data: 'Date' },
                { align: 'center', data: 'Message' },
                { align: 'center', data: '' },
              ]}
              style={{
                marginTop: '20px',
                border: `1px solid ${colors.greyE1}`,
                borderRadius: '8px',
              }}
              rowData={leadsTableData as TableRowDataProp[]}
              handleRowSelection={(data1, data2) => {
                // console.log(data1, data2);
              }}
              handleColSelection={(colIndex, rowData) => {}}
              isRenderActionsColumn
            />
          </Box>
        </DialogContent>{' '}
      </DialogWrapper>
    </>
  );
}

const leadsTableColData = [
  {
    align: 'center',
    data: 'Ali',
  },
  {
    align: 'center',
    data: 'Haider',
  },
  {
    align: 'center',
    data: 'ali@gmail.com',
  },
  {
    align: 'center',
    data: '03458899584',
  },
  {
    align: 'center',
    data: 'Semi Detached',
  },
  {
    align: 'center',
    data: '$450000',
  },
  {
    align: 'center',
    data: '$450000',
  },
  {
    align: 'center',
    data: '20 April, 2022',
  },
  {
    align: 'center',
    data: (
      <Text
        text='View'
        cursor='pointer'
        color={colors.blueC2}
        token={tokens.FS16FW500LH18M}
      />
    ),
  },
];

const leadsTableData = [
  leadsTableColData,
  leadsTableColData,
  leadsTableColData,
  leadsTableColData,
  leadsTableColData,
];
