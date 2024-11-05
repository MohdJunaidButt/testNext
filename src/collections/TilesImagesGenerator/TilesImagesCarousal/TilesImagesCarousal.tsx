import { GridContainer, ResponsiveCarousal } from "@/components";
import ResponsiveContainer from "@/components/ResponsiveContainer/ResponsiveContainer";
import { Box, useMediaQuery } from "@mui/material";
import Image from "next/image";
export default function TilesImagesCarousal({
  images,
  centerSlidePercentage = 50,
}: any) {
  const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down("sm"));
  return (
    <Box width={"100%"} marginTop={isMobile ? "20px" : "50px"}>
      <ResponsiveCarousal centerSlidePercentage={centerSlidePercentage}>
        {images.map((image: string, index: number) => (
          <Box height={isMobile ? "250px" : "412px"} width={"95%"} key={index}>
            <Image
              key={index}
              src={image}
              alt={"image" + index}
              width={0}
              height={0}
              sizes="100%"
              style={{
                width: isMobile ? "100vw" : "100%",
                height: "100%",
                marginRight: "50px",
              }}
            />
          </Box>
        ))}
      </ResponsiveCarousal>
    </Box>
  );
}
