const express = require('express');
const cors = require('cors');
const path = require('path');

const {
  getAllListings,
  addListing 
} = require('./controllers/listingsController');

const app = express();
const PORT = process.env.PORT || 3000;


app.use(cors({ origin: '*' }));
app.use(express.json());


app.use(express.static(path.join(__dirname, '../frontend')));


app.get('/api/test', (req, res) => {
  res.send('Backend is running!');
});


app.get('/api/listings', (req, res) => {
  let results = getAllListings();

  const { maxRent, roomType, maxDistance, amenities } = req.query;

  if (maxRent) {
    results = results.filter(listing => listing.rent <= parseInt(maxRent));
  }

  if (roomType) {
    results = results.filter(listing =>
      listing.roomType.toLowerCase() === roomType.toLowerCase()
    );
  }

  if (maxDistance) {
    results = results.filter(listing =>
      listing.distance <= parseFloat(maxDistance)
    );
  }

  if (amenities) {
    const amenitiesList = amenities
      .split(',')
      .map(a => a.trim().toLowerCase());

    results = results.filter(listing =>
      amenitiesList.every(amenity =>
        listing.amenities.map(a => a.toLowerCase()).includes(amenity)
      )
    );
  }

  res.json(results);
});


app.post('/api/listings', (req, res) => {
  const newListing = req.body;

  if (!newListing || !newListing.title || !newListing.rent) {
    return res.status(400).json({ error: 'Missing listing data' });
  }

  const added = addListing(newListing);
  res.status(201).json(added);
});


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
