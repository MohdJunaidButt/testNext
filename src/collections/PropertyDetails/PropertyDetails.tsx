import { GridContainer, GroupedRadioTile, Text } from "@/components";
import { Box, Grid, useMediaQuery } from "@mui/material";

import {
  colors,
  displayFlexAlignItemsCenterJustifyContentCenter,
  tokens,
} from "@/styles";
import { useState } from "react";
export default function PropertyDetails() {
  const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down("sm"));
  const [selectedId, setSelectedId] = useState(1);
  return (
    <Box width={"100%"} marginTop={isMobile ? "30px" : "35px"}>
      <Text
        text="Property Details"
        token={isMobile ? tokens.FS16FW600LH21_86R : tokens.FS20FW500LH22_72SB}
        styles={{
          fontSize: isMobile ? "16px" : "18px",
          marginBottom: isMobile ? "10px" : "15px",
        }}
        color={colors.black21}
        textAlign="left"
      />
      <GroupedRadioTile
        radioItems={[
          { id: 1, label: "Property", value: "property" },
          { id: 2, label: "Building", value: "building" },
          { id: 3, label: "Inside", value: "inside" },
          { id: 4, label: "Parking", value: "parking" },
          { id: 5, label: "Highlights", value: "highlights" },
          { id: 6, label: "Inside", value: "inside" },
          { id: 7, label: "Land", value: "land" },
        ]}
        token={tokens.FS14FW600LH16SB}
        selectedId={selectedId}
        onClick={(selectedIndex) => setSelectedId(selectedIndex)}
        styles={{
          overflowX: "auto",
          "& > *": {
            flex: 1,
          },
        }}
      />
      {renderPropertyDetailContainer(
        [
          { title: "Property Type", description: "Detached" },
          { title: "Style", description: "Single Storey" },
          { title: "Fronting on", description: "W" },
          { title: "Community", description: "None" },
          { title: "Municipality", description: "None" },
        ],
        isMobile
      )}
    </Box>
  );
}

const renderPropertyDetailContainer = (
  propertyDetails: any,
  isMobile: boolean
) => {
  return (
    <Box
      border={`1px solid ${colors.grey96}`}
      marginTop={"17px"}
      borderRadius={"10px"}
      padding={"15px"}
    >
      <GridContainer justifyContent="flex-start" spacing={isMobile ? 3 : 6}>
        {propertyDetails.map((propertyDetail: any) =>
          renderPropertyDetail(propertyDetail, isMobile)
        )}
      </GridContainer>{" "}
    </Box>
  );
};

const renderPropertyDetail = (
  propertyDetailsItems: {
    title: string;
    description: string;
  },
  isMobile: boolean
) => {
  return (
    <Grid
      item
      xs={6}
      sm={4}
      xl={3}
      {...displayFlexAlignItemsCenterJustifyContentCenter}
      flexDirection={"column"}
      alignItems={"flex-start"}
      gap={"5px"}
    >
      <Text
        text={propertyDetailsItems.title}
        color={colors.black21}
        token={isMobile ? tokens.FS14FW600LH16SB : tokens.FS16FW600LH21_86SB}
        textAlign="left"
      />
      <Text
        text={propertyDetailsItems.description}
        color={colors.grey9C}
        token={isMobile ? tokens.FS14FW400LH19R : tokens.FS16FW400LH18R}
        textAlign="left"
      />
    </Grid>
  );
};
