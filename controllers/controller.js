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
            await Post.create({title, caption, image})
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

            // req.session.userId = user.id
            // let userId = req.session.userId 
            
            // await Profile.create({})
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
                    // console.log(user);
                    let profile = await Profile.findOne({where : { UserId : user.id}})
                    console.log(profile);
                    if(profile) {
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
                    } else if(!profile){
                        res.redirect(`/createProfile/${user.id}`)
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
            // let id = req.params.id
            // let profile = Profile.findOne({ where : {UserId :id}})
            let profile = await Profile.findOne({
                where : { UserId : userId},
                include : {
                    model : Post
                }
            })
 
            res.send(profile)
            // res.render('profile',{userId})
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }

    static addProfile(req, res) {
        let id = req.params.id
        res.render('addProfile',{id})
    }

    static async handleAddProfile(req, res) {
        try {
            let UserId = req.params.id
            req.session.userId = UserId
            const {username, avatar, about, gender} = req.body
            await Profile.create({username,avatar, about, gender, UserId})
            res.redirect('/')
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }

    static async editProfile(req, res) {
        try {
            let id = req.params.id
            let profile = Profile.findOne({ where : {UserId : id}})
            // res.render('editProfile')
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }

    static async handleEditProfile(req, res) {
        try {
            
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }
}

module.exports = Controller