const express = require('express')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const flash = require('connect-flash')
const app = express()
const router = require('./router')

let sessionOptions = session({
    secret:"JS is cool",
    store: new MongoStore({client: require('./db')}),
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 1000*60*60*24, httpOnly: true}
})

app.use(sessionOptions)
app.use(flash())

app.use(function(req, res, next){
    res.locals.user = req.session.user
    next()
})

app.use(express.urlencoded({extended:false}))
app.use(express.json())

// for static css
app.use(express.static('public'))

// for view code
app.set('views','views')
app.set('view engine', 'ejs')

// for router
app.use('/',router)

// app.listen(3000)
module.exports = app