import { GridContainer, Text } from "@/components";
import Select from "@/components/Select/Select";
import { colors, tokens } from "@/styles";
import { Box, Grid, useMediaQuery } from "@mui/material";
import RoomTile from "../RoomTile/RoomTile";
export default function Rooms() {
  const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down("sm"));
  return (
    <Box width={"100%"} marginTop={isMobile ? "30px" : "35px"}>
      <GridContainer
        justifyContent="space-between"
        alignItems="baseline"
        styles={{ marginBottom: isMobile ? "10px" : "15px" }}
      >
        <>
          <Text
            text="Room"
            token={
              isMobile ? tokens.FS16FW600LH21_86R : tokens.FS20FW500LH22_72SB
            }
            styles={{
              fontSize: isMobile ? "16px" : "18px",
            }}
            color={colors.black21}
          />
          {!isMobile && (
            <Select
              label=""
              options={[
                { id: 1, value: "sqrtfeet", label: "Sqrt Feet" },
                { id: 2, value: "meters", label: "Meters" },
                { id: 3, value: "yards", label: "Yards" },
              ]}
              selectedId={1}
              innerStyles={{
                padding: "0px 20px 0px 20px",
                backgroundColor: colors.blueC2,
                borderRadius: "50px",
                color: colors.whiteFF,
              }}
              IconComponent={<div style={{ color: colors.whiteFF }}>▼</div>}
            />
          )}
        </>
      </GridContainer>
      <GridContainer spacing={isMobile ? 1 : 2} justifyContent="flex-start">
        <>
          {rooms.map((room, index) => (
            <Grid key={index} item xs={6} sm={3} lg={4}>
              <RoomTile
                image={room.image}
                roomLocation={room.roomLocation}
                roomSize={room.roomSize}
                text={room.text}
              />
            </Grid>
          ))}
        </>
      </GridContainer>
    </Box>
  );
}

const rooms = [
  {
    image: "/icons/diningTable.svg",
    text: "Dining Room",
    roomLocation: "Main",
    roomSize: "1x3 m",
  },
  {
    image: "/icons/bed-blue.svg",
    text: "Bed Room",
    roomLocation: "Main",
    roomSize: "1x3 m",
  },
  {
    image: "/icons/diningTable.svg",
    text: "Dining Room",
    roomLocation: "Main",
    roomSize: "1x3 m",
  },

  {
    image: "/icons/diningTable.svg",
    text: "Dining Room",
    roomLocation: "Main",
    roomSize: "1x3 m",
  },

  {
    image: "/icons/bed-blue.svg",
    text: "Bed Room",
    roomLocation: "Main",
    roomSize: "1x3 m",
  },

  {
    image: "/icons/bed-blue.svg",
    text: "Bed Room",
    roomLocation: "Main",
    roomSize: "1x3 m",
  },

  {
    image: "/icons/bed-blue.svg",
    text: "Bed Room",
    roomLocation: "Main",
    roomSize: "1x3 m",
  },
  {
    image: "/icons/diningTable.svg",
    text: "Dining Room",
    roomLocation: "Main",
    roomSize: "1x3 m",
  },
];
