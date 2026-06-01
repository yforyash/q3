const { getLocations, addLocation, editLocation, removeLocation } = require('../services/location.service');
const { sendSuccess, sendError } = require('../utils/response.utils');

const getAllLocations = async (req, res) => {
  try {
    const locations = await getLocations();
    sendSuccess(res, locations);
  } catch (err) {
    sendError(res, err.message);
  }
};

const createLocation = async (req, res) => {
  try {
    const { name, latitude, longitude } = req.body;
    const location = await addLocation(name, latitude, longitude);
    sendSuccess(res, location, 'Location created', 201);
  } catch (err) {
    sendError(res, err.message);
  }
};

const updateLocation = async (req, res) => {
  try {
    const { name, latitude, longitude } = req.body;
    const location = await editLocation(req.params.id, name, latitude, longitude);
    sendSuccess(res, location, 'Location updated');
  } catch (err) {
    sendError(res, err.message);
  }
};

const deleteLocation = async (req, res) => {
  try {
    await removeLocation(req.params.id);
    sendSuccess(res, null, 'Location deleted');
  } catch (err) {
    sendError(res, err.message);
  }
};

module.exports = { getAllLocations, createLocation, updateLocation, deleteLocation };