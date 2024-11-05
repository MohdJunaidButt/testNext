import {
  colors,
  displayFlexAlignItemsCenterJustifyContentCenter,
  displayFlexAlignItemsCenterJustifyContentFlexStart,
  flexDirection,
  tokens,
} from "@/styles";
import { Box, Input } from "@mui/material";
import Image from "next/image";
import { Text } from "../Text";
import { TextInputWithNoBordersProps } from "@/types/components/TextInputWithNoBordersProps";
export function TextInputWithNoBorders({
  placeholder,
  onChange,
  label,
  backgroundColor = "transparent",
  borderRadius = "none",
  styles,
}: TextInputWithNoBordersProps) {
  return (
    <Box
      width="150px"
      height={"100%"}
      padding={"10px 20px 10px 20px"}
      {...displayFlexAlignItemsCenterJustifyContentFlexStart}
      flexDirection={"column"}
      alignItems={"flex-start"}
      justifyContent={"center"}
      bgcolor={backgroundColor}
      borderRadius={borderRadius}
      sx={{ ...styles }}
    >
      <Box>
        <Text
          text={label}
          token={tokens.FS13FW400LH18R}
          color={colors.grey96}
        />
      </Box>

      <Input
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        fullWidth
        disableUnderline
        style={tokens.FS16FW300LH21_86R}
        type="text"
      />
    </Box>
  );
}
