import { _DeepPartialObject } from "chart.js/dist/types/utils";
import { Bar } from "react-chartjs-2";
import React from "react";
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarController,
  BarElement,
} from "chart.js";

Chart.register({ CategoryScale, LinearScale, BarController, BarElement });

export default function BarChart({ dataset, width, height, options }: any) {
  return (
    <Bar
      data={dataset}
      options={{
        scales: {
          y: {
            beginAtZero: true,
          },
        },
        plugins: {
          legend: {
            position: "bottom",
          },
        },
      }}
    />
  );
}
