import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Line } from "react-chartjs-2";
import { FlexDiv } from "../../experiment/styles";
import { SORTED_WEEK_DAYS, SORTED_HOURS } from "../../../config/constants";

const SandboxAnalytics = () => {
  const [meanByDayOfWeek, setMeanByDayOfWeek] = useState({});
  const [meanByHourOfDay, setMeanByHourOfDay] = useState({});
  const sandboxReducer = useSelector((state) => state.sandbox);

  useEffect(() => {
    calculateMean(sandboxReducer.consumptions, "dayOfWeek", setMeanByDayOfWeek);
    calculateMean(sandboxReducer.consumptions, "hourOfDay", setMeanByHourOfDay);
  }, [sandboxReducer.consumptions]);

  const calculateMean = (consumptions, period, setFunction) => {
    const reduced = consumptions.reduce((acc, cur) => {
      if (!acc[cur[period]]) {
        acc[cur[period]] = { ...cur, count: 1 };
        return acc;
      }
      acc[cur[period]].consumption += Number(cur.consumption);
      acc[cur[period]].count += 1;
      return acc;
    }, {});

    let result = Object.entries(reduced).reduce((acc, cur) => {
      acc[cur[0]] = cur[1].consumption / cur[1].count;
      return acc;
    }, {});

    switch (period) {
      case "dayOfWeek":
        result = Object.fromEntries(
          Object.entries(result).sort(
            (a, b) =>
              SORTED_WEEK_DAYS.indexOf(a[0]) - SORTED_WEEK_DAYS.indexOf(b[0])
          )
        );
        break;

      case "hourOfDay":
        result = Object.fromEntries(
          Object.entries(result)
            .sort(
              (a, b) => SORTED_HOURS.indexOf(a[0]) - SORTED_HOURS.indexOf(b[0])
            )
            .map((x) => [parseInt(x[0], 10), x[1]])
        );
        break;

      default:
        break;
    }

    setFunction(result);
  };

  return (
    <FlexDiv flexDirection="column" width="100%">
      <Line
        data={{
          labels: Object.keys(meanByDayOfWeek),
          datasets: [
            {
              label: "Consumo (Wh)",
              data: Object.values(meanByDayOfWeek),
              borderColor: "rgb(54, 162, 235)",
              fill: false,
            },
          ],
        }}
        options={{
          responsive: true,
          plugins: {
            legend: {
              position: "top",
            },
            title: {
              display: true,
              text: "Média do consumo por dia da semana",
            },
          },
        }}
      />
      <Line
        data={{
          labels: Object.keys(meanByHourOfDay),
          datasets: [
            {
              label: "Consumo (Wh)",
              data: Object.values(meanByHourOfDay),
              borderColor: "rgb(54, 162, 235)",
              fill: false,
            },
          ],
        }}
        options={{
          responsive: true,
          plugins: {
            legend: {
              position: "top",
            },
            title: {
              display: true,
              text: "Média do consumo por hora do dia",
            },
          },
        }}
      />
    </FlexDiv>
  );
};

export default SandboxAnalytics;
