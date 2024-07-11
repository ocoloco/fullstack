import { useState } from 'react'
import PropTypes from 'prop-types'

const CreateBlogForm = ({ createBlog }) => {

  CreateBlogForm.propTypes = {
    createBlog: PropTypes.func.isRequired,
  }

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: title,
      author: author,
      url: url
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input type='text' value={title} name='title'
            onChange={({ target }) => setTitle(target.value)}></input>
        </div>
        <div>
          author:
          <input type='text' value={author} name='author'
            onChange={({ target }) => setAuthor(target.value)}></input>
        </div>
        <div>
          url:
          <input type='text' value={url} name='url'
            onChange={({ target }) => setUrl(target.value)}></input>
        </div>
        <button type='submit'>create</button>
      </form>
    </div>)
}

export default CreateBlogForm
