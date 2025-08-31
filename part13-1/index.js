const express = require('express')
require('express-async-errors')
const app = express()

const { PORT } = require('./utils/config')
const { connectToDatabase } = require('./utils/db')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const authorsRouter = require('./controllers/authors')
const loginRouter = require('./controllers/login')

const { errorHandler, tokenExtractor } = require('./utils/middleware')

app.use(express.json())
app.use(errorHandler)

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use('/api/authors', authorsRouter)


const start = async () => {
    await connectToDatabase()
    app.listen(PORT, () => {
        console.log(`Server running on port: ${PORT}`)
    })
}

start()