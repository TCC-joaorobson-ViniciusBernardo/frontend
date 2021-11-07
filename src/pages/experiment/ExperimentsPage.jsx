import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { startFetching, finishFetching } from "./reducers/experimentSlice";
import { axiosApi } from "../../axiosInstance";
import ExperimentCard from "./components/ExperimentCard";
import ExperimentFilters from "./components/ExperimentFilters";
import ExperimentPagination from "./components/ExperimentPagination";
import API_ENDPOINTS from "../../config/api_endpoints";
import { Divider, CircularProgress } from "@mui/material";
import { FlexDiv, StyledText } from "./styles";

const ExperimentsPage = () => {
  const experimentReducer = useSelector((state) => state.experiment);
  const experimentFilters = useSelector((state) => state.experimentFilters);
  const dispatch = useDispatch();

  useEffect(() => {
    getData();
  }, [experimentFilters]);

  const getData = () => {
    dispatch(startFetching());
    axiosApi
      .get(API_ENDPOINTS.experiments, {
        params: { ...experimentFilters, experiment_id: 0 },
      })
      .then((response) => {
        dispatch(finishFetching(response.data));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getRowsHeaders = () => (
    <>
      <FlexDiv
        flexDirection="row"
        justifyContent="space-around"
        margin="8px 0px"
      >
        <FlexDiv flexBasis="20%" justifyContent="center">
          <StyledText
            fontWeight="bold"
            fontSize="16px"
            lineHeight="19px"
            overflow="hidden"
            textOverflow="ellipsis"
            whiteSpace="nowrap"
          >
            Nome
          </StyledText>
        </FlexDiv>
        <FlexDiv justifyContent="center" flexBasis="20%">
          <StyledText
            fontWeight="bold"
            fontSize="16px"
            lineHeight="19px"
            overflow="hidden"
            textOverflow="ellipsis"
            whiteSpace="nowrap"
          >
            Registrou Modelo
          </StyledText>
        </FlexDiv>
        <FlexDiv justifyContent="center" flexBasis="20%">
          <StyledText
            fontWeight="bold"
            fontSize="16px"
            lineHeight="19px"
            overflow="hidden"
            textOverflow="ellipsis"
            whiteSpace="nowrap"
          >
            Modelo
          </StyledText>
        </FlexDiv>
        <FlexDiv justifyContent="center" flexBasis="20%">
          <StyledText
            fontWeight="bold"
            fontSize="16px"
            lineHeight="19px"
            overflow="hidden"
            textOverflow="ellipsis"
            whiteSpace="nowrap"
          >
            Status
          </StyledText>
        </FlexDiv>
        <FlexDiv justifyContent="center" flexBasis="20%">
          <StyledText
            fontWeight="bold"
            fontSize="16px"
            lineHeight="19px"
            overflow="hidden"
            textOverflow="ellipsis"
            whiteSpace="nowrap"
          >
            Ações
          </StyledText>
        </FlexDiv>
      </FlexDiv>
      <Divider />
    </>
  );

  return (
    <FlexDiv
      width="100%"
      flexDirection="column"
      padding="16px"
      height="calc(100% - 64px)"
    >
      <ExperimentFilters />
      <FlexDiv
        overflow="auto"
        flexBasis="80%"
        flexDirection="column"
        alignItems={experimentReducer.isLoading ? "center" : "initial"}
        justifyContent={experimentReducer.isLoading ? "center" : "initial"}
      >
        {experimentReducer.isLoading ? (
          <CircularProgress />
        ) : (
          <>
            {getRowsHeaders()}
            {experimentReducer.experimentList.map((experiment, index) => {
              return (
                <div key={index}>
                  <ExperimentCard experiment={experiment} />
                  {index < experimentReducer.experimentList.length - 1 && (
                    <Divider />
                  )}
                </div>
              );
            })}
          </>
        )}
      </FlexDiv>
      <ExperimentPagination />
    </FlexDiv>
  );
};

export default ExperimentsPage;
