import React, { useEffect } from 'react';
import { Container, Grid } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import FilterOptions from './FilterOptions';
import FilteredResults from './FilteredResults';
import {
  setLocation,
  setBodyType,
  setBrand,
  setOwners,
  setBudget,
  setFuelType,
  setTransmission,
} from '../store/filterSlice';
import { setCardData } from '../store/dataSlice';

const FilteredPage: React.FC = () => {
  const filterState = useSelector((state: any) => state.filter);
  const dispatch = useDispatch();

  const fetchData = React.useCallback(async () => {
    try {
      const response = await fetch('http://localhost:5000/api/cards');
      const data = await response.json();
      dispatch(setCardData(data));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, [dispatch]); 

 useEffect(() => {
   fetchData();
 }, [fetchData]);

  const handleFilterChange = (fieldName: string, value: any) => {
    switch (fieldName) {
      case 'location':
        dispatch(setLocation(value));
        break;
      case 'bodyType':
        dispatch(setBodyType(value));
        break;
      case 'brand':
        dispatch(setBrand(value));
        break;
      case 'owners':
        dispatch(setOwners(value));
        break;
      case 'budget':
        dispatch(setBudget(value));
        break;
      case 'fuelType':
        dispatch(setFuelType(value));
        break;
      case 'transmission':
        dispatch(setTransmission(value));
        break;
      default:
        break;
    }
  };

  const handleRemoveFilter = (fieldName: string) => {
    if (fieldName === 'all') {
      dispatch(setLocation(null));
      dispatch(setBodyType(null));
      dispatch(setBrand(null));
      dispatch(setOwners(null));
      dispatch(setBudget(null));
      dispatch(setFuelType(null));
      dispatch(setTransmission(null));
      fetchData();
    } else {
      switch (fieldName) {
        case 'location':
          dispatch(setLocation(null));
          break;
        case 'bodyType':
          dispatch(setBodyType(null));
          break;
        case 'brand':
          dispatch(setBrand(null));
          break;
        case 'owners':
          dispatch(setOwners(null));
          break;
        case 'budget':
          dispatch(setBudget(null));
          break;
        case 'fuelType':
          dispatch(setFuelType(null));
          break;
        case 'transmission':
          dispatch(setTransmission(null));
          break;
        default:
          break;
      }
    }
  };

  return (
    <div style={{ margin: '20px' }}>
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={3}>
            <FilterOptions
              filters={filterState}
              onFilterChange={handleFilterChange}
              onRemoveFilter={handleRemoveFilter}
            />
          </Grid>
          <Grid item xs={9}>
            <FilteredResults filters={filterState} />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default FilteredPage;
