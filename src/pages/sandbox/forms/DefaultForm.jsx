import React from "react";
import { FlexDiv } from "../../experiment/styles";
import {
  Grid,
  Switch,
  Slider,
  TextField,
  FormLabel,
  IconButton,
  Typography,
  FormControlLabel,
} from "@mui/material";
import HelpIcon from "@mui/icons-material/Help";

const DefaultForm = ({
  url,
  children,
  trainConfig,
  setTrainConfig,
}) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "32px 0px",
      }}
    >
      <FlexDiv flexDirection="column" width="60%" gap="16px">
        <FlexDiv flexDirection="row" alignItems="center">
          <FormLabel component="legend">Parâmetros</FormLabel>
          <IconButton onClick={() => window.open(url, "_blank").focus()}>
            <HelpIcon />
          </IconButton>
        </FlexDiv>
        <FlexDiv justifyContent="center">
          <TextField
            required
            variant="outlined"
            label="Nome do Experimento"
            onChange={(e) => {
              setTrainConfig({
                ...trainConfig,
                experiment_name: e.target.value,
              });
            }}
            value={trainConfig?.experiment_name}
          />
        </FlexDiv>
        <FlexDiv flexDirection="column" gap="8px">
          <Typography id="input-slider" gutterBottom>
            Porcentagem dado de Teste
          </Typography>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs>
              <Slider
                min={10}
                max={50}
                step={0.1}
                defaultValue={trainConfig?.test_size}
                onChange={(e) => {
                  setTrainConfig({
                    ...trainConfig,
                    test_size: e.target.value,
                  });
                }}
                marks={[
                  { value: 10, label: "10%" },
                  { value: 30, label: "30%" },
                  { value: 50, label: "50%" },
                ]}
                valueLabelDisplay="auto"
                getAriaValueText={(value) => `${value}%`}
              />
            </Grid>
          </Grid>
        </FlexDiv>
        <FlexDiv flexDirection="column">
          <FormControlLabel
            control={
              <Switch
                onChange={(e) => {
                  setTrainConfig({
                    ...trainConfig,
                    is_experiment: e.target.checked,
                  });
                }}
                checked={trainConfig?.is_experiment}
                name="save_model"
              />
            }
            label="Registrar Modelo"
          />
        </FlexDiv>
        {children}
      </FlexDiv>
    </div>
  );
};

export default DefaultForm;
