import React from 'react'

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

export default BlogForm