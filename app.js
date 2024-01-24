const express = require('express')
const router = require('./routers')
const app = express()
const PORT = 3003

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended : true}))

app.get('/',(req,res) => {res.send('ini awal halaman baru')})

app.listen(PORT, () => {
    console.log(`i am stil here ${PORT} hip hip horay`);
})