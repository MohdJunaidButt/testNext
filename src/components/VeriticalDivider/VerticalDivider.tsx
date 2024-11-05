import { Box } from "@mui/material";

const VerticalDivider = ({ color, height, type = "solid" }: any) => {
  return (
    <Box
      borderLeft={1}
      borderColor={color}
      height={height}
      sx={{ borderLeftStyle: type }}
    />
  );
};

export default VerticalDivider;
