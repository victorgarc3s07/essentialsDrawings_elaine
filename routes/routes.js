const express = require('express')
const router = express.Router()
const routesControl = require('../controllers/routesControl')
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/category', authMiddleware, routesControl.addCategory)
router.get('/category', authMiddleware, routesControl.categories)
router.delete('/category/:id_categoria', authMiddleware, routesControl.delCategory)
router.post('/addimg', authMiddleware, routesControl.addImg)
router.post('/addpack', authMiddleware, routesControl.addPack)
router.post('/addcart', authMiddleware, routesControl.addCart)
router.post('/pedidos', authMiddleware, routesControl.addPedido)
router.get('/user', authMiddleware, routesControl.users)

router.get('/images', authMiddleware, routesControl.images)
router.get('/packs', authMiddleware, routesControl.packs)
router.get('/cart', authMiddleware, routesControl.cart)
router.get('/orders', authMiddleware, routesControl.orders)

module.exports = router