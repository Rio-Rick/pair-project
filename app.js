const express = require('express')
const router = require('./routers')
const app = express()
const PORT = 3003
const {Post, Profile, User, Like} = require('./models/index.js')
const Controller = require('./controllers/controller.js')

app.use(express.static('public'))


app.set('view engine', 'ejs')
app.use(express.urlencoded({extended : true}))

app.get('/',Controller.homePage)
app.use( router )
app.listen(PORT, () => {
    console.log(`i am stil here ${PORT} hip hip horay`);
})