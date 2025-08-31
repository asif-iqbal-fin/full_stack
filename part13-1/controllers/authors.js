const router = require('express').Router()

const { Blog, User } = require('../models')
// const { fn,col } = require('sequelize')
const { sequelize } = require('../utils/db')

router.get('/', async (req,res) => {
    const authors = await Blog.findAll({
        attributes: ['author',
            [sequelize.fn('COUNT', sequelize.col('title')),'articles'], 
            [sequelize.fn('SUM', sequelize.col('likes')),'likes']],
        group: 'author',
        order: sequelize.literal('likes DESC')
    })
    res.json(authors)
})

module.exports = router