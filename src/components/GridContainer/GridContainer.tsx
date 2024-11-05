import { GridContainerProps } from "@/types";
import { Grid } from "@mui/material";

export const GridContainer = ({
  justifyContent = "center",
  children,
  spacing = 0,
  alignItems = "inherit",
  styles,
}: GridContainerProps) => {
  return (
    <Grid
      spacing={spacing}
      container
      sx={{ ...styles }}
      justifyContent={justifyContent}
      alignItems={alignItems}
    >
      {children}
    </Grid>
  );
};
