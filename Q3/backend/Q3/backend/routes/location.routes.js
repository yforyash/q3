const express = require('express');
const router = express.Router();
const { getAllLocations, createLocation, updateLocation, deleteLocation } = require('../controllers/location.controller');
const { authenticate } = require('../middlewares/auth.middleware');
const { authorize } = require('../middlewares/rbac.middleware');

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
router.get('/', authenticate, authorize('admin', 'subadmin', 'employee', 'driver'), getAllLocations);

/**
 * @swagger
 * /api/locations:
 *   post:
 *     summary: Create a location
 *     tags: [Locations]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Delhi Airport
 *               latitude:
 *                 type: number
 *                 example: 28.5562
 *               longitude:
 *                 type: number
 *                 example: 77.1000
 *     responses:
 *       201:
 *         description: Location created
 */
router.post('/', authenticate, authorize('admin', 'subadmin'), createLocation);

/**
 * @swagger
 * /api/locations/{id}:
 *   put:
 *     summary: Update a location
 *     tags: [Locations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Delhi Airport
 *               latitude:
 *                 type: number
 *                 example: 28.5562
 *               longitude:
 *                 type: number
 *                 example: 77.1000
 *     responses:
 *       200:
 *         description: Location updated
 */
router.put('/:id', authenticate, authorize('admin', 'subadmin'), updateLocation);

/**
 * @swagger
 * /api/locations/{id}:
 *   delete:
 *     summary: Delete a location
 *     tags: [Locations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Location deleted
 */
router.delete('/:id', authenticate, authorize('admin'), deleteLocation);

module.exports = router;