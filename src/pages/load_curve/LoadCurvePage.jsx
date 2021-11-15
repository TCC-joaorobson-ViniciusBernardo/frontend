import React, { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Scatter } from "react-chartjs-2";
import {
  TextField,
  Autocomplete,
  FormControl,
} from "@mui/material";
import moment from "moment";
import "moment/locale/pt-br";
import { FlexDiv } from "../experiment/styles";
import { axiosApi } from "../../axiosInstance";
import { axiosSige } from "../../axiosInstance";
import API_ENDPOINTS from "../../config/api_endpoints";
import SIGE_ENDPOINTS from "../../config/sige_endpoints";
import { chartLabels } from "./chartLabels";
import RangeFilter from "../sandbox/components/RangeFilter";
import DepartmentSelect from "../sandbox/components/DepartmentSelect";
import {
  startFetching,
  finishFetching,
} from "../sandbox/reducers/sandboxSlice";

const LoadCurvePage = () => {
  const dispatch = useDispatch();
  const [experiments, setExperiments] = useState([]);
  const [selectedExperiments, setSelectedExperiments] = useState([]);
  const sandboxReducer = useSelector((state) => state.sandbox);
  const sandboxFiltersReducer = useSelector((state) => state.sandboxFilters);

  useEffect(() => {
    getConsumptionData();
  }, [sandboxFiltersReducer]);

  useEffect(() => {
    getExperiments();
  }, []);

  const getConsumptionData = () => {
    dispatch(startFetching());
    axiosSige
      .get(SIGE_ENDPOINTS.graphQuarterlyConsumption, {
        params: { ...sandboxFiltersReducer },
      })
      .then((response) => {
        dispatch(finishFetching(response.data));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getExperiments = () => {
    dispatch(startFetching());
    axiosApi
      .get(API_ENDPOINTS.experiments, {
        params: { experiment_id: 0, 'status[]': 'FINISHED' },
      })
      .then((response) => {
        dispatch(setExperiments(response.data.items));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const formatTrainDataset = (dataset) => {
    return dataset.map((x) => ({
      x:
        parseInt(moment(x.date).format("H"), 10) +
        parseInt(moment(x.date).format("m"), 10) / 60,
      y: x.consumption / 4,
    }));
  };

  const ScatterChart = useMemo(
    () => (
      <Scatter
        options={{
          scales: {
            y: {
              display: true,
              title: {
                display: true,
                text: "Wh",
              },
            },
            x: {
              display: true,
              title: {
                display: true,
                text: "Horas",
              },
            },
          },
        }}
        data={{
          labels: chartLabels,
          datasets: [
            {
              type: "scatter",
              label: "Dataset de Teste",
              borderColor: "rgb(54, 162, 235)",
              borderWidth: 2,
              fill: false,
              data: formatTrainDataset(sandboxReducer.consumptions),
            },
            ...selectedExperiments,
          ],
        }}
      />
    ),
    [selectedExperiments, sandboxReducer]
  );

  return (
    <FlexDiv flexDirection="column" padding="16px">
      <FlexDiv flexDirection="row" padding="16px" justifyContent="space-evenly">
        <DepartmentSelect />
        <RangeFilter />
        <FormControl sx={{ width: "25%" }}>
          <Autocomplete
            multiple
            id="tags-outlined"
            options={experiments}
            getOptionLabel={(option) => option.experiment_name}
            filterSelectedOptions
            renderInput={(params) => (
              <TextField {...params} label="Tipo do Modelo" placeholder="" />
            )}
            onChange={(_, optionsSelected) => {
              setSelectedExperiments(
                optionsSelected.map((experiment) => ({
                  type: "line",
                  label: experiment.experiment_name,
                  borderColor: `rgb(${Math.floor(
                    Math.random() * 256
                  )}, ${Math.floor(Math.random() * 256)}, ${Math.floor(
                    Math.random() * 256
                  )})`,
                  data: experiment?.predictions?.load_curve?.map(
                    (prediction) => prediction.y
                  ),
                  pointRadius: 0,
                  borderWidth: 2,
                  fill: false,
                }))
              );
            }}
          />
        </FormControl>
      </FlexDiv>
      <FlexDiv>{ScatterChart}</FlexDiv>
    </FlexDiv>
  );
};

export default LoadCurvePage;
