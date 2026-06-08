const {
  getLocations,
  addLocation,
  editLocation,
  removeLocation
} = require('../services/location.service');

const {
  sendSuccess,
  sendError
} = require('../utils/response.utils');

const getAllLocations = async (req, res) => {
  try {
    const locations = await getLocations();
    return sendSuccess(res, locations || []);
  } catch (err) {
    return sendError(res, err.message);
  }
};

const createLocation = async (req, res) => {
  try {
    const { name, latitude, longitude } = req.body;

    if (!name || latitude == null || longitude == null) {
      return sendError(res, 'Missing required fields', 400);
    }

    const location = await addLocation(name, latitude, longitude);

    return sendSuccess(res, location, 'Location created', 201);
  } catch (err) {
    return sendError(res, err.message);
  }
};

const updateLocation = async (req, res) => {
  try {
    const { name, latitude, longitude } = req.body;

    const location = await editLocation(
      req.params.id,
      name,
      latitude,
      longitude
    );

    if (!location) {
      return sendError(res, 'Location not found', 404);
    }

    return sendSuccess(res, location, 'Location updated');
  } catch (err) {
    return sendError(res, err.message);
  }
};

const deleteLocation = async (req, res) => {
  try {
    await removeLocation(req.params.id);
    return sendSuccess(res, null, 'Location deleted');
  } catch (err) {
    return sendError(res, err.message);
  }
};

module.exports = {
  getAllLocations,
  createLocation,
  updateLocation,
  deleteLocation
};