import React, { useState, } from 'react'

const Blog = ({ blog, handleLikes, handleDelete }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const btnStyle = {
    background: '#38B0DE',
    border: '1px solid #38B0DE',
    borderRadius: 1
  }

  const [isExpanded, setIsExpanded] = useState(false) 

  
  if (isExpanded){
    return (
      <div style={blogStyle}>
        <div onClick={() => {
            
            setIsExpanded(!isExpanded)}}>
          {blog.title} {blog.author}
          <br/>
          {blog.url}
          <br />
          {blog.likes} likes <button onClick={handleLikes}>like</button>
          <br />
          added by {blog.user.name ? blog.user.name : blog.user.username }
        </div>
        <button onClick={handleDelete} style={btnStyle}>Remove</button>
      </div>
    )
  }

  return (

  <div style={blogStyle}>
    <div onClick={() => setIsExpanded(!isExpanded)}>
      {blog.title} {blog.author}
    </div>
    
  </div>
  )
}

export default Blog