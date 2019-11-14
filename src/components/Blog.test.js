import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  let component

  const sampleBlog = {
    author: 'Edsger W. Dijkstra',
    likes: 11,
    title: 'Go To Statement Considered Harmful',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    user: {
      username: 'Joe'
    }
  }

  beforeEach(() => {
    component = render(
      <Blog blog={sampleBlog}/>
    )
  })


  test('Only name and author of the blog are shown by default', () => {
    expect(component.container).toHaveTextContent(
      'Edsger W. Dijkstra'
    )

    expect(component.container).toHaveTextContent(
      'Go To Statement Considered Harmful'
    )
    expect(component.container).not.toHaveTextContent(
      '11 likes'
    )
  })

  test('After one click on blog card all details are shown', () => {
    const blog = component.container.querySelector('.blog')
    fireEvent.click(blog)

    expect(blog).toHaveTextContent('11 likes')
  })

  test('After two clicks on blog card Only name and author of the blog are shown', () => {
    const blog = component.container.querySelector('.blog')
    fireEvent.click(blog)
    fireEvent.click(blog)

    expect(blog).not.toHaveTextContent('11 likes')
  })

})