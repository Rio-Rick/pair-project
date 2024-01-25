const Controller = require('../controllers/controller')

const router = require('express').Router()



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


router.get('/post',Controller.addPost)
module.exports = router