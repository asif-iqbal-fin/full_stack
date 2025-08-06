const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const { response } = require('../app')

blogsRouter.get('/', async (request,response) => {
    const blogs = await Blog.find({}).populate('user',{username: 1, name: 1})
    response.json(blogs)
})

blogsRouter.post('/', async(request, response) => {
    const body = request.body

    const decodedToken = jwt.verify(request.token,process.env.SECRET)
    
    if(!decodedToken.id){
        return response.status(401).json({error: 'token invalid'})
    }

    const user = await User.findById(decodedToken.id)

    if(!user){
        return response.status(400).json({error: 'userId missing or not valid'})
    }

    blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user._id
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(savedBlog)

})

blogsRouter.delete('/:id', async(request,response) => {
    const blog = await Blog.findById(request.params.id)

    if(!blog){
        return response.status(400).json({error: 'Blog not found!'})
    }
    console.log('Log targeted to deleteCreate', blog)

    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    if(!decodedToken.id){
        return response.status(401).json({error: 'token invalid'})
    }

    const user = await User.findById(decodedToken.id)


    console.log('User retrieved from login', user)
    console.log('Original Creator of Blog', blog.user.toString())
    console.log('User who is logged', user._id.toString())

    if(blog.user.toString() === user._id.toString()){
        
        const deletedBlog = await Blog.findByIdAndDelete(request.params.id)
        return response.status(201).json(deletedBlog)
    }

    return response.status(400).json({error: 'Blog cannot be deleted!'})
})

module.exports = blogsRouter