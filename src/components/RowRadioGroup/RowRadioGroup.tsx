import { tokens } from '@/styles/fonts';
import { useMediaQuery } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';

interface RowRadioGroupProps {
  label: string;
  style?: React.CSSProperties;
  size?: 'medium' | 'small';
  handleOnChange?: (value: string) => void;
  options: {
    id: number;
    value: string;
    label: string;
  }[];
  defaultValue?: string;
}

export default function RowRadioGroup({
  style,
  label,
  handleOnChange,
  options,
  size = 'medium',
  defaultValue,
}: RowRadioGroupProps) {
  const isSm = useMediaQuery((theme: any) => theme.breakpoints.down('sm'));
  return (
    <FormControl style={style}>
      <FormLabel
        sx={{ ...(isSm ? tokens.FS14FW600LH16SB : tokens.FS16FW600LH21_86SB) }}
      >
        {label}
      </FormLabel>
      <RadioGroup
        row
        aria-labelledby={label}
        onChange={(event) =>
          handleOnChange && handleOnChange(event.target.value)
        }
        defaultValue={defaultValue}
      >
        {options.map((option) => (
          <FormControlLabel
            key={option.id}
            value={option.value}
            control={
              <Radio
                size={size}
                sx={{
                  ...(isSm
                    ? tokens.FS14FW600LH16SB
                    : tokens.FS16FW600LH21_86SB),
                }}
              />
            }
            label={option.label}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}
