const User = require('./models/User')
const bcrypt = require('bcryptjs')
const path = require('path')


class authController {
    async registration(req, res) {
        try {
            const {username, password} = req.body
            const candidate = await User.findOne({username})
            if (candidate) {
                return res.status(400).json({message: "Пользователь с таким именем уже существует"})
            }
            const hashPassword = bcrypt.hashSync(password, 7)
            const user = new User({username, password: hashPassword})
            await user.save()
            res.cookie('username', username, {maxAge: 3600*24})
            res.cookie('password', hashPassword, {maxAge: 3600*24})
            res.redirect('/map')
        } catch (e){
            res.status(400).json({message: 'Registration error'})
        }
    }

    async login(req, res) {
        try {
            const {username, password} = req.body
            const user = await User.findOne({username})
            if (!user) {
                return res.status(400).json({message: "Такого пользователя не существует"})
            }
            const validPassword = bcrypt.compareSync(password, user.password)
            if (validPassword) {
                res.cookie('username', username, {maxAge: 1000*3600*24})
                res.cookie('password', user.password, {maxAge: 1000*3600*24})
                res.redirect('/map')
            } else {
                res.redirect('/log')
            }
        } catch {
            res.status(400).json({messge: 'Login error'})
        }
    }

    async main(req, res) {
        try {
            res.sendFile(path.join(__dirname + '/views/main.html'))
        } catch (e) {
            res.status(400).json({message: 'error'})
        }
    }

    async map(req, res) {
        try {
            const {username, password} = req.cookies
            const user = await User.findOne({username})
            if (!user) {
                res.redirect('/log')
            }
            if (password == user.password) {
                res.sendFile(path.join(__dirname + '/views/map.html'))
            } else {
                res.redirect('/log')
            }
        } catch (e) {
            res.status(400).json({message: 'error'})
        }
    }
    
    async logPage(req, res) {
        try {
            res.sendFile(path.join(__dirname + '/views/log.html'))
        } catch (e) {
            res.status(400).json({message: 'error'})
        }
    }

    async regPage(req, res) {
        try {
            res.sendFile(path.join(__dirname + '/views/reg.html'))
        } catch (e) {
            res.status(400).json({message: 'error'})
        }
    }
}

module.exports = new authController