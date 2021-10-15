import React from 'react';
import { Typography } from '@mui/material';
import { StyledText, FlexDiv } from '../styles';

const MathModelDetail = ({ mathModelData }) => {

  const renderObject = (obj) => (
    Object.entries(obj).map((keyValue, index) => {
      return(
        <FlexDiv flexDirection='row' justifyContent='space-evenly' textAlign='right' key={index}>
          <StyledText flexBasis='30%'>
            {`${keyValue[0]}: `}
          </StyledText>
          <StyledText flexBasis='30%'>
            {keyValue[1]}
          </StyledText>
        </FlexDiv>  
      )
    })
  )

  return(
    <FlexDiv flexDirection='column' padding='16px'>
      <FlexDiv flexDirection='column'>
        <Typography variant="h6" component="div" gutterBottom>
          Métricas
        </Typography>
        {renderObject(mathModelData?.metrics)}
      </FlexDiv>
      <FlexDiv flexDirection='column' margin='16px 0px 0px 0px'>
        <Typography variant="h6" component="div" gutterBottom>
          Parâmetros
        </Typography>
        {renderObject(mathModelData?.params)}
      </FlexDiv>
    </FlexDiv>
  );
}

export default MathModelDetail;