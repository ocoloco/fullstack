import { useState } from 'react'

const Blog = ({ blog }) => {

  const [blogVisible, setBlogVisible] = useState(false)
  const [buttonName, setButtonName] = useState('Show')

  const showWhenVisible = { display: blogVisible ? '' : 'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
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
        likes: {blog.likes} <button>like</button><br />
        {blog.user.username}
      </div>
    </div >
  )
}

export default Blog
