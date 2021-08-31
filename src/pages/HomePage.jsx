import React, { useEffect, useState } from 'react';
import * as mqtt from 'mqtt';

const HomePage = () => {
  const [mqttClient, setMqttClient] = useState(() => {
    const client = mqtt.connect("ws://mqtt.eclipseprojects.io/mqtt");
    client.on("connect", () => {
      client.subscribe("TCC_2021_2", (err) => {});
    });
    return client;
  });
  const [msg, setMsg] = useState({});

  useEffect(() => {
    mqttClient.on("message", (topic, message) => {
      const data = JSON.parse(message.toString());
      setMsg(data);
    });
  }, []);

  return(
    <div><h1>{msg.prediction}</h1></div>
  );
}

export default HomePage;
