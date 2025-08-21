const fs = require('fs');
const path = require('path');

// Load real listings by default
let listings = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../data/listings.json'), 'utf8')
);

// Allow tests to override listing data
function _setListings(testData) {
  listings = testData;
}

function getAllListings() {
  return listings;
}

function filterByMaxRent(maxRent) {
  return listings.filter(listing => listing.rent <= maxRent);
}

function findNearbyListings(maxDistance) {
  return listings.filter(listing => listing.distance <= maxDistance);
}

function filterByRoomType(type) {
  return listings.filter(listing => listing.roomType.toLowerCase() === type.toLowerCase());
}

function addListing(newListing) {
  listings.push(newListing);
  return newListing;
}

function filterByAmenities(requiredAmenities) {
  return listings.filter(listing =>
    requiredAmenities.every(amenity =>
      listing.amenities.map(a => a.toLowerCase()).includes(amenity.toLowerCase())
    )
  );
}

module.exports = {
  getAllListings,
  filterByMaxRent,
  findNearbyListings,
  filterByRoomType,
  filterByAmenities,
  _setListings,
  addListing
};