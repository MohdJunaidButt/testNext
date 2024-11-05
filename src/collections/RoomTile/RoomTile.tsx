import { Text } from "@/components";
import {
  colors,
  displayFlexAlignItemsCenterJustifyContentCenter,
  displayFlexAlignItemsCenterJustifyContentSpaceBetween,
  tokens,
} from "@/styles";
import { Box, useMediaQuery } from "@mui/material";
import Image from "next/image";

interface RoomTileProps {
  style?: React.CSSProperties;
  image: string;
  text: string;
  roomLocation: string;
  roomSize: string;
}

export default function RoomTile({
  style,
  image,
  text,
  roomLocation,
  roomSize,
}: RoomTileProps) {
  const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down("sm"));
  return (
    <Box
      width={"100%"}
      borderRadius={"8px"}
      border={`1px solid ${colors.greyE1}`}
      {...displayFlexAlignItemsCenterJustifyContentCenter}
      padding={"15px 10px"}
      style={style}
      flexDirection={"column"}
    >
      <Box height={"30px"} width={"30px"} marginBottom={"10px"}>
        <Image
          src={image}
          alt="image"
          width={0}
          height={0}
          sizes="100%"
          style={{ width: "100%", height: "100%" }}
        />
      </Box>
      <Text
        text={text}
        token={tokens.FS14FW600LH16SB}
        color={colors.black21}
        styles={{ marginBottom: "10px" }}
      />
      <Box {...displayFlexAlignItemsCenterJustifyContentSpaceBetween}>
        <Box
          {...displayFlexAlignItemsCenterJustifyContentCenter}
          marginRight={"10px"}
          alignItems="stretch"
        >
          {" "}
          <Box height={"15px"} width={"15px"} marginRight="5px">
            <Image
              src={"/icons/arrowRadialDown.svg"}
              alt="arrowRadialDown"
              width={0}
              height={0}
              sizes="100%"
              style={{ width: "100%", height: "100%" }}
            />
          </Box>{" "}
          <Text
            text={roomLocation}
            token={isMobile ? tokens.FS14FW400LH19R : tokens.FS14FW400LH19R}
            color={colors.grey96}
          />
        </Box>
        <Box
          {...displayFlexAlignItemsCenterJustifyContentCenter}
          alignItems="stretch"
        >
          {" "}
          <Box height={"15px"} width={"15px"} marginRight="5px">
            <Image
              src={"/icons/area-Borders.svg"}
              alt="area-Borders"
              width={0}
              height={0}
              sizes="100%"
              style={{ width: "100%", height: "100%" }}
            />
          </Box>{" "}
          <Text
            text={roomSize}
            token={isMobile ? tokens.FS14FW400LH19R : tokens.FS14FW400LH19R}
            color={colors.grey96}
          />
        </Box>
      </Box>
    </Box>
  );
}
