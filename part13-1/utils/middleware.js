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

module.exports = {errorHandler}