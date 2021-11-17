import React, { useState, useEffect } from 'react';
import { FlexDiv } from '../experiment/styles';
import RealTimeChart from './RealTimeChart';
import { axiosSige } from '../../axiosInstance';
import SIGE_ENDPOINTS from '../../config/sige_endpoints';
import { FormControl, InputLabel, Select } from '@mui/material';

const ChartPage = () => {
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

  return(
    <FlexDiv flexDirection="column" padding="16px" gap="16px">
      <FlexDiv justifyContent="center" alignItems="center">
        <FormControl sx={{ minWidth: 170 }}>
          <InputLabel htmlFor="grouped-departments">Prédio</InputLabel>
          <Select
            native
            label="Prédio"
            id="grouped-departments"
            onChange={() => {}}
            defaultValue="2"
            inputProps={{ shrunk: true }}
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
      <RealTimeChart />
    </FlexDiv>
  );
}

export default ChartPage;