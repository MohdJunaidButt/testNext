import { GridContainer, Text, TextInputWithBorder } from '@/components';
import Button from '@/components/Button/Button';
import Select from '@/components/Select/Select';
import { AppToastContext } from '@/context/Toast/ToastContext';
import { ToastContextInterface } from '@/context/Toast/ToastInterface';
import { agentRequest } from '@/services/api';
import { colors, tokens } from '@/styles';
import { IAgentRequest } from '@/types/common/agentRequest';
import { Box, Grid, ListItemButton, Stack } from '@mui/material';
import { useFormik } from 'formik';
import Image from 'next/image';
import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';

const userInterests = [
  {
    label: 'What are you interested in?',
    value: 'What are you interested in?',
    id: 1,
    disabled: true,
  },
  {
    label: 'Sales Opportunities',
    value: 'Sales Opportunities',
    id: 2,
  },
  {
    label: 'Career Launch Program',
    value: 'Career Launch Program',
    id: 3,
  },
  {
    label: 'Corporate Opportunities',
    value: 'Corporate Opportunities',
    id: 4,
  },
];

interface IAgentFormData extends IAgentRequest {
  attachment: File | null;
}

const AgentForm = () => {
  const { t } = useTranslation();

  let appToast = useContext<ToastContextInterface>(AppToastContext);
  const ToastLikeConfig: any = {
    type: 'success',
    duration: 1000,
  };

  const [loading, setLoading] = useState(false);

  const formik = useFormik<IAgentFormData>({
    initialValues: {
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      interests: '',
      languages: '',
      linkedin: '',
      website: '',
      about: '',
      why_work_with_us: '',
      strengths: '',
      resume: '',
      attachment: null,
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
      languages: Yup.string().required('Languages is required!'),
      interests: Yup.string().required('Interest is required!'),
      linkedin: Yup.string()
        .url('Invalid URL')
        .required('Linkedin Profile is required!'),
      website: Yup.string().url('Invalid URL').required('Website is required!'),
      about: Yup.string().required('About yourself is required!').min(20),
      why_work_with_us: Yup.string()
        .required('Why work with us is required!')
        .min(20),
      strengths: Yup.string().required('Strengths required!').min(20),
      attachment: Yup.mixed()
        .required('Resume is required')
        .test('fileSize', 'File size is too large', (value: any) => {
          if (!value) return true;
          return value.size <= 1024 * 1024 * 100;
        }),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      let formData = new FormData();

      formData.append('first_name', values.first_name);
      formData.append('last_name', values.last_name);
      formData.append('email', values.email);
      formData.append('phone', values.phone);
      formData.append('interests', values.interests);
      formData.append('languages', values.languages);
      formData.append('linkedin', values.linkedin);
      formData.append('website', values.website);
      formData.append('about', values.about);
      formData.append('why_work_with_us', values.why_work_with_us);
      formData.append('strengths', values.strengths);
      formData.append('resume', values.attachment!);

      try {
        await agentRequest(formData);
        appToast.setToast('Request sent successfully', {
          ...ToastLikeConfig,
        });
        formik.resetForm();
      } catch (er: any) {
        appToast.setToast(
          er?.response?.data?.message || er?.message || 'Something went wrong',
          {
            ...ToastLikeConfig,
            type: 'error',
          }
        );
      } finally {
        setLoading(false);
      }
    },
  });

  const handleFileUpload = (e: any) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) formik.setFieldValue('attachment', selectedFile);
  };

  return (
    <form id='agent-form' autoComplete='off' onSubmit={formik.handleSubmit}>
      <GridContainer
        alignItems='stretch'
        styles={{
          maxWidth: '850px',
          mx: 'auto',
          padding: { xs: '20px', sm: '30px' },
          columnGap: '20px',
          rowGap: '20px',
        }}
      >
        <>
          <Grid item xs={12} sm={5.75}>
            <TextInputWithBorder
              label=''
              placeholder={t('First Name')}
              onChange={(val) => formik.setFieldValue('first_name', val)}
              borderRadius='10px'
              required={true}
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
          <Grid item xs={12} sm={5.75}>
            <TextInputWithBorder
              label=''
              placeholder={t('Last Name')}
              onChange={(val) => formik.setFieldValue('last_name', val)}
              borderRadius='10px'
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
          <Grid item xs={12} sm={5.75}>
            <TextInputWithBorder
              label=''
              placeholder={t('Email')}
              type={'email'}
              onChange={(val) => formik.setFieldValue('email', val)}
              borderRadius='10px'
              required={true}
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
          <Grid item xs={12} sm={5.75}>
            <TextInputWithBorder
              label=''
              placeholder={t('Phone No')}
              onChange={(val) => formik.setFieldValue('phone', val)}
              borderRadius='10px'
              required={true}
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
          <Grid item xs={12} sm={5.75}>
            <Select
              label=''
              options={userInterests}
              selectedId={
                userInterests?.filter(
                  (el: any) => el.value === formik.values.interests
                )?.[0]?.id || 1
              }
              placeholder={t('What are you interested in?')}
              style={{
                width: '100%',
                '& .MuiOutlinedInput-input': { paddingBlock: '15.5px' },
              }}
              size={'medium'}
              onChange={(val) => formik.setFieldValue('interests', val)}
            />
            {formik.touched.interests && formik.errors.interests && (
              <Text
                text={formik.errors.interests}
                token={tokens.FS12FW400LH18R}
                color={colors.red00}
                textAlign='left'
              />
            )}
          </Grid>
          <Grid item xs={12} sm={5.75}>
            <TextInputWithBorder
              label=''
              placeholder={t('Languages')}
              onChange={(val) => formik.setFieldValue('languages', val)}
              borderRadius='10px'
              required={true}
            />
            {formik.touched.languages && formik.errors.languages && (
              <Text
                text={formik.errors.languages}
                token={tokens.FS12FW400LH18R}
                color={colors.red00}
                textAlign='left'
              />
            )}
          </Grid>
          <Grid item xs={12} sm={5.75}>
            <TextInputWithBorder
              label=''
              placeholder={t('Linkedin Profile')}
              onChange={(val) => formik.setFieldValue('linkedin', val)}
              borderRadius='10px'
            />
            {formik.touched.linkedin && formik.errors.linkedin && (
              <Text
                text={formik.errors.linkedin}
                token={tokens.FS12FW400LH18R}
                color={colors.red00}
                textAlign='left'
              />
            )}
          </Grid>
          <Grid item xs={12} sm={5.75}>
            <TextInputWithBorder
              label=''
              placeholder={t('Website')}
              onChange={(val) => formik.setFieldValue('website', val)}
              borderRadius='10px'
            />
            {formik.touched.website && formik.errors.website && (
              <Text
                text={formik.errors.website}
                token={tokens.FS12FW400LH18R}
                color={colors.red00}
                textAlign='left'
              />
            )}
          </Grid>
          <Grid item xs={12} sm={5.75}>
            <TextInputWithBorder
              label=''
              placeholder={t('Tell us about yourself')}
              onChange={(val) => formik.setFieldValue('about', val)}
              borderRadius='10px'
              multiline={true}
              rows={5}
            />
            {formik.touched.about && formik.errors.about && (
              <Text
                text={formik.errors.about}
                token={tokens.FS12FW400LH18R}
                color={colors.red00}
                textAlign='left'
              />
            )}
          </Grid>
          <Grid item xs={12} sm={5.75}>
            <TextInputWithBorder
              label=''
              placeholder={t('Why do you want to work at UbRealty?')}
              onChange={(val) => formik.setFieldValue('why_work_with_us', val)}
              borderRadius='10px'
              multiline={true}
              rows={5}
            />
            {formik.touched.why_work_with_us &&
              formik.errors.why_work_with_us && (
                <Text
                  text={formik.errors.why_work_with_us}
                  token={tokens.FS12FW400LH18R}
                  color={colors.red00}
                  textAlign='left'
                />
              )}
          </Grid>
          <Grid item xs={12} sm={5.75}>
            <TextInputWithBorder
              label=''
              placeholder={t('What are your strengths write briefly?')}
              onChange={(val) => formik.setFieldValue('strengths', val)}
              borderRadius='10px'
              multiline={true}
              rows={5}
            />
            {formik.touched.strengths && formik.errors.strengths && (
              <Text
                text={formik.errors.strengths}
                token={tokens.FS12FW400LH18R}
                color={colors.red00}
                textAlign='left'
              />
            )}
          </Grid>
          <Grid item xs={12} sm={5.75}>
            <Stack height={'100%'} spacing={1} justifyContent={'flex-end'}>
              <Box p={'7px'} borderRadius={'10px'}>
                {formik.values.attachment && (
                  <Stack spacing={0.5} alignItems={'center'}>
                    <Image
                      src='/icons/file.svg'
                      alt='upload'
                      width={32}
                      height={32}
                      sizes={'100%'}
                      loading='lazy'
                      placeholder='blur'
                      blurDataURL={'/icons/file.svg'}
                    />
                    <Text
                      text={formik.values.attachment.name}
                      token={tokens.FS14FW400LH19R}
                      color={colors.grey63}
                    />
                  </Stack>
                )}
              </Box>

              <Box>
                <ListItemButton
                  sx={{
                    borderRadius: '10px',
                    '&, &:hover, &:focus': {
                      backgroundColor: colors.greyF6,
                    },
                    border: `1px solid ${
                      formik.touched.attachment && formik.errors.attachment
                        ? colors.red00
                        : colors.greyF6
                    }`,
                    justifyContent: 'center',
                    height: '55px',
                  }}
                  component='label'
                >
                  <Image
                    src='/icons/upload.svg'
                    alt='upload'
                    width={18}
                    height={18}
                    sizes={'100%'}
                    style={{ marginRight: '13px' }}
                    loading='lazy'
                    placeholder='blur'
                    blurDataURL={'/icons/upload.svg'}
                  />
                  <Text
                    text={
                      formik.values.attachment
                        ? t('Upload New Resume')
                        : t('Upload Your Resume')
                    }
                    token={tokens.FS16FW600LH21_86R}
                    color={colors.black21}
                    textAlign='left'
                  />
                  <input
                    hidden
                    accept='*'
                    type='file'
                    onChange={handleFileUpload}
                    onClick={(event) => {
                      event.stopPropagation();
                    }}
                  />
                </ListItemButton>
                {formik.touched.attachment && formik.errors.attachment && (
                  <Text
                    text={formik.errors.attachment}
                    token={tokens.FS12FW400LH18R}
                    color={colors.red00}
                    textAlign='left'
                  />
                )}
              </Box>
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Button
              token={tokens.FS16FW600LH21_86SB}
              variant={'primary'}
              text={t('Request Info')}
              form='agent-form'
              type='submit'
              isLoading={loading}
              onClick={() => {}}
              justifyContent='center'
              borderRadius='10px'
              style={{
                height: '55px',
                width: { xs: '100%', sm: '300px' },
                marginInline: 'auto',
                marginTop: '20px',
              }}
            />
          </Grid>
        </>
      </GridContainer>
    </form>
  );
};

export default AgentForm;
