const model = require('../models/location.model');

const getLocations = async () => {
  return (await model.findAll?.()) || [];
};

const addLocation = async (name, latitude, longitude) => {
  return model.createLocation(name, latitude, longitude);
};

const editLocation = async (id, name, latitude, longitude) => {
  return model.updateLocation(id, name, latitude, longitude);
};

const removeLocation = async (id) => {
  return model.deleteLocation(id);
};

module.exports = {
  getLocations,
  addLocation,
  editLocation,
  removeLocation
};