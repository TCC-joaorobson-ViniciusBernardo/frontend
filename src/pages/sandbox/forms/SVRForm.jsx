import React, { useState, usestate } from "react";
import { FlexDiv } from "../../experiment/styles";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  RadioGroup,
  FormLabel,
  FormControlLabel,
  Radio,
} from "@mui/material";

const SVRForm = ({ trainConfig, setTrainConfig }) => {
  const [gammaFieldType, setGammaFieldType] = useState("select");

  const handleChange = (e) => {
    setTrainConfig({
      ...trainConfig,
      model_params: {
        ...trainConfig.model_params,
        [e.target.name]: e.target.value,
      },
    });
  };

  return (
    <FlexDiv flexDirection="column" gap="12px">
      <FormControl fullWidth>
        <InputLabel id="kernel-select-label">kernel</InputLabel>
        <Select
          name="kernel"
          label="kernel"
          id="kernel-select"
          defaultValue="rbf"
          labelId="kernel-select-label"
          onChange={handleChange}
          value={trainConfig?.model_params?.kernel}
        >
          {["linear", "poly", "rbf", "sigmoid", "precomputed"].map(
            (item, index) => (
              <MenuItem key={index} value={item}>
                {item}
              </MenuItem>
            )
          )}
        </Select>
      </FormControl>
      <TextField
        type="number"
        name="epsilon"
        label="epsilon"
        onChange={(e) =>
          handleChange({
            target: { name: "epsilon", value: parseFloat(e.target.value) },
          })
        }
        value={trainConfig?.model_params?.epsilon}
        defaultValue={0}
        inputProps={{ step: "0.01", min: 0 }}
      />
      <TextField
        type="number"
        name="tol"
        label="tol"
        onChange={(e) =>
          handleChange({
            target: { name: "tol", value: parseFloat(e.target.value) },
          })
        }
        value={trainConfig?.model_params?.tol}
        defaultValue={0.0001}
        inputProps={{ step: "0.0001", min: 0.0001 }}
      />
      <TextField
        type="number"
        name="C"
        label="C"
        onChange={(e) =>
          handleChange({
            target: { name: "C", value: parseFloat(e.target.value) },
          })
        }
        value={trainConfig?.model_params?.C}
        defaultValue={1.0}
        inputProps={{ step: "0.01", min: 0.01 }}
      />
      <TextField
        type="number"
        name="max_iter"
        label="max_iter"
        onChange={(e) =>
          handleChange({
            target: { name: "max_iter", value: parseInt(e.target.value, 10) },
          })
        }
        value={trainConfig?.model_params?.max_iter}
        defaultValue={1}
        inputProps={{ min: -1 }}
      />
      <FormControl component="fieldset">
        <FormLabel component="legend">gamma</FormLabel>
        <RadioGroup
          row
          aria-label="gamma"
          name="gamma"
          onChange={(e) => {
            setGammaFieldType(e.target.value);
            let gamma = null;
            if (e.target.value === "select") {
              gamma = "scale";
            } else {
              gamma = 1.0;
            }
            setTrainConfig({
              ...trainConfig,
              model_params: {
                ...trainConfig.model_params,
                gamma,
              },
            });
          }}
        >
          <FormControlLabel
            value="select"
            control={<Radio checked={gammaFieldType === "select"} />}
            label="Selecionar"
          />
          <FormControlLabel
            value="numeric"
            control={<Radio checked={gammaFieldType === "numeric"} />}
            label="Numérico"
          />
        </RadioGroup>
      </FormControl>
      {gammaFieldType === "select" ? (
        <FormControl fullWidth>
          <InputLabel id="gamma-select-label">gamma</InputLabel>
          <Select
            name="gamma"
            label="gamma"
            id="gamma-select"
            defaultValue="scale"
            labelId="gamma-select-label"
            onChange={handleChange}
            value={trainConfig?.model_params?.gamma}
          >
            {["scale", "auto"].map((item, index) => (
              <MenuItem key={index} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      ) : (
        <TextField
          type="number"
          name="gamma"
          label="gamma"
          onChange={(e) =>
            handleChange({
              target: { name: "gamma", value: parseFloat(e.target.value) },
            })
          }
          value={trainConfig?.model_params?.gamma}
          defaultValue={1.0}
          inputProps={{ step: "0.001", min: 0.001 }}
        />
      )}
    </FlexDiv>
  );
};

export default SVRForm;
