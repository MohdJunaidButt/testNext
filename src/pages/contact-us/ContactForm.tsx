import { GridContainer, TextInputWithBorder } from '@/components';
import Button from '@/components/Button/Button';
import { AppToastContext } from '@/context/Toast/ToastContext';
import { ToastContextInterface } from '@/context/Toast/ToastInterface';
import { submitSupportForm } from '@/services/api';
import { tokens } from '@/styles';
import { IContactFormData } from '@/types';
import { Alert, CircularProgress, Grid, Snackbar } from '@mui/material';
import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface AxiosErrorData {
  statusCode: number;
  message: string[];
  error: string;
}

const ContactForm: React.FC = () => {
  const { t } = useTranslation();

  const [loading, setLoading] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState<IContactFormData>({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  let appToast = useContext<ToastContextInterface>(AppToastContext);
  const ToastLikeConfig: any = {
    type: 'success',
    duration: 1000,
  };

  const isAxiosError = (
    error: any
  ): error is { response: { data: AxiosErrorData } } => {
    return error && error.response && typeof error.response.data === 'object';
  };

  const handleInputChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFormSubmit = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await submitSupportForm(formData);
      // setOpenSuccess(true);
      appToast.setToast('Form Submitted Successfully ', {
        ...ToastLikeConfig,
      });
      setFormData({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
    } catch (error: any) {
      appToast.setToast(
        error?.response?.data?.message?.join(', ') ||
          error?.message ||
          'Something went wrong ',
        {
          ...ToastLikeConfig,
          type: 'fail',
        }
      );

      // if (isAxiosError(error)) {
      //   const errorData = error.response.data as AxiosErrorData;
      //   setErrorMessage(
      //     error.response
      //       ? error.response.data.message.join(', ')
      //       : 'error.message'
      //   );
      //   setOpenError(true);
      // } else {
      //   setErrorMessage(
      //     error.response
      //       ? error.response.data.message.join(', ')
      //       : error.message
      //   );
      //   setOpenError(true);
      // }
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSuccess(false);
    setOpenError(false);
  };

  return (
    <GridContainer
      spacing={2}
      justifyContent='flex-start'
      styles={{ maxWidth: '900px' }}
    >
      <>
        <Grid item xs={12} sm={6}>
          <TextInputWithBorder
            label={t('First Name') + '*'}
            placeholder={t('First Name')}
            borderRadius='8px'
            onChange={(value: string) => handleInputChange('first_name', value)}
            value={formData.first_name}
            styles={{
              textTransform: 'uppercase',
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextInputWithBorder
            label={t('Last Name') + '*'}
            placeholder={t('Last Name')}
            borderRadius='8px'
            onChange={(value: string) => handleInputChange('last_name', value)}
            value={formData.last_name}
            styles={{
              textTransform: 'uppercase',
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextInputWithBorder
            label={t('Email') + '*'}
            placeholder={t('Email')}
            borderRadius='8px'
            onChange={(value: string) => handleInputChange('email', value)}
            value={formData.email}
            styles={{
              textTransform: 'uppercase',
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextInputWithBorder
            label={t('Phone No') + '*'}
            placeholder={t('Phone No')}
            borderRadius='8px'
            onChange={(value: string) => handleInputChange('phone', value)}
            value={formData.phone}
          />
        </Grid>
        <Grid item xs={12}>
          <TextInputWithBorder
            label={t('Subject') + '*'}
            placeholder={t('Subject')}
            borderRadius='8px'
            onChange={(value: string) => handleInputChange('subject', value)}
            value={formData.subject}
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <TextInputWithBorder
            label={t('Message') + '*'}
            placeholder={t('Message')}
            borderRadius='8px'
            multiline={true}
            rows={7}
            onChange={(value: string) => handleInputChange('message', value)}
            value={formData.message}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button
            onClick={handleFormSubmit}
            justifyContent='center'
            variant='black'
            token={tokens.FS16FW500LH21_86R}
            text={
              loading ? (
                <CircularProgress color='inherit' size={24} />
              ) : (
                t('Send Message')
              )
            }
            maxWidth={true}
            borderRadius='8px'
            style={{ height: { xs: '50px', sm: '60px' } }}
          />
        </Grid>
        <Snackbar
          open={openSuccess}
          autoHideDuration={6000}
          onClose={handleClose as any}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <Alert
            onClose={handleClose}
            severity='success'
            sx={{ width: '100%' }}
          >
            Form submitted successfully!
          </Alert>
        </Snackbar>

        <Snackbar
          open={openError}
          autoHideDuration={6000}
          onClose={handleClose as any}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <Alert onClose={handleClose} severity='error' sx={{ width: '100%' }}>
            {errorMessage}
          </Alert>
        </Snackbar>
      </>
    </GridContainer>
  );
};

export default ContactForm;
