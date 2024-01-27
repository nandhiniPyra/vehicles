import React, { useEffect, useState } from 'react';
import {
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Grid,
  Input,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

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
interface AddCardFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (formData: FormData) => void;
  initialData?: FormData;
}

const AddCardForm: React.FC<AddCardFormProps> = ({
  open,
  onClose,
  onSubmit,
  initialData,
}) => {
  const [formData, setFormData] = useState<FormData>({
    id: 0,
    model: '',
    color: '',
    manufacturer: '',
    location: '',
    owners: '',
    transmission: '',
    externalFitments: '',
    insuranceValidUntil: '',
    kms: '',
    photo: '',
    brand: '',
    bodyType: '',
    price: '',
    fuelType: '',
    ...initialData,
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange =
    (fieldName: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({ ...formData, [fieldName]: e.target.value });
    };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        setFormData({ ...formData, photo: reader.result as string });
      };

      reader.readAsDataURL(file);
    }
  };
  const handleSubmit = () => {
    onSubmit(formData);
    setFormData({
      id: 0,
      model: '',
      color: '',
      manufacturer: '',
      location: '',
      owners: '',
      transmission: '',
      externalFitments: '',
      insuranceValidUntil: '',
      kms: '',
      photo: '',
      brand: '',
      bodyType: '',
      price: '',
      fuelType: '',
    });
  };
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        {initialData ? 'Update Card' : 'Add New Card'}
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2} mt={3}>
          <Grid item xs={6}>
            <TextField
              label='Brand'
              value={formData.brand}
              onChange={handleChange('brand')}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label='Model'
              value={formData.model}
              onChange={handleChange('model')}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label='Body Type'
              value={formData.bodyType}
              onChange={handleChange('bodyType')}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label='Price'
              value={formData.price}
              onChange={handleChange('price')}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label='Fuel Type'
              value={formData.fuelType}
              onChange={handleChange('fuelType')}
              fullWidth
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label='Color'
              value={formData.color}
              onChange={handleChange('color')}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label='Manufacturer'
              value={formData.manufacturer}
              onChange={handleChange('manufacturer')}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label='Location'
              value={formData.location}
              onChange={handleChange('location')}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label='Number of Owners'
              value={formData.owners}
              onChange={handleChange('owners')}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label='Transmission'
              value={formData.transmission}
              onChange={handleChange('transmission')}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label='External Fitments'
              value={formData.externalFitments}
              onChange={handleChange('externalFitments')}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label='Insurance Valid Until'
              value={formData.insuranceValidUntil}
              onChange={handleChange('insuranceValidUntil')}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label='Kilometers (kms)'
              value={formData.kms}
              onChange={handleChange('kms')}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <Input type='file' onChange={handleFileChange} fullWidth />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSubmit}>
          {initialData ? 'Update' : 'Submit'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddCardForm;
