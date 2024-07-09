import Blog from './Blog'

const ListBlogs = (blogs, mensaje, user) => {
  return (
    <div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} mensaje={mensaje} user={user} />
      )}
    </div >
  )
}

export default ListBlogs
