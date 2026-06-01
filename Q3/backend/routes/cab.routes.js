const express = require('express');
const router = express.Router();
const { getAllCabs, createCab, updateCab, deleteCab } = require('../controllers/cab.controller');
const { authenticate } = require('../middlewares/auth.middleware');
const { authorize } = require('../middlewares/rbac.middleware');

/**
 * @swagger
 * /api/cabs:
 *   get:
 *     summary: Get all cabs
 *     tags: [Cabs]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of cabs
 */
router.get('/', authenticate, authorize('admin', 'subadmin', 'employee', 'driver'), getAllCabs);

/**
 * @swagger
 * /api/cabs:
 *   post:
 *     summary: Create a cab
 *     tags: [Cabs]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cab_number:
 *                 type: string
 *                 example: DL01AB1234
 *               model:
 *                 type: string
 *                 example: Swift Dzire
 *               driver_id:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Cab created
 */
router.post('/', authenticate, authorize('admin', 'subadmin'), createCab);

/**
 * @swagger
 * /api/cabs/{id}:
 *   put:
 *     summary: Update a cab
 *     tags: [Cabs]
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
 *               cab_number:
 *                 type: string
 *                 example: DL01AB1234
 *               model:
 *                 type: string
 *                 example: Swift Dzire
 *               driver_id:
 *                 type: integer
 *                 example: 1
 *               is_active:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Cab updated
 */
router.put('/:id', authenticate, authorize('admin', 'subadmin'), updateCab);

/**
 * @swagger
 * /api/cabs/{id}:
 *   delete:
 *     summary: Delete a cab
 *     tags: [Cabs]
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
 *         description: Cab deleted
 */
router.delete('/:id', authenticate, authorize('admin'), deleteCab);

module.exports = router;