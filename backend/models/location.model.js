let locations = [];

const findAll = async () => {
  return locations;
};

const createLocation = async (name, latitude, longitude) => {
  const newLocation = {
    id: Date.now(),
    name,
    latitude,
    longitude,
  };

  locations.push(newLocation);
  return newLocation;
};

const updateLocation = async (id, name, latitude, longitude) => {
  const loc = locations.find(l => l.id == id);

  if (!loc) return null;

  loc.name = name;
  loc.latitude = latitude;
  loc.longitude = longitude;

  return loc;
};

const deleteLocation = async (id) => {
  locations = locations.filter(l => l.id != id);
};

module.exports = {
  findAll,
  createLocation,
  updateLocation,
  deleteLocation
};