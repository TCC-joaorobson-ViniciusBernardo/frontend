import React from "react";
import {
  FormControlLabel,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
} from "@mui/material";

const SelectModelForm = ({ trainConfig, setTrainConfig }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "32px 0px",
      }}
    >
      <FormControl component="fieldset">
        <FormLabel component="legend">Modelo</FormLabel>
        <RadioGroup
          aria-label="math_model"
          name="radio-buttons-group"
          onChange={(e, value) => {
            setTrainConfig({
              ...trainConfig,
              model_params: {
                model: value,
              },
            });
          }}
          value={trainConfig?.model_params.model.model}
          defaultValue={trainConfig?.model_params?.model}
        >
          <FormControlLabel value="svr" control={<Radio />} label="SVR" />
          <FormControlLabel
            value="linearregressor"
            control={<Radio />}
            label="LinearRegressor"
          />
          <FormControlLabel
            value="xgboost"
            control={<Radio />}
            label="XGBRegressor"
          />
        </RadioGroup>
      </FormControl>
    </div>
  );
};

export default SelectModelForm;
