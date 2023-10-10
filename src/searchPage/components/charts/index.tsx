import { useEffect, useState } from "react";

import dynamic from "next/dynamic";

interface AdzvizerChartInterface {
  chartType?:
    | "area"
    | "line"
    | "bar"
    | "pie"
    | "donut"
    | "radialBar"
    | "scatter"
    | "bubble"
    | "heatmap"
    | "treemap"
    | "boxPlot"
    | "candlestick"
    | "radar"
    | "polarArea"
    | "rangeBar"
    | undefined;
  chartData?: { options: object; series: any[] };
}

const MainCharts = ({ chartData, chartType }: AdzvizerChartInterface) => {
  const ReactApexChart = dynamic(() => import("react-apexcharts"), {
    ssr: false,
  });
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoaded(true);
    setError(!chartData || !chartData.options || !chartData.series);
  }, [chartData]);

  if (error) {
    return <div>Invalid chart data. Please check your data and try again.</div>;
  }
  return (
    <div style={{ width: "100%" }}>
      {loaded && (
        <ReactApexChart
          options={chartData.options}
          series={chartData.series}
          type={chartType}
          height={350}
        />
      )}
    </div>
  );
};

export default MainCharts;
