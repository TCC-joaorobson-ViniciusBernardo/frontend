import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  Box,
  Step,
  Button,
  Stepper,
  StepLabel,
  Typography,
} from "@mui/material";
import LinearRegressorForm from "./LinearRegressorForm";
import { FlexDiv, StyledText } from "../../experiment/styles";
import DefaultForm from "./DefaultForm";
import SelectModelForm from "./SelectModelForm";
import XGBRegressorForm from "./XGBRegressorForm";
import SVRForm from "./SVRForm";
import { axiosApi } from "../../../axiosInstance";
import API_ENDPOINTS from "../../../config/api_endpoints";

const ExperimentForm = () => {
  const sandboxFilters = useSelector((state) => state.sandboxFilters);
  const [trainConfig, setTrainConfig] = useState({
    model_params: {
      model: "svr",
    },
    test_size: 30.0,
    experiment_name: "",
    is_experiment: false,
  });
  const [dataProcessingConfig, setDataProcessingConfig] = useState({
    query_params: {
      id: sandboxFilters.id,
      start_date: sandboxFilters.start_date,
      end_date: sandboxFilters.end_date,
      type: sandboxFilters.type,
    },
  });
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const steps = [
    "Escolha o modelo",
    "Configure os parâmetros",
    "Resumo e confirmação",
  ];
  const mapModelsComponents = {
    svr: {
      component: (
        <SVRForm trainConfig={trainConfig} setTrainConfig={setTrainConfig} />
      ),
      urlHelper:
        "https://scikit-learn.org/stable/modules/generated/sklearn.svm.SVR.html?highlight=svr#sklearn.svm.SVR",
    },
    linearregressor: {
      component: (
        <LinearRegressorForm
          trainConfig={trainConfig}
          setTrainConfig={setTrainConfig}
        />
      ),
      urlHelper:
        "https://scikit-learn.org/stable/modules/generated/sklearn.linear_model.LinearRegression.html?highlight=linearregression",
    },
    xgboost: {
      component: (
        <XGBRegressorForm
          trainConfig={trainConfig}
          setTrainConfig={setTrainConfig}
        />
      ),
      urlHelper:
        "https://xgboost.readthedocs.io/en/latest/python/python_api.html#xgboost.XGBRegressor",
    },
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

  const handleSubmit = () => {
    const data = {
      train_config: {
        ...trainConfig,
        test_size: trainConfig?.test_size / 100,
        is_experiment: !trainConfig?.is_experiment,
      },
      data_processing_config: {
        ...dataProcessingConfig,
        query_params: {
          ...dataProcessingConfig.query_params,
          id: parseInt(dataProcessingConfig?.query_params?.id, 10),
          start_date: Math.floor(
            Date.parse(dataProcessingConfig?.query_params?.start_date) / 1000
          ),
          end_date: Math.floor(
            Date.parse(dataProcessingConfig?.query_params?.end_date) / 1000
          ),
        },
      },
    };
    axiosApi
      .post(API_ENDPOINTS.train, data)
      .then((response) => {}) //close modal
      .catch((error) => {
        console.error(error);
      });
  };

  const renderInfoRow = (key, value, index) => (
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

  const getStepComponent = () => {
    const { test_size, experiment_name, is_experiment, model_params } =
      trainConfig;
    const { query_params } = dataProcessingConfig;
    switch (activeStep) {
      case 0:
        return (
          <SelectModelForm
            trainConfig={trainConfig}
            setTrainConfig={setTrainConfig}
          />
        );

      case 1:
        return (
          <DefaultForm
            url={
              mapModelsComponents[trainConfig?.model_params?.model]?.urlHelper
            }
            trainConfig={trainConfig}
            setTrainConfig={setTrainConfig}
          >
            {mapModelsComponents[trainConfig?.model_params?.model]?.component}
          </DefaultForm>
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
            {renderInfoRow("experiment_name", experiment_name)}
            {renderInfoRow("test_size", test_size)}
            {renderInfoRow("is_experiment", (!is_experiment).toString())}
            {Object.entries(query_params).map(([key, value], index) => {
              return renderInfoRow(key, value.toString(), index);
            })}
            {Object.entries(model_params).map(([key, value], index) => {
              return renderInfoRow(key, value.toString(), index);
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

            <Button
              onClick={
                activeStep === steps.length - 1 ? handleSubmit : handleNext
              }
              disabled={
                (activeStep === 0 && !trainConfig?.model_params?.model) ||
                (activeStep === 1 && !trainConfig?.experiment_name)
              }
            >
              {activeStep === steps.length - 1 ? "Finalizar" : "Avançar"}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
};

export default ExperimentForm;
