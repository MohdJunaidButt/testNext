import { tokens } from '@/styles';
import { SxProps, Theme } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import SelectMaterial from '@mui/material/Select';
import { useEffect, useState } from 'react';

interface SelectProps {
  options: {
    id: number;
    label: string;
    value: string | undefined;
    disabled?: boolean;
  }[];
  label: string;
  style?: SxProps<Theme>;
  innerStyles?: SxProps<Theme>;
  selectedId?: number | string;
  IconComponent?: JSX.Element;
  size?: 'small' | 'medium';
  isBorderDark?: boolean;
  isRemoveBorder?: boolean;
  placeholder?: string;
  onChange?: (value: string) => void;
  bgColor?: string;
  // innerpadding?: string;
  multiSelect?: boolean;
}

export default function Select({
  options,
  label,
  style,
  selectedId,
  innerStyles,
  IconComponent = undefined,
  size = 'small',
  isBorderDark = false,
  isRemoveBorder = false,
  placeholder,
  onChange,
  bgColor = undefined,
  multiSelect = false,
}: // innerpadding = '16.5px 14px',
SelectProps) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(
    selectedId
      ? options?.filter((option) => option?.id === selectedId)[0]?.value
      : ''
  );

  useEffect(() => {
    setSelected(
      options?.filter((option) => option?.id === selectedId)[0]?.value
    );
  }, [options, selectedId]);

  useEffect(() => {
    const handleScroll = () => {
      if (open) setOpen(false);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [open]);

  return (
    <FormControl sx={style} size={size}>
      <InputLabel>{label}</InputLabel>
      <SelectMaterial
        placeholder={placeholder}
        value={selected}
        multiple={multiSelect}
        onChange={(event) => {
          const value = event.target.value as string;
          setSelected(value);
          if (onChange) {
            onChange(value);
          }
        }}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        label={label}
        open={open}
        sx={{
          '&.MuiPaper-root': {
            maxHeight: '300px',
          },
          borderRadius: '10px',
          backgroundColor: bgColor ? bgColor : undefined,
          ...(size === 'small' ? tokens.FS14FW500LH19R : tokens.FS16FW500LH18M),
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
        IconComponent={IconComponent ? () => IconComponent : undefined}
      >
        {options.map((option) => (
          <MenuItem
            key={option.id}
            value={option.value}
            disabled={option.disabled}
          >
            {option.label}
          </MenuItem>
        ))}
      </SelectMaterial>
    </FormControl>
  );
}
