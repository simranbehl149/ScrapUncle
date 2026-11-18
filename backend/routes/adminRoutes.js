const express = require('express');
const router = express.Router();
const { protect, adminProtect } = require('../middleware/auth');
const c = require('../controllers/adminController');

router.post('/login', c.login);

router.use(protect, adminProtect);

router.get('/dashboard', c.getDashboard);

router.get('/users', c.getAllUsers);
router.delete('/users/:id', c.deleteUser);

router.get('/pickups', c.getAllPickups);
router.put('/pickups/:id/status', c.updatePickupStatus);
router.delete('/pickups/:id', c.deletePickup);

router.get('/products', c.getAllProducts);
router.post('/products', c.createProduct);
router.put('/products/:id', c.updateProduct);
router.delete('/products/:id', c.deleteProduct);

router.get('/orders', c.getAllOrders);
router.put('/orders/:id/status', c.updateOrderStatus);
router.delete('/orders/:id', c.deleteOrder);

module.exports = router;