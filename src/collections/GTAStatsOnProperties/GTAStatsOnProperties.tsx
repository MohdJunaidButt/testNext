import { Text } from "@/components";
import LineChart from "@/components/ChartJS/LineChart/LineChart";
import { colors, tokens } from "@/styles";
import { Box, useMediaQuery } from "@mui/material";
import dynamic from "next/dynamic";
const AreaChart = dynamic(
  () => import("../../components/ApexCharts/AreaChart"),
  {
    ssr: false,
  }
);

export default function GTAStatsOnProperties() {
  const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down("sm"));
  return (
    <>
      <Box
        width={"100%"}
        sx={{ ...(isMobile && { overflowX: "auto", overflowY: "hidden" }) }}
      >
        <Text
          token={
            isMobile ? tokens.FS24FW800LH32_78EB : tokens.FS48FW800LH61_49B
          }
          text="GTA Statistics (All property types) *"
          color={colors.black21}
          textAlign="left"
          styles={{ marginBottom: "50px" }}
        />
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
          bottomLabel={"All Type of properties London"}
          isMobile={isMobile}
          seriesOpacity={[0, 0]}
        />

        {/* <LineChart
          dataset={{
            labels: [
              "2014",
              "2015",
              "2016",
              "2017",
              "2018",
              "2019",
              "2020",
              "2021",
              "2022",
              "2023",
            ],
            datasets: [
              {
                label: "test",
                data: [
                  2183, 10732, 8925, 4461, 9479, 3058, 11204, 3801, 13089, 6077,
                ],
                backgroundColor: "rgba(255, 99, 132, 0.6)",
                borderColor: "rgba(255, 99, 132, 1",
              },
              {
                label: "test2",
                data: [
                  9804, 3235, 7319, 5467, 10210, 13504, 8222, 4228, 9121, 7116,
                ],
                backgroundColor: "rgba(54, 162, 235, 0.6)",
                borderColor: "rgba(54, 162, 235, 1)",
              },
            ],
          }}
        /> */}
      </Box>
    </>
  );
}
