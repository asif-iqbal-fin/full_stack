const router = require('express').Router()
const jwt = require('jsonwebtoken')

const { Blog, User } = require('../models')
const { SECRET } = require('../utils/config')
const { Op } = require('sequelize')
const { sequelize } = require('../utils/db')

const tokenExtractor = (req,res,next) => {
    const authorization = req.get('authorization')

    if(authorization && authorization.toLowerCase().startsWith('bearer ')){
        try {
            console.log(authorization.substring(7))
            console.log(SECRET)
            req.decodedToken = jwt.verify(authorization.substring(7),SECRET)
        } catch (error) {
            res.status(401).json({error : 'invalid token'})
        }
    }else{
        return res.status(401).json({error : 'token missing'})
    }
    next()
}

router.get('/', async (req,res) => {
    var where = {}

    if(req.query.search){
        where = {
            [Op.or]: [
                {title: {[Op.substring]: req.query.search}},
                {author: {[Op.substring]: req.query.search}},
            ]
        }
    }

    const blogs = await Blog.findAll({
        attributes: {exclude: ['userId']},
        include: {
            model: User,
            attributes: ['username']
        },
        where,
        order: sequelize.literal('likes DESC')
    })
    res.json(blogs)
})

router.post('/', tokenExtractor, async(req,res) => {
    try {
        const user = await User.findByPk(req.decodedToken.id)
        const blog = await Blog.create({...req.body, userId:user.id, date: new Date()})
        res.json(blog)
    } catch (error) {
        res.status(400).json({error: 'Blog cannot be created'})
    }
})

router.get('/:id', async(req,res) => {
    const blog = await Blog.findByPk(req.params.id)
    if(blog){
        res.json(blog)
    }else{
        res.status(404).end()
    }
})

router.delete('/:id', tokenExtractor, async(req,res) => {
    const blog = await Blog.findByPk(req.params.id)
    if(blog){
        const user = await User.findByPk(req.decodedToken.id)
        if(blog.userId === user.id){
            try {
                await blog.destroy()
            } catch (error) {
                res.status(400).json({error : 'Blog cannot be deleted'})
            }
            
        }else{
            console.log('You are not the user who create the Blog !!')
        }
        
    }
    res.status(204).end()
})

router.put('/:id', async(req,res) => {
    const blog = await Blog.findByPk(req.params.id)
    if(blog){
        blog.likes = req.body.likes

        await blog.save()
        res.json(blog)
    }else{
        res.status(404).json({error: 'Blog Id not found'})
    }
})

module.exports = router