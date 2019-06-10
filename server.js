let express = require('express')
let mongoose = require('mongoose')
let nunjucks = require('nunjucks')
let bodyParser = require('body-parser')
let multer = require('multer')

mongoose.connect('mongodb://localhost:27017/pokedex', {useNewUrlParser: true}, (err) => {
    if (err) throw err
})

require('./models/Pokemon')
require('./models/Type')

let app = express()
let upload = multer({
    dest: __dirname + "/uploads"
})

app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json)
app.use(upload.single('file'))
app.use('/', require('./routes/pokemons'))
app.use('/types', require('./routes/types'))
app.use('/uploads', express.static(__dirname + '/uploads'))

nunjucks.configure('views', {
    autoescape: true,
    express: app
})

const PORT = 5000
console.log('Pokedex lancé sur le port ' + PORT)
app.listen(PORT)