import Blog from './Blog'
import PropTypes from 'prop-types'

const ListBlogs = ({ blogs, updateBlog, deleteBlog, user }) => {

  ListBlogs.propTypes =  {
    blogs: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        author: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
        likes: PropTypes.number.isRequired,
        user: PropTypes.object.isRequired
      })),
    updateBlog: PropTypes.func.isRequired,
    deleteBlog: PropTypes.func.isRequired,
    user:PropTypes.shape({
      token: PropTypes.string.isRequired,
      username:PropTypes.string.isRequired,
    })
  }

  return (
    <div>
      {blogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          updateBlog={updateBlog}
          deleteBlog={deleteBlog}
          user={user} />
      )}
    </div >
  )
}

export default ListBlogs
