import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import SearchIcon from '@mui/icons-material/Search';
import {
  Box,
  Chip,
  Select,
  TextField,
  InputAdornment,
  FormControl,
  OutlinedInput,
  InputLabel,
  MenuItem
} from '@mui/material';
import { FlexDiv } from '../styles';
import { searchExperiment, selectModelType, selectStatus } from '../reducers/mathModelFiltersSlice';
import ALL_STATUS from '../../../config/constants';

const MathModelFilters = () => {
  const mathModelFilters = useSelector((state) => state.mathModelFilters)
  const dispatch = useDispatch();

  return(
    <FlexDiv margin='16px 0px' flexDirection='row' justifyContent='space-evenly' flexBasis='10%'>
      <FlexDiv flexBasis='45%'>
        <TextField
          fullWidth
          value={mathModelFilters.experimentName}
          onChange={(e) => dispatch(searchExperiment(e.target.value))}
          label='Buscar experimento'
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </FlexDiv>
      <FlexDiv flexBasis='25%'>
        <FormControl sx={{ width: '100%' }}>
          <InputLabel id="model-type-filter-label">Tipo do Modelo</InputLabel>
          <Select
            labelId="model-type-filter-label"
            id="model-type-filter"
            multiple
            value={mathModelFilters.modelType}
            onChange={(e) => dispatch(selectModelType(e.target.value))}
            input={<OutlinedInput id="select-multiple-chip" label="Tipo do Modelo" />}
            renderValue={(selected) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
          >
            {['XGBRegressor', 'LinearRegressor'].map((name) => (
              <MenuItem
                key={name}
                value={name}
              >
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </FlexDiv>
      <FlexDiv flexBasis='25%'>
        <FormControl sx={{ width: '100%' }}>
          <InputLabel id="status-filter-label">Status</InputLabel>
          <Select
            labelId="status-filter-label"
            id="status-filter"
            multiple
            value={mathModelFilters.status}
            onChange={(e) => dispatch(selectStatus(e.target.value))}
            input={<OutlinedInput id="select-multiple-chip" label="Status" />}
            renderValue={(selected) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip variant='outlined' key={value} label={value} color={ALL_STATUS[value]?.color} size='small' />
                ))}
              </Box>
            )}
          >
            {Object.keys(ALL_STATUS).map((name) => (
              <MenuItem
                key={name}
                value={name}
              >
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </FlexDiv>
    </FlexDiv>
  );
}

export default MathModelFilters;