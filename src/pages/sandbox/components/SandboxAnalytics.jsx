import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Line } from "react-chartjs-2";
import { FlexDiv } from "../../experiment/styles";

const SandboxAnalytics = () => {
  const [meanByDayOfWeek, setMeanByDayOfWeek] = useState({});
  const [meanByHourOfDay, setMeanByHourOfDay] = useState({});
  const sandboxReducer = useSelector((state) => state.sandbox)

  useEffect(() => {
    calculateMean(sandboxReducer.consumptions, 'dayOfWeek', setMeanByDayOfWeek);
    calculateMean(sandboxReducer.consumptions, 'hourOfDay', setMeanByHourOfDay);
  }, [sandboxReducer.consumptions]);

  const calculateMean = (consumptions, period, setFunction) => {
    const reduced = consumptions.reduce((acc, cur) => {
      if(!acc[cur[period]]){
        acc[cur[period]] = { ...cur, count: 1 }
        return acc;
      }
      acc[cur[period]].consumption += Number(cur.consumption);
      acc[cur[period]].count += 1;
      return acc;
    }, {})

    const result = Object.entries(reduced).reduce((acc, cur) => {
      acc[cur[0]] = cur[1].consumption/cur[1].count;
      return acc;
    }, {});

    setFunction(result);
  }

  return(
    <FlexDiv flexDirection='column' width='100%'>
      <Line
        data={{
          labels: Object.keys(meanByDayOfWeek),
          datasets: [{
            label: 'Consumo (Wh)',
            data: Object.values(meanByDayOfWeek)
          }]
        }}
        options={{
          responsive: true,
            plugins: {
              legend: {
                position: 'top',
              },
              title: {
                display: true,
                text: 'Média do consumo por dia da semana'
              }
          }
        }}
      />
      <Line
        data={{
          labels: Object.keys(meanByHourOfDay),
          datasets: [{
            label: 'Consumo (Wh)',
            data: Object.values(meanByHourOfDay)
          }]
        }}
        options={{
          responsive: true,
            plugins: {
              legend: {
                position: 'top',
              },
              title: {
                display: true,
                text: 'Média do consumo por hora do dia'
              }
          }
        }}
      />
    </FlexDiv>
  );
}

export default SandboxAnalytics;