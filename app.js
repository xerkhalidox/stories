const express = require("express")
const dotenv = require("dotenv")
const morgan = require('morgan')
const handlebars = require("express-handlebars")
const path = require("path")
const passport = require('passport')
const mongoose = require('mongoose')
const method_override = require('method-override')
const { formatDate, truncate, removeTags, editIcon, select, deleteForm } = require('./helpers/hbs')
const express_session = require('express-session')
const mongoStore = require('connect-mongo')(express_session)
const DBconnection = require('./config/db')
const { router } = require('./routes/stories')
const { globalUser } = require('./middleware/globals')
dotenv.config({ path: './config/config.env' })
require('./config/passport')(passport)
DBconnection()
const app = express()
if (process.env.NODE_ENV === "development") {
    app.use(morgan('dev'))
}
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(method_override((req, res) => {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        let method = req.body._method
        delete req.body._method
        return method
    }
}))
app.use(express.static(path.join(__dirname, 'public')))
console.log(path.join(__dirname, 'public'))
app.engine('.hbs', handlebars({
    helpers: { formatDate, truncate, removeTags, editIcon, select, deleteForm },
    defaultLayout: 'main_layout', extname: '.hbs'
}))
app.set('view engine', '.hbs')
app.use(express_session({
    secret: "Meo cat",
    resave: false,
    saveUninitialized: false,
    store: new mongoStore({ mongooseConnection: mongoose.connection })
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(globalUser)
app.use('/', require('./routes/index'))
app.use('/auth', require('./routes/auth'))
app.use('/stories', router)
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})