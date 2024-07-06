import Blog from './Blog'

const listBlogs = (blogs) => {
  return (
    <div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div >
  )
}

export default listBlogs
