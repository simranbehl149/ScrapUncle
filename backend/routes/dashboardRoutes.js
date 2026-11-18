const express = require('express');
const { getUserDashboard } = require('../controllers/dashboardController');
const { protect } = require('../middleware/auth');
const router = express.Router();

router.get('/', protect, getUserDashboard);

module.exports = router;