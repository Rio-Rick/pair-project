const Controller = require('../controllers/controller')

const router = require('express').Router()

router.get('/post',Controller.addPost)
router.get('/register',Controller.addUser)
router.post('/register',Controller.handleAddUser)
router.get('/login',Controller.login)
router.post('/login',Controller.handleLogin)


module.exports = router