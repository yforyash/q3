const { findAll, createCab, updateCab, deleteCab } = require('../models/cab.model');

const getCabs = async () => await findAll();
const addCab = async (cab_number, model, driver_id) => await createCab(cab_number, model, driver_id);
const editCab = async (id, cab_number, model, driver_id, is_active) => await updateCab(id, cab_number, model, driver_id, is_active);
const removeCab = async (id) => await deleteCab(id);

module.exports = { getCabs, addCab, editCab, removeCab };