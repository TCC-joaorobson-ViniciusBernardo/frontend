import React from "react";
import { FlexDiv } from "../../experiment/styles";
import { TextField } from "@mui/material";

const XGBRegressorForm = ({ trainConfig, setTrainConfig }) => {
  const handleChange = (e) => {
    setTrainConfig({
      ...trainConfig,
      model_params: {
        ...trainConfig.model_params,
        [e.target.name]: ["gamma", "learning_rate"].includes(e.target.name)
          ? parseFloat(e.target.value)
          : parseInt(e.target.value, 10),
      },
    });
  };
  return (
    <FlexDiv flexDirection="column" gap="12px">
      <TextField
        type="number"
        name="n_estimators"
        label="n_estimators"
        onChange={(e) => handleChange(e)}
        value={trainConfig?.model_params?.n_estimators}
        inputProps={{ min: 1 }}
      />
      <TextField
        type="number"
        name="max_depth"
        label="max_depth"
        onChange={(e) => handleChange(e)}
        value={trainConfig?.model_params?.max_depth}
        inputProps={{ min: 1 }}
      />
      <TextField
        type="number"
        name="learning_rate"
        label="learning_rate"
        onChange={(e) => handleChange(e)}
        value={trainConfig?.model_params?.learning_rate}
        inputProps={{ step: "0.0001", min: 0.0001 }}
      />
      <TextField
        type="number"
        name="gamma"
        label="gamma"
        onChange={(e) => handleChange(e)}
        value={trainConfig?.model_params?.gamma}
        inputProps={{ step: "0.001", min: 0.001 }}
      />
      <TextField
        type="number"
        name="random_state"
        label="random_state"
        onChange={(e) => handleChange(e)}
        value={trainConfig?.model_params?.random_state}
      />
    </FlexDiv>
  );
};

export default XGBRegressorForm;
