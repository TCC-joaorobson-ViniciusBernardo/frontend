import React from "react";
import { Typography } from "@mui/material";
import { Scatter } from "react-chartjs-2";
import { StyledText, FlexDiv } from "../styles";

const ExperimentDetail = ({ experimentData, predictions }) => {
  const renderObject = (obj) =>
    Object.entries(obj).map((keyValue, index) => {
      return (
        <FlexDiv
          flexDirection="row"
          justifyContent="space-evenly"
          textAlign="right"
          key={index}
        >
          <StyledText flexBasis="30%">{`${keyValue[0]}: `}</StyledText>
          <StyledText flexBasis="30%">{keyValue[1]}</StyledText>
        </FlexDiv>
      );
    });

  return (
    <FlexDiv flexDirection="column" padding="16px">
      <FlexDiv>
        <Scatter
          data={{
            labels: predictions?.load_curve?.map((item) => item.x),
            datasets: [
              {
                type: "scatter",
                label: "Dataset de Teste",
                borderColor: "rgb(54, 162, 235)",
                borderWidth: 2,
                fill: false,
                data: predictions?.test_data_points?.map(
                  (item) => item.y
                ),
              },
              {
                type: "line",
                label: "Predições",
                borderColor: 'rgb(255, 99, 132)',
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
