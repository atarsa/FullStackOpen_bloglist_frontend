import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ username,  password, onSubmit }) => (
  <>
    <h2>Log in to application</h2>
    <form onSubmit={onSubmit}>
      <div>
        username
        <input
          type={username.type}
          value={username.value}
          name="Username"
          onChange={username.onChange}
        />
      </div>
      <div>
        password
        <input
          type={password.type}
          value={password.value}
          name="Password"
          onChange={password.onChange}
        />
      </div>
      <button type="submit">Login</button>
    </form>
  </>
)

LoginForm.propTypes = {
  username: PropTypes.object.isRequired,
  password: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired
}
export default LoginForm