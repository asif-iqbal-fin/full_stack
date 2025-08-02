const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')
const { request } = require('../app')

usersRouter.get('/', (request,response) =>{
    User.find({}).then(users => {
        response.json(users)
    })
})

usersRouter.post('/', (request,response) => {
    const {username,name,password} = request.body
    
    const saltRounds = 10
    
    bcrypt.hash(password,saltRounds).then((result) => {
        passwordHash = result
         user = new User({
            username,
            name,
            passwordHash
         })

         user.save().then((result) => {
         response.status(201).json(result)
    })

    })
    
})

module.exports = usersRouter

