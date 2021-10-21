import React from "react";
import { FlexDiv } from "../../experiment/styles";
import DepartmentSelect from "./DepartmentSelect";
import RangeFilter from "./RangeFilter";

const SandboxFilters = () => {
  return(
    <FlexDiv margin='8px 0px 16px 0px' justifyContent='space-between'>
      <DepartmentSelect />
      <RangeFilter />
    </FlexDiv>
  );
}

export default SandboxFilters;