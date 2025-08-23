require('dotenv').config()
const { Sequelize, QueryTypes } = require('sequelize')

const sequelize = new Sequelize(process.env.DATABASE_URL,{
    dialectOptions:{
        ssl: false
    }
})

const main = async () => {
    try {
        await sequelize.authenticate()
        const blogs = await sequelize.query("SELECT * FROM blogs", {type: QueryTypes.SELECT})
        blogs.map((blog) => {
            console.log(`${blog.author}: '${blog.title}', ${blog.likes} likes`)
        })
        sequelize.close()
    } catch (error) {
        console.log('Unable to connect to database:', error)
    }
}

main()