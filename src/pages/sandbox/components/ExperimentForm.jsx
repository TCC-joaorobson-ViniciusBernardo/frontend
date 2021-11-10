import React from "react";
import {
  Box,
  Step,
  Grid,
  Radio,
  Switch,
  Slider,
  Button,
  Stepper,
  TextField,
  StepLabel,
  FormLabel,
  FormGroup,
  Typography,
  RadioGroup,
  IconButton,
  FormControl,
  FormControlLabel,
} from "@mui/material";
import HelpIcon from "@mui/icons-material/Help";
import { FlexDiv, StyledText } from "../../experiment/styles";

const ExperimentForm = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const steps = [
    "Escolha o modelo",
    "Configure os parâmetros",
    "Resumo e confirmação",
  ];
  const url =
    "https://scikit-learn.org/stable/modules/generated/sklearn.linear_model.LinearRegression.html?highlight=linearregression";
  const values = {
    building: "ICC",
    experiment_name: "Linear Regressor",
    test_size: '30%',
    start_date: "01/01/2021",
    end_date: "08/11/2021",
    normalize: "False",
    positive: "False",
    fit_intercept: "False",
    remove_outliers: "True",
    register_model: "True",
  };

  const isStepOptional = (step) => {
    return step === 1;
  };

  const handleNext = () => {
    let newSkipped = skipped;

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const getStepComponent = () => {
    switch (activeStep) {
      case 0:
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
                defaultValue="LinearRegressor"
                name="radio-buttons-group"
              >
                <FormControlLabel value="SVR" control={<Radio />} label="SVR" />
                <FormControlLabel
                  value="LinearRegressor"
                  control={<Radio />}
                  label="LinearRegressor"
                />
                <FormControlLabel
                  value="XGBRegressor"
                  control={<Radio />}
                  label="XGBRegressor"
                />
              </RadioGroup>
            </FormControl>
          </div>
        );

      case 1:
        return (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "32px 0px",
            }}
          >
            <FlexDiv flexDirection='column' width='60%' gap='16px'>
              <FlexDiv flexDirection="row" alignItems="center">
                <FormLabel component="legend">Parâmetros</FormLabel>
                <IconButton onClick={() => window.open(url, "_blank").focus()}>
                  <HelpIcon />
                </IconButton>
              </FlexDiv>
              <FlexDiv justifyContent='center'>
                <TextField label="Nome do Experimento" variant="outlined" />
              </FlexDiv>
              <FlexDiv flexDirection='column' gap='8px'>
                <Typography id="input-slider" gutterBottom>
                  Porcentagem dado de Teste
                </Typography>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs>
                    <Slider
                      defaultValue={30}
                      getAriaValueText={(value) => `${value}%`}
                      marks={[
                        { value: 10, label: "10%" },
                        { value: 30, label: "30%" },
                        { value: 50, label: "50%" },
                      ]}
                      min={10}
                      max={50}
                      valueLabelDisplay="auto"
                    />
                  </Grid>
                </Grid>
              </FlexDiv>
              <FlexDiv flexDirection='column'>
                <FormControlLabel
                  control={<Switch checked={false} name="normalize" />}
                  label="normalize"
                />
                <FormControlLabel
                  control={<Switch checked={false} name="positive" />}
                  label="positive"
                />
                <FormControlLabel
                  control={<Switch checked={false} name="fit_intercept" />}
                  label="fit_intercept"
                />
                <FormControlLabel
                  control={<Switch checked={true} name="remove_outliers" />}
                  label="Remover Outliers"
                />
                <FormControlLabel
                  control={<Switch checked={true} name="save_model" />}
                  label="Registrar model"
                />
              </FlexDiv>
            </FlexDiv>
          </div>
        );

      case 2:
        return (
          <div
            style={{
              width: "50%",
              display: "flex",
              padding: "32px 0px",
              flexDirection: "column",
              margin: "auto",
            }}
          >
            {Object.entries(values).map(([key, value], index) => {
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
            })}
          </div>
        );

      default:
        break;
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          {getStepComponent()}
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Voltar
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />

            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? "Finalizar" : "Avançar"}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
};

export default ExperimentForm;
