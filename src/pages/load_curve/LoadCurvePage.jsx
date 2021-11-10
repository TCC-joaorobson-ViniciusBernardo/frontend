import React, { useState, useEffect } from 'react';
import { axiosSige } from '../../axiosInstance';
import SIGE_ENDPOINTS from '../../config/sige_endpoints';
import { Scatter } from 'react-chartjs-2';
import { FlexDiv } from '../experiment/styles';
import { xgboostValues, svrValues } from './constValues';
import DatePicker from '@mui/lab/DatePicker';
import { FormControl, InputLabel, Select, TextField, OutlinedInput, Box, Chip, MenuItem } from '@mui/material';

const LoadCurvePage = () => {
  const [campiList, setCampiList] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axiosSige
      .get(SIGE_ENDPOINTS.campi)
      .then((response) => {
        const campis = response.data.map(
          (x) => ({
            [x.name]: [...new Set(x.groups_related.map(JSON.stringify))].map(JSON.parse)
          })
        );
        setCampiList(campis);
      })
      .catch(error => {
        console.error(error);
      })
  }

  return(
    <FlexDiv flexDirection="column" padding="16px">
      <FlexDiv flexDirection='row' padding="16px" justifyContent="space-evenly">
        <FormControl sx={{ minWidth: 100 }}>
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
              const [[ key, transductors ]] = Object.entries(campi);
              return(
                <optgroup key={index} label={key}>
                  {transductors.map((transductor, index) => (
                    <option key={index} value={transductor.id}>{transductor.name}</option>
                  ))}
                </optgroup>
              );
            })}
          </Select>
        </FormControl>
        <DatePicker
          label="Data de Início"
          value={Date.parse("2021-03-02")}
          onChange={() => {}}
          renderInput={(params) => <TextField {...params} />}
        />
        <DatePicker
          label="Data Final"
          value={Date.parse("2021-03-11")}
          onChange={() => {}}
          renderInput={(params) => <TextField {...params} />}
        />
        <FormControl sx={{ width: '25%' }}>
          <InputLabel id="model-type-filter-label">Tipo do Modelo</InputLabel>
          <Select
            labelId="model-type-filter-label"
            id="model-type-filter"
            multiple
            value={['Experimento 1', 'Treino SVR 2']}
            onChange={() => {}}
            input={<OutlinedInput id="select-multiple-chip" label="Tipo do Modelo" />}
            renderValue={(selected) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} size='small' />
                ))}
              </Box>
            )}
          >
            {['Experimento 1', 'Treino SVR 2'].map((name) => (
              <MenuItem
                key={name}
                value={name}
              >
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </FlexDiv>
      <FlexDiv>
        <Scatter
          options={{
            scales: {
              y: {
                display: true,
                title: {
                  display: true,
                  text: 'Wh',
                }
              },
              x: {
                display: true,
                title: {
                  display: true,
                  text: 'Horas',
                }
              },
            },
          }}
          data={{
            labels: xgboostValues?.load_curve?.map((item) => item.x),
            datasets: [
              {
                type: "scatter",
                label: "Dataset de Teste",
                borderColor: "rgb(54, 162, 235)",
                borderWidth: 2,
                fill: false,
                data: xgboostValues?.test_data_points?.map((item) => item.y),
              },
              {
                type: "line",
                label: "Predições Experimento 1",
                borderColor: "rgb(255, 99, 132)",
                data: xgboostValues?.load_curve?.map(
                  (prediction) => prediction.y
                ),
                pointRadius: 0,
                borderWidth: 2,
                fill: false,
              },
              {
                type: "line",
                label: "Predições Treino SVR 2",
                borderColor: "green",
                data: svrValues?.map(
                  (prediction) => prediction.y
                ),
                pointRadius: 0,
                borderWidth: 2,
                fill: false,
              },
            ],
          }}
        />
      </FlexDiv>
    </FlexDiv>
  );
}

export default LoadCurvePage;