import React from 'react';
import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import CardItem from './CardItem';
import { setLoadedRecords } from '../store/dataSlice';

interface FilteredResultsProps {
  filters: any;
}

const FilteredResults: React.FC<FilteredResultsProps> = ({ filters }) => {
  const dispatch = useDispatch();
  const cardData = useSelector((state: any) => state.data.cardData);
  const loadedRecords = useSelector((state: any) => state.data.loadedRecords);
  const filteredData = applyFilters(cardData, filters);
  const loadMore = () => {
    dispatch(setLoadedRecords(loadedRecords + 5));
  };
  return (
    <Grid container spacing={2}>
      {filteredData.map(
        (card: { brand: string; photo: string }, index: number) => (
          <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
            <CardItem model={card.brand} photo={card.photo} />
          </Grid>
        ),
      )}
      <Grid item xs={12} sm={6} md={4} lg={3}>
        {loadedRecords < cardData.length && (
          <Card onClick={loadMore}>
            <CardContent>
              <Box
                display='flex'
                flexDirection='column'
                alignItems='center'
                justifyContent='center'
                style={{ height: '100%' }}>
                <Typography gutterBottom variant='h5' component='div'>
                  More
                </Typography>
              </Box>
            </CardContent>
          </Card>
        )}
      </Grid>
    </Grid>
  );
};

const applyFilters = (data: any[], filters: any) => {
  if (filters.location) {
    data = data.filter((item) => item.location === filters.location);
  }
  if (filters.bodyType) {
    data = data.filter((item) => item.bodyType === filters.bodyType);
  }
  if (filters.brand?.length > 0) {
    data = data.filter((item) => filters.brand.includes(item.brand));
  }
  if (filters.owners) {
    data = data.filter((item) => item.owners === filters.owners);
  }
  if (filters.budget?.length > 0) {
    data = data.filter((item) => {
      const price = parseInt(item.price);
      return filters.budget.some((budgetRange: string) => {
        switch (budgetRange) {
          case 'Less than 2 L':
            return price < 200000;
          case '2L - 4L':
            return price >= 200000 && price <= 400000;
          case '4L - 6L':
            return price >= 400000 && price <= 600000;
          case 'More than 6L':
            return price >= 600000;
          default:
            return true;
        }
      });
    });
  }
  if (filters.fuelType) {
    data = data.filter((item) => item.fuelType === filters.fuelType);
  }
  if (filters.transmission) {
    data = data.filter((item) => item.transmission === filters.transmission);
  }
  return data;
};

export default FilteredResults;
