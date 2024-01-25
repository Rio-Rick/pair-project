const Controller = require('../controllers/controller')
const router = require('express').Router()

const path = require('path')
const multer = require('multer')
const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null, './images')
    },
    filename: (req, file, cb) => {
        console.log(file)
        console.log(req.body);
        let title = req.body.title /// ini nanti ganti titlenya
        // let authorId = req.body.AuthorId
        let time = new Date().getTime()
        req.body.cover = title + time + path.extname(file.originalname) //titlenya ganti, covernya ganti
        cb(null, title + time + path.extname(file.originalname)) // titlenya ganti

    }
})
const upload = multer({storage:storage})

router.get('/post',Controller.addPost)
router.get('/register',Controller.addUser)
router.post('/register',Controller.handleAddUser)
router.get('/login',Controller.login)
router.post('/login',Controller.handleLogin)


module.exports = router