import React, { useEffect, useState, useMemo, useRef } from 'react';
import { Line } from "react-chartjs-2";
import "chartjs-plugin-streaming";
import * as mqtt from 'mqtt';

const RealTimeChart = () => {
  const [mqttClient] = useState(() => {
    const client = mqtt.connect(process.env.REACT_APP_BROKER_HOST);
    client.on("connect", () => {
      client.subscribe("TCC_2021_2", (err) => console.log(err));
    });
    return client;
  });
  const chartRef = useRef();

  useEffect(() => {
    mqttClient.on("message", (topic, message) => {
      const data = JSON.parse(message.toString());
      if(chartRef.current){
        chartRef.current.data.datasets.forEach(function(dataset) {
          dataset.data.push({
            x: Date.now(),
            y: data.prediction
          });
        });
        chartRef.current.update();
      }
    });
    return () => {
      mqttClient.end();
    }
  }, []);

  const RealTimeChart = useMemo(() => (
    <Line
      ref={chartRef}
      data={{
        datasets: [{
          label: 'Prediction',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
          borderColor: 'rgb(255, 99, 132)',
          borderDash: [8, 4],
          fill: true,
          data: []
        }]
      }}
      options={{
        scales: {
          x: {
            type: 'realtime',
            realtime: {
              duration: 20000,
              delay: 1000
            }
          }
        }
      }}
    />
    ), []
  );

  return(
    <>
      {RealTimeChart}
    </>
  );
}

export default RealTimeChart;
