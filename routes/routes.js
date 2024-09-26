const express = require('express')
const router = express.Router()
const routesAdm = require('../controllers/routesAdm');
const routesCart = require('../controllers/routesCart');
const routesUser = require('../controllers/routesUser');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/add-category', authMiddleware, routesAdm.addCategory)
router.get('/categories', authMiddleware, routesAdm.categories)
router.delete('/category/:id_categoria', authMiddleware, routesAdm.delCategory)
//patch payment

router.post('/add-payment', authMiddleware, routesAdm.addPay)
router.get('/payments', authMiddleware, routesAdm.payments)
//deletar payment
//patch payment

router.post('/add-image', authMiddleware, routesAdm.addImg)
router.get('/images', authMiddleware, routesAdm.images)
//deletar image
//patch image

router.post('/add-pack', authMiddleware, routesAdm.addPack)
router.get('/packs', authMiddleware, routesAdm.packs)
//deletar pack
//patch pack

router.post('/add-order', authMiddleware, routesAdm.addOrder)
router.get('/orders', authMiddleware, routesAdm.orders)
//deletar order
//patch order ?

router.get('/user', authMiddleware, routesAdm.users)
//deletar user

router.post('/addcart', authMiddleware, routesCart.addCart)
router.get('/cart', authMiddleware, routesCart.cart)
//deletar itens do cart

module.exports = router