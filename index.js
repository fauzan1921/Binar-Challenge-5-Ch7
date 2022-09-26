//catatan untuk reviewer/facil, web tidak berfungsi 100%, fitur game suit hanya bisa 1 ronde, tidak bisa 3 ronde seperti
//yang diinstruksikan, API game_history sudah coba dibuat namun tidak berfungsi. Saya kumpulkan sebisa saya. Mohon maaf.
//Saya juga membuat file txt di folder pengumpulan challenge ini mengenai cara menjalankan 
//ketentuan no.8 challenge (game suit), apabila web yang saya buat mungkin membingungkan untuk dijalankan

const express = require('express')
const passport = require('passport')
require('./utils/passport')
const apiRouter = require('./routes/api')
const pageRouter = require('./routes/page')

const app = express()
const port = 3000

app.use('/js', express.static(__dirname+'/js'))
app.set('view engine', 'ejs')
app.use(passport.initialize())

app.use(pageRouter)
app.use(apiRouter)

app.listen(port, () => {
  console.log(`Running at port ${port}`)
})