import React, { useState, } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, user, handleLikes, handleDelete }) => {
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

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded)
  }

  const showRemoveButton = () => {
    if (user === blog.user.username){
      return (
        <button onClick={handleDelete} style={btnStyle}>Remove</button>
      )
    }
  }

  if (isExpanded){
    return (
      <div style={blogStyle} >
        <div className='blog' onClick={() => {
          console.log(blog)
          toggleExpansion()}}>
          {blog.title} {blog.author}
          <br/>
          {blog.url}
          <br />
          {blog.likes} likes <button onClick={handleLikes}>like</button>
          <br />
          added by {blog.user.name ? blog.user.name : blog.user.username }
        </div>
        {showRemoveButton()}

      </div>
    )
  }

  return (

    <div style={blogStyle} >
      <div onClick={toggleExpansion} className='blog'>
        {blog.title} {blog.author}
      </div>

    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.string.isRequired,
  handleLikes: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired
}
export default Blog