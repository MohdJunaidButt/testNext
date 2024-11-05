import DepositStructure from '@/collections/DepositStructure/DepositStructure';
import { getMyPriceFromString } from '@/commonFunctions/commonFunctions';
import { GridContainer, Text, TextInputWithBorder } from '@/components';
import Button from '@/components/Button/Button';
import DatePickerValue from '@/components/DatePicker/DatePicker';
import DialogWrapper from '@/components/Dialog/Dialog';
import DialogCloseButton from '@/components/DialogCloseButton/DialogCloseButton';
import Image from '@/components/Image/Image';
import RowRadioGroup from '@/components/RowRadioGroup/RowRadioGroup';
import StepperMobile from '@/components/StepperMobile/StepperMobile';
import VerticalDivider from '@/components/VeriticalDivider/VerticalDivider';
import useCurrency from '@/hooks/useCurrency';
import { createFloorReservation } from '@/services/api';
import {
  colors,
  displayFlexAlignItemsCenterJustifyContentCenter,
  displayFlexAlignItemsCenterJustifyContentFlexStart,
  displayFlexAlignItemsCenterJustifyContentSpaceBetween,
  tokens,
} from '@/styles';
import { FloorPlan } from '@/types/common/condos';
import {
  Box,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Divider as MuiDivider,
  Snackbar,
  Step,
  StepLabel,
  Stepper,
  useMediaQuery,
} from '@mui/material';
import dayjs from 'dayjs';
import NextImage from 'next/image';
import React, { useEffect, useState } from 'react';

interface FloorReservationDialogProps {
  condo: any;
  selectedFloor: FloorPlan | null;
  isOpen: boolean;
  handleClose: (finalStep: boolean) => void;
}

