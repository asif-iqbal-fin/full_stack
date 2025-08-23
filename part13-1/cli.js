require('dotenv').config()
const { Sequelize, QueryTypes, Model, DataTypes, json } = require('sequelize')
const express = require('express')
const app = express()

app.use(express.json())

const sequelize = new Sequelize(process.env.DATABASE_URL,{
    dialectOptions:{
        ssl: false
    }
})

class Blog extends Model{}

Blog.init({
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    author:{
        type: DataTypes.STRING
    },
    url:{
        type: DataTypes.STRING,
        allowNull: false
    },
    title:{
        type: DataTypes.STRING,
        allowNull: false
    },
    likes:{
        type: DataTypes.INTEGER
    }
},{
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'blog'  
})

Blog.sync()

app.get('/api/blogs', async (req,res) => {
    const blogs = await Blog.findAll()
    console.log(JSON.stringify(blogs))
    res.json(blogs)
})

app.post('/api/blogs', async (req,res) => {
    try {
        const blog = await Blog.create(req.body)
        console.log(JSON.stringify(blog))
        res.json(blog)
    } catch (error) {
        res.status(400).json(error)
    }
})

app.delete('/api/blogs/:id', async (req,res) => {
    try {
        const blog = await Blog.findByPk(req.params.id)
        if(blog){
            await blog.destroy()
            res.json(blog)
        }else{
            res.status(400).end()
        }
    } catch (error) {
        res.json(400).json(error)
    }
})

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})