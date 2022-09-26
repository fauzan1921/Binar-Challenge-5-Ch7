const { hashSync, compareSync } = require("bcrypt")
const jwt  = require('jsonwebtoken')
const { user, room, game_history } = require("../models")

exports.protected = (req, res) => {
  console.log(req.user)

  res.send({
    message: 'ok'
  })
}

exports.register = async (req, res) => {
    try {
        const data = await user.create({
            username: req.body.username,
            password: hashSync(req.body.password, 9),
            role: req.body.role
          })
      
          res.status(201).send({
            message: 'User created successfully',
            user: {
              username: data.username,
              id: data.id,
              role: data.role
            }
          })
    } catch (error) {
        res.status(422).send({
            message: "User already created"
        })
    }
}

exports.login = async (req, res) => {
  const userData = await user.findOne({
    where: {
      username: req.body.username
    }
  })

  if (!userData){
    return res.status(404).send({
      message: 'User not found'
    })
  }
  

  if( !compareSync(req.body.password, userData.password) ){
    return res.status(401).send({
      message: 'Incorrect Password'
    })
  }

  const payload = {
    username: userData.username,
    id: userData.id,
    role: userData.role,
    roomId: userData.roomId
  }

  const token = jwt.sign(payload, "supersecretkey", { expiresIn: '1d' });

  res.send({
    message: 'Login Success',
    token: `Bearer ${token}`,
    user: payload
  })
}

//handler untuk router POST /room. untuk create room
exports.createRoom = async (req, res) => {
  try {
    const data = await room.create({
      name: req.body.name
    })

    res.status(201).send(data)
  } catch (error) {
    res.status(422).send({
      message: "failed to create room"
    })
  }
}

//handler untuk router GET /room. untuk menampilkan list room dan pemenang
exports.getRoom = async (req, res) => {
  const data = await room.findAll()
  res.send(data)
}

//handler untuk router /choose-room. Router pada akhirnya tidak terpakai
exports.chooseRoom = async (req, res) => {
  const player = await user.findByPk(req.user.id)
  
  //const data = await room.findByPk(req.params.id)
  
  if(player.roomId !== null){
    return res.status(403).send('User has already picked room')
  }
  player.roomId = req.body.roomId
  player.save()
  res.status(202).send('User has choose this room')
}

//handler untuk mengirim roomId agar user bisa masuk ke room sesuai pilihannya
exports.getRoomId = async (req, res) => {
  const player = await user.findByPk(req.user.id)
  res.send(player)
}

//handler untuk memilih room bagi player, menentukan player 1 dan 2, dan menentukan pilihan player/playerchoice
exports.gameRoom = async (req, res) => {
  const data = await room.findByPk(req.params.id)
  const player = await user.findByPk(req.user.id)

  if(data.player1 == null){
  data.player1 = player.username
  data.player1choice = req.body.playerchoice
  data.save()
  res.send('user has become player 1')
  }else if(data.player1 == player.username){
    res.send('you already registered as player 1')
  }else if(data.player1 !== null && data.player2 == null){
    data.player2 = player.username
    data.player2choice = req.body.playerchoice
    data.save()
    res.send('user has become player 2')
  }else{
    res.send('room already full')
  }
}

//handler untuk router /room/result/:id
exports.generateResult = async (req, res) => {
  const data = await room.findByPk(req.params.id)
  //const history = await game_history.findByPk(req.params.id) //TIDAK BERFUNGSI maka saya jadikan comment
  if(data.player1choice === data.player2choice){
    data.result = 'DRAW'
    //history.score = 'DRAW' //TIDAK BERFUNGSI maka saya jadikan comment
    data.save()
  }
  if(data.player1choice === "P" && data.player2choice === "R"){
    data.result = 'PLAYER 1 WIN'
    //history.score = 'PLAYER 1 WIN' //TIDAK BERFUNGSI maka saya jadikan comment
    data.save()
  }
  if(data.player1choice === "P" && data.player2choice === "S"){
    data.result = 'PLAYER 2 WIN'
    //history.score = 'PLAYER 2 WIN' //TIDAK BERFUNGSI maka saya jadikan comment
    data.save()
  }
  if(data.player1choice === "R" && data.player2choice === "S"){
    data.result = 'PLAYER 1 WIN'
    //history.score = 'PLAYER 1 WIN' //TIDAK BERFUNGSI maka saya jadikan comment
    data.save()
  }
  if(data.player1choice === "R" && data.player2choice === "P"){
    data.result = 'PLAYER 2 WIN'
    //history.score = 'PLAYER 2 WIN' //TIDAK BERFUNGSI maka saya jadikan comment
    data.save()
  }
  if(data.player1choice === "S" && data.player2choice === "P"){
    data.result = 'PLAYER 1 WIN'
    //history.score = 'PLAYER 1 WIN' //TIDAK BERFUNGSI maka saya jadikan comment
    data.save()
  }
  if(data.player1choice === "S" && data.player2choice === "R"){
    data.result = 'PLAYER 2 WIN'
    //history.score = 'PLAYER 2 WIN' //TIDAK BERFUNGSI maka saya jadikan comment
    data.save()
  }
  res.send(data.result)
}

