import { _DeepPartialObject } from "chart.js/dist/types/utils";
import { Line } from "react-chartjs-2";
import React, { useEffect, useState } from "react";
import {
  CategoryScale,
  PointElement,
  Chart,
  LinearScale,
  LineElement,
} from "chart.js";
import { columnChartOptions } from "@/components/ApexCharts/ChartOptions";
import ReactApexChart from "react-apexcharts";
import { Box } from "@mui/material";
import { Text } from "@/components/Text";
import { colors, tokens } from "@/styles";

Chart.register(CategoryScale, LinearScale, PointElement, LineElement);

type Series = {
  name: string;
  data: Array<number>;
};

type AreaChartProps = {
  datasetSeries: Array<Series>;
  bottomLabel?: string;
  isMobile?: boolean;
  seriesOpacity?: Array<number>;
  showMarker?: boolean;
  strokeWidth?: Array<number>;
};

export default function AreaChart({
  datasetSeries,
  bottomLabel = "",
  isMobile,
  seriesOpacity = [],
  showMarker = true,
  strokeWidth = [],
}: AreaChartProps) {
  const [series, setSeries] = useState([
    {
      name: "Houses",
      data: [130, 50, 105, 144, 80, 45, 120, 80, 95, 114, 180, 80],
    },
    {
      name: "Other Properties",
      data: [100, 90, 135, 114, 120, 145, 70, 40, 35, 100, 150, 90],
    },
  ]);

  useEffect(() => {
    setSeries([...datasetSeries]);
  }, [datasetSeries]);

  const [options, setOptions] = useState(columnChartOptions);

  return (
    <Box id="chart" position="relative">
      <ReactApexChart
        options={{
          ...options,
          markers: {
            ...options.markers,
            size: showMarker ? 8 : 0,
          },

          fill: {
            type: "gradient",
            gradient: {
              shadeIntensity: 0.9,
              opacityFrom:
                seriesOpacity.length === 0
                  ? [...Array(series.length).fill(0)]
                  : seriesOpacity,
              opacityTo:
                seriesOpacity.length === 0
                  ? [...Array(seriesOpacity.length).fill(0)]
                  : [
                      ...Array(seriesOpacity.length)
                        .fill(0)
                        .map((_, ind) => {
                          if (seriesOpacity[ind] === 0) return 0;
                          else return 0.8;
                        }),
                    ],

              stops: [0, 100],
              // opacityTo:
            },
            // opacity:
            //   seriesOpacity.length === 0
            //     ? [...Array(series.length).fill(0)]
            //     : seriesOpacity,
          },
          stroke: {
            ...options.stroke,
            width:
              strokeWidth.length === 0
                ? [...Array(series.length).fill(2.5)]
                : strokeWidth,
          },
        }}
        series={series}
        type="area"
        height={450}
        width={isMobile ? 800 : "100%"}
      />
      {bottomLabel !== "" && (
        <Text
          text={bottomLabel}
          token={tokens.FS14FW500LH19R}
          color={colors.black21}
          textAlign="left"
          styles={{ position: "absolute", bottom: "4%", left: "3.5%" }}
        />
      )}
    </Box>
  );
}
