const express = require('express')
const router = express.Router()
const authControl = require('../controllers/authControl')

router.post('/register', authControl.registerUser)
router.post('/login', authControl.loginUser)

router.post('/request-password-reset', authControl.requestPasswordReset)
router.post('/reset-password', authControl.resetPassword)

module.exports = router