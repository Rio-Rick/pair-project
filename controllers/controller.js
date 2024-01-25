const {Post, Profile, User, Like} = require('../models/index')
const bcryptjs = require('bcryptjs')


class Controller {
    static async homePage(req, res) {
        try {
            let userId = req.session.userId
            // console.log(req.session.userId);
            let memePost = await Post.findAll()       
            res.render('home',{memePost,userId})

        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }

    static async addPost(req,res) {
        try {
            let userId = req.session.userId

            res.render('post',{userId})
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }

    static async handlerAddPost (req,res) {
        try {
            let userId = req.session.userId

            // console.log(req.body);
            const {title, caption, image} =req.body
            await Post.create({ProfileId : userId,title, caption, image})
            res.redirect('/')

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
            if(email) {
                let user = await User.findOne({ where : { email }})
                if(user) {
                    console.log(user);
                    const isValidPassword = bcryptjs.compareSync(password, user.password)
                    if(isValidPassword) {
                        // console.log(user.id);
                        req.session.userId = user.id
                        let userId = req.session.userId 
                        
                        res.redirect(`/`)
                    } else {
                        const error = "Invalid username/password"
                        res.redirect(`/login?error=${error}`)
                    }
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

    static async showProfile(req, res) {
        try {
            let userId = req.session.userId
            
            res.render('profile',{userId})
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }
}

module.exports = Controller