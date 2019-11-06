import React, { useState, useEffect } from 'react';

import blogService from './services/blogs'
import loginService from './services/login'
import Blog from './components/Blog'
//import LoginForm from './components/LoginForm' 


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => { 
    blogService
      .getAll()
      .then(initialBlogs => {
        setBlogs(initialBlogs)
      })
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login( { username, password
      })

      setUser(user)
      setUsername('')
      setPassword('')


    } catch (e) {
      console.log('Wrong creditionals');
    }
  }

  const loginForm = () => (
    <>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)
              }
            />
        </div>
        <div>
          password
            <input
              type="text"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
        </div>
        <button type="submit">Login</button>
      </form>
    </>
  )
  return (
    <div>
      {user === null 
        ? loginForm() 
        : <div>
           <h2>blogs</h2>
            {blogs.map(blog =>
               <Blog key={blog.id} blog={blog} />
             )}
    </div>
        
      }
    </div>
  );
}

export default App;
