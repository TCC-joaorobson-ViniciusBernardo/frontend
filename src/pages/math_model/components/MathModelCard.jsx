import React from 'react';
import { Chip, IconButton, Tooltip } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import 'moment/locale/pt-br';
import { StyledText, FlexDiv } from '../styles';
import { openModal } from '../../../components/modal/modalSlice';

const MathModelCard = ({ mathModel }) => {
  const dispatch = useDispatch();

  const getChipColor = (label) => {
    let color = null;

    switch (label) {
      case 'FINISHED':
        color = 'success';
        break;

      case 'FAILED':
        color = 'error';
        break;

      default:
        color = 'info';
        break;
    }

    return color;
  }
  return(
    <FlexDiv flexDirection='row' justifyContent='space-around' margin='8px 0px'>
      <FlexDiv flexDirection='column'>
        <StyledText fontWeight='bold' fontSize='16px' lineHeight='19px'>
          {mathModel?.experiment_name}
        </StyledText>
        <StyledText fontSize='12px' lineHeight='14px' color='#999999'>
          Criação: {moment(mathModel?.info?.start_time).format('L')}
        </StyledText>
        <StyledText fontSize='12px' lineHeight='14px' color='#999999'>
          Duração: {moment.duration(moment(mathModel?.info?.end_time).diff(moment(mathModel?.info?.start_time))).as('seconds')} s
        </StyledText>
      </FlexDiv>
      <FlexDiv alignItems='center'>
        <StyledText>
          {mathModel?.info?.run_id}
        </StyledText>
      </FlexDiv>
      <FlexDiv alignItems='center'>
        <Chip
          label={mathModel?.info?.status}
          variant="outlined"
          color={getChipColor(mathModel?.info?.status)}
          size="small"
        />
      </FlexDiv>
      <FlexDiv justifyContent='center' alignItems='center'>
        <Tooltip title="Ver Detalhes" arrow>
          <IconButton onClick={() => dispatch(openModal({ title: mathModel?.experiment_name }))}>
            <VisibilityIcon />
          </IconButton>
        </Tooltip>
      </FlexDiv>
    </FlexDiv>
  );
}

export default MathModelCard;