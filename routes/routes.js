const express = require('express')
const router = express.Router()
const routesControl = require('../controllers/routesControl')
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/addcategory', authMiddleware, routesControl.addCategory)
router.post('/addimg', authMiddleware, routesControl.addImg)
router.post('/', authMiddleware, routesControl.addCart)
router.post('/', authMiddleware, routesControl.addPedido)
router.get('/', authMiddleware, routesControl.users)
router.get('/', authMiddleware, routesControl.orders)

module.exports = router