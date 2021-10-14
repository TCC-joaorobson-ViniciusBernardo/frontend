import React from 'react';
import { Chip, IconButton, Tooltip } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import moment from 'moment';
import 'moment/locale/pt-br';
import { StyledText } from '../styles';

const MathModelCard = ({ mathModel }) => {

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
    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', margin: '8px 0px' }}>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <StyledText fontWeight='bold' fontSize='16px' lineHeight='19px'>
          {mathModel?.experiment_name}
        </StyledText>
        <StyledText fontSize='12px' lineHeight='14px' color='#999999'>
          Criação: {moment(mathModel?.info?.start_time).format('L')}
        </StyledText>
        <StyledText fontSize='12px' lineHeight='14px' color='#999999'>
          Duração: {moment.duration(moment(mathModel?.info?.end_time).diff(moment(mathModel?.info?.start_time))).as('seconds')} s
        </StyledText>
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <StyledText>
          {mathModel?.info?.run_id}
        </StyledText>
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Chip
          label={mathModel?.info?.status}
          variant="outlined"
          color={getChipColor(mathModel?.info?.status)}
          size="small"
        />
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Tooltip title="Ver Detalhes" arrow>
          <IconButton aria-label="delete">
            <VisibilityIcon />
          </IconButton>
        </Tooltip>
      </div>
    </div>
  );
}

export default MathModelCard;