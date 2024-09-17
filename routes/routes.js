const express = require('express')
const router = express.Router()
const routesControl = require('../controllers/routesControl')

router.get('/', routesControl.users)
router.get('/', routesControl.orders)

module.exports = router