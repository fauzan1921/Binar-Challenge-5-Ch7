const express = require('express')
const passport = require('passport')
const router = express.Router()
const pageController = require('../controllers/page')
const customMiddleware = require('../utils/customMiddleware')

router.get('/login', pageController.login)
router.get('/superadmin-page', pageController.superadminPage)
router.get('/player-page', pageController.playerPage)
router.get('/room/:id', pageController.room)

module.exports = router