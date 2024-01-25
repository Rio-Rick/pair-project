const express = require('express')
const router = require('./routers')
const app = express()
const PORT = 3003
const {Post, Profile, User, Like} = require('./models/index.js')
const Controller = require('./controllers/controller.js')
const session = require('express-session')

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended : true}))

app.use(session({
    secret : 'sussy baka',
    resave : false,
    saveUninitialized : false,
    cookie : {
        secure : false,
        sameSite : true
    }
}))


app.get('/',Controller.homePage)
app.use( router )

app.listen(PORT, () => {
    console.log(`i am stil here ${PORT} hip hip horay`);
})