import { Text, TextInputWithBorder } from '@/components';
import Button from '@/components/Button/Button';
import DialogWrapper from '@/components/Dialog/Dialog';
import DialogCloseButton from '@/components/DialogCloseButton/DialogCloseButton';
import { AppToastContext } from '@/context/Toast/ToastContext';
import { ToastContextInterface } from '@/context/Toast/ToastInterface';
import { createSaveSearch } from '@/services/api';
import { colors, tokens } from '@/styles';
import { Box, DialogContent, Paper } from '@mui/material';
import { useRouter } from 'next/router';
import React, { Fragment, useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';

type Props = {
  open: boolean;
  handleToggle: () => void;
  filters?: any;
};

const SaveSearchModal = ({ open, handleToggle }: Props) => {
  const [label, setLabel] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { t } = useTranslation();

  let appToast = useContext<ToastContextInterface>(AppToastContext);
  const ToastLikeConfig: any = {
    type: 'success',
    duration: 1000,
  };

  const handleTxtChange = (value: string) => setLabel(value);
  const handleSearchSave = async () => {
    if (!label.trim().length) return;
    setLoading(true);
    const query: Record<string, string> = Object.keys(router.query).reduce(
      (acc, key) => {
        const value = router.query[key];
        if (Array.isArray(value)) {
          acc[key] = value.join(','); // Join array values or handle as needed
        } else if (value !== undefined) {
          acc[key] = value;
        }
        return acc;
      },
      {} as Record<string, string>
    );

    const queryString = new URLSearchParams({
      ...query,
    }).toString();

    await createSaveSearch({
      label,
      value: `${router.pathname}?${queryString}`,
    })
      .then(() => {
        appToast.setToast(t('Searched Saved'), {
          ...ToastLikeConfig,
        });
        handleToggle();
      })
      .catch((er) => {
        appToast.setToast(t('Something went wrong, try again'), {
          ...ToastLikeConfig,
          type: 'fail',
        });
      })
      .finally(() => setLoading(false));
  };

  return (
    <Fragment>
      <DialogWrapper
        PaperComponent={Paper}
        scroll='paper'
        maxWidth='xs'
        fullWidth
        open={open}
        sx={{
          '& .MuiDialog-paper': {
            width: '100%',
            margin: '16px',
          },
        }}
      >
        <DialogContent
          sx={{
            padding: '20px',
            width: '100%',
            marginInline: 'auto',
            position: 'relative',
          }}
        >
          <Box position='absolute' top={16} right={16}>
            <DialogCloseButton toggleClose={handleToggle} />
          </Box>
          <Text
            text={t('Save Search')}
            token={tokens.FS20FW600LH22_72SB}
            color={colors.black21}
            styles={{
              marginBottom: { xs: '15px', sm: '30px' },
            }}
          />

          <TextInputWithBorder
            label=''
            onChange={handleTxtChange}
            placeholder={t('name your search')}
            borderRadius='10px'
            // size={'small'}
            value={label}
            styles={{
              flex: 1,
            }}
          />
          <Button
            variant='black'
            onClick={handleSearchSave}
            token={tokens.FS16FW500LH18M}
            text={t('Save')}
            justifyContent='center'
            borderRadius='8px'
            maxWidth
            disabled={!label.trim().length}
            style={{
              minHeight: '54px',
              marginTop: '15px',
            }}
            isLoading={loading}
          />
        </DialogContent>
      </DialogWrapper>
    </Fragment>
  );
};
export default SaveSearchModal;
