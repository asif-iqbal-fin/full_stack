const errorHandler = async (error,req,res,next) => {
    console.log(error.message)

    if(error.name === 'CastError'){
        return res.status(400).send({error: 'malfomated id'})
    }else if(error.name === 'SequelizeValidationError'){
        console.log(error.message)
        return res.status(400).send({error : error.message})
    }

    next(error)
}

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

module.exports = {errorHandler, tokenExtractor}