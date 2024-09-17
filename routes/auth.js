const express = require('express')
const router = express.Router()
const authControl = require('../controllers/authControl')

router.post('/register', authControl.registerUser)

module.exports = router