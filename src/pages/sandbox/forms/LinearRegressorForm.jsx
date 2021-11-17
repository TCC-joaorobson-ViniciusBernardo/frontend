import React from "react";
import { FlexDiv } from "../../experiment/styles";
import { FormControlLabel, Switch } from "@mui/material";

const LinearRegressorForm = ({ trainConfig, setTrainConfig }) => {
  return (
    <FlexDiv flexDirection="column">
      <FormControlLabel
        label="positive"
        control={
          <Switch
            checked={trainConfig?.model_params?.positive}
            name="positive"
            onChange={(e) => {
              setTrainConfig({
                ...trainConfig,
                model_params: {
                  ...trainConfig.model_params,
                  positive: e.target.checked,
                },
              });
            }}
          />
        }
      />
      <FormControlLabel
        label="fit_intercept"
        control={
          <Switch
            checked={trainConfig?.model_params?.fit_intercept}
            name="fit_intercept"
            onChange={(e) => {
              setTrainConfig({
                ...trainConfig,
                model_params: {
                  ...trainConfig.model_params,
                  fit_intercept: e.target.checked,
                },
              });
            }}
          />
        }
      />
      <FormControlLabel
        label="Remover Outliers"
        control={
          <Switch
            checked={trainConfig?.model_params?.remove_outliers}
            name="remove_outliers"
            onChange={(e) => {
              setTrainConfig({
                ...trainConfig,
                model_params: {
                  ...trainConfig.model_params,
                  remove_outliers: e.target.checked,
                },
              });
            }}
          />
        }
      />
    </FlexDiv>
  );
};

export default LinearRegressorForm;
