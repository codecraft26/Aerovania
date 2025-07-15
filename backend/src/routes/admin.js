const express = require('express');
const AdminController = require('../controllers/adminController');
const { authenticateToken, authorizeRole } = require('../middleware/auth');

const router = express.Router();

// All routes require authentication and admin role
router.use(authenticateToken);
router.use(authorizeRole(['admin']));

// User management
router.get('/users', AdminController.getAllUsers);
router.get('/users/:id', AdminController.getUserById);
router.post('/users', AdminController.createUser);
router.delete('/users/:id', AdminController.deactivateUser);

// System statistics
router.get('/stats', AdminController.getSystemStats);

module.exports = router;
