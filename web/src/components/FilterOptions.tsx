import React from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Autocomplete,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Box,
  TextField,
  RadioGroup,
  Radio,
  Typography,
  Chip,
  Grid,
  Button,
} from '@mui/material';
import { useSelector } from 'react-redux';

interface FilterOptionsProps {
  filters: any;
  onFilterChange: (fieldName: string, value: any) => void;
  onRemoveFilter: (fieldName: string) => void;
}

const FilterOptions: React.FC<FilterOptionsProps> = ({
  filters,
  onFilterChange,
  onRemoveFilter,
}) => {
  const budgetOptions = ['Less than 2 L', '2L - 4L', '4L - 6L', 'More than 6L'];
  const uniqueBrands: string[] = useSelector(
    (state: any) => state.data.uniqueBrands,
  );
  const uniqueLocations: string[] = useSelector(
    (state: any) => state.data.uniqueLocations,
  );
  const uniqueBodyType: string[] = useSelector(
    (state: any) => state.data.uniqueBodyType,
  );

  const renderFilter = (
    label: string,
    component: React.ReactNode,
    key?: string | number,
  ) => (
    <Box key={key} mb={2}>
      <Typography variant='subtitle1' gutterBottom>
        {label}
      </Typography>
      <Box>{component}</Box>
    </Box>
  );
 

  return (
    <>
      <Box mt={2}>
        <Button variant='outlined' onClick={() => onRemoveFilter('all')}>
          Clear All Filters
        </Button>
      </Box>{' '}
      <Box>
        {renderFilter(
          'Location',
          <FormControl sx={{ m: 1, width: '100%' }}>
            <InputLabel id='location-label'>Location</InputLabel>
            <Select
              labelId='location-label'
              id='location'
              label='Location'
              value={filters.location || ''}
              onChange={(e) => onFilterChange('location', e.target.value)}>
              <MenuItem value=''>All Locations</MenuItem>
              {uniqueLocations.map((location: string, index: React.Key) => (
                <MenuItem key={index} value={location}>
                  {location}
                </MenuItem>
              ))}
            </Select>
          </FormControl>,
        )}
        {renderFilter(
          'Body Type',
          <Autocomplete
            id='bodyType'
            options={uniqueBodyType}
            value={filters.bodyType || null}
            onChange={(_, value) => onFilterChange('bodyType', value)}
            renderInput={(params) => (
              <TextField {...params} label='Body Type' />
            )}
          />,
        )}

        {renderFilter(
          'Brand',
          <FormControl component='fieldset'>
            <FormGroup>
              {uniqueBrands.map((brand: string) => 
              {  return <FormControlLabel
                  key={brand}
                  control={
                    <Checkbox
                      checked={(filters.brand|| []).includes(brand)}
                      onChange={() => onFilterChange('brand', brand)}
                      value={brand}
                    />
                  }
                  label={brand}
                />}
              )}
            </FormGroup>
          </FormControl>,
        )}

        {renderFilter(
          'Owners',
          <FormControl component='fieldset'>
            <RadioGroup
              aria-label='owners'
              name='owners'
              value={filters.owners || ''}
              onChange={(e) => onFilterChange('owners', e.target.value)}>
              <FormControlLabel
                value='1'
                control={<Radio />}
                label='1st owner'
              />
              <FormControlLabel
                value='2'
                control={<Radio />}
                label='2nd Owner'
              />
              <FormControlLabel
                value='3'
                control={<Radio />}
                label='3rd Owner'
              />
            </RadioGroup>
          </FormControl>,
        )}

        {renderFilter(
          'Budget',
          <Grid container spacing={1}>
            {budgetOptions.map((value: String) => {
              return (
                <Grid item xs={6}>
                  <Chip
                    label={value}
                    color={(filters.budget||[]).includes(value) ? 'primary' : 'default'}
                    variant='outlined'
                    onClick={() => onFilterChange('budget', value)}
                  />
                </Grid>
              );
            })}
          </Grid>,
        )}

        {renderFilter(
          'Fuel type',
          <FormControl component='fieldset'>
            <RadioGroup
              aria-label='fuel-type'
              name='fuel-type'
              value={filters.fuelType || ''}
              onChange={(e) => onFilterChange('fuelType', e.target.value)}>
              <FormControlLabel
                value='Petrol'
                control={<Radio />}
                label='Petrol'
              />
              <FormControlLabel
                value='Diesel'
                control={<Radio />}
                label='Diesel'
              />
              <FormControlLabel value='CNG' control={<Radio />} label='CNG' />
            </RadioGroup>
          </FormControl>,
        )}

        {renderFilter(
          'Transmission',
          <FormControl component='fieldset'>
            <RadioGroup
              aria-label='transmission'
              name='transmission'
              value={filters.transmission || ''}
              onChange={(e) => onFilterChange('transmission', e.target.value)}>
              <FormControlLabel
                value='Automatic'
                control={<Radio />}
                label='Automatic'
              />
              <FormControlLabel
                value='Manual'
                control={<Radio />}
                label='Manual'
              />
            </RadioGroup>
          </FormControl>,
        )}
      </Box>
    </>
  );
};

export default FilterOptions;
