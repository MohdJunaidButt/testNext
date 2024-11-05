import Button from "@/components/Button/Button";
import { Text } from "@/components/Text";
import {
  colors,
  displayFlexAlignItemsCenterJustifyContentCenter,
  tokens,
} from "@/styles";
import { Box, ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";
import React, { useEffect, useState } from "react";

type StepperMobileProps = {
  steps: Array<{ label: string; isLock: boolean }>;
  handleMenuItemClick: any;
  activeStep: number;
};

const StepperMobile = ({
  steps,
  handleMenuItemClick,
  activeStep,
}: StepperMobileProps) => {
  const [anchorEl, setAnchorEl] = useState<any | null>(null);

  const handleClick = (event: any) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  useEffect(() => {
    const handleScroll = () => {
      setAnchorEl(null);
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [anchorEl]);

  return (
    <>
      <Button
        text={`${steps[activeStep].label}`}
        justifyContent="center"
        borderRadius="41px"
        onClick={handleClick}
        token={tokens.FS13FW400LH18R}
        variant={"blue"}
        style={{
          width: "100%",
          height: "fit-content",
          fontWeight: 600,
          padding: "11px 13px",
          justifyContent: "start",
        }}
        icon={`/icons/step${activeStep + 1}.svg`}
        iconAlt={`/icons/step${activeStep + 1}.svg`}
        iconSize={{
          width: 23,
          height: 23,
        }}
      />
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          elevation: 0,
        }}
        sx={{
          "& .MuiMenu-list": {
            marginTop: "10px",
            borderRadius: "20px",
            boxShadow: "0px 0px 1px 0px rgb(0 0 0 / 5%)",
            backgroundColor: colors.black21,
            paddingBlock: "0px",
            "& > li": {
              width: "140px",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
            },
            "& > li:not(:last-of-type)": {
              borderBottom: `1px solid rgba(0, 0, 0, 0.19)`,
            },
          },
        }}
      >
        {steps.map((el, index) => (
          <MenuItem
            key={el.label}
            onClick={() => {
              handleMenuItemClick(index);
              handleClose();
            }}
            style={{
              ...(anchorEl && { width: anchorEl.offsetWidth }),
            }}
            disabled={el.isLock}
          >
            <ListItemIcon>
              <Box
                sx={{
                  backgroundColor: colors.whiteFF,
                  borderRadius: "50%",
                  padding: "5px",
                  width: "23px",
                  height: "23px",
                  ...displayFlexAlignItemsCenterJustifyContentCenter,
                }}
              >
                <Text
                  text={`${index + 1}`}
                  color={colors.blueC2}
                  token={tokens.FS13FW400LH18R}
                  textAlign="left"
                  styles={{ fontWeight: "600" }}
                />
              </Box>
            </ListItemIcon>
            <ListItemText>
              <Text
                text={el.label}
                color={index < activeStep ? colors.blueC2 : colors.whiteFF}
                token={tokens.FS13FW400LH18R}
                textAlign="left"
                styles={{ fontWeight: "600" }}
              />
            </ListItemText>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default StepperMobile;
