import { Text } from "@/components";
import {
  colors,
  displayFlexAlignItemsCenterJustifyContentCenter,
  displayFlexAlignItemsCenterJustifyContentFlexStart,
  displayFlexAlignItemsCenterJustifyContentSpaceBetween,
  tokens,
} from "@/styles";
import { Box, Tooltip, useMediaQuery } from "@mui/material";
import Image from "next/image";

interface TileWithIconTextAndInfoProps {
  style?: React.CSSProperties;
  description: string;
  title: string;
  image: string;
  infoText: string;
}

export default function TileWithIconTextAndInfo({
  style,
  description,
  image,
  title,
  infoText,
}: TileWithIconTextAndInfoProps) {
  const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down("sm"));
  return (
    <Box
      width={"100%"}
      borderRadius={"8px"}
      {...displayFlexAlignItemsCenterJustifyContentSpaceBetween}
      alignItems={"center"}
      padding={isMobile ? "10px" : "25px 20px"}
      style={style}
      border={`1px solid ${colors.greyE1}`}
      boxShadow={" 0px 13px 34px 0px #00000008"}
      height="100%"
    >
      <Box
        {...displayFlexAlignItemsCenterJustifyContentFlexStart}
        gap={isMobile ? "10px" : "20px"}
      >
        <Box
          height={isMobile ? "20px" : "35px"}
          width={isMobile ? "20px" : "35px"}
        >
          <Image
            src={image}
            alt="image"
            width={0}
            height={0}
            sizes="100%"
            style={{ width: "100%", height: "100%" }}
          />
        </Box>
        <Box
          {...displayFlexAlignItemsCenterJustifyContentFlexStart}
          flexDirection={"column"}
          alignItems={"flex-start"}
          gap={"10px"}
        >
          <Text
            text={title}
            token={isMobile ? tokens.FS11FW400LH18R : tokens.FS16FW400LH18R}
            color={colors.grey96}
            textAlign="left"
          />
          <Text
            text={description}
            token={
              isMobile ? tokens.FS16FW300LH21_86R : tokens.FS20FW600LH22_72SB
            }
            color={colors.blue5C}
            textAlign="left"
            styles={{ fontSize: { xs: "16px", sm: "18px" } }}
          />
        </Box>
      </Box>
      <Tooltip title={infoText} enterDelay={500} leaveDelay={200}>
        <Box
          height={isMobile ? "10px" : "20px"}
          width={isMobile ? "10px" : "20px"}
        >
          <Image
            src={"/icons/info.svg"}
            alt="info"
            width={0}
            height={0}
            sizes="100%"
            style={{ width: "100%", height: "100%" }}
          />
        </Box>
      </Tooltip>{" "}
    </Box>
  );
}
