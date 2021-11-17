import React from 'react';
import { Chip, IconButton, Tooltip, Checkbox } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import 'moment/locale/pt-br';
import { StyledText, FlexDiv } from '../styles';
import { openModal } from '../../../components/modal/modalSlice';
import ExperimentDetail from './ExperimentDetail';
import { ALL_STATUS } from '../../../config/constants';
import { axiosApi } from '../../../axiosInstance';
import API_ENDPOINTS from '../../../config/api_endpoints';
import { finishFetching, startFetching } from '../reducers/experimentSlice';

const ExperimentCard = ({ experiment }) => {
  const dispatch = useDispatch();
  const experimentFilters = useSelector((state) => state.experimentFilters);

  const getModalParams = (experiment) => {
    return({
      title: experiment?.experiment_name,
      props: { fullWidth: true, maxWidth: 'md' },
      content: {
        props: { dividers: true },
        component: <ExperimentDetail experimentData={experiment.data} predictions={experiment.predictions} />
      }
    });
  }

  const refreshExperiments = () => {
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

  const deleteExperiment = (runId) => {
    axiosApi
      .delete(API_ENDPOINTS.remove(runId))
      .then((response) => {
        refreshExperiments();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return(
    <FlexDiv flexDirection='row' justifyContent='space-around' margin='8px 0px'>
      <FlexDiv flexDirection='column' flexBasis='20%' overflow='hidden' alignItems='center'>
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
      <FlexDiv justifyContent='center' flexBasis='20%'>
        <Tooltip title={experiment?.has_registered_model ? 'Registrou modelo' : 'Não Registrou Modelo'} arrow>
          <span>
            <Checkbox disabled checked={experiment?.has_registered_model} checkedIcon={<CheckCircleIcon />} indeterminate={!experiment?.has_registered_model} indeterminateIcon={<CancelIcon />} />
          </span>
        </Tooltip>
      </FlexDiv>
      <FlexDiv flexBasis='20%' justifyContent='center' alignItems='center'>
        <StyledText>
          {experiment?.data?.params?.model_name}
        </StyledText>
      </FlexDiv>
      <FlexDiv justifyContent='center' flexBasis='20%' alignItems='center'>
        <Chip
          label={experiment?.info?.status}
          variant="outlined"
          color={ALL_STATUS[experiment?.info?.status]?.color}
          size="small"
        />
      </FlexDiv>
      <FlexDiv justifyContent='center' alignItems='center' flexBasis='20%'>
        <Tooltip title="Ver Detalhes" arrow>
          <IconButton onClick={() => dispatch(openModal(getModalParams(experiment)))}>
            <VisibilityIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Excluir" arrow>
          <IconButton onClick={() => deleteExperiment(experiment?.info?.run_id)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </FlexDiv>
    </FlexDiv>
  );
}

export default ExperimentCard;