// Ejercicio 5.1, 5.2, 5.3, 5.4
// 5.5, 5.6, 5.7

import { useState, useEffect, useRef } from 'react'
import Notificacion from './components/Notificacion'
import blogService from './services/blogs'
import loginService from './services/login'
import listBlogs from './components/listBlogs'
import CreateLoginForm from './components/CreateLoginForm'
import CreateBlogForm from './components/CreateBlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const CLEAR = { text: "", type: 0 }

  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(CLEAR)
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const logUser = async ({ username, password }) => {
    try {
      const user = await loginService.login({
        username, password,
      })
      setUser(user)
      blogService.setToken(user.token)
      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))
      setErrorMessage({ text: 'login success', type: 2 })
      setTimeout(() => {
        setErrorMessage(CLEAR)
      }, 5000)
    } catch (exception) {
      setErrorMessage({ text: 'username or password incorrect', type: 1 })
      setTimeout(() => {
        setErrorMessage(CLEAR)
      }, 5000)
    }
  }

  const unlogUser = () => {
    window.localStorage.removeItem('loggedBlogUser')
    setUser(null)
    setErrorMessage({ text: 'logout success', type: 2 })
    setTimeout(() => {
      setErrorMessage(CLEAR)
    }, 5000)
  }

  const addBlog = async (newBlog) => {
    blogFormRef.current.toggleVisibility()
    try {
      const createdBlog = await blogService.create(newBlog)
      setBlogs(blogs.concat(createdBlog))
      setErrorMessage({ text: 'Blog created success', type: 2 })
      setTimeout(() => {
        setErrorMessage(CLEAR)
      }, 5000)
    } catch (err) {
      setErrorMessage({ text: err.response.data.error, type: 1 })
      setTimeout(() => {
        setErrorMessage(CLEAR)
      }, 5000)
    }
  }

  return (
    <div>
      <Notificacion message={errorMessage.text} type={errorMessage.type} />
      <h2>blogs</h2>
      {!user &&
        <Togglable buttonLabel="log in">
          <CreateLoginForm login={logUser} />
        </Togglable>}

      {user &&
        <div>
          <b>{user.username.toUpperCase()}</b> logged in
          <button onClick={unlogUser}>log out</button>
          <Togglable buttonLabel="new Blog" ref={blogFormRef} >
            <CreateBlogForm createBlog={addBlog} />
          </Togglable>
          {listBlogs(blogs)}
        </div>
      }
    </div>
  )
}

export default App
