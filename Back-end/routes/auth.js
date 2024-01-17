const express = require('express')
const router = express.Router();
const authController = require('../Controllers/auth')
const mongoose = require('mongoose')

router.post('/register', authController.register)
router.post('/login', authController.login)
router.post('/recovery-password', authController.recoverPassword)
router.post('/reset-password', authController.resetPassword)


module.exports = router;