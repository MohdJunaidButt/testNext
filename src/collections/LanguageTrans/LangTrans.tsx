/* eslint-disable react-hooks/exhaustive-deps */
import { tokens } from '@/styles';
import { languages } from '@/utils/appInfo';
import { FormControl, MenuItem, Select as MuiSelect } from '@mui/material';
import { useTranslation } from 'react-i18next';

export default function LangTrans() {
  const { i18n } = useTranslation();
  const changeLanguage = (e: any) => {
    localStorage.setItem('locale', e.target.value);
    i18n.changeLanguage(e.target.value);
  };

  const getDisplayValue = (value: string) => {
    // Define your custom display logic here
    const selectedOption = languages.find((option) => option.value === value);
    return selectedOption ? selectedOption.id : '';
  };

  return (
    <FormControl
      variant='standard'
      sx={{
        justifyContent: 'center',
        '& .MuiMenu-paper': {
          boxShadow: 'none',
        },
      }}
    >
      <MuiSelect
        labelId='lang-label'
        id='lang'
        value={i18n.language}
        onChange={changeLanguage}
        label='language'
        sx={{
          '&::before,::after,svg': {
            display: 'none',
          },
          '& .MuiSelect-select': {
            padding: '0px !important',
          },
          ...tokens.FS12FW600LH16SG,
        }}
        renderValue={getDisplayValue}
      >
        {languages.map((el, idx) => (
          <MenuItem
            key={`lang-${el.id}`}
            value={el.value}
            sx={{
              ...tokens.FS12FW600LH16SG,
              ...(idx < languages.length - 1 && { paddingBottom: '10px' }),
            }}
          >
            {el.label}
          </MenuItem>
        ))}
      </MuiSelect>
    </FormControl>
  );
}
