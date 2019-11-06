import React from 'react'

const LoginForm = ({username, setUsername, password, setPassword,  onSubmit}) => (
  <>
    <h2>Log in to application</h2>
    <form onSubmit={onSubmit}>
      <div>
        username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={( {target} ) => setUsername(target.value)}
          />
      </div>
      <div>
        password
          <input
            type="text"
            value={password}
            name="Password"
            onChange={( {target} ) => setPassword(target.value)}
          />
      </div>
      <button type="submit">Login</button>
    </form>
  </>
)

export default LoginForm 