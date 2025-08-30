const router = require('express').Router()

const { User, Blog } = require('../models')

router.get('/', async(req,res) => {
    const users = await User.findAll()
    res.json(users)
})

router.post('/', async(req,res) => {
    try {
        const user = await User.create(req.body)
        res.json(user)
    } catch (error) {
        return res.status(400).json({ "error" : ["Validation isEmail on username failed"] })
    }
})

router.get('/:id', async(req,res) => {
    const user = User.findByPk(req.params.username)
    if(user){
        res.json(user)
    }else{
        res.status(400).end()
    }
})

router.put('/:username', async(req,res) => {
    console.log(req.params.username)
    const user = await User.findOne({
        where:{
            username: req.params.username
        }
    })
    if(user){
        user.username = req.body.username
        await user.save()
        res.json(user)
    }else{
        res.status(400).json({error: 'User not found'})
    }
})

module.exports = router