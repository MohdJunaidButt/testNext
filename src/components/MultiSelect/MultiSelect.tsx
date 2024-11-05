import { tokens } from '@/styles';
import { Checkbox, OutlinedInput, SxProps, Theme } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import SelectMaterial, { SelectChangeEvent } from '@mui/material/Select';
import { useEffect, useState } from 'react';
interface MultiSelectProps {
  options: {
    id: number;
    label: string;
    value: string | undefined;
    disabled?: boolean;
  }[];
  label: string;
  style?: SxProps<Theme>;
  innerStyles?: SxProps<Theme>;
  IconComponent?: JSX.Element;
  size?: 'small' | 'medium';
  isBorderDark?: boolean;
  isRemoveBorder?: boolean;
  placeholder?: string;
  onChange: (value: string) => void;
  bgColor?: string;
  value?: string;
}

export default function MultiSelect({
  options,
  label,
  style,
  innerStyles,
  IconComponent = undefined,
  size = 'small',
  isBorderDark = false,
  isRemoveBorder = false,
  placeholder,
  onChange,
  bgColor = undefined,
  value = '',
}: MultiSelectProps) {
  const [open, setOpen] = useState(false);
  const [selectedValues, setSelectedValues] = useState<string[]>(
    value !== '' ? value.split(',') : ['']
  );

  useEffect(() => {
    setSelectedValues(value !== '' ? value.split(',') : ['']);
  }, [value]);

  const handleChange = (event: SelectChangeEvent<typeof selectedValues>) => {
    const {
      target: { value },
    } = event;
    let val =
      typeof value === 'string'
        ? value.split(',')
        : value.length === 0
        ? ['']
        : value[0] === ''
        ? value.slice(1)
        : value;
    onChange(val.length === 0 && val[0] ? '' : val.join(','));
    setSelectedValues(val);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (open) setOpen(false);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [open]);

  useEffect(() => {
    if (value !== '') return;
    setSelectedValues(['']);
  }, [value]);

  return (
    <FormControl sx={style} size={size}>
      <SelectMaterial
        placeholder={placeholder}
        value={selectedValues}
        multiple={true}
        onChange={handleChange}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        open={open}
        // input={<OutlinedInput label='' />}
        sx={{
          borderRadius: '10px',
          ...(size === 'small' ? tokens.FS14FW500LH19R : tokens.FS16FW500LH18M),
          backgroundColor: bgColor ? bgColor : undefined,
          '& .MuiOutlinedInput-input': {
            padding: size === 'small' ? '6.5px 12px' : '8.5px 14px',
            lineHeight: size === 'small' ? '1.3' : '1.5',
          },
          '& .MuiOutlinedInput-notchedOutline': {
            border: !isRemoveBorder
              ? `1px solid ${
                  isBorderDark ? '#000' : 'rgba(150, 150, 150, 0.24)'
                } !important`
              : 'none',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderWidth: !isRemoveBorder ? 1 : 0,
            borderColor: isBorderDark ? '#000' : 'rgba(150, 150, 150, 0.24)',
          },
          ...innerStyles,
        }}
        renderValue={(selected) =>
          selected.join(', ') === '' ? label : selected.join(', ')
        }
        IconComponent={IconComponent ? () => IconComponent : undefined}
      >
        {options.map((option, idx) => (
          <MenuItem
            key={`${option.id}-${idx}`}
            value={option.value}
            disabled={option.disabled}
          >
            {option.value !== '' && (
              <Checkbox
                checked={selectedValues.indexOf(option.value as string) > -1}
              />
            )}
            {option.label}
          </MenuItem>
        ))}
      </SelectMaterial>
    </FormControl>
  );
}
