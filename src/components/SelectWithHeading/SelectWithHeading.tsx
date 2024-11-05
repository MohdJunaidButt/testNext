import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import SelectMaterial from "@mui/material/Select";
import { useState, useEffect } from "react";
import InputLabel from "@mui/material/InputLabel";
import { Box } from "@mui/material";
import { Text } from "../Text";
import { colors, tokens } from "@/styles";
interface SelectProps {
  options: { id: number; label: string; value: string }[];
  label: string;
  style?: React.CSSProperties;
}

export default function SelectWithHeading({
  options,
  label,
  style,
}: SelectProps) {
  const [selected, setSelected] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setOpen(false);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <>
      <Box marginBottom={"10px"}>
        <Text
          text={label}
          token={tokens.FS14FW600LH16SB}
          color={colors.black21}
          textAlign="left"
        />
      </Box>
      <FormControl style={style}>
        <SelectMaterial
          value={selected}
          onChange={(event) => {
            setSelected(event.target.value);
          }}
          open={open}
          onOpen={() => setOpen(true)}
          onClose={() => setOpen(false)}
          style={style}
        >
          {options.map((option) => (
            <MenuItem key={option.id} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </SelectMaterial>
      </FormControl>
    </>
  );
}
