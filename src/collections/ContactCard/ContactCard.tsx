/* eslint-disable react-hooks/exhaustive-deps */
import CalculationAccordian from '@/collections/CalculationsAccordian/CalculationAccordian';
import { formatPrice } from '@/commonFunctions/commonFunctions';
import { Text, TextInputWithBorder } from '@/components';
import Button from '@/components/Button/Button';
import MuiDateTimePicker from '@/components/MuiDateTimePicker/MuiDateTimePicker';
import RowRadioGroup from '@/components/RowRadioGroup/RowRadioGroup';
import Select from '@/components/Select/Select';
import { AppToastContext } from '@/context/Toast/ToastContext';
import { ToastContextInterface } from '@/context/Toast/ToastInterface';
import useCurrency from '@/hooks/useCurrency';
import { createLead } from '@/services/api';
import {
  colors,
  displayFlexAlignItemsCenterJustifyContentFlexStart,
  displayFlexAlignItemsCenterJustifyContentSpaceBetween,
  tokens,
} from '@/styles';
import { Box, Stack, useMediaQuery } from '@mui/material';
import dayjs from 'dayjs';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext, useEffect, useRef, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { useTranslation } from 'react-i18next';

interface ContactCardProps {
  isMobile?: boolean;
  isLaptop: boolean;
  isXL: boolean;
  maxContentHeight: number;
  id?: any;
  price?: any;
  condo?: any;
  handleSubmit?: () => void;
}

