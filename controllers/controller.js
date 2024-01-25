const {Post, Profile, User, Like} = require('../models/index')
const bcryptjs = require('bcryptjs')


class Controller {
    static async homePage(req, res) {
        try {
            let memePost = await Post.findAll()
            res.render('home',{memePost})
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }

    static async addPost(req,res) {
        try {
            res.render('post')
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }

    static addUser(req, res) {
        res.render('register')

    }

    static async handleAddUser(req, res) {
        try {
            const {email, password} = req.body
            await User.create({email, password})
            res.redirect('/login')
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }

    static async login(req, res) {
        try {
            let err = req.query.error
            res.render('login',{err})
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }

    static async handleLogin(req, res) {
        try {
            const {email, password} = req.body
            
            let user = await User.findOne({ where : { email }})
            if(user.email) {
                const isValidPassword = bcryptjs.compareSync(password, user.password)
                if(isValidPassword) {
                    res.redirect('/')
                } else {
                    const error = "Invalid username/password"
                    res.redirect(`/login?error=${error}`)
                }
            } else {
                const error = "Invalid username/password"
                res.redirect(`/login?error=${error}`)
            }
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }
}

module.exports = Controller