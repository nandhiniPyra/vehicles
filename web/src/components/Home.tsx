import React, { useEffect, useState } from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  IconButton,
  Button,
  Container,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setCardData, setLoadedRecords } from '../store/dataSlice';
import CardItem from './CardItem';
import AddCardForm from './AddCardForm';
import { addCard, updateCard } from '../store/dataSlice';
import { Link } from 'react-router-dom';
import FilterListIcon from '@mui/icons-material/FilterList';

interface FormData {
  id: number;
  model: string;
  color: string;
  manufacturer: string;
  location: string;
  owners: string;
  transmission: string;
  externalFitments: string;
  insuranceValidUntil: string;
  kms: string;
  photo: string;
  brand: string;
  bodyType: string;
  price: string;
  fuelType: string;
}

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const cardData = useSelector((state: any) => state.data.cardData);
  const loadedRecords = useSelector((state: any) => state.data.loadedRecords);
  const [isFormOpen, setFormOpen] = useState(false);
  const [submittedData, setSubmittedData] = useState<FormData | null>(null);
  const [formDataForEdit, setFormDataForEdit] = useState<FormData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/cards');
        const data = await response.json();
        dispatch(setCardData(data));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [dispatch]);

  const loadMore = () => {
    dispatch(setLoadedRecords(loadedRecords + 5));
  };

  const openForm = (status: 'add' | 'edit', id?: number) => {
    setFormOpen(true);
    setSubmittedData(null);
    const selectedCard = id
      ? cardData.find((item: any) => item.id === id)
      : null;
    status === 'add'
      ? setFormDataForEdit(null!)
      : setFormDataForEdit(selectedCard);
  };

  const closeForm = () => {
    setFormOpen(false);
  };
  const handleSubmit = async (formData: FormData) => {
    if (formDataForEdit) {
      try {
        const response = await fetch(
          `http://localhost:5000/api/cards/${formDataForEdit.id}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              ...formData,
              id: cardData.length + 1,
              photo: 'https://via.placeholder.com/150',
            }),
          },
        );

        if (response.ok) {
          const updatedCard = await response.json();
          dispatch(updateCard(updatedCard));
          setSubmittedData(formData);
          closeForm();
        } else {
          console.error('Failed to update card data:', response.status);
          closeForm();
        }
      } catch (error) {
        closeForm();

        console.error('Error updating card data:', error);
      }
    } else {
      try {
        const response = await fetch('http://localhost:5000/api/cards', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...formData,
            photo: 'https://via.placeholder.com/150',
          }),
        });

        if (response.ok) {
          const newCard = await response.json();
          dispatch(addCard(newCard));
          setSubmittedData(formData);
          closeForm();
        } else {
          console.error('Failed to submit card data:', response.status);
        }
      } catch (error) {
        console.error('Error submitting card data:', error);
      }
    }
  };

  return (
    <div style={{ margin: '20px' }}>
      <Container>
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center', margin:'10px'
          }}>
          <Link to='/filtered-results'>
            <IconButton color='primary' aria-label='filter'>
              <FilterListIcon /> Go to filter
            </IconButton>
          </Link>
          <Button variant='contained' onClick={() => openForm('add')}>
            Add New
          </Button>
        </div>
        <AddCardForm
          open={isFormOpen}
          onClose={closeForm}
          onSubmit={handleSubmit}
          initialData={formDataForEdit!}
        />
        <Grid container spacing={2}>
          {cardData
            .slice(0, loadedRecords)
            .map(
              (
                card: { id: number; brand: string; photo: string },
                index: number,
              ) => (
                <Grid
                  onClick={() => openForm('edit', card.id)}
                  item
                  key={index}
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}>
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
        {submittedData && (
          <div>
            <h2>Submitted Data</h2>
            <pre>{JSON.stringify(submittedData, null, 2)}</pre>
          </div>
        )}
      </Container>
    </div>
  );
};

export default Home;
