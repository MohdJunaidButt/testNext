import { TextInputWithNoBorders } from "@/components";
import Button from "@/components/Button/Button";
import VerticalDivider from "@/components/VeriticalDivider/VerticalDivider";
import {
  colors,
  displayFlexAlignItemsCenterJustifyContentFlexStart,
  tokens,
} from "@/styles";
import { Box } from "@mui/material";

export default function PropertySearchWidget() {
  return (
    <Box
      height={"88px"}
      width={"100%"}
      {...displayFlexAlignItemsCenterJustifyContentFlexStart}
      gap={"15px"}
    >
      <Box
        paddingLeft={"10px"}
        paddingRight={"10px"}
        borderRadius={"8px"}
        {...displayFlexAlignItemsCenterJustifyContentFlexStart}
        sx={{
          boxShadow: "0px 13px 24px 0px rgba(0, 0, 0, 0.05)",
          flex: 4,
          backgroundColor: colors.whiteFF,
        }}
        height={"100%"}
        width={"100%"}
      >
        <TextInputWithNoBorders
          placeholder="Apart, condos etc"
          label="Property Type"
          onChange={() => {}}
          styles={{ width: "100%" }}
        />
        <VerticalDivider color={colors.greyEB} height={"60%"} />
        <TextInputWithNoBorders
          placeholder="Toronto, Montreal"
          label="City"
          onChange={() => {}}
          styles={{ width: "100%" }}
        />
        <VerticalDivider color={colors.greyEB} height={"60%"} />
        <TextInputWithNoBorders
          placeholder="45000, 46000"
          label="Postal Code"
          onChange={() => {}}
          styles={{ width: "100%" }}
        />
        <VerticalDivider color={colors.greyEB} height={"60%"} />
        <TextInputWithNoBorders
          placeholder="1000, 5000"
          label="Price"
          onChange={() => {}}
          styles={{ width: "100%" }}
        />
      </Box>
      <Button
        text=""
        icon={"/icons/magnifier.svg"}
        iconAlt={"/icons/magnifier.svg"}
        onClick={() => {}}
        justifyContent="center"
        token={tokens.FS13FW400LH18R}
        iconSize={{ width: 24, height: 24 }}
        variant="darkBlue"
        maxWidth
        borderRadius="8px"
        style={{ width: "100px" }}
      />
    </Box>
  );
}
