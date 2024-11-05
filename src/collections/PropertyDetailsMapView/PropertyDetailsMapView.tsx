import { Text } from "@/components";
import { Box, useMediaQuery } from "@mui/material";

import { colors, tokens } from "@/styles";
import dynamic from "next/dynamic";

const MapWithNoSSR = dynamic(
  () => import("../CustomMap/CustomMapPropertyDetails"),
  {
    ssr: false,
  }
);
export default function PropertyDetailsMapView() {
  const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down("sm"));
  return (
    <Box width={"100%"} marginTop={isMobile ? "30px" : "34px"}>
      <Text
        text="Map View"
        token={isMobile ? tokens.FS16FW600LH21_86R : tokens.FS20FW500LH22_72SB}
        styles={{
          fontSize: isMobile ? "16px" : "18px",
          marginBottom: isMobile ? "10px" : "15px",
        }}
        color={colors.black21}
        textAlign="left"
      />
      <MapWithNoSSR />
    </Box>
  );
}
