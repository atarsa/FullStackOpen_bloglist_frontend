import React, { useState, useEffect } from 'react';

import blogService from './services/blogs'
import loginService from './services/login'

import Blog from './components/Blog'
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'


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

  const blogFormRef = React.createRef()

  useEffect(() => { 
    blogService
      .getAll()
      .then(initialBlogs => {
        setBlogs(initialBlogs.sort((a,b) => {
          return b.likes - a.likes
        }))
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
    blogFormRef.current.toggleVisibility() // hide blog form on the creation of the new one

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
  
  const updateLikes = async (id) => {
    try {
      const blog = blogs.find(b => b.id === id)

      const updatedBlog = { 
        ...blog,
        likes: blog.likes + 1        
      }
      const returnedBlog = await blogService.update(id, updatedBlog)

      setBlogs(blogs.map(blog => blog.id !== id ? blog : returnedBlog).sort((a,b) => {
        return b.likes - a.likes
      }))
      
    } catch (exception) {
      console.log(exception)
    }
  }

  const deleteBlog = async (id) => {
    console.log('blog to delete:', id);
    try {
      const blogToDelete = blogs.find(b => b.id === id)
      
      if (window.confirm(`Remove blog ${blogToDelete.title} by ${blogToDelete.author}?`)){
        await blogService.deleteBlog(id)
        setBlogs(blogs.filter(blog => blog.id !== id))
      }
      
      setMessage(`blog ${blogToDelete.title} by ${blogToDelete.author} removed`)
      setMsgClasses('notification successful')
      hideNotificationMessage()
      
    } catch (e) {
      console.log('couldn\'t delete: ', e)
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
            handleChangeUsername={( {target} ) => setUsername(target.value)}
            password={password}
            handleChangePassword={( {target} ) => setPassword(target.value)}  
            onSubmit={handleLogin}
          />
        : <div>
            <p>{user.username} logged in</p>
            <button onClick={handleLogout}>Log out</button>
            <Togglable buttonLabel="new blog" ref={blogFormRef}>
              <BlogForm 
                title={title}
                handleChangeTitle={({target}) => setTitle(target.value)}
                author={author}
                handleChangeAuthor={({target}) => setAuthor(target.value)}
                url={url}
                handleChangeUrl={({target}) => setUrl(target.value)}
                onSubmit={createBlog}   
              />
            </Togglable>
            
            <h2>blogs</h2>
              {blogs.map(blog =>
                <Blog key={blog.id} 
                  blog={blog}
                  user={user.username}  
                  handleLikes={() => updateLikes(blog.id)}       handleDelete={() => deleteBlog(blog.id)} 
                />
              )}
         </div>   
      }
    </div>
  );
}

export default App;
