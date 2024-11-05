import { Dialog, styled } from "@mui/material";

const DialogWrapper = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    borderRadius: "20px",
  },
  // "& .MuiDialogTitle-root": {
  //   padding: "21px 19px",
  //   [theme.breakpoints.up("md")]: {
  //     padding: "23px 37px",
  //   },
  // },
  // "& .MuiDialogContent-root": {
  //   padding: "0px 19px 21px",
  //   [theme.breakpoints.up("md")]: {
  //     padding: "0px 37px 23px",
  //   },
  // },
}));

export default DialogWrapper;
