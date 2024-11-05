import { GridContainer, Text } from "@/components";
import { Box, Grid, useMediaQuery } from "@mui/material";
import TileWithIconTextAndInfo from "../TileWithIconTextAndInfo/TileWithIconTextAndInfo";
import { colors, tokens } from "@/styles";
import CircularProgressChart from "@/components/ChartJS/CircularProgressChart/CircularProgressChart";

export default function HomeValue() {
  const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down("sm"));
  return (
    <Box width={"100%"} marginTop={isMobile ? "30px" : "35px"}>
      <Text
        text="Home Value"
        token={isMobile ? tokens.FS16FW600LH21_86R : tokens.FS20FW500LH22_72SB}
        styles={{
          fontSize: isMobile ? "16px" : "18px",
          marginBottom: isMobile ? "10px" : "15px",
        }}
        color={colors.black21}
        textAlign="left"
      />

      <GridContainer spacing={isMobile ? 1 : 2} justifyContent="flex-start">
        <>
          {homeValueTiles.map((homeValueTile, index) => (
            <Grid key={index} item xs={6} md={6} lg={6} xl={6}>
              <TileWithIconTextAndInfo
                image={homeValueTile.image}
                description={homeValueTile.description}
                title={homeValueTile.title}
                infoText={homeValueTile.infoText}
              />
            </Grid>
          ))}
        </>
      </GridContainer>
      <GridContainer
        spacing={isMobile ? 1 : 2}
        justifyContent="flex-start"
        styles={{ marginTop: "0px" }}
      >
        <>
          <Grid item xs={6} md={6} lg={4} xl={4}>
            {renderCircularProgressChartTile(
              {
                labels: ["Progress", "Remaining"],
                datasets: [
                  {
                    data: [20, 100 - 20],
                    backgroundColor: [colors.blueC2, "#e0e0e0"],
                    hoverBackgroundColor: [colors.blue5C, "#e0e0e0"],
                    borderWidth: 2,
                  },
                ],
              },
              "Schools"
            )}
          </Grid>
          <Grid item xs={6} md={6} lg={4} xl={4}>
            {renderCircularProgressChartTile(
              {
                labels: ["Progress", "Remaining"],
                datasets: [
                  {
                    data: [10, 100 - 10],
                    backgroundColor: [colors.blueC2, "#e0e0e0"],
                    hoverBackgroundColor: [colors.blue5C, "#e0e0e0"],
                    borderWidth: 2,
                  },
                ],
              },
              "1 Yr Growth"
            )}
          </Grid>
          <Grid item xs={6} md={6} lg={4} xl={4}>
            {renderCircularProgressChartTile(
              {
                labels: ["Progress", "Remaining"],
                datasets: [
                  {
                    data: [20, 100 - 20],
                    backgroundColor: [colors.blueC2, "#e0e0e0"],
                    hoverBackgroundColor: [colors.blue5C, "#e0e0e0"],
                    borderWidth: 2,
                  },
                ],
              },
              "Rental"
            )}
          </Grid>
        </>
      </GridContainer>
    </Box>
  );
}

const homeValueTiles = [
  {
    image: "/icons/dollar-double-circle.svg",
    title: "Ubrealty Estimate",
    description: "$252,555",
    infoText: "Ubrealty Estimate",
  },
  {
    image: "/icons/calender.svg",
    title: "Estimate Date",
    description: "25 Jan, 2022",
    infoText: "Estimate Date",
  },
  {
    image: "/icons/roi.svg",
    title: "Rental Estimate",
    description: "$252,555",
    infoText: "Rental Estimate",
  },
  {
    image: "/icons/rental-yield.svg",
    title: "Rental Yield",
    description: "$252,555",
    infoText: "Rental Yield",
  },
];

const renderCircularProgressChartTile = (dataset: any, text: string) => {
  return (
    <Box
      borderRadius={"8px"}
      boxShadow={"0px 13px 34px 0px #00000008"}
      border={`1px solid ${colors.greyE1}`}
      padding={"20px 10px 20px 10px"}
    >
      <CircularProgressChart text={text} dataset={dataset} />
    </Box>
  );
};
