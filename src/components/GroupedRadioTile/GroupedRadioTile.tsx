import {
  colors,
  displayFlexAlignItemsCenterJustifyContentFlexStart,
  tokens,
} from "@/styles";
import { GroupedRadioTileProps } from "@/types";
import { Box } from "@mui/material";
import { useRouter } from "next/router";
import { Text } from "../Text";

export function GroupedRadioTile({
  token,
  radioItems,
  selectedId,
  styles,
  onClick,
}: GroupedRadioTileProps) {
  const router = useRouter();
  return (
    <Box
      sx={styles}
      width={"100%"}
      {...displayFlexAlignItemsCenterJustifyContentFlexStart}
    >
      {radioItems.map((radioItem, index) => {
        if (index === 0) {
          return (
            <Box
              key={index}
              padding={"8px 15px 8px 15px"}
              bgcolor={
                selectedId === radioItem.id ? colors.blueC2 : colors.greyEB
              }
              style={{
                borderTopLeftRadius: "8px",
                borderBottomLeftRadius: "8px",
                cursor: "pointer",
                transition: "background-color 100ms ease-in",
                borderRight: `1px solid ${colors.greyE1}`,
              }}
              onClick={() => onClick(index + 1)}
            >
              <Text
                text={radioItem.label}
                token={tokens.FS16FW500LH21_86R}
                color={
                  selectedId === radioItem.id ? colors.whiteFF : colors.black21
                }
                cursor="pointer"
              />
            </Box>
          );
        } else if (index === radioItems.length - 1) {
          return (
            <Box
              key={index}
              padding={"8px 15px 8px 15px"}
              bgcolor={
                selectedId === radioItem.id ? colors.blueC2 : colors.greyEB
              }
              style={{
                borderTopRightRadius: "8px",
                borderBottomRightRadius: "8px",
                cursor: "pointer",
                transition: "background-color 100ms ease-in",
                borderLeft: `1px solid ${colors.greyE1}`,
              }}
              onClick={() => onClick(index + 1)}
            >
              <Text
                text={radioItem.label}
                token={tokens.FS16FW500LH21_86R}
                color={
                  selectedId === radioItem.id ? colors.whiteFF : colors.black21
                }
                cursor="pointer"
              />
            </Box>
          );
        } else {
          return (
            <Box
              key={index}
              padding={"8px 15px 8px 15px"}
              bgcolor={
                selectedId === radioItem.id ? colors.blueC2 : colors.greyEB
              }
              style={{
                cursor: "pointer",
                transition: "background-color 100ms ease-in",
                borderLeft: `1px solid ${colors.greyE1}`,
                borderRight: `1px solid ${colors.greyE1}`,
              }}
              onClick={() => onClick(index + 1)}
            >
              <Text
                text={radioItem.label}
                token={tokens.FS16FW500LH21_86R}
                color={
                  selectedId === radioItem.id ? colors.whiteFF : colors.black21
                }
                cursor="pointer"
              />
            </Box>
          );
        }
      })}
    </Box>
  );
}
