const { findAll, createDriver, updateDriver, deleteDriver } = require('../models/driver.model');

const getDrivers = async () => await findAll();
const addDriver = async (user_id, license_number, phone) => await createDriver(user_id, license_number, phone);
const editDriver = async (id, license_number, phone, is_available) => await updateDriver(id, license_number, phone, is_available);
const removeDriver = async (id) => await deleteDriver(id);

module.exports = { getDrivers, addDriver, editDriver, removeDriver };