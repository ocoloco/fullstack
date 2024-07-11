import { useState } from 'react'
import PropTypes from 'prop-types'

const CreateLoginForm = ({ login }) => {

  CreateLoginForm.propTypes = {
    login: PropTypes.func.isRequired,
  }

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleUsernameChange = ({ target }) => setUsername(target.value)
  const handlePasswordChange = ({ target }) => setPassword(target.value)

  const doLogin = (event) => {
    event.preventDefault()

    login({ username, password })

    setUsername('')
    setPassword('')
  }

  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={doLogin}>
        <div>
          username:
          <input type='text' value={username} name='username' autoComplete='username'
            onChange={handleUsernameChange}></input>
        </div>
        <div>
          password:
          <input type="password" value={password} name="password" autoComplete="current-password"
            onChange={handlePasswordChange}></input>
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default CreateLoginForm