export default function FloorReservationDialog({
  isOpen,
  handleClose,
  condo,
  selectedFloor,
}: FloorReservationDialogProps) {
  const { convertCurrency } = useCurrency();

  const isSm = useMediaQuery((theme: any) => theme.breakpoints.down('sm'));
  const isMD = useMediaQuery((theme: any) => theme.breakpoints.down('md'));

  const [steps1, setSteps1] = useState([
    { label: 'Suite Selected', isLock: false },
    { label: 'Floor Ranges,Parking Etc', isLock: false },
    { label: 'Personal Info', isLock: true },
    { label: 'Submit For Review', isLock: true },
  ]);
  const [activeStep, setActiveStep] = useState(1);
  const [preferredFloorRange, setPreferredFloorRange] = useState(0);
  const [addParkingSelection, setAddParkingSelection] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [addLockerReservationSelection, setAddLockerReservationSelection] =
    useState(0);
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState('');
  const [secondPurchasor, setSecondPurchasor] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => {
      let stepN = [...steps1];
      stepN[prevActiveStep + 1].isLock = false;
      setSteps1(stepN);
      return prevActiveStep + 1;
    });
  };

  const handleBack = () =>
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  const handleSnackBarClose = (event: any, reason: any) => {
    if (reason === 'clickaway') return;
    setSnackBarOpen(false);
  };
  let purchaserInitial = {
    first_name: '',
    last_name: '',
    phone: '',
    email: '',
    date_of_birth: null,
    address: '',
    suite_number: '',
    city: '',
    province: '',
    postal_code: '',
    is_canadian_resident: 'yes',
    driver_license: '',
    job_description: '',
    employer_name: '',
    driver_license_exp: null,
    document_id: null,
    document_id2: null,
  };
  let initial = {
    floor_range: 'high_floor',
    add_parking: 'yes',
    add_locker: 'yes',
    additional_note: '',
    ...purchaserInitial,
  };
  const [formData, setFormData] = useState<any>(initial);
  const [secPurchaserFormData, setSecPurchaserFormData] =
    useState<any>(purchaserInitial);
  const [error, setError] = useState<any>('');
  const [isSubmitDisabled, setSubmitDisabled] = useState<boolean>(true);
  const handleModalClose = async (finalStep = false) => {
    setSteps1([
      { label: 'Suite Selected', isLock: false },
      { label: 'Floor Ranges,Parking Etc', isLock: false },
      { label: 'Personal Info', isLock: true },
      { label: 'Submit For Review', isLock: true },
    ]);
    if (finalStep) {
      setLoading(true);
      const data = new FormData();
      for (const [key, value] of Object.entries(formData)) {
        data.append(key, value as any);
      }
      if (secondPurchasor)
        for (const [key, value] of Object.entries(secPurchaserFormData)) {
          data.append(`purchaser_${key}`, value as any);
        }
      data.append('budget', totalPrice.toString());
      await createFloorReservation(data)
        .then((res) => {
          if (res?.first_name) {
            setActiveStep(1);
            setSnackBarOpen(false);
            handleClose(true);
            setFormData(initial);
          } else
            setError(
              'Failed to create floor reservation. Check your data and try again.'
            );
        })
        .catch(() =>
          setError(
            'Failed to create floor reservation. Check your data and try again.'
          )
        )
        .finally(() => setLoading(false));
    } else {
      setFormData(initial);
      setSecondPurchasor(false);
      setSecPurchaserFormData(purchaserInitial);
      setActiveStep(1);
      handleClose(false);
    }
  };

  useEffect(() => {
    setFormData({
      ...formData,
      floor: selectedFloor?.id,
    });
    let parkingPrice = 0;
    if (addParkingSelection === 0)
      parkingPrice = getMyPriceFromString(
        condo?.property_details?.parking_cost
      );

    let lockerPrice = 0;
    if (addLockerReservationSelection === 0)
      lockerPrice = getMyPriceFromString(condo?.property_details?.locker_cost);

    let total = selectedFloor
      ? parkingPrice + lockerPrice + selectedFloor?.price
      : parkingPrice + lockerPrice;
    setTotalPrice(total);
  }, [addParkingSelection, addLockerReservationSelection, selectedFloor]);

  useEffect(() => {
    setError('');
    let isAnyEmpty = false;
    Object.keys(formData).forEach((key) => {
      if (key !== 'additional_note' && (!formData[key] || formData[key] === ''))
        isAnyEmpty = true;
    });
    if (secondPurchasor)
      Object.keys(secPurchaserFormData).forEach((key) => {
        if (!secPurchaserFormData[key] || secPurchaserFormData[key] === '')
          isAnyEmpty = true;
      });
    if (isAnyEmpty) setSubmitDisabled(true);
    else setSubmitDisabled(false);
  }, [formData, secondPurchasor, secPurchaserFormData]);

  const renderFloorRangesAndParking = () => {
    return (
      <>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={snackBarOpen}
          autoHideDuration={6000}
          onClose={handleSnackBarClose}
          message={snackBarMessage}
        />
        <Box marginTop={'40px'}>
          <Text
            text='Select your prefered floor range'
            color={colors.black21}
            token={isSm ? tokens.FS14FW600LH16SB : tokens.FS16FW600LH21_86SB}
            textAlign='left'
            styles={{ marginBottom: '5px' }}
          />
          <Text
            text='Floor Range for this suite: 8. Floor premiums may apply. Sales representative will confirm availability and final pricing.'
            color={colors.grey96}
            token={isSm ? tokens.FS11FW400LH18R : tokens.FS13FW400LH18R}
            textAlign='left'
            styles={{ marginBottom: '15px' }}
          />
          <Box
            {...displayFlexAlignItemsCenterJustifyContentFlexStart}
            flexWrap='wrap'
            gap={'10px'}
          >
            <Button
              text='High Floor'
              justifyContent='center'
              borderRadius='8px'
              onClick={() => {
                setPreferredFloorRange(0);
                setFormData({
                  ...formData,
                  floor_range: 'high_floor',
                });
              }}
              token={isSm ? tokens.FS13FW400LH18R : tokens.FS16FW400LH18R}
              variant={preferredFloorRange === 0 ? 'black' : 'grey'}
              icon={
                preferredFloorRange === 0
                  ? '/icons/bluedot.svg'
                  : '/icons/greydot.svg'
              }
              iconAlt={
                preferredFloorRange === 0
                  ? '/icons/greydot.svg'
                  : '/icons/bluedot.svg'
              }
              iconSize={{ width: 10, height: 8 }}
              style={{ padding: isSm ? '10px 15px' : '12px 17px' }}
            />
            <Button
              text='Mid Floor'
              justifyContent='center'
              borderRadius='8px'
              onClick={() => {
                setPreferredFloorRange(1);
                setFormData({
                  ...formData,
                  floor_range: 'mid_floor',
                });
              }}
              token={isSm ? tokens.FS13FW400LH18R : tokens.FS16FW400LH18R}
              variant={preferredFloorRange === 1 ? 'black' : 'grey'}
              icon={
                preferredFloorRange === 1
                  ? '/icons/bluedot.svg'
                  : '/icons/greydot.svg'
              }
              iconAlt={
                preferredFloorRange === 1
                  ? '/icons/greydot.svg'
                  : '/icons/bluedot.svg'
              }
              style={{ padding: isSm ? '10px 15px' : '12px 17px' }}
              iconSize={{ width: 10, height: 8 }}
            />
            <Button
              text='Low Floor'
              justifyContent='center'
              borderRadius='8px'
              onClick={() => {
                setPreferredFloorRange(2);
                setFormData({
                  ...formData,
                  floor_range: 'low_floor',
                });
              }}
              token={isSm ? tokens.FS13FW400LH18R : tokens.FS16FW400LH18R}
              variant={preferredFloorRange === 2 ? 'black' : 'grey'}
              icon={
                preferredFloorRange === 2
                  ? '/icons/bluedot.svg'
                  : '/icons/greydot.svg'
              }
              iconAlt={
                preferredFloorRange === 2
                  ? '/icons/greydot.svg'
                  : '/icons/bluedot.svg'
              }
              style={{ padding: isSm ? '10px 15px' : '12px 17px' }}
              iconSize={{ width: 10, height: 8 }}
            />
          </Box>
        </Box>
        <Box marginTop={'40px'}>
          <Text
            text='Add Parking (if eligible)'
            color={colors.black21}
            token={isSm ? tokens.FS14FW600LH16SB : tokens.FS16FW600LH21_86SB}
            textAlign='left'
            styles={{ marginBottom: '5px' }}
          />
          <Text
            text={`Parking price: ${convertCurrency(
              condo?.property_details.parking_cost,
              true,
              `$0`
            )}`}
            color={colors.grey96}
            token={isSm ? tokens.FS11FW400LH18R : tokens.FS13FW400LH18R}
            textAlign='left'
            styles={{ marginBottom: '15px' }}
          />
          <Box
            {...displayFlexAlignItemsCenterJustifyContentFlexStart}
            flexWrap='wrap'
            gap={'10px'}
          >
            <Button
              text={`Yes (+${convertCurrency(
                condo?.property_details.parking_cost,
                true,
                `$0`
              )})`}
              justifyContent='center'
              borderRadius='8px'
              onClick={() => {
                setAddParkingSelection(0);
                setFormData({
                  ...formData,
                  add_parking: 'yes',
                });
              }}
              token={isSm ? tokens.FS13FW400LH18R : tokens.FS16FW400LH18R}
              variant={addParkingSelection === 0 ? 'black' : 'grey'}
              icon={
                addParkingSelection === 0
                  ? '/icons/bluedot.svg'
                  : '/icons/greydot.svg'
              }
              iconAlt={
                addParkingSelection === 0
                  ? '/icons/greydot.svg'
                  : '/icons/bluedot.svg'
              }
              iconSize={{ width: 10, height: 8 }}
              style={{ padding: isSm ? '10px 15px' : '12px 17px' }}
            />
            <Button
              text='No'
              justifyContent='center'
              borderRadius='8px'
              onClick={() => {
                setAddParkingSelection(1);
                setFormData({
                  ...formData,
                  add_parking: 'no',
                });
              }}
              token={isSm ? tokens.FS13FW400LH18R : tokens.FS16FW400LH18R}
              variant={addParkingSelection === 1 ? 'black' : 'grey'}
              icon={
                addParkingSelection === 1
                  ? '/icons/bluedot.svg'
                  : '/icons/greydot.svg'
              }
              iconAlt={
                addParkingSelection === 1
                  ? '/icons/greydot.svg'
                  : '/icons/bluedot.svg'
              }
              style={{ padding: isSm ? '10px 15px' : '12px 17px' }}
              iconSize={{ width: 10, height: 8 }}
            />
            <Button
              text='Decide Later'
              justifyContent='center'
              borderRadius='8px'
              onClick={() => {
                setAddParkingSelection(2);
                setFormData({
                  ...formData,
                  add_parking: 'no',
                });
              }}
              token={isSm ? tokens.FS13FW400LH18R : tokens.FS16FW400LH18R}
              variant={addParkingSelection === 2 ? 'black' : 'grey'}
              icon={
                addParkingSelection === 2
                  ? '/icons/bluedot.svg'
                  : '/icons/greydot.svg'
              }
              iconAlt={
                addParkingSelection === 2
                  ? '/icons/greydot.svg'
                  : '/icons/bluedot.svg'
              }
              style={{ padding: isSm ? '10px 15px' : '12px 17px' }}
              iconSize={{ width: 10, height: 8 }}
            />
          </Box>
        </Box>
        <Box marginTop={'40px'}>
          <Text
            text='Add Locker (if eligible)'
            color={colors.black21}
            token={isSm ? tokens.FS14FW600LH16SB : tokens.FS16FW600LH21_86SB}
            textAlign='left'
            styles={{ marginBottom: '5px' }}
          />

          <Text
            text={`Locker price: ${convertCurrency(
              condo?.property_details?.locker_cost,
              true,
              `$0`
            )}`}
            color={colors.grey96}
            token={isSm ? tokens.FS11FW400LH18R : tokens.FS13FW400LH18R}
            textAlign='left'
            styles={{ marginBottom: '15px' }}
          />
          <Box
            {...displayFlexAlignItemsCenterJustifyContentFlexStart}
            flexWrap='wrap'
            gap={'10px'}
          >
            <Button
              text={`Yes (+${convertCurrency(
                condo?.property_details?.locker_cost,
                true,
                `$0`
              )})`}
              justifyContent='center'
              borderRadius='8px'
              onClick={() => {
                setAddLockerReservationSelection(0);
                setFormData({
                  ...formData,
                  add_locker: 'yes',
                });
              }}
              token={isSm ? tokens.FS13FW400LH18R : tokens.FS16FW400LH18R}
              variant={addLockerReservationSelection === 0 ? 'black' : 'grey'}
              icon={
                addLockerReservationSelection === 0
                  ? '/icons/bluedot.svg'
                  : '/icons/greydot.svg'
              }
              iconAlt={
                addLockerReservationSelection === 0
                  ? '/icons/greydot.svg'
                  : '/icons/bluedot.svg'
              }
              style={{ padding: isSm ? '10px 15px' : '12px 17px' }}
              iconSize={{ width: 10, height: 8 }}
            />
            <Button
              text='No'
              justifyContent='center'
              borderRadius='8px'
              onClick={() => {
                setAddLockerReservationSelection(1);
                setFormData({
                  ...formData,
                  add_locker: 'no',
                });
              }}
              token={isSm ? tokens.FS13FW400LH18R : tokens.FS16FW400LH18R}
              variant={addLockerReservationSelection === 1 ? 'black' : 'grey'}
              icon={
                addLockerReservationSelection === 1
                  ? '/icons/bluedot.svg'
                  : '/icons/greydot.svg'
              }
              iconAlt={
                addLockerReservationSelection === 1
                  ? '/icons/greydot.svg'
                  : '/icons/bluedot.svg'
              }
              style={{ padding: isSm ? '10px 15px' : '12px 17px' }}
              iconSize={{ width: 10, height: 8 }}
            />
            <Button
              text='Decide Later'
              justifyContent='center'
              borderRadius='8px'
              onClick={() => {
                setAddLockerReservationSelection(2);
                setFormData({
                  ...formData,
                  add_locker: 'no',
                });
              }}
              token={isSm ? tokens.FS13FW400LH18R : tokens.FS16FW400LH18R}
              variant={addLockerReservationSelection === 2 ? 'black' : 'grey'}
              icon={
                addLockerReservationSelection === 2
                  ? '/icons/bluedot.svg'
                  : '/icons/greydot.svg'
              }
              iconAlt={
                addLockerReservationSelection === 2
                  ? '/icons/greydot.svg'
                  : '/icons/bluedot.svg'
              }
              style={{ padding: isSm ? '10px 15px' : '12px 17px' }}
              iconSize={{ width: 10, height: 8 }}
            />
          </Box>
          <TextInputWithBorder
            onChange={(text) => {
              setFormData({ ...formData, additional_note: text });
            }}
            label=''
            placeholder='Add Additional Note'
            borderRadius='10px'
            styles={{ marginTop: '30px' }}
            multiline={true}
            value={formData?.additional_note}
            rows={5}
          />
          <Box
            marginTop='30px'
            {...displayFlexAlignItemsCenterJustifyContentFlexStart}
            gap={'15px'}
            sx={{
              ...(isSm && {
                '& > *': {
                  flexBasis: '50%',
                },
              }),
            }}
          >
            <Button
              onClick={() =>
                activeStep === 1 ? handleModalClose() : handleBack()
              }
              text='Go back'
              justifyContent='center'
              token={tokens.FS14FW500LH19R}
              variant='black'
              borderRadius='8px'
              width={isSm ? '100%' : '200px'}
              style={{ padding: '15px 20px' }}
            />
            <Button
              onClick={() => handleNext()}
              text='Next'
              justifyContent='center'
              token={tokens.FS14FW500LH19R}
              variant='blue'
              borderRadius='8px'
              width={isSm ? '100%' : '200px'}
              style={{ padding: '15px 20px' }}
            />
          </Box>
        </Box>
      </>
    );
  };

  const renderPurchaserForm = (formData: any, setFormData: any) => {
    const handleImageUpload = async (e: any) => {
      const selectedFile = await e.target.files[0];
      const key = e.target.getAttribute('data-document');
      if (selectedFile)
        setFormData((st: any) => ({
          ...st,
          [key]: selectedFile,
        }));
    };
    return (
      <>
        <Box marginTop={'30px'}>
          <Text
            text='Purchaser Information'
            color={colors.black21}
            token={isSm ? tokens.FS14FW600LH16SB : tokens.FS16FW600LH21_86SB}
            textAlign='left'
          />
          <Text
            text='Fill all the fields.'
            color={colors.grey96}
            token={isSm ? tokens.FS11FW400LH18R : tokens.FS13FW400LH18R}
            textAlign='left'
            styles={{ marginBottom: '15px' }}
          />
          <Box width={'96%'}>
            <GridContainer justifyContent='flex-start' spacing={isSm ? 1.5 : 2}>
              <>
                <Grid item xs={12} sm={6} md={6}>
                  <TextInputWithBorder
                    placeholder='First Name'
                    label=''
                    value={formData?.first_name}
                    onChange={(text) =>
                      setFormData({ ...formData, first_name: text })
                    }
                    borderRadius='12px'
                    size={isSm ? 'small' : 'medium'}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <TextInputWithBorder
                    placeholder='Last Name'
                    label=''
                    value={formData?.last_name}
                    onChange={(text) =>
                      setFormData({ ...formData, last_name: text })
                    }
                    borderRadius='12px'
                    size={isSm ? 'small' : 'medium'}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <TextInputWithBorder
                    placeholder='Phone No'
                    label=''
                    value={formData?.phone}
                    onChange={(text) =>
                      setFormData({ ...formData, phone: text })
                    }
                    borderRadius='12px'
                    size={isSm ? 'small' : 'medium'}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <TextInputWithBorder
                    placeholder='Email Address'
                    label=''
                    value={formData?.email}
                    onChange={(text) =>
                      setFormData({ ...formData, email: text })
                    }
                    borderRadius='12px'
                    size={isSm ? 'small' : 'medium'}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <DatePickerValue
                    value={formData.date_of_birth}
                    onDateChange={(value: dayjs.Dayjs | null) => {
                      if (value)
                        setFormData({
                          ...formData,
                          date_of_birth: value,
                        });
                    }}
                    label='Date of birth'
                    disablePast={false}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <RowRadioGroup
                    label='Canadian Resident ?'
                    size='small'
                    options={[
                      { id: 1, label: 'Yes', value: 'yes' },
                      { id: 2, label: 'No', value: 'no' },
                    ]}
                    defaultValue='yes'
                    handleOnChange={(val: string) =>
                      setFormData({ ...formData, is_canadian_resident: val })
                    }
                    style={{
                      flexDirection: isSm ? 'row' : 'column',
                      ...(isSm && {
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '10px',
                        width: '100%',
                      }),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <TextInputWithBorder
                    placeholder='Driver Licence #'
                    label=''
                    value={formData?.driver_license}
                    onChange={(text) =>
                      setFormData({ ...formData, driver_license: text })
                    }
                    borderRadius='12px'
                    size={isSm ? 'small' : 'medium'}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <TextInputWithBorder
                    placeholder='Job Occupation'
                    label=''
                    value={formData?.job_description}
                    onChange={(text) =>
                      setFormData({ ...formData, job_description: text })
                    }
                    borderRadius='12px'
                    size='small'
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <DatePickerValue
                    value={formData.driver_license_exp}
                    onDateChange={(value: dayjs.Dayjs | null) => {
                      if (value)
                        setFormData({
                          ...formData,
                          driver_license_exp: value,
                        });
                    }}
                    label='Driver Licence Expiry Date'
                    disableFuture={false}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <TextInputWithBorder
                    placeholder={`Employer's Name`}
                    label=''
                    value={formData?.employer_name}
                    onChange={(text) =>
                      setFormData({ ...formData, employer_name: text })
                    }
                    borderRadius='12px'
                    size={isSm ? 'small' : 'medium'}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <IconButton
                    disableRipple
                    aria-label='upload picture'
                    component='label'
                    sx={{
                      padding: '0',
                      width: '100%',
                      height: 'fit-content',
                      cursor: 'pointer',
                    }}
                  >
                    <Box
                      p={isSm ? '5px 15px' : '10px 20px'}
                      borderRadius={'12px'}
                      sx={{
                        border: `1px solid ${colors.greyE1} !important`,
                      }}
                      width='100%'
                      height='fit-content'
                    >
                      <Box
                        {...displayFlexAlignItemsCenterJustifyContentFlexStart}
                        gap={'15px'}
                        width='inherit'
                        p={'4px 0 5px'}
                      >
                        <NextImage
                          width={isSm ? 17 : 20}
                          height={isSm ? 17 : 20}
                          alt='icon'
                          src={
                            formData.document_id
                              ? URL.createObjectURL(formData.document_id)
                              : '/icons/camera-alt.svg'
                          }
                        />
                        <Text
                          text={
                            formData.document_id
                              ? formData.document_id.name
                              : 'Upload ID 1'
                          }
                          color={colors.grey96}
                          token={
                            isSm
                              ? tokens.FS13FW400LH18R
                              : tokens.FS16FW300LH21_86R
                          }
                          textAlign='left'
                          cursor='pointer'
                        />
                      </Box>
                    </Box>
                    <input
                      hidden
                      accept='image/*'
                      type='file'
                      data-document='document_id'
                      onChange={handleImageUpload}
                    />
                  </IconButton>
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <IconButton
                    disableRipple
                    aria-label='upload picture'
                    component='label'
                    sx={{
                      padding: '0',
                      width: '100%',
                      height: 'fit-content',
                      cursor: 'pointer',
                    }}
                  >
                    <Box
                      p={isSm ? '5px 15px' : '10px 20px'}
                      borderRadius={'12px'}
                      sx={{
                        border: `1px solid ${colors.greyE1} !important`,
                      }}
                      width='100%'
                      height='fit-content'
                    >
                      <Box
                        {...displayFlexAlignItemsCenterJustifyContentFlexStart}
                        gap={'15px'}
                        width='inherit'
                        p={'4px 0 5px'}
                      >
                        <NextImage
                          width={isSm ? 17 : 20}
                          height={isSm ? 17 : 20}
                          alt='icon'
                          src={
                            formData.document_id2
                              ? URL.createObjectURL(formData.document_id2)
                              : '/icons/camera-alt.svg'
                          }
                        />
                        <Text
                          text={
                            formData.document_id2
                              ? formData.document_id2.name
                              : 'Upload ID 2'
                          }
                          color={colors.grey96}
                          token={
                            isSm
                              ? tokens.FS13FW400LH18R
                              : tokens.FS16FW300LH21_86R
                          }
                          textAlign='left'
                          cursor='pointer'
                        />
                      </Box>
                    </Box>
                    <input
                      hidden
                      accept='image/*'
                      type='file'
                      data-document='document_id2'
                      onChange={handleImageUpload}
                    />
                  </IconButton>
                </Grid>
              </>
            </GridContainer>
          </Box>
        </Box>
        <Box marginTop={'30px'} width={'96%'}>
          <Text
            text='Mailing Address'
            color={colors.black21}
            token={isSm ? tokens.FS14FW600LH16SB : tokens.FS16FW600LH21_86SB}
            textAlign='left'
          />
          <Text
            text='Fill all the fields.'
            color={colors.grey96}
            token={isSm ? tokens.FS11FW400LH18R : tokens.FS13FW400LH18R}
            textAlign='left'
            styles={{ marginBottom: '15px' }}
          />
          <GridContainer justifyContent='flex-start' spacing={isSm ? 1.5 : 2}>
            <>
              <Grid item xs={12} md={12}>
                <TextInputWithBorder
                  placeholder='Address'
                  label=''
                  value={formData?.address}
                  onChange={(text) =>
                    setFormData({ ...formData, address: text })
                  }
                  borderRadius='12px'
                  size={isSm ? 'small' : 'medium'}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <TextInputWithBorder
                  placeholder='Suite Number'
                  label=''
                  value={formData?.suite_number}
                  onChange={(text) =>
                    setFormData({ ...formData, suite_number: text })
                  }
                  borderRadius='12px'
                  size={isSm ? 'small' : 'medium'}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <TextInputWithBorder
                  placeholder='City'
                  label=''
                  value={formData?.city}
                  onChange={(text) => setFormData({ ...formData, city: text })}
                  borderRadius='12px'
                  size={isSm ? 'small' : 'medium'}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <TextInputWithBorder
                  placeholder='Province'
                  label=''
                  value={formData?.province}
                  onChange={(text) =>
                    setFormData({ ...formData, province: text })
                  }
                  borderRadius='12px'
                  size={isSm ? 'small' : 'medium'}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <TextInputWithBorder
                  placeholder='Postal Code'
                  label=''
                  value={formData?.postal_code}
                  onChange={(text) =>
                    setFormData({ ...formData, postal_code: text })
                  }
                  borderRadius='12px'
                  size={isSm ? 'small' : 'medium'}
                />
              </Grid>
            </>
          </GridContainer>
        </Box>
      </>
    );
  };

  const renderPersonalInfo = () => {
    return (
      <>
        {renderPurchaserForm(formData, setFormData)}
        <Box
          {...displayFlexAlignItemsCenterJustifyContentFlexStart}
          gap={'15px'}
          flexWrap='wrap'
          mt={'30px'}
        >
          <Text
            text='Additional Purchase (Optional)'
            color={colors.black21}
            token={isSm ? tokens.FS14FW600LH16SB : tokens.FS16FW600LH21_86SB}
            textAlign='left'
          />
          <Button
            onClick={() => setSecondPurchasor((st) => !st)}
            text={
              secondPurchasor
                ? '-Remove Second Purchaser'
                : '+Add Second Purchaser'
            }
            justifyContent='center'
            token={tokens.FS14FW500LH19R}
            variant='black'
            borderRadius='20px'
            width={secondPurchasor ? '250px' : '200px'}
          />
        </Box>
        {secondPurchasor &&
          renderPurchaserForm(secPurchaserFormData, setSecPurchaserFormData)}
        <Box
          {...displayFlexAlignItemsCenterJustifyContentFlexStart}
          marginTop='30px'
          gap={'15px'}
        >
          <Button
            onClick={() =>
              activeStep === 1 ? handleModalClose() : handleBack()
            }
            text='Go back'
            justifyContent='center'
            token={tokens.FS14FW500LH19R}
            variant='black'
            borderRadius='8px'
            width={isSm ? '100%' : '200px'}
            style={{ padding: '15px 20px' }}
          />
          <Button
            onClick={() => handleNext()}
            text='Next'
            justifyContent='center'
            token={tokens.FS14FW500LH19R}
            variant='blue'
            disabled={isSubmitDisabled}
            borderRadius='8px'
            width={isSm ? '100%' : '200px'}
            style={{ padding: '15px 20px' }}
          />
        </Box>
      </>
    );
  };

  const submitForReview = () => {
    return (
      <>
        <Box marginTop={'35px'}>
          <GridContainer spacing={isSm ? 2 : 3}>
            <>
              <Grid item xs={12} sm={12} md={4}>
                <GridContainer spacing={1.5} justifyContent='flex-start'>
                  <>
                    <Grid item xs={12}>
                      <Text
                        text='Personal Information'
                        token={
                          isSm ? tokens.FS14FW600LH16SB : tokens.FS16FW500LH18M
                        }
                        textAlign='left'
                        color={colors.black21}
                      />
                    </Grid>
                    <Grid item xs={6} sm={4} md={6}>
                      <Text
                        text='First Name'
                        token={tokens.FS11FW400LH18R}
                        textAlign='left'
                        color={colors.grey96}
                      />
                      <Text
                        text={`${formData?.first_name}`}
                        token={
                          isSm ? tokens.FS14FW600LH16SB : tokens.FS16FW500LH18M
                        }
                        textAlign='left'
                        color={colors.black21}
                      />
                    </Grid>
                    <Grid item xs={6} sm={4} md={6}>
                      <Text
                        text='Last Name'
                        token={tokens.FS11FW400LH18R}
                        textAlign='left'
                        color={colors.grey96}
                      />
                      <Text
                        text={`${formData?.last_name}`}
                        token={
                          isSm ? tokens.FS14FW600LH16SB : tokens.FS16FW500LH18M
                        }
                        textAlign='left'
                        color={colors.black21}
                      />
                    </Grid>
                    <Grid item xs={6} sm={4} md={6}>
                      <Text
                        text='Phone No'
                        token={tokens.FS11FW400LH18R}
                        textAlign='left'
                        color={colors.grey96}
                      />
                      <Text
                        text={`${formData?.phone}`}
                        token={
                          isSm ? tokens.FS14FW600LH16SB : tokens.FS16FW500LH18M
                        }
                        textAlign='left'
                        color={colors.black21}
                        styles={{
                          wordBreak: 'break-word',
                        }}
                      />
                    </Grid>
                    <Grid item xs={6} sm={4} md={6}>
                      <Text
                        text='Email Address'
                        token={tokens.FS11FW400LH18R}
                        textAlign='left'
                        color={colors.grey96}
                        styles={{
                          wordBreak: 'break-word',
                        }}
                      />
                      <Text
                        text={`${formData?.email}`}
                        token={
                          isSm ? tokens.FS14FW600LH16SB : tokens.FS16FW500LH18M
                        }
                        textAlign='left'
                        color={colors.black21}
                      />
                    </Grid>
                    <Grid item xs={6} sm={4} md={6}>
                      <Text
                        text='DOB'
                        token={tokens.FS11FW400LH18R}
                        textAlign='left'
                        color={colors.grey96}
                      />
                      <Text
                        text={`${formData?.date_of_birth.format('YYYY-MM-DD')}`}
                        token={
                          isSm ? tokens.FS14FW600LH16SB : tokens.FS16FW500LH18M
                        }
                        textAlign='left'
                        color={colors.black21}
                      />
                    </Grid>
                  </>
                </GridContainer>
                <Box marginTop={'30px'}>
                  <GridContainer spacing={1.5} justifyContent='flex-start'>
                    <>
                      <Grid item xs={12}>
                        <Text
                          text='Mailing Address'
                          token={
                            isSm
                              ? tokens.FS14FW600LH16SB
                              : tokens.FS16FW500LH18M
                          }
                          textAlign='left'
                          color={colors.black21}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} md={12}>
                        <Text
                          text='Address'
                          token={tokens.FS11FW400LH18R}
                          textAlign='left'
                          color={colors.grey96}
                        />
                        <Text
                          text={`${formData?.address}`}
                          token={
                            isSm
                              ? tokens.FS14FW600LH16SB
                              : tokens.FS16FW500LH18M
                          }
                          textAlign='left'
                          color={colors.black21}
                        />
                      </Grid>
                      <Grid item xs={6} sm={3} md={6}>
                        <Text
                          text='Suit Number'
                          token={tokens.FS11FW400LH18R}
                          textAlign='left'
                          color={colors.grey96}
                        />
                        <Text
                          text={`${formData?.suite_number}`}
                          token={
                            isSm
                              ? tokens.FS14FW600LH16SB
                              : tokens.FS16FW500LH18M
                          }
                          textAlign='left'
                          color={colors.black21}
                        />
                      </Grid>
                      <Grid item xs={6} sm={3} md={6}>
                        <Text
                          text='City'
                          token={tokens.FS11FW400LH18R}
                          textAlign='left'
                          color={colors.grey96}
                        />
                        <Text
                          text={`${formData?.city}`}
                          token={
                            isSm
                              ? tokens.FS14FW600LH16SB
                              : tokens.FS16FW500LH18M
                          }
                          textAlign='left'
                          color={colors.black21}
                        />
                      </Grid>
                      <Grid item xs={6} sm={3} md={6}>
                        <Text
                          text='Province'
                          token={tokens.FS11FW400LH18R}
                          textAlign='left'
                          color={colors.grey96}
                        />
                        <Text
                          text={`${formData?.province}`}
                          token={
                            isSm
                              ? tokens.FS14FW600LH16SB
                              : tokens.FS16FW500LH18M
                          }
                          textAlign='left'
                          color={colors.black21}
                        />
                      </Grid>
                      <Grid item xs={6} sm={3} md={6}>
                        <Text
                          text='Postal Code'
                          token={tokens.FS11FW400LH18R}
                          textAlign='left'
                          color={colors.grey96}
                        />
                        <Text
                          text={`${formData?.postal_code}`}
                          token={
                            isSm
                              ? tokens.FS14FW600LH16SB
                              : tokens.FS16FW500LH18M
                          }
                          textAlign='left'
                          color={colors.black21}
                        />
                      </Grid>
                    </>
                  </GridContainer>
                </Box>
              </Grid>
              <Grid item xs={12} md={0.25}>
                {isMD ? (
                  <MuiDivider
                    sx={{
                      width: '100%',
                      borderStyle: 'dashed',
                    }}
                  />
                ) : (
                  <Box
                    {...displayFlexAlignItemsCenterJustifyContentCenter}
                    height={'100%'}
                  >
                    <VerticalDivider
                      height={'100%'}
                      color={colors.greyE1}
                      type='dashed'
                    />
                  </Box>
                )}
              </Grid>
              <Grid
                item
                xs={12}
                sm={5.7}
                md={3.75}
                sx={{
                  '& > *': {
                    marginTop: '0',
                  },
                }}
              >
                {depositStructure()}
              </Grid>
              <Grid item xs={12} sm={0.5} md={0.25}>
                {isSm ? (
                  <MuiDivider
                    sx={{
                      width: '100%',
                      borderStyle: 'dashed',
                    }}
                  />
                ) : (
                  <Box
                    {...displayFlexAlignItemsCenterJustifyContentCenter}
                    height={'100%'}
                  >
                    <VerticalDivider
                      height={'100%'}
                      color={colors.greyE1}
                      type='dashed'
                    />
                  </Box>
                )}
              </Grid>
              <Grid item xs={12} sm={5.7} md={3.5}>
                {renderReservationInfo(false)}
              </Grid>
            </>
          </GridContainer>
        </Box>

        <Box
          marginTop='30px'
          {...displayFlexAlignItemsCenterJustifyContentFlexStart}
          gap={'15px'}
        >
          <Button
            onClick={() =>
              activeStep === 1 ? handleModalClose() : handleBack()
            }
            text='Go back'
            justifyContent='center'
            token={tokens.FS14FW500LH19R}
            variant='black'
            borderRadius='8px'
            width='200px'
            style={{ padding: '15px 20px' }}
          />
          <Button
            onClick={() => handleModalClose(true)}
            text='Submit'
            justifyContent='center'
            token={tokens.FS14FW500LH19R}
            variant='blue'
            borderRadius='8px'
            disabled={isSubmitDisabled}
            width='200px'
            style={{ padding: '15px 20px' }}
            isLoading={loading}
          />
          <Text
            text={error}
            color={colors.red00}
            token={tokens.FS16FW600LH21_86SB}
            textAlign='left'
          />
        </Box>
      </>
    );
  };

  const depositStructure = () => {
    return (
      <DepositStructure deposit={condo?.property_details?.deposit_structure} />
    );
  };

  const renderReservationInfo = (showDepositStructure: boolean = true) => {
    return (
      <>
        <Box {...displayFlexAlignItemsCenterJustifyContentSpaceBetween}>
          <Box>
            <Text
              text={`${selectedFloor?.name}`}
              color={colors.black21}
              token={tokens.FS16FW600LH21_86SB}
              textAlign='left'
            />
            <Text
              text={`${condo?.property_details?.project_development_name}`}
              color={colors.grey96}
              token={tokens.FS14FW400LH19R}
              textAlign='left'
            />
            <Text
              text={`${condo?.property_details?.address}`}
              color={colors.grey96}
              token={tokens.FS14FW400LH19R}
              textAlign='left'
            />
          </Box>
          <Image
            width='46px'
            height='46px'
            alt='property'
            src={
              selectedFloor?.image
                ? selectedFloor?.image
                : '/images/property-placeholder.png'
            }
            style={{
              borderRadius: '8px',
              overflow: 'hidden',
            }}
          />
        </Box>
        <Box
          {...displayFlexAlignItemsCenterJustifyContentSpaceBetween}
          marginTop={'20px'}
          width={'80%'}
          marginBottom={'20px'}
        >
          <Image width='18px' height='100%' alt='bed' src='/icons/bed.svg' />
          <Text
            text={selectedFloor?.number_of_bedrooms?.toString() || '-'}
            token={tokens.FS14FW400LH19R}
            color={colors.black21}
          />
          <VerticalDivider color={colors.grey9C} height={'15px'} />
          <Image
            width='14px'
            height='100%'
            alt='shower'
            src='/icons/shower.svg'
          />
          <Text
            text={selectedFloor?.number_of_bathrooms?.toString() || '-'}
            token={tokens.FS14FW400LH19R}
            color={colors.black21}
          />
          <VerticalDivider color={colors.grey9C} height={'15px'} />
          <Image
            width='14px'
            height='100%'
            alt='area-Borders'
            src='/icons/area-Borders.svg'
          />
          <Text
            text={selectedFloor ? `${selectedFloor?.interior_size} sq ft` : '-'}
            token={tokens.FS14FW400LH19R}
            color={colors.black21}
          />
        </Box>
        <MuiDivider color={colors.greyE1} />
        <Box
          {...displayFlexAlignItemsCenterJustifyContentSpaceBetween}
          marginTop={isSm ? '10px' : '20px'}
        >
          <Text
            text='Unit Price'
            token={tokens.FS14FW500LH19R}
            color={colors.black21}
          />
          <Text
            text={
              selectedFloor
                ? `${convertCurrency(selectedFloor?.price, true, `$0`)}`
                : '-'
            }
            token={tokens.FS16FW600LH21_86SB}
            color={colors.black21}
            textAlign='right'
          />
        </Box>
        <Box
          {...displayFlexAlignItemsCenterJustifyContentSpaceBetween}
          marginTop={isSm ? '7px' : '10px'}
        >
          <Text
            text='Parking'
            token={tokens.FS14FW500LH19R}
            color={colors.black21}
          />
          <Text
            text={
              addParkingSelection !== 0
                ? '$0'
                : convertCurrency(
                    condo?.property_details?.parking_cost,
                    true,
                    `$0`
                  )
            }
            token={tokens.FS16FW600LH21_86SB}
            color={colors.black21}
            textAlign='right'
          />
        </Box>
        <Box
          {...displayFlexAlignItemsCenterJustifyContentSpaceBetween}
          mt={isSm ? '7px' : '10px'}
          marginBottom={'15px'}
        >
          <Text
            text='Locker'
            token={tokens.FS14FW500LH19R}
            color={colors.black21}
          />
          <Text
            text={
              addLockerReservationSelection !== 0
                ? '$0'
                : convertCurrency(
                    condo?.property_details?.locker_cost,
                    true,
                    `$0`
                  )
            }
            token={tokens.FS16FW600LH21_86SB}
            color={colors.black21}
            textAlign='right'
          />
        </Box>
        <MuiDivider
          color={colors.greyE1}
          sx={{ marginBlock: isSm ? '7px' : '15px' }}
        />
        <Box
          {...displayFlexAlignItemsCenterJustifyContentSpaceBetween}
          marginTop={'10px'}
          marginBottom={'15px'}
        >
          <Text
            text='Total Price'
            token={tokens.FS14FW500LH19R}
            color={colors.black21}
          />
          <Text
            text={`${convertCurrency(totalPrice, true, `$0`)}`}
            token={tokens.FS16FW600LH21_86SB}
            color={colors.blueC2}
            textAlign='right'
          />
        </Box>
        <MuiDivider color={colors.greyE1} style={{ marginBottom: '15px' }} />
        {showDepositStructure && depositStructure()}
        <Text
          token={tokens.FS14FW400LH19R}
          color={colors.black21}
          textAlign='left'
          styles={{ marginTop: isSm ? '10px' : '20px' }}
          text='This purchase price is an estimate and may vary based on additional premiums and availability. Final price and confirmation of availability will be verified by your TalkCondo representative before final purchase.'
        />
      </>
    );
  };

  return (
    <DialogWrapper
      open={isOpen}
      fullWidth={!isSm}
      fullScreen={isSm}
      maxWidth='lg'
      onClose={() => handleModalClose()}
      sx={{
        '& .MuiDialog-paper': {
          borderRadius: isSm ? 0 : '20px',
        },
      }}
    >
      <DialogTitle
        sx={{
          padding: { xs: '11px 19px', sm: '20px', lg: '27px 43px' },
          ...displayFlexAlignItemsCenterJustifyContentSpaceBetween,
        }}
      >
        <Text
          text='Condo Floor Reservation'
          color={colors.black21}
          token={isSm ? tokens.FS16FW600LH21_86SB : tokens.FS24FW600LH32_78SB}
          textAlign='left'
        />
        <DialogCloseButton toggleClose={() => handleModalClose()} />
      </DialogTitle>
      <MuiDivider color={colors.greyE1} />
      <DialogContent
        sx={{
          paddingInline: { xs: '19px', sm: '20px', lg: '43px' },
          paddingBlock: '0px',
        }}
      >
        <GridContainer>
          <>
            <Grid
              item
              xs={isMD || activeStep === 3 ? 12 : 8.25}
              sx={{
                paddingBlock: { xs: '11px', sm: '20px', lg: '27px' },
              }}
            >
              {isSm ? (
                <StepperMobile
                  activeStep={activeStep}
                  steps={steps1}
                  handleMenuItemClick={(stepNo: number) =>
                    stepNo === 0 ? handleModalClose() : setActiveStep(stepNo)
                  }
                />
              ) : (
                <Stepper activeStep={activeStep}>
                  {steps1.map((el) => (
                    <Step key={el.label}>
                      <StepLabel>{el.label}</StepLabel>
                    </Step>
                  ))}
                </Stepper>
              )}
              {activeStep === 1 && renderFloorRangesAndParking()}
              {activeStep === 2 && renderPersonalInfo()}
              {activeStep === 3 && submitForReview()}
            </Grid>
            <Grid
              item
              xs={activeStep === 3 || isMD ? 0 : 0.5}
              sx={{
                display: {
                  xs: 'none',
                  md: activeStep === 3 ? 'none ' : 'block',
                },
              }}
            >
              <Box
                {...displayFlexAlignItemsCenterJustifyContentCenter}
                height={'100%'}
              >
                <VerticalDivider height={'100%'} color={colors.greyE1} />
              </Box>
            </Grid>
            <Grid
              item
              xs={isMD || activeStep === 3 ? 0 : 3.25}
              sx={{
                display: {
                  xs: 'none',
                  md: activeStep === 3 ? 'none ' : 'block',
                },
                paddingBlock: { xs: '11px', sm: '20px', lg: '27px' },
              }}
            >
              {renderReservationInfo()}
            </Grid>
          </>
        </GridContainer>
      </DialogContent>
    </DialogWrapper>
  );
}
