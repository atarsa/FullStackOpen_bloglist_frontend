import React from 'react'

const LoginForm = ({username, handleChangeUsername, password, handleChangePassword,  onSubmit}) => (
  <>
    <h2>Log in to application</h2>
    <form onSubmit={onSubmit}>
      <div>
        username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={handleChangeUsername}
          />
      </div>
      <div>
        password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={handleChangePassword}
          />
      </div>
      <button type="submit">Login</button>
    </form>
  </>
)

export default LoginForm 