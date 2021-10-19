import React from 'react';
import { Chip, IconButton, Tooltip, Switch } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import 'moment/locale/pt-br';
import { StyledText, FlexDiv } from '../styles';
import { openModal } from '../../../components/modal/modalSlice';
import MathModelDetail from './MathModelDetail';
import ALL_STATUS from '../../../config/constants';

const MathModelCard = ({ mathModel }) => {
  const dispatch = useDispatch();

  const getModalParams = (mathModel) => {
    return({
      title: mathModel?.experiment_name,
      props: { fullWidth: true },
      content: {
        props: { dividers: true },
        component: <MathModelDetail mathModelData={mathModel.data} />
      }
    });
  }

  return(
    <FlexDiv flexDirection='row' justifyContent='space-around' margin='8px 0px'>
      <FlexDiv flexDirection='column' flexBasis='20%' overflow='hidden'>
        <StyledText fontWeight='bold' fontSize='16px' lineHeight='19px' overflow='hidden' textOverflow='ellipsis' whiteSpace='nowrap'>
          {mathModel?.experiment_name}
        </StyledText>
        <StyledText fontSize='12px' lineHeight='14px' color='#666666'>
          Criação: {moment(mathModel?.info?.start_time).format('L')}
        </StyledText>
        <StyledText fontSize='12px' lineHeight='14px' color='#666666'>
          Duração: {moment.duration(moment(mathModel?.info?.end_time).diff(moment(mathModel?.info?.start_time))).as('seconds')} s
        </StyledText>
      </FlexDiv>
      <FlexDiv alignItems='center'>
        <Tooltip title={mathModel?.has_registered_model ? 'Registrou modelo' : 'Não Registrou Modelo'} arrow>
          <span>
            <Switch disabled defaultChecked={mathModel?.has_registered_model} size="small" />
          </span>
        </Tooltip>
      </FlexDiv>
      <FlexDiv alignItems='center' flexBasis='12%'>
        <StyledText>
          {mathModel?.data?.tags?.model_name}
        </StyledText>
      </FlexDiv>
      <FlexDiv alignItems='center'>
        <Chip
          label={mathModel?.info?.status}
          variant="outlined"
          color={ALL_STATUS[mathModel?.info?.status]?.color}
          size="small"
        />
      </FlexDiv>
      <FlexDiv justifyContent='center' alignItems='center'>
        <Tooltip title="Ver Detalhes" arrow>
          <IconButton onClick={() => dispatch(openModal(getModalParams(mathModel)))}>
            <VisibilityIcon />
          </IconButton>
        </Tooltip>
      </FlexDiv>
    </FlexDiv>
  );
}

export default MathModelCard;