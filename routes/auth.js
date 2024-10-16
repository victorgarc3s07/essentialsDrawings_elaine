const express = require('express')
const router = express.Router()
const authControl = require('../controllers/authControl')

router.post('/register/user', authControl.registerUser)
router.post('/login', authControl.login)
router.post('/request-password-reset', authControl.requestPasswordReset)
router.post('/reset-password', authControl.resetPassword)

module.exports = router