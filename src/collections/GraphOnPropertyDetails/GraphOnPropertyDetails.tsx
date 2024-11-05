import { Box, useMediaQuery } from "@mui/material";
import dynamic from "next/dynamic";
const AreaChart = dynamic(
  () => import("../../components/ApexCharts/AreaChart"),
  {
    ssr: false,
  }
);

export default function GraphOnPropertyDetails() {
  const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down("sm"));
  return (
    <>
      <Box width={"100%"} marginTop={isMobile ? "30px" : "34px"}>
        <AreaChart
          datasetSeries={[
            {
              name: "Houses",
              data: [130, 50, 105, 144, 80, 45, 120, 80, 95, 114, 180, 80],
            },
            {
              name: "Other Properties",
              data: [100, 90, 135, 114, 120, 145, 70, 40, 35, 100, 150, 90],
            },
          ]}
          seriesOpacity={[0, 0]}
        />
      </Box>
    </>
  );
}
