const express = require('express')
const router = express.Router()
const routesControl = require('../controllers/routesControl')
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', authMiddleware, routesControl.users)
router.get('/', authMiddleware, routesControl.orders)

module.exports = router