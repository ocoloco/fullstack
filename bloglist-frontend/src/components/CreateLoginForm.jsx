import { useState } from 'react'

const CreateLoginForm = ({ login }) => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

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
            onChange={({ target }) => setUsername(target.value)}></input>
        </div>
        <div>
          password:
          <input type="password" value={password} name="password" autoComplete="current-password"
            onChange={({ target }) => setPassword(target.value)}></input>
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default CreateLoginForm
