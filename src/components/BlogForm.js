import React from 'react'

const BlogForm = ({title, setTitle, author, setAuthor, url, setUrl, onSubmit}) => (
  <form onSubmit={onSubmit}>
    <h2>Create new</h2>
    <div>
      title:
        <input
        type="text"
        value={title}
        name="Title"
        onChange={ ({target}) => setTitle(target.value)}
        />
    </div>
    <div>
      author:
        <input
        type="text"
        value={author}
        name="Author"
        onChange={ ({target}) => setAuthor(target.value)}
        />
    </div>
    <div>
      url:
        <input
        type="text"
        value={url}
        name="Url"
        onChange={ ({target}) => setUrl(target.value)}
        />
    </div>
    <button type="submit">Create</button>

  </form>
)

export default BlogForm