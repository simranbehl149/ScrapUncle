const express = require('express');
const { createPickup, getUserPickups, cancelPickup } = require('../controllers/pickupController');
const { protect } = require('../middleware/auth');
const router = express.Router();

router.use(protect);
router.post('/', createPickup);
router.get('/', getUserPickups);
router.put('/:id/cancel', cancelPickup);

module.exports = router;