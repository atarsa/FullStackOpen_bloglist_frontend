import React from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({title, handleChangeTitle, author, handleChangeAuthor, url, handleChangeUrl, onSubmit}) => (
  <form onSubmit={onSubmit}>
    <h2>Create new</h2>
    <div>
      title:
        <input
        type="text"
        value={title}
        name="Title"
        onChange={handleChangeTitle}
        />
    </div>
    <div>
      author:
        <input
        type="text"
        value={author}
        name="Author"
        onChange={handleChangeAuthor}
        />
    </div>
    <div>
      url:
        <input
        type="text"
        value={url}
        name="Url"
        onChange={handleChangeUrl}
        />
    </div>
    <button type="submit">Create</button>

  </form>
)

BlogForm.propTypes = {
  title: PropTypes.string.isRequired,
  handleChangeTitle: PropTypes.func.isRequired,
  author: PropTypes.string.isRequired,
  handleChangeAuthor: PropTypes.func.isRequired, 
  url: PropTypes.string.isRequired, 
  handleChangeUrl: PropTypes.func.isRequired, 
  onSubmit: PropTypes.func.isRequired
}
export default BlogForm