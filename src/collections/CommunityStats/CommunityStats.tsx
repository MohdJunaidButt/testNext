import { GridContainer, Text } from "@/components";
import { Box, Grid, useMediaQuery } from "@mui/material";

import { colors, tokens } from "@/styles";
import TileWithIconTextAndInfo from "../TileWithIconTextAndInfo/TileWithIconTextAndInfo";

export default function CommunityStats() {
  const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down("sm"));
  return (
    <Box width={"100%"} marginTop={isMobile ? "30px" : "35px"}>
      <Text
        text="Community Stats"
        token={isMobile ? tokens.FS16FW600LH21_86R : tokens.FS20FW500LH22_72SB}
        styles={{
          fontSize: isMobile ? "16px" : "18px",
          marginBottom: "5px",
        }}
        color={colors.black21}
        textAlign="left"
      />
      <Text
        text="Overview of community stats for houses at london"
        token={isMobile ? tokens.FS13FW400LH18R : tokens.FS14FW400LH19R}
        color={colors.grey96}
        textAlign="left"
        styles={{ marginBottom: isMobile ? "10px" : "15px" }}
      />
      <GridContainer spacing={isMobile ? 1 : 2} justifyContent="flex-start">
        <>
          {CommunityStatsTiles.map((CommunityStatsTile, index) => (
            <Grid key={index} item xs={6} sm={6}>
              <TileWithIconTextAndInfo
                image={CommunityStatsTile.image}
                description={CommunityStatsTile.description}
                title={CommunityStatsTile.title}
                infoText={CommunityStatsTile.infoText}
              />
            </Grid>
          ))}
        </>
      </GridContainer>
    </Box>
  );
}

const CommunityStatsTiles = [
  {
    image: "/icons/dollar-double-circle.svg",
    title: "Jan 2023 - Median Price",
    description: "$252,555",
    infoText: "Jan 2023 - Median Price",
  },
  {
    image: "/icons/home.svg",
    title: "Jan 2023 - New listings",
    description: "55",
    infoText: "Jan 2023 - New listings",
  },
  {
    image: "/icons/clock.svg",
    title: "Jan 2023 - Median days on market",
    description: "34",
    infoText: "Jan 2023 - Median days on market",
  },
  {
    image: "/icons/Line-Graph-Up.svg",
    title: "1 Year change value",
    description: "+10 %",
    infoText: "1 Year change value",
  },
  {
    image: "/icons/Line-Graph-Down.svg",
    title: "5 Year Change Value",
    description: "-1.3%",
    infoText: "5 Year Change Value",
  },
  {
    image: "/icons/Line-Graph-Up.svg",
    title: "10 Year Change Value",
    description: "+11 %",
    infoText: "10 Year Change Value",
  },
];
