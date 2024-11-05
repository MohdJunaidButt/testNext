import { _DeepPartialObject } from "chart.js/dist/types/utils";
import { Line } from "react-chartjs-2";
import React from "react";
import {
  CategoryScale,
  PointElement,
  Chart,
  LinearScale,
  LineElement,
} from "chart.js";

Chart.register(CategoryScale, LinearScale, PointElement, LineElement);

export default function LineChart({ dataset, width, height, options }: any) {
  return (
    <Line
      data={dataset}
      options={{
        plugins: { legend: { display: true, position: "top" } },
        responsive: true,
      }}
    />
  );
}
