import React, { useEffect, useState } from "react";
import { axiosSige } from "../../axiosInstance";
import { FormControl, InputLabel, Select } from "@mui/material";
import { Line } from "react-chartjs-2";
import SIGE_ENDPOINTS from "../../config/sige_endpoints";
import { FlexDiv } from "../experiment/styles";
import { xgboostValues } from "../load_curve/constValues";

const MockChart = () => {
  const [campiList, setCampiList] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axiosSige
      .get(SIGE_ENDPOINTS.campi)
      .then((response) => {
        const campis = response.data.map((x) => ({
          [x.name]: [...new Set(x.groups_related.map(JSON.stringify))].map(
            JSON.parse
          ),
        }));
        setCampiList(campis);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <FlexDiv flexDirection="column" padding="16px">
      <FlexDiv justifyContent="center" alignItems="center" padding="0px 0px 16px 0px">
        <FormControl sx={{ minWidth: 170 }}>
          <InputLabel htmlFor="grouped-departments">Prédio</InputLabel>
          <Select
            native
            label="Prédio"
            defaultValue="1"
            id="grouped-departments"
            onChange={() => {}}
          >
            <option aria-label="None" value="" />
            {campiList.map((campi, index) => {
              const [[key, transductors]] = Object.entries(campi);
              return (
                <optgroup key={index} label={key}>
                  {transductors.map((transductor, index) => (
                    <option key={index} value={transductor.id}>
                      {transductor.name}
                    </option>
                  ))}
                </optgroup>
              );
            })}
          </Select>
        </FormControl>
      </FlexDiv>
      <Line
        data={{
          labels: [
            "10:00",
            "10:15",
            "10:30",
            "10:45",
            "11:00",
            "11:15",
            "11:30",
            "11:45",
            "12:00",
            "12:15",
          ],
          datasets: [
            {
              label: "Dados Reais",
              backgroundColor: "rgb(54, 162, 235)",
              borderColor: "rgb(54, 162, 235)",
              fill: false,
              data: xgboostValues.load_curve.slice(
                xgboostValues.load_curve.length - 9,
                xgboostValues.load_curve.length
              ),
            },
            {
              label: "Predições",
              backgroundColor: "rgb(255, 99, 132)",
              borderColor: "rgb(255, 99, 132)",
              fill: false,
              data: [
                { x: 21, y: 6411.95166015625 },
                { x: 21.25, y: 6340.4990234375 },
                { x: 21.5, y: 6388.31103515625 },
                { x: 21.75, y: 6343.01953125 },
                { x: 22, y: 6302.42236328125 },
                { x: 22.25, y: 6345.318359375 },
                { x: 22.5, y: 6318.76953125 },
                { x: 22.75, y: 6267.75634765625 },
                { x: 23, y: 6291.68408203125 },
                { x: 23.25, y: 6310.42 },
              ],
            },
          ],
        }}
      />
    </FlexDiv>
  );
};

export default MockChart;
