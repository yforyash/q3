const { findAll, createLocation, updateLocation, deleteLocation } = require('../models/location.model');

const getLocations = async () => await findAll();
const addLocation = async (name, latitude, longitude) => await createLocation(name, latitude, longitude);
const editLocation = async (id, name, latitude, longitude) => await updateLocation(id, name, latitude, longitude);
const removeLocation = async (id) => await deleteLocation(id);

module.exports = { getLocations, addLocation, editLocation, removeLocation };