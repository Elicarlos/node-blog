const express = require('express')
const bodyParser = require('body-parser')
const handlebars = require('express-handlebars')
const mogoose = require('mongoose')
const path = require('path')
const app = express()
const admin = require('./routes/admin')
const session = require('express-session')
const flash = require('connect-flash')

//Session
    app.use(session({
        secret: 'secreto',
        resave: true,
        saveUninitialized: true
    }))
//Flash deve ficar abaixo da Session
    app.use(flash())

//Middleware
app.use((req, res, next)=> {
    //Cadastrar variaveis globais
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_mgs = req.flash('error_msg')
    next()
})

//Configuração do bodyparser
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// Handlebars
app.engine('handlebars', handlebars({ defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

//Mongoose
mogoose.Promise = global.Promise
mogoose.connect('mongodb://localhost/blogapp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() =>{
    console.log('Conectado ao Mongo')
}).catch((error) => {
    console.log('Erro ao conectar '+error)
})



//Public
app.use(express.static(path.join(__dirname, 'public')))


//Feito importacao de rotas
app.use('/admin', admin)


app.listen(3000, () =>{
    console.log('Server ON')
})