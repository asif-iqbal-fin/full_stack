const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    let allLikes = 0
    blogs.map(blog => {allLikes += blog.likes})
    return allLikes
}

const favoriteBlog = (blogs) => {
    return blogs.reduce((mostLikedBlog,currentBlog) => {
        return currentBlog.likes > mostLikedBlog.likes ? currentBlog : mostLikedBlog
    })
}

module.exports = { dummy, totalLikes, favoriteBlog }