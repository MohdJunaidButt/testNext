import { colors } from "@/styles";
import { ApexOptions } from "apexcharts";

// chart options
export const columnChartOptions: ApexOptions = {
  chart: {
    height: 400,
    type: "area",
    toolbar: {
      show: false,
    },
  },

  legend: {
    position: "bottom",
    horizontalAlign: "right",
    markers: {
      radius: 0,
      offsetY: 1,
      offsetX: -4,
    },
    itemMargin: {
      horizontal: 10,
      vertical: 15,
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: "smooth",
    width: 1,
  },
  grid: {
    strokeDashArray: 0,
  },
  colors: [colors.blueC2, colors.red00, colors.yellow00],
  markers: {
    size: 8,
    colors: undefined,
    strokeColors: "#fff",
    strokeWidth: 2,
    strokeOpacity: 0.9,
    strokeDashArray: 0,
    fillOpacity: 1,
    discrete: [],
    shape: "circle",
    radius: 2,
    offsetX: 0,
    offsetY: 0,
    onClick: undefined,
    onDblClick: undefined,
    showNullDataPoints: true,
    hover: {
      size: undefined,
      sizeOffset: 3,
    },
  },
  xaxis: {
    categories: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
  },
};
