const blogs = [
  {
    author: 'Edsger W. Dijkstra',
    id: '5dc157d2ccab402ac4008571',
    likes: 11,
    title: 'Go To Statement Considered Harmful',
    url: 'http://test.org',
    user: {
      username: 'radek',
      id: '5dc08aba0be9933b204333c7'
    }
  },
  {
    author: 'AT',
    id: '5dc157d2ccab402ac4038571',
    likes: 9,
    title: 'Testing test',
    url: 'http://test.org',
    user: {
      username: 'radek',
      id: '5dc08aba0be9933b204333c7'
    }
  }
]


let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  return Promise.resolve(blogs)
}

export default { getAll, setToken }