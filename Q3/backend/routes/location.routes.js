const express = require('express');
const router = express.Router();

const {
  getAllLocations,
  createLocation,
  updateLocation,
  deleteLocation,
} = require('../controllers/location.controller');

const { authenticate } = require('../middlewares/auth.middleware');
const { authorize } = require('../middlewares/rbac.middleware');

// Safety check (prevents "handler must be a function" crash)
if (typeof authenticate !== 'function') {
  throw new Error('authenticate middleware is not a function');
}

if (typeof authorize !== 'function') {
  throw new Error('authorize middleware is not a function');
}

if (typeof getAllLocations !== 'function') {
  throw new Error('getAllLocations controller is not a function');
}

if (typeof createLocation !== 'function') {
  throw new Error('createLocation controller is not a function');
}

if (typeof updateLocation !== 'function') {
  throw new Error('updateLocation controller is not a function');
}

if (typeof deleteLocation !== 'function') {
  throw new Error('deleteLocation controller is not a function');
}

/**
 * @swagger
 * /api/locations:
 *   get:
 *     summary: Get all locations
 *     tags: [Locations]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of locations
 */
router.get(
  '/',
  authenticate,
  authorize('admin', 'subadmin', 'employee', 'driver'),
  getAllLocations
);

/**
 * @swagger
 * /api/locations:
 *   post:
 *     summary: Create a location
 *     tags: [Locations]
 *     security:
 *       - bearerAuth: []
 */
router.post(
  '/',
  authenticate,
  authorize('admin', 'subadmin'),
  createLocation
);

/**
 * @swagger
 * /api/locations/{id}:
 *   put:
 *     summary: Update a location
 */
router.put(
  '/:id',
  authenticate,
  authorize('admin', 'subadmin'),
  updateLocation
);

/**
 * @swagger
 * /api/locations/{id}:
 *   delete:
 *     summary: Delete a location
 */
router.delete(
  '/:id',
  authenticate,
  authorize('admin'),
  deleteLocation
);

module.exports = router;