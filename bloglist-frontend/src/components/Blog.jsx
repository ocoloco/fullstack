import { useState, useRef } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, mensaje, user }) => {

  const [blogVisible, setBlogVisible] = useState(false)
  const [buttonName, setButtonName] = useState('Show')

  const [likes, setLikes] = useState(blog.likes)
  const blogRef = useRef() //Instanciar blogs?

  const showWhenVisible = { display: blogVisible ? '' : 'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleLike = async () => {
    try {
      const newObject = {
        user: blog.user.id.toString(),
        likes: likes + 1,
        author: blog.author,
        title: blog.title,
        url: blog.url
      }

      await blogService.update(blog.id, newObject)
      setLikes(likes + 1)
      mensaje({ text: `Blog "${blog.title}" like+1 thanks`, type: 2 })
    } catch (error) {
      mensaje({ text: `Can't update "${blog.title}" likes: Server error 400 `, type: 1 })
    }
  }

  const handleDelete = async (event) => {
    if (window.confirm(`Do you want delete ${blog.title}?`)) {
      try {
        await blogService.remove(blog.id)
        mensaje({ text: `Blog "${blog.title}" has been deleted`, type: 2 })
      }
      catch (error) {
        console.log(error)
        mensaje({ text: `Can't delete "${blog.title}": Server error 400`, type: 1 })
      }
    }
  }

  return (
    <div style={blogStyle} ref={blogRef}>
      <b>{blog.title}</b> by {blog.author} <button
        onClick={() => {
          if (blogVisible) {
            setBlogVisible(false)
            setButtonName('Show')

          } else {
            setBlogVisible(true)
            setButtonName('Hide')
          }
        }}>
        {buttonName}
      </button>

      <div style={showWhenVisible}>
        {blog.url}<br />
        likes: {likes} <button onClick={handleLike}>like</button><br />
        {blog.user.username}
        {(user.username === blog.user.username) &&
          <div>
            <button value={blog.id} onClick={handleDelete}>Delete Blog</button>
          </div>
        }
      </div>
    </div >
  )
}

export default Blog