export default function ContactCard({
  condo,
  id,
  handleSubmit,
}: ContactCardProps) {
  let appToast = useContext<ToastContextInterface>(AppToastContext);
  const { t } = useTranslation();
  const { convertCurrency, currSymbol } = useCurrency();

  const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down('sm'));
  const isLg = useMediaQuery((theme: any) => theme.breakpoints.down('lg'));
  const router = useRouter();

  const ToastLikeConfig: any = {
    type: 'success',
    duration: 1000,
  };
  const [showDateSelect, setShowDateSelect] = useState(false);
  const contactFormRef = useRef<HTMLDivElement | null>(null);
  const [hasTouchedScreensTop, setHasTouchedScreensTop] = useState(false);
  const [hasReachedEnd, setHasReachedEnd] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRealtor, setIsRealtor] = useState<boolean | null>(null);

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    mobile_no: '',
    unit_type: '',
    budget: '',
    book_appointment: 'No',
    date: dayjs(new Date().toISOString().split('T')[0]),
    description: '',
    purchase_type: 'Investment',
    property: id,
  });

  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const verify = (val: string | null) => {
    if (val) setCaptchaToken(val);
  };

  const handleInputChange = (field: string, value: any) =>
    setFormData((prevState) => ({ ...prevState, [field]: value }));

  const [location, setLocation] = useState<any>({ lat: null, lon: null });
  const [deviceId, setDeviceId] = useState('');

  useEffect(() => {
    // Get the location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      });
    } else {
      alert('Geolocation is not supported by this browser.');
    }

    // Generate or get a device ID
    const existingDeviceId = localStorage.getItem('device-id');
    if (existingDeviceId) {
      setDeviceId(existingDeviceId);
    } else {
      const newDeviceId = 'xxxx-xxxx-xxxx-xxxx'.replace(/[x]/g, () =>
        ((Math.random() * 16) | 0).toString(16)
      );
      localStorage.setItem('device-id', newDeviceId);
      setDeviceId(newDeviceId);
    }
  }, []);

  const handleFormSubmit = async () => {
    setIsLoading(true);
    try {
      await createLead({
        property: id,
        first_name: formData.first_name,
        last_name: formData.first_name,
        email: formData.email,
        unit_type: formData.unit_type,
        book_appointment: formData.book_appointment === 'yes',
        date: formData.date,
        purchase_type: formData.purchase_type,
        description: formData.description,
        mobile_no: formData.mobile_no,
        is_retailer: isRealtor ?? false,
        location: JSON.stringify(location),
        device_id: deviceId,
        ...(formData.budget !== '' && { budget: formData.budget }),
      });
      appToast.setToast('Request Sent successfully', {
        ...ToastLikeConfig,
        type: 'success',
      });
      setIsLoading(false);
      setFormData({
        first_name: '',
        last_name: '',
        email: '',
        mobile_no: '',
        unit_type: '',
        budget: '',
        book_appointment: 'No',
        date: dayjs(new Date().toISOString().split('T')[0]),
        description: '',
        purchase_type: 'Investment',
        property: id,
      });
      if (handleSubmit) handleSubmit();
    } catch (error: any) {
      appToast.setToast(
        `${
          error?.response?.data?.message ||
          error?.mesage ||
          'Something went wrong'
        }`,
        {
          ...ToastLikeConfig,
          type: 'fail',
        }
      );
      setIsLoading(false);
    }
  };
  const [priceOptions, setPriceOptions] = useState([
    { id: 1, label: 'Budget', value: 'budget', disabled: true },
    { id: 2, label: '$100,000 - $200,000', value: '$100000-$200000' },
    { id: 3, label: '$200,000 - $300,000', value: '$200000-$300000' },
    { id: 4, label: '$300,000 - $400,000', value: '$300000-$400000' },
    { id: 5, label: '$400,000 - $500,000', value: '$400000-$500000' },
    { id: 6, label: '$500,000+', value: '$500000' },
  ]);

  useEffect(() => {
    function formatPriceOptions(price: any) {
      let temp = [];
      let tras = [];
      if (price === '-')
        return setPriceOptions(
          priceOptions.map((el) => ({
            ...el,
            label: el.label.replace(/\$/g, currSymbol),
            value: el.value.replace(/\$/g, currSymbol),
          }))
        );
      temp.push({ id: 1, label: 'Budget', value: 'budget', disabled: true });
      for (let i = 0; i < 5; i++) {
        let tempPrice = parseInt(price);
        let tempPrice2 = parseInt(price);
        if (i === 1) tempPrice = tras[i - 1].to + 1;
        else if (i === 2) tempPrice = tras[i - 1].to + 1;
        else if (i === 3) tempPrice = tras[i - 1].to + 1;
        else if (i === 4) tempPrice = tras[i - 1].to + 1;
        tempPrice2 = tempPrice + tempPrice * 0.05;
        tempPrice = parseInt(String(tempPrice));
        tempPrice2 = parseInt(String(tempPrice2));
        tras.push({
          id: 1 + 1,
          from: tempPrice,
          to: tempPrice2,
        });
        temp.push({
          id: i + 1,
          ...(i <= 3
            ? {
                label: `${formatPrice(tempPrice, currSymbol)} - ${formatPrice(
                  tempPrice2,
                  currSymbol
                )}`,
                value: `${formatPrice(tempPrice, currSymbol)}-${formatPrice(
                  tempPrice2,
                  currSymbol
                )}`,
              }
            : {
                label: `${formatPrice(tempPrice, currSymbol)}+`,
                value: `${formatPrice(tempPrice, currSymbol)}+`,
              }),
        });
      }
      setPriceOptions(temp);
    }
    formatPriceOptions(
      condo?.type?.id === 2
        ? convertCurrency(condo?.condo?.price)
        : convertCurrency(condo?.house?.price)
    );
  }, [condo, currSymbol]);

  useEffect(() => {
    const handleScroll = () => {
      if (contactFormRef.current) {
        const footerEle = window.document.getElementById('needFurtherHelp');
        if (footerEle) {
          const footerRect = footerEle.getBoundingClientRect();
          setHasReachedEnd(
            footerRect.top >= 0 && footerRect.top <= window.innerHeight
          );
        }
        const { y } = contactFormRef.current.getBoundingClientRect();
        setHasTouchedScreensTop(y < 0 ? true : false);
      }
    };

    if (!isLg) {
      const contactCardWrapper =
        window.document.getElementById('condo-contactcard');
      if (contactCardWrapper) {
        let ele = contactFormRef.current;
        if (ele) ele.style.width = `${contactCardWrapper.clientWidth - 24}px`;
      }
    }
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  let bedroomFilter =
    condo.property_details.bedroom_types !== '-'
      ? condo.property_details.bedroom_types
          .split(', ')
          .map((el: string, idx: number) => ({
            id: idx,
            label: el,
            value: el,
          }))
      : '-';

  return (
    <Box
      ref={contactFormRef}
      sx={{ height: '100%', width: '100%' }}
      display={hasReachedEnd ? 'flex' : 'inherit'}
      flexDirection={hasReachedEnd ? 'column' : undefined}
      justifyContent={hasReachedEnd ? 'flex-end' : undefined}
    >
      <Box
        position={
          !isMobile && hasTouchedScreensTop && !hasReachedEnd
            ? 'fixed'
            : 'initial'
        }
        top={router.pathname.includes('floor-detail') ? 130 : 80}
        width={'inherit'}
      >
        <Box
          boxShadow={'rgba(0, 0, 0, 0.1) 0px 4px 12px'}
          borderRadius={'10px'}
          padding={'15px 25px'}
          width={'100%'}
        >
          <Text
            text={t(`Let's get connected!`)}
            color={colors.black21}
            token={
              isMobile ? tokens.FS24FW800LH32_78EB : tokens.FS28FW500LH42_56B
            }
            textAlign='left'
          />
          <Stack direction={'row'} spacing={'10px'} mt={'10px'}>
            <TextInputWithBorder
              label=''
              onChange={(value) => handleInputChange('first_name', value)}
              placeholder={t('First Name')}
              borderRadius='10px'
              styles={{ flex: 1 }}
              size={'small'}
              value={formData.first_name}
            />
            <TextInputWithBorder
              label=''
              onChange={(value) => handleInputChange('last_name', value)}
              placeholder={t('Last Name')}
              borderRadius='10px'
              styles={{ flex: 1 }}
              size={'small'}
              value={formData.last_name}
            />
          </Stack>
          <TextInputWithBorder
            label=''
            onChange={(value) => handleInputChange('email', value)}
            placeholder={t('Email')}
            borderRadius='10px'
            styles={{ marginTop: '10px' }}
            size={'small'}
            value={formData.email}
          />
          <TextInputWithBorder
            label=''
            onChange={(value) => handleInputChange('mobile_no', value)}
            placeholder={t('Phone No')}
            borderRadius='10px'
            styles={{ marginTop: '10px' }}
            size={'small'}
            value={formData.mobile_no}
          />
          {bedroomFilter !== '-' && (
            <Select
              label=''
              options={bedroomFilter}
              selectedId={bedroomFilter?.[0]?.id || 1}
              style={{ marginTop: '10px', width: '100%' }}
              size={'medium'}
              onChange={(value: string) =>
                handleInputChange('unit_type', value)
              }
            />
          )}
          <Select
            label=''
            options={priceOptions}
            selectedId={
              priceOptions.find((el: any) => el.value === formData.budget)
                ?.id || 1
            }
            style={{ marginTop: '10px', width: '100%' }}
            size={'medium'}
            onChange={(value: string) => handleInputChange('budget', value)}
          />
          <Box
            {...displayFlexAlignItemsCenterJustifyContentSpaceBetween}
            width={'100%'}
            bgcolor={colors.greyD931}
            borderRadius={'8px'}
            my={'10px'}
            padding={'5px 10px'}
            flexWrap='wrap'
          >
            <Text
              text={t('Book an Appointment')}
              color={colors.blueC2}
              token={
                isMobile ? tokens.FS14FW500LH19R : tokens.FS16FW500LH21_86R
              }
            />
            <RowRadioGroup
              label=''
              size='small'
              options={[
                { id: 1, label: t('Yes'), value: 'yes' },
                { id: 2, label: t('No'), value: 'no' },
              ]}
              handleOnChange={(val: string) => {
                handleInputChange('book_appointment', val);
                val === 'yes'
                  ? setShowDateSelect(true)
                  : setShowDateSelect(false);
              }}
            />
          </Box>
          {showDateSelect && (
            <MuiDateTimePicker
              label={t('Pick a date and time')}
              style={{ marginTop: '10px' }}
              onChange={(value: string) => handleInputChange('date', value)}
              value={formData.date}
              size='small'
            />
          )}
          <Box
            {...displayFlexAlignItemsCenterJustifyContentSpaceBetween}
            width={'100%'}
            bgcolor={colors.greyD931}
            borderRadius={'8px'}
            marginTop={'10px'}
            padding={'5px 10px'}
            flexWrap='wrap'
          >
            <Text
              text={t('Are you a realtor?')}
              color={colors.blueC2}
              token={
                isMobile ? tokens.FS14FW500LH19R : tokens.FS16FW500LH21_86R
              }
            />
            <RowRadioGroup
              label=''
              size='small'
              options={[
                { id: 1, label: t('Yes'), value: 'yes' },
                { id: 2, label: t('No'), value: 'no' },
              ]}
              handleOnChange={(val: string) => setIsRealtor(val === 'yes')}
            />
          </Box>
          <TextInputWithBorder
            label=''
            onChange={(value) => handleInputChange('description', value)}
            value={formData.description}
            placeholder={t('I would like to have info for')}
            borderRadius='10px'
            styles={{ marginTop: '10px' }}
            multiline={true}
            rows={3}
          />
          {process.env.GOOGLE_CAPTCHA && (
            <Stack mt={'10px'} width='100%'>
              <ReCAPTCHA
                sitekey={process.env.GOOGLE_CAPTCHA || ''}
                onChange={verify}
              />
            </Stack>
          )}
          <Button
            text={t('Submit Request')}
            onClick={handleFormSubmit}
            token={isMobile ? tokens.FS14FW400LH19R : tokens.FS16FW300LH21_86R}
            variant='blue'
            borderRadius='8px'
            style={{ marginTop: '10px', height: '46px' }}
            maxWidth
            justifyContent='center'
            isLoading={isLoading}
            disabled={captchaToken === null ? true : false}
          />
        </Box>
        <Box
          {...displayFlexAlignItemsCenterJustifyContentFlexStart}
          gap={'30px'}
          sx={{
            marginTop: '21px',
            justifyContent: { xs: 'center', sm: 'start' },
            marginInline: { xs: 0, sm: '20px', lg: '0' },
          }}
        >
          <p
            style={{
              color: colors.grey63,
              ...tokens.FS14FW400LH19R,
              lineHeight: '1.5',
            }}
          >
            {t(
              'Submission of your request constitutes automatic acceptance of the '
            )}{' '}
            <span
              style={{
                color: colors.grey63,
                textDecoration: 'underline',
                ...tokens.FS14FW600LH16SB,
              }}
            >
              <Link href={'/privacy-policy'}>
                {t('terms and privacy policy')}
              </Link>
            </span>
          </p>
        </Box>
        {router.pathname.includes('condo-floor-detail') && (
          <Box mt={4}>
            <CalculationAccordian
              price={
                router.pathname.includes('condo-floor-detail')
                  ? condo.floor_plans.find(
                      (el: any) => el.id === +router.query.floorPlan!
                    ).total_price || 800000000
                  : '800000000'
              }
            />
          </Box>
        )}
      </Box>
    </Box>
  );
}
