import React from 'react';
import { Chip, IconButton, Tooltip, Switch } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import 'moment/locale/pt-br';
import { StyledText, FlexDiv } from '../styles';
import { openModal } from '../../../components/modal/modalSlice';
import ExperimentDetail from './ExperimentDetail';
import ALL_STATUS from '../../../config/constants';

const ExperimentCard = ({ experiment }) => {
  const dispatch = useDispatch();

  const getModalParams = (experiment) => {
    return({
      title: experiment?.experiment_name,
      props: { fullWidth: true },
      content: {
        props: { dividers: true },
        component: <ExperimentDetail experimentData={experiment.data} />
      }
    });
  }

  return(
    <FlexDiv flexDirection='row' justifyContent='space-around' margin='8px 0px'>
      <FlexDiv flexDirection='column' flexBasis='20%' overflow='hidden'>
        <StyledText fontWeight='bold' fontSize='16px' lineHeight='19px' overflow='hidden' textOverflow='ellipsis' whiteSpace='nowrap'>
          {experiment?.experiment_name}
        </StyledText>
        <StyledText fontSize='12px' lineHeight='14px' color='#666666'>
          Criação: {moment(experiment?.info?.start_time).format('L')}
        </StyledText>
        <StyledText fontSize='12px' lineHeight='14px' color='#666666'>
          Duração: {moment.duration(moment(experiment?.info?.end_time).diff(moment(experiment?.info?.start_time))).as('seconds')} s
        </StyledText>
      </FlexDiv>
      <FlexDiv alignItems='center'>
        <Tooltip title={experiment?.has_registered_model ? 'Registrou modelo' : 'Não Registrou Modelo'} arrow>
          <span>
            <Switch disabled defaultChecked={experiment?.has_registered_model} size="small" />
          </span>
        </Tooltip>
      </FlexDiv>
      <FlexDiv alignItems='center' flexBasis='12%'>
        <StyledText>
          {experiment?.data?.tags?.model_name}
        </StyledText>
      </FlexDiv>
      <FlexDiv alignItems='center'>
        <Chip
          label={experiment?.info?.status}
          variant="outlined"
          color={ALL_STATUS[experiment?.info?.status]?.color}
          size="small"
        />
      </FlexDiv>
      <FlexDiv justifyContent='center' alignItems='center'>
        <Tooltip title="Ver Detalhes" arrow>
          <IconButton onClick={() => dispatch(openModal(getModalParams(experiment)))}>
            <VisibilityIcon />
          </IconButton>
        </Tooltip>
      </FlexDiv>
    </FlexDiv>
  );
}

export default ExperimentCard;