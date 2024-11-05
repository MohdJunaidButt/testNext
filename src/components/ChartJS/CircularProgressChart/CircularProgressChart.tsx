import { _DeepPartialObject } from "chart.js/dist/types/utils";
import { Doughnut } from "react-chartjs-2";
import React from "react";
import { Chart, ArcElement } from "chart.js";
import { Box } from "@mui/material";
import { colors } from "@/styles";

Chart.register(ArcElement);

export default function CircularProgressChart({
  dataset,
  width,
  height,
  options,
  text,
}: any) {
  const customPlugin = {
    id: "textCenter",

    beforeDatasetsDraw(chart: any, args: any, pluginOptions: any) {
      const { ctx, data } = chart;

      ctx.save();
      ctx.font = "20px Manrope-Regular";
      ctx.fillStyle = colors.black21;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(
        `${dataset.datasets[0].data[0]}%`,
        chart.getDatasetMeta(0).data[0].x,
        chart.getDatasetMeta(0).data[0].y - 15
      );
      ctx.fillText(
        text,
        chart.getDatasetMeta(0).data[0].x,
        chart.getDatasetMeta(0).data[0].y + 15
      );
    },
  };
  return (
    <Doughnut
      data={dataset}
      plugins={[customPlugin]}
      options={{
        cutout: 60,
        rotation: -120,
        responsive: true,
        maintainAspectRatio: false,
        elements: {
          line: {
            borderWidth: 0,
            // Adjust the width as per your requirement
          },
        },
      }}
    />
  );
}
