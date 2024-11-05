import { GridContainer, Text, TextInputWithBorder } from '@/components';
import Button from '@/components/Button/Button';
import DialogWrapper from '@/components/Dialog/Dialog';
import DialogCloseButton from '@/components/DialogCloseButton/DialogCloseButton';
import Select from '@/components/Select/Select';
import { errorCallback } from '@/config';
import { AppToastContext } from '@/context/Toast/ToastContext';
import { ToastContextInterface } from '@/context/Toast/ToastInterface';
import { createFloorReservation, submitEvaluationForm } from '@/services/api';
import {
  colors,
  displayFlexAlignItemsCenterJustifyContentFlexStart,
  displayFlexAlignItemsCenterJustifyContentSpaceBetween,
  tokens,
} from '@/styles';
import { PropertyType } from '@/types/common/THomePage';
import { IEvaluationForm } from '@/types/common/evaluationRequest';
import {
  Box,
  DialogContent,
  DialogTitle,
  Grid,
  Divider as MuiDivider,
  Snackbar,
  useMediaQuery,
} from '@mui/material';
import { useFormik } from 'formik';
import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import CitiesSearchableDropdown from '../ComingSoon/CitiesSearchableDropdown';

interface EvaluationDialogProps {
  isOpen: boolean;
  cities?: any;
  handleClose: () => void;
}

