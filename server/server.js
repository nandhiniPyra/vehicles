const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require('cors');

app.use(cors());
app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.json());

let cardData = [];

const dataFilePath = path.join(__dirname, 'data.json');
if (fs.existsSync(dataFilePath)) {
  const rawData = fs.readFileSync(dataFilePath);
  cardData = JSON.parse(rawData);
}

app.get('/api/cards', (req, res) => {
  res.json(cardData);
});

app.put('/api/cards/:id', (req, res) => {
  const cardId = parseInt(req.params.id);
  const updatedCard = req.body;
  const cardIndex = cardData.findIndex((card) => card.id === cardId);
  if (cardIndex !== -1) {    
    cardData[cardIndex] = { ...cardData[cardIndex], ...updatedCard };
    fs.writeFileSync(dataFilePath, JSON.stringify(cardData, null, 2));
    res.status(200).json(cardData[cardIndex]);
  } else {
    res.status(404).json({ message: 'Card not found' });
  }
});

app.post('/api/cards', (req, res) => {
  const newCard = req.body;
  cardData.push(newCard);
  fs.writeFileSync(dataFilePath, JSON.stringify(cardData, null, 2));
  res.status(201).json(newCard);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
