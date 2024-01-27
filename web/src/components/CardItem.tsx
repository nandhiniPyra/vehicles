import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';

interface CardItemProps {
  model: string;
  photo: string;
}

const CardItem: React.FC<CardItemProps> = ({ model, photo }) => {
  return (
    <Card>
      <CardContent>
        <Box
          display='flex'
          flexDirection='column'
          alignItems='center'
          justifyContent='center'>
          <img src={photo} alt={model} />
          <Typography gutterBottom variant='h5' component='div'>
            {model}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CardItem;
