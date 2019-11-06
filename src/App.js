import React, { useState, useEffect } from 'react';

import blogService from './services/blogs'
import loginService from './services/login'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const [message, setMessage] = useState('')
  const [msgClasses, setMsgClasses] = useState('')

  useEffect(() => { 
    blogService
      .getAll()
      .then(initialBlogs => {
        setBlogs(initialBlogs)
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogsAppUser')
    if (loggedUserJSON){
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])


  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login( { username, password
      })

      window.localStorage.setItem(
        'loggedBlogsAppUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')

    } catch (e) {
      setMessage('Wrong creditionals');
      setMsgClasses('notification error')

      hideNotificationMessage()
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogsAppUser')
    setUser(null)
  }

  const hideNotificationMessage = () => {
    setTimeout(() => {
      setMessage(null)
      setMsgClasses('')
    }, 5000)
  }

  const createBlog = async (event) => {
    event.preventDefault()

    try {
      const newBlog = {
        title, author, url
      }
      const returnedBlog = await blogService.create(newBlog)
      
      setBlogs(blogs.concat(returnedBlog))
      
      setTitle('')
      setAuthor('')
      setUrl('')

      setMessage(`a new blog ${title} by ${author} added`)
      setMsgClasses('notification successful')
      hideNotificationMessage()
    } catch (e) {
      setMessage(e.response.data)
      setMsgClasses('notification error')
      hideNotificationMessage()      
    }
  }
    
  return (
    <div>
      <Notification 
        message={message}
        className={msgClasses}  
      />
      {user === null 
        ? <LoginForm 
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}  
            onSubmit={handleLogin}
          />
        : <div>
            <p>{user.username} logged in</p>
            <button onClick={handleLogout}>Log out</button>
            <BlogForm 
            title={title}
            setTitle={setTitle}
            author={author}
            setAuthor={setAuthor}
            url={url}
            setUrl={setUrl}
            onSubmit={createBlog}   
            />
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
