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


router.get('/login',Controller.login)
router.post('/login',Controller.handleLogin)
router.get('/register',Controller.addUser)
router.post('/register',Controller.handleAddUser)
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
module.exports = router