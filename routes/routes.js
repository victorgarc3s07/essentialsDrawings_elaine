const express = require('express')
const router = express.Router()
const routesAdm = require('../controllers/routesAdm');
const routesCart = require('../controllers/routesCart');
const routesUser = require('../controllers/routesUser');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/add-category', authMiddleware, routesAdm.addCategory)
router.get('/categories', authMiddleware, routesAdm.categories)
router.patch('/edit-category/:id_categoria', authMiddleware, routesAdm.editCategory)
router.delete('/category/:id_categoria', authMiddleware, routesAdm.delCategory)

router.post('/add-payment', authMiddleware, routesAdm.addPayment)
router.get('/payments', authMiddleware, routesAdm.payments)
router.patch('/edit-payment/:id_payment', authMiddleware, routesAdm.editPayment)
router.delete('/payment/:id_payment', authMiddleware, routesAdm.delPayment)

router.post('/add-image', authMiddleware, routesAdm.addImg)
router.get('/images', authMiddleware, routesAdm.images)
router.patch('/edit-image/:id_image', authMiddleware, routesAdm.editImg)
router.delete('/image/:id_image', authMiddleware, routesAdm.delImg)

router.post('/add-pack', authMiddleware, routesAdm.addPack)
router.get('/packs', authMiddleware, routesAdm.packs)
router.patch('/edit-pack/:id_pack', authMiddleware, routesAdm.editPack)
router.delete('/pack/:id_pack', authMiddleware, routesAdm.delPack)

router.get('/categoriesDel', authMiddleware, routesAdm.categoriaDeletada)

router.get('/datas-employee/:id_employee', authMiddleware, routesAdm.dadosEmployee)
router.patch('/datas-employee/:id_employee', authMiddleware, routesAdm.editDatasEmployee)

router.post('/add-order', authMiddleware, routesAdm.addOrder)
router.get('/orders', authMiddleware, routesAdm.orders)

router.get('/users', authMiddleware, routesAdm.users)
router.get('/search', authMiddleware, routesAdm.search)

router.get('/filtro/:id_categoria', authMiddleware, routesAdm.filtroCategories)
router.get('/filtro/images/all', authMiddleware, routesAdm.filtroImages)
router.get('/filtro/packs/all', authMiddleware, routesAdm.filtroPacks)

router.post('/addcart', authMiddleware, routesCart.addCart)
router.get('/cart', authMiddleware, routesCart.cart)
router.delete('/cart/:id', authMiddleware, routesCart.delItemCart)

router.get('/datas-user/:id', authMiddleware, routesUser.dadosUser)
router.patch('/datas-user/:id', authMiddleware, routesUser.editDatasUser)
router.get('/orders-user', authMiddleware, routesUser.ordersUser)
router.get('/orders/filtro/:id_categoria', authMiddleware, routesUser.filtroCategories)
router.get('/orders/filtro/images/:id_usuario', authMiddleware, routesUser.filtroImages)
router.get('/orders/filtro/packs/:id_usuario', authMiddleware, routesUser.filtroPacks)

module.exports = router