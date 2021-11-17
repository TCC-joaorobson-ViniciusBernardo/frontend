import React, { useEffect, useState, useMemo, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Line } from "react-chartjs-2";
import "chartjs-plugin-streaming";
import * as mqtt from "mqtt";
import moment from "moment";
import "moment/locale/pt-br";
import { update } from "./reducers/realTimeChartSlice";

const RealTimeChart = () => {
  const dispatch = useDispatch();
  const realTimeChartReducer = useSelector((state) => state.realTimeChart);
  const [mqttClient] = useState(() => {
    const client = mqtt.connect(process.env.REACT_APP_BROKER_HOST);
    client.on("connect", () => {
      client.subscribe("CPD_1", (err) => console.error(err));
    });
    return client;
  });
  const chartRef = useRef();

  const updateChart = (data) => {
    const labels = data.timestamps.map((x) =>
      moment.utc(x * 1000).format("HH:mm")
    );
    const realData = data.timestamps.map((timestamp, i) => ({
      x: timestamp * 1000,
      y: data.data[i],
    }));
    const predictions = data.timestamps.map((timestamp, i) => ({
      x: timestamp * 1000,
      y: data.predictions[i],
    }));
    if (chartRef.current) {
      chartRef.current.data.labels = labels;
      chartRef.current.data.datasets.forEach(function (dataset) {
        if (dataset.label === "Dados Reais") {
          dataset.data = realData;
        } else {
          dataset.data = predictions;
        }
      });
      chartRef.current.update();
    }
    dispatch(update({ labels, predictions, data: realData }));
  };

  useEffect(() => {
    mqttClient.on("message", (topic, message) => {
      const data = JSON.parse(message.toString());
      updateChart(data);
    });
    return () => {
      mqttClient.end();
    };
  }, []);

  const RealTimeChart = useMemo(
    () => (
      <Line
        ref={chartRef}
        data={{
          labels: realTimeChartReducer.labels,
          datasets: [
            {
              label: "Dados Reais",
              backgroundColor: "rgba(54, 162, 235, 0.5)",
              borderColor: "rgb(54, 162, 235)",
              fill: false,
              data: realTimeChartReducer.data,
            },
            {
              label: "Predições",
              backgroundColor: "rgba(255, 99, 132, 0.5)",
              borderColor: "rgb(255, 99, 132)",
              fill: false,
              data: realTimeChartReducer.predictions,
            },
          ],
        }}
      />
    ),
    []
  );

  return <>{RealTimeChart}</>;
};

export default RealTimeChart;