export default function EvaluationDialog({
  isOpen,
  handleClose,
  cities,
}: EvaluationDialogProps) {
  const isSm = useMediaQuery((theme: any) => theme.breakpoints.down('sm'));
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const { t } = useTranslation();

  let appToast = useContext<ToastContextInterface>(AppToastContext);
  const ToastLikeConfig: any = {
    type: 'success',
    duration: 1000,
  };

  let purchaserInitial = {
    first_name: '',
    last_name: '',
    phone: '',
    email: '',
    address: '',
    property_size: '',
    property_type: PropertyType.CONDO,
    city: '',
    zipcode: '',
  };

  const formik = useFormik<IEvaluationForm>({
    initialValues: {
      first_name: '',
      last_name: '',
      phone: '',
      email: '',
      address: '',
      property_size: '700-1100',
      property_type: PropertyType.CONDO,
      city: '',
      zipcode: '',
      unit_number: '',
    },
    validationSchema: Yup.object({
      first_name: Yup.string().required('First Name is required!'),
      last_name: Yup.string().required('Last Name is required!'),
      email: Yup.string()
        .strict(true)
        .email('Invalid Email Address!')
        .required('Email Address is required!'),
      phone: Yup.string()
        .matches(/^\d{11}$/, 'Phone number must be exactly 11 digits')
        .required('Phone is required!'),
      address: Yup.string().required('Address is required!'),
      city: Yup.string().required('City is required!'),
      zipcode: Yup.string().required('Postal Code is required!'),
      property_size: Yup.string().required('Property Size is required!'),
      property_type: Yup.string().required('Property Type is required!'),
      unit_number: Yup.string().when(
        'property_type',
        (property_type: any, schema) => {
          if (property_type === PropertyType.CONDO) return schema;
          else return schema.required('Enter Unit Number');
        }
      ),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      try {
        await submitEvaluationForm(values);
        appToast.setToast('Request submitted successfully ', {
          ...ToastLikeConfig,
        });
        handleClose();
      } catch (err) {
        appToast.setToast(errorCallback(err), {
          ...ToastLikeConfig,
          type: 'fail',
        });
      } finally {
        setLoading(false);
      }
    },
  });

  const [formData, setFormData] = useState<any>(purchaserInitial);
  const [secPurchaserFormData] = useState<any>(purchaserInitial);
  const [error, setError] = useState<any>('');
  const [isSubmitDisabled, setSubmitDisabled] = useState<boolean>(true);
  const handleModalClose = async (finalStep = false) => {
    if (finalStep) {
      try {
        const data = new FormData();
        for (const [key, value] of Object.entries(formData)) {
          data.append(key, value as any);
        }
        await createFloorReservation(data)
          .then((res) => {
            if (res?.first_name) {
              setSnackBarOpen(false);
              handleClose();
              setFormData(purchaserInitial);
            } else
              setError(
                'Failed to create floor reservation. Check your data and try again.'
              );
          })
          .catch(() => {
            setError(
              'Failed to create floor reservation. Check your data and try again.'
            );
          });
      } catch (e) {}
    } else handleClose();
  };

  const handleSnackBarClose = (event: any, reason: any) => {
    if (reason === 'clickaway') return;
    setSnackBarOpen(false);
  };

  useEffect(() => {
    setError('');
    let isAnyEmpty = false;
    Object.keys(formData).forEach((key) => {
      if (!formData[key] || formData[key] === '') isAnyEmpty = true;
    });
    if (isAnyEmpty) setSubmitDisabled(true);
    else setSubmitDisabled(false);
  }, [formData, secPurchaserFormData]);

  const renderPersonalInfo = () => {
    return (
      <form
        id='evaluation-form'
        autoComplete='off'
        onSubmit={formik.handleSubmit}
      >
        <Box mt='30px' width={'100%'}>
          <GridContainer justifyContent='flex-start' spacing={2}>
            <>
              <Grid item xs={12} sm={6} md={6}>
                <TextInputWithBorder
                  inputStyleToken={{ fontSize: '14px' }}
                  styles={{
                    borderRadius: '10px',
                    padding: '3px 15px 3px',
                  }}
                  placeholder={t('First Name')}
                  label={t('First Name')}
                  value={formik.values.first_name}
                  onChange={(val) => formik.setFieldValue('first_name', val)}
                  borderRadius='12px'
                />
                {formik.touched.first_name && formik.errors.first_name && (
                  <Text
                    text={formik.errors.first_name}
                    token={tokens.FS12FW400LH18R}
                    color={colors.red00}
                    textAlign='left'
                  />
                )}
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <TextInputWithBorder
                  inputStyleToken={{ fontSize: '14px' }}
                  styles={{
                    borderRadius: '10px',
                    padding: '3px 15px 3px',
                  }}
                  placeholder={t('Last Name')}
                  label={t('Last Name')}
                  value={formik.values.last_name}
                  onChange={(val) => formik.setFieldValue('last_name', val)}
                  borderRadius='12px'
                />
                {formik.touched.last_name && formik.errors.last_name && (
                  <Text
                    text={formik.errors.last_name}
                    token={tokens.FS12FW400LH18R}
                    color={colors.red00}
                    textAlign='left'
                  />
                )}
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <TextInputWithBorder
                  inputStyleToken={{ fontSize: '14px' }}
                  styles={{
                    borderRadius: '10px',
                    padding: '3px 15px 3px',
                  }}
                  placeholder={t('Phone No')}
                  label={t('Phone No')}
                  value={formik.values.phone}
                  onChange={(val) => formik.setFieldValue('phone', val)}
                  borderRadius='12px'
                />
                {formik.touched.phone && formik.errors.phone && (
                  <Text
                    text={formik.errors.phone}
                    token={tokens.FS12FW400LH18R}
                    color={colors.red00}
                    textAlign='left'
                  />
                )}
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <TextInputWithBorder
                  inputStyleToken={{ fontSize: '14px' }}
                  styles={{
                    borderRadius: '10px',
                    padding: '3px 15px 3px',
                  }}
                  placeholder={t('Email Address')}
                  label={t('Email')}
                  value={formik.values.email}
                  onChange={(val) => formik.setFieldValue('email', val)}
                  borderRadius='12px'
                />
                {formik.touched.email && formik.errors.email && (
                  <Text
                    text={formik.errors.email}
                    token={tokens.FS12FW400LH18R}
                    color={colors.red00}
                    textAlign='left'
                  />
                )}
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <TextInputWithBorder
                  inputStyleToken={{ fontSize: '14px' }}
                  styles={{
                    borderRadius: '10px',
                    padding: '3px 15px 3px',
                  }}
                  placeholder={t('Address')}
                  label={t('Address')}
                  value={formik.values.address}
                  onChange={(val) => formik.setFieldValue('address', val)}
                  borderRadius='12px'
                />
                {formik.touched.address && formik.errors.address && (
                  <Text
                    text={formik.errors.address}
                    token={tokens.FS12FW400LH18R}
                    color={colors.red00}
                    textAlign='left'
                  />
                )}
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <Box marginBottom={'7px'}>
                  <Text
                    text={t('City')}
                    token={tokens.FS14FW600LH16SB}
                    color={colors.black21}
                    textAlign='left'
                  />
                </Box>
                <CitiesSearchableDropdown
                  cities={cities}
                  onSearch={(query: string) =>
                    formik.setFieldValue('city', query)
                  }
                  onResetSearch={() => formik.setFieldValue('city', '')}
                  backGroundColor='#fff'
                  width='100%'
                  height='38px'
                  placeholder='City'
                  borderRadius='10px'
                />
                {formik.touched.city && formik.errors.city && (
                  <Text
                    text={formik.errors.city}
                    token={tokens.FS12FW400LH18R}
                    color={colors.red00}
                    textAlign='left'
                  />
                )}
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <TextInputWithBorder
                  inputStyleToken={{ fontSize: '14px' }}
                  styles={{
                    borderRadius: '10px',
                    padding: '3px 15px 3px',
                  }}
                  placeholder={t('Postal Code')}
                  label={t('Postal Code')}
                  value={formik.values.zipcode}
                  onChange={(val) => formik.setFieldValue('zipcode', val)}
                  borderRadius='12px'
                />
                {formik.touched.zipcode && formik.errors.zipcode && (
                  <Text
                    text={formik.errors.zipcode}
                    token={tokens.FS12FW400LH18R}
                    color={colors.red00}
                    textAlign='left'
                  />
                )}
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <Box marginBottom={'7px'}>
                  <Text
                    text={t('Property Type')}
                    token={tokens.FS14FW600LH16SB}
                    color={colors.black21}
                    textAlign='left'
                  />
                </Box>
                <Select
                  label=''
                  selectedId={
                    property_types.findIndex(
                      (el) => el.value === formik.values.property_type
                    ) || 0
                  }
                  onChange={(e) => formik.setFieldValue('property_type', e)}
                  options={property_types}
                  style={{
                    width: '100%',
                  }}
                  innerStyles={{
                    padding: '2.5px 12px 2.5px 4px',
                  }}
                />
                {formik.touched.property_type &&
                  formik.errors.property_type && (
                    <Text
                      text={formik.errors.property_type}
                      token={tokens.FS12FW400LH18R}
                      color={colors.red00}
                      textAlign='left'
                    />
                  )}
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <Box marginBottom={'10px'}>
                  <Text
                    text={t('Property Size')}
                    token={tokens.FS14FW600LH16SB}
                    color={colors.black21}
                    textAlign='left'
                  />
                </Box>
                <Select
                  label=''
                  selectedId={
                    property_sizes.findIndex(
                      (el) => el.value === formik.values.property_size
                    ) || 0
                  }
                  onChange={(e) => formik.setFieldValue('property_size', e)}
                  options={property_sizes}
                  style={{
                    width: '100%',
                  }}
                  innerStyles={{
                    padding: '2.5px 12px 2.5px 4px',
                  }}
                />
                {formik.touched.property_size &&
                  formik.errors.property_size && (
                    <Text
                      text={formik.errors.property_size}
                      token={tokens.FS12FW400LH18R}
                      color={colors.red00}
                      textAlign='left'
                    />
                  )}
              </Grid>
              {formik.values.property_type === PropertyType.CONDO && (
                <Grid item xs={12} sm={6} md={6}>
                  <TextInputWithBorder
                    inputStyleToken={{ fontSize: '14px' }}
                    styles={{
                      borderRadius: '10px',
                      padding: '3px 15px 3px',
                    }}
                    placeholder={t('Unit Number')}
                    label={t('Unit Number')}
                    value={formik.values.unit_number}
                    onChange={(val) => formik.setFieldValue('unit_number', val)}
                    borderRadius='12px'
                  />
                  {formik.touched.unit_number && formik.errors.unit_number && (
                    <Text
                      text={formik.errors.unit_number}
                      token={tokens.FS12FW400LH18R}
                      color={colors.red00}
                      textAlign='left'
                    />
                  )}
                </Grid>
              )}
            </>
          </GridContainer>
        </Box>
        <Box mt={'20px'}>
          <Box
            mt='10px'
            {...displayFlexAlignItemsCenterJustifyContentFlexStart}
            gap={'15px'}
            justifyContent={'flex-end'}
          >
            <Button
              token={tokens.FS14FW500LH19R}
              variant={'blue'}
              text={t('Submit')}
              form='evaluation-form'
              type='submit'
              isLoading={loading}
              onClick={() => {}}
              justifyContent='center'
              borderRadius='8px'
              width={isSm ? '100%' : '200px'}
              style={{ padding: '15px 20px' }}
            />
          </Box>
        </Box>
      </form>
    );
  };
  return (
    <DialogWrapper
      open={isOpen}
      fullWidth
      onClose={() => handleModalClose()}
      sx={{
        '& .MuiDialog-paper': {
          maxWidth: '600px',
        },
      }}
    >
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
      <DialogTitle
        sx={{
          padding: { xs: '11px 19px', sm: '20px 25px', lg: '20px 25px' },
          ...displayFlexAlignItemsCenterJustifyContentSpaceBetween,
        }}
      >
        <Text
          text={t('Get your free online home evaluation')}
          color={colors.black21}
          token={isSm ? tokens.FS16FW600LH21_86SB : tokens.FS24FW400LH32_78R}
          textAlign='left'
        />
        <DialogCloseButton toggleClose={() => handleModalClose()} />
      </DialogTitle>
      <MuiDivider color={colors.greyE1} />
      <DialogContent
        sx={{
          paddingInline: { xs: '19px', sm: '20px', lg: '43px' },
          paddingY: '0px',
        }}
      >
        <GridContainer>
          <Grid
            item
            xs={12}
            sx={{
              paddingBottom: '1rem',
            }}
          >
            {renderPersonalInfo()}
          </Grid>
        </GridContainer>
      </DialogContent>
    </DialogWrapper>
  );
}

const property_types = [
  {
    id: 0,
    label: 'Condo',
    value: 'condo',
  },
  {
    id: 1,
    label: 'House',
    value: 'house',
  },
];

const property_sizes = [
  {
    id: 0,
    label: '<700 sqft',
    value: '1-700',
  },
  {
    id: 0,
    label: '700-1100 sqft',
    value: '700-1100',
  },
  {
    id: 1,
    label: '1100-1500 sqft',
    value: '1100-1500',
  },
  {
    id: 2,
    label: '1500-2000 sqft',
    value: '1500-2000',
  },
  {
    id: 3,
    label: '2000-2500 sqft',
    value: '2000-2500',
  },
  {
    id: 4,
    label: '2500-3000 sqft',
    value: '2500-3000',
  },
  {
    id: 5,
    label: '3000-3500 sqft',
    value: '3000-3500',
  },
  {
    id: 6,
    label: '3500-5000 sqft',
    value: '3500-5000',
  },
  {
    id: 7,
    label: '5000+ sqft',
    value: '5000+',
  },
];
