import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { axiosSige } from "../../../axiosInstance";
import { FormControl, InputLabel, Select, Skeleton, Box } from "@mui/material";
import SIGE_ENDPOINTS from "../../../config/sige_endpoints";
import { changeTransductor } from "../reducers/sandboxFiltersSlice";

const DepartmentSelect = () => {
  const sandboxFilters = useSelector((state) => state.sandboxFilters)
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [campiList, setCampiList] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    setIsLoading(true);
    axiosSige
      .get(SIGE_ENDPOINTS.campi)
      .then((response) => {
        const campis = response.data.map(
          (x) => ({
            [x.name]: [...new Set(x.groups_related.map(JSON.stringify))].map(JSON.parse)
          })
        );
        setCampiList(campis);
        setIsLoading(false);
      })
      .catch(error => {
        console.error(error);
      })
  }

  if(isLoading){
    return(
      <Skeleton animation="wave" width={100} height={56} />
    );
  } else {
    return(
      <FormControl sx={{ minWidth: 100 }}>
        <InputLabel htmlFor="grouped-departments">Prédio</InputLabel>
        <Select
          native
          label="Prédio"
          defaultValue=""
          id="grouped-departments"
          value={sandboxFilters.id}
          onChange={(e) => dispatch(changeTransductor(e.target.value))}
        >
          <option aria-label="None" value="" />
          {campiList.map((campi, index) => {
            const [[ key, transductors ]] = Object.entries(campi);
            return(
              <optgroup key={index} label={key}>
                {transductors.map((transductor, index) => (
                  <option key={index} value={transductor.id}>{transductor.name}</option>
                ))}
              </optgroup>
            );
          })}
        </Select>
      </FormControl>
    );
  }
}

export default DepartmentSelect;