const Controller = require('../controllers/controller')
const path = require('path')
const router = require('express').Router()
const multer = require('multer')
const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null, './public/images')
    },
    filename: (req, file, cb) => {

        let title = req.body.title /// ini nanti ganti titlenya
        // let authorId = req.body.AuthorId
        let time = new Date().getTime()
        req.body.image = title + time + path.extname(file.originalname) //titlenya ganti, covernya ganti
        cb(null, title + time + path.extname(file.originalname)) // titlenya ganti

    }
})
const upload = multer({storage:storage})

const storage2 = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null, './public/avatars')
    },
    filename: (req, file, cb) => {
        console.log(file);
        console.log(req.body);
        let username = req.body.username /// ini nanti ganti titlenya
        // let authorId = req.body.AuthorId
        let time = new Date().getTime()
        req.body.avatar = username + time + path.extname(file.originalname) //titlenya ganti, covernya ganti
        cb(null, username + time + path.extname(file.originalname)) // titlenya ganti

    }
})
const upload2 = multer({storage:storage2})


router.get('/login',Controller.login)
router.post('/login',Controller.handleLogin)
router.get('/register',Controller.addUser)
router.post('/register',Controller.handleAddUser)
router.get('/createProfile/:id',Controller.addProfile)
router.post('/createProfile/:id',upload2.single('avatar'),Controller.handleAddProfile)
router.use(function (req, res, next) {
    // console.log(req.session);
    if(!req.session.userId) {
        const error = "please login"
        res.redirect(`/login?error=${error}`)
    } else {
        next()
    }
})

router.get('/profile/:id',Controller.showProfile)
router.get('/post/:id', Controller.addPost)
router.post('/post/:id',upload.single('image'),Controller.handlerAddPost)
router.get('/profile/:id/edit',Controller.editProfile)
router.post('/profile/:id/edit',Controller.handleEditProfile)

module.exports = router