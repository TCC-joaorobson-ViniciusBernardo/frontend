import React from "react";
import { Typography } from "@mui/material";
import { Scatter } from "react-chartjs-2";
import { StyledText, FlexDiv } from "../styles";
import moment from "moment";
import "moment/locale/pt-br";

const ExperimentDetail = ({ experimentData, predictions }) => {
  const renderObject = (obj) =>
    Object.entries(obj).map(([key, value], index) => {
      if (key === "query_params") {
        let query_params = JSON.parse(value.replaceAll("'", `"`));
        query_params["start_date"] = `${moment
          .unix(query_params["start_date"])
          .format("L")} às ${moment
          .unix(query_params["start_date"])
          .format("LT")}`;
        query_params["end_date"] = `${moment
          .unix(query_params["end_date"])
          .format("L")} às ${moment
          .unix(query_params["end_date"])
          .format("LT")}`;
        return (
          <FlexDiv
            flexDirection="row"
            justifyContent="space-evenly"
            textAlign="right"
            key={index}
          >
            <FlexDiv flexDirection="column" flexBasis="30%">
              {Object.entries(query_params).map(([keyParams, _], index) => (
                <StyledText
                  key={index}
                >{`query_params.${keyParams}:`}</StyledText>
              ))}
            </FlexDiv>
            <FlexDiv flexDirection="column" flexBasis="30%">
              {Object.entries(query_params).map(([_, valueParams], index) => (
                <StyledText key={index}>{valueParams}</StyledText>
              ))}
            </FlexDiv>
          </FlexDiv>
        );
      } else {
        return (
          <FlexDiv
            flexDirection="row"
            justifyContent="space-evenly"
            textAlign="right"
            key={index}
          >
            <StyledText flexBasis="30%">{`${key}: `}</StyledText>
            <StyledText flexBasis="30%">{value}</StyledText>
          </FlexDiv>
        );
      }
    });

  return (
    <FlexDiv flexDirection="column" padding="16px">
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
            labels: predictions?.load_curve?.map((item) => item.x),
            datasets: [
              {
                type: "scatter",
                label: "Dataset de Teste",
                borderColor: "rgb(54, 162, 235)",
                borderWidth: 2,
                fill: false,
                data: predictions?.test_data_points?.map((item) => item.y),
              },
              {
                type: "line",
                label: "Predições",
                borderColor: "rgb(255, 99, 132)",
                data: predictions?.load_curve?.map(
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
      <FlexDiv flexDirection="column">
        <Typography variant="h6" component="div" gutterBottom>
          Métricas
        </Typography>
        {renderObject(experimentData?.metrics)}
      </FlexDiv>
      <FlexDiv flexDirection="column" margin="16px 0px 0px 0px">
        <Typography variant="h6" component="div" gutterBottom>
          Parâmetros
        </Typography>
        {renderObject(experimentData?.params)}
      </FlexDiv>
    </FlexDiv>
  );
};

export default ExperimentDetail;
