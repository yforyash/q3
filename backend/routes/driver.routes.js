const express = require('express');
const router = express.Router();
const {
  getAllDrivers,
  createDriver,
  updateDriver,
  deleteDriver,
} = require('../controllers/driver.controller');
const { authenticate } = require('../middlewares/auth.middleware');
const { authorize } = require('../middlewares/rbac.middleware');

/**
 * @swagger
 * /api/drivers:
 *   get:
 *     summary: Get all drivers
 *     tags: [Drivers]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of drivers
 */
router.get(
  '/',
  authenticate,
  authorize('admin', 'subadmin'),
  getAllDrivers
);

/**
 * @swagger
 * /api/drivers:
 *   post:
 *     summary: Create a driver
 *     tags: [Drivers]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [user_id, license_number, phone]
 *             properties:
 *               user_id:
 *                 type: integer
 *               license_number:
 *                 type: string
 *               phone:
 *                 type: string
 *     responses:
 *       201:
 *         description: Driver created
 */
router.post(
  '/',
  authenticate,
  authorize('admin', 'subadmin'),
  createDriver
);

/**
 * @swagger
 * /api/drivers/{id}:
 *   put:
 *     summary: Update a driver
 *     tags: [Drivers]
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
 *               license_number:
 *                 type: string
 *               phone:
 *                 type: string
 *               is_available:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Driver updated
 */
router.put(
  '/:id',
  authenticate,
  authorize('admin', 'subadmin'),
  updateDriver
);

/**
 * @swagger
 * /api/drivers/{id}:
 *   delete:
 *     summary: Delete a driver
 *     tags: [Drivers]
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
 *         description: Driver deleted
 */
router.delete(
  '/:id',
  authenticate,
  authorize('admin'),
  deleteDriver
);

module.exports = router;