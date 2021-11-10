import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { DataGrid } from "@mui/x-data-grid";
import { FlexDiv } from "../experiment/styles";
import { axiosSige } from "../../axiosInstance";
import { startFetching, finishFetching } from "./reducers/sandboxSlice";
import { openModal } from "../../components/modal/modalSlice";
import SIGE_ENDPOINTS from "../../config/sige_endpoints";
import SandboxFilters from "./components/SandboxFilters";
import SandboxAnalytics from "./components/SandboxAnalytics";
import ExperimentForm from "./components/ExperimentForm";
import moment from "moment";
import "moment/locale/pt-br";

const SandboxPage = () => {
  const sandboxReducer = useSelector((state) => state.sandbox);
  const sandboxFiltersReducer = useSelector((state) => state.sandboxFilters);
  const dispatch = useDispatch();

  useEffect(() => {
    getData();
  }, [sandboxFiltersReducer]);

  const getData = () => {
    dispatch(startFetching());
    axiosSige
      .get(SIGE_ENDPOINTS.graphQuarterlyConsumption, {
        params: { ...sandboxFiltersReducer },
      })
      .then((response) => {
        dispatch(finishFetching(response.data));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const columns = [
    {
      field: "date",
      headerName: "Data e Hora",
      width: 300,
      valueFormatter: (params) =>
        `${moment(params.value).format("DD/MM/YYYY HH:mm:ss")}`,
    },
    { field: "consumption", headerName: "Consumo (Wh)", width: 300 },
  ];

  return (
    <FlexDiv height="calc(100% - 64px)" position="relative">
      <FlexDiv
        flexBasis="50%"
        padding="16px 8px 16px 16px"
        flexDirection="column"
      >
        <SandboxFilters />
        <DataGrid
          columns={columns}
          pageSize={100}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
          rows={sandboxReducer.consumptions}
        />
      </FlexDiv>
      <FlexDiv flexBasis="50%" padding="16px 16px 16px 8px">
        <SandboxAnalytics />
      </FlexDiv>
      <Fab
        onClick={() =>
          dispatch(
            openModal({
              title: "Adicionar Experimento",
              props: { fullWidth: true, maxWidth: 'md' },
              content: {
                props: { dividers: true },
                component: <ExperimentForm />,
              },
            })
          )
        }
        color="primary"
        aria-label="add"
        style={{ position: "absolute", bottom: "32px", right: "32px" }}
      >
        <AddIcon />
      </Fab>
    </FlexDiv>
  );
};

export default SandboxPage;
