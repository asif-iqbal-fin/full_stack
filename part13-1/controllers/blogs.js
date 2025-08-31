const router = require('express').Router()
const jwt = require('jsonwebtoken')

const { Blog, User } = require('../models')
const { SECRET } = require('../utils/config')

router.get('/', async (req,res) => {
    const blogs = await Blog.findAll()
    res.json(blogs)
})

router.post('/', async(req,res) => {
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

router.delete('/:id', async(req,res) => {
    const blog = await Blog.findByPk(req.params.id)
    if(blog){
        await blog.destroy()
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