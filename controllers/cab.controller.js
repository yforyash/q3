const { getCabs, addCab, editCab, removeCab } = require('../services/cab.service');
const { sendSuccess, sendError } = require('../utils/response.utils');

const getAllCabs = async (req, res) => {
  try {
    const cabs = await getCabs();
    sendSuccess(res, cabs);
  } catch (err) {
    sendError(res, err.message);
  }
};

const createCab = async (req, res) => {
  try {
    const { cab_number, model, driver_id } = req.body;
    const cab = await addCab(cab_number, model, driver_id);
    sendSuccess(res, cab, 'Cab created', 201);
  } catch (err) {
    sendError(res, err.message);
  }
};

const updateCab = async (req, res) => {
  try {
    const { cab_number, model, driver_id, is_active } = req.body;
    const cab = await editCab(req.params.id, cab_number, model, driver_id, is_active);
    sendSuccess(res, cab, 'Cab updated');
  } catch (err) {
    sendError(res, err.message);
  }
};

const deleteCab = async (req, res) => {
  try {
    await removeCab(req.params.id);
    sendSuccess(res, null, 'Cab deleted');
  } catch (err) {
    sendError(res, err.message);
  }
};

module.exports = { getAllCabs, createCab, updateCab, deleteCab };