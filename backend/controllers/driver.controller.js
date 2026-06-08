const { getDrivers, addDriver, editDriver, removeDriver } = require('../services/driver.service');
const { sendSuccess, sendError } = require('../utils/response.utils');

const getAllDrivers = async (req, res) => {
  try {
    const drivers = await getDrivers();
    sendSuccess(res, drivers);
  } catch (err) {
    sendError(res, err.message);
  }
};

const createDriver = async (req, res) => {
  try {
    const { user_id, license_number, phone } = req.body;
    const driver = await addDriver(user_id, license_number, phone);
    sendSuccess(res, driver, 'Driver created', 201);
  } catch (err) {
    sendError(res, err.message);
  }
};

const updateDriver = async (req, res) => {
  try {
    const { license_number, phone, is_available } = req.body;
    const driver = await editDriver(req.params.id, license_number, phone, is_available);
    sendSuccess(res, driver, 'Driver updated');
  } catch (err) {
    sendError(res, err.message);
  }
};

const deleteDriver = async (req, res) => {
  try {
    await removeDriver(req.params.id);
    sendSuccess(res, null, 'Driver deleted');
  } catch (err) {
    sendError(res, err.message);
  }
};

module.exports = { getAllDrivers, createDriver, updateDriver, deleteDriver };