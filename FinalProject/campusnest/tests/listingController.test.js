const {
  filterByMaxRent,
  findNearbyListings,
  filterByRoomType,
  filterByAmenities,
  addListing,
  _setListings
} = require('../backend/controllers/listingsController');

const sampleListings = [
  {
    id: 1,
    title: "Private room near campus",
    rent: 900,
    distance: 0.8,
    roomType: "Private",
    address: "123 Main St",
    location: "Cal Poly Pomona",
    verified: true,
    neighborhood: "North Campus",
    amenities: ["WiFi", "Laundry"],
    reviews: []
  },
  {
    id: 2,
    title: "Studio apartment",
    rent: 1200,
    distance: 3.0,
    roomType: "Studio",
    address: "456 Oak Ave",
    location: "Cal Poly Pomona",
    verified: true,
    neighborhood: "South Campus",
    amenities: ["AC", "Parking"],
    reviews: []
  },
  {
    id: 3,
    title: "Shared room near bus stop",
    rent: 800,
    distance: 1.5,
    roomType: "Shared",
    address: "789 Elm St",
    location: "Cal Poly Pomona",
    verified: true,
    neighborhood: "West Side",
    amenities: ["WiFi", "Parking"],
    reviews: []
  }
];

beforeEach(() => {
  _setListings([...sampleListings]); 
});

describe('filterByMaxRent()', () => {
  test('returns listings under or equal to max rent', () => {
    const result = filterByMaxRent(1000);
    expect(result).toEqual([sampleListings[0], sampleListings[2]]);
  });

  test('returns empty array if no listings qualify', () => {
    const result = filterByMaxRent(500);
    expect(result).toEqual([]);
  });
});

describe('findNearbyListings()', () => {
  test('returns listings within max distance', () => {
    const result = findNearbyListings(2.0);
    expect(result).toEqual([sampleListings[0], sampleListings[2]]);
  });

  test('returns empty array if all listings are too far', () => {
    const result = findNearbyListings(0.1);
    expect(result).toEqual([]);
  });
});

describe('filterByRoomType()', () => {
  test('returns listings matching the room type', () => {
    const result = filterByRoomType("Private");
    expect(result).toEqual([sampleListings[0]]);
  });

  test('is case-insensitive', () => {
    const result = filterByRoomType("studio");
    expect(result).toEqual([sampleListings[1]]);
  });
});

describe('filterByAmenities()', () => {
  test('returns listings that include all required amenities', () => {
    const result = filterByAmenities(["WiFi", "Parking"]);
    expect(result).toEqual([sampleListings[2]]);
  });

  test('returns empty array if no listings include all required amenities', () => {
    const result = filterByAmenities(["Gym", "AC"]);
    expect(result).toEqual([]);
  });

  test('is case-insensitive for amenities', () => {
    const result = filterByAmenities(["wifi", "parking"]);
    expect(result).toEqual([sampleListings[2]]);
  });
});

describe('addListing()', () => {
  test('adds a new listing to the list', () => {
    const newListing = {
      id: 4,
      title: "New Test Room",
      rent: 1000,
      distance: 1.0,
      roomType: "Shared",
      address: "101 Test St",
      location: "Cal Poly Pomona",
      verified: true,
      neighborhood: "East Village",
      amenities: ["WiFi"],
      reviews: []
    };

    const result = addListing(newListing);
    expect(result).toEqual(newListing);

    const allListings = filterByMaxRent(2000); 
    expect(allListings).toContainEqual(newListing);
  });
});
