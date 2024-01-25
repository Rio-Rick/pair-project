const express = require('express')
const router = require('./routers')
const app = express()
const PORT = 3003
const {Post, Profile, User, Like} = require('./models/index.js')

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended : true}))

app.get('/',async (req,res) => {res.send(await Profile.findAll({
    include : Post
}))})

app.listen(PORT, () => {
    console.log(`i am stil here ${PORT} hip hip horay`);
})