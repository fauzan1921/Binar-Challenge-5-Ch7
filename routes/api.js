const express = require('express')
const passport = require('passport')
const jsonParser = require('body-parser').json()
const router = express.Router()
const apiController = require('../controllers/api')
const customMiddleware = require('../utils/customMiddleware')

router.post('/register', jsonParser, apiController.register)
router.post('/login', jsonParser, apiController.login)
router.get('/protected', passport.authenticate('jwt', { session: false }), apiController.protected)

//untuk membuat room
router.post('/room', jsonParser, passport.authenticate('jwt', { session: false }), 
    customMiddleware.validateSuperadmin, apiController.createRoom)

//untuk menampilkan room list dan pemenang
router.get('/room', passport.authenticate('jwt', { session: false }), apiController.getRoom)

//untuk player memilih room. Ketika dicek di postman berfungsi, namun ketika menjalankan game suit, API ini tidak terpakai.
//Room tetap harus dipilih lagi dengan params.id di API PUT /room/:id
router.put('/choose-room', jsonParser, passport.authenticate('jwt', { session: false }), 
customMiddleware.validatePlayer, apiController.chooseRoom)

//untuk mengirim roomId user yang sudah login agar bisa masuk ke laman room
router.get('/room-id', jsonParser, passport.authenticate('jwt', { session: false }), apiController.getRoomId)

//untuk memilih room, register user sebagai player 1 atau 2, dan juga untuk menentukan player choice
router.put('/room/:id', jsonParser, passport.authenticate('jwt', { session: false }), 
customMiddleware.validatePlayer, apiController.gameRoom)

//untuk generate result dari game suit yang sudah berlangsung di room tertentu
router.put('/room/result/:id', jsonParser, apiController.generateResult)

module.exports = router