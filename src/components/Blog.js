import React, { useState, } from 'react'

const Blog = ({ blog, handleLikes }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
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