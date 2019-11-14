import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import SimpleBlog from './SimpleBlog'


describe('<SimpleBlog />',() => {

  test('renders title, author and likes', () => {
    const blog = {
      title: 'Test title',
      author: 'AT',
      likes: 1
    }

    const component = render(
      <SimpleBlog blog={blog} />
    )
    const blogInfoDiv = component.container.querySelector('.blogInfo')

    expect(blogInfoDiv).toHaveTextContent('Test title AT')

    const blogLikes = component.container.querySelector('.blogLikes')
    expect(blogLikes).toHaveTextContent('1')
  })

  test('clicking likes button twice calls event handler twice', () => {
    const blog = {
      title: 'Test title',
      author: 'AT',
      likes: 1
    }

    const mockHandler = jest.fn()

    const { getByText }= render(
      <SimpleBlog blog={blog} onClick={mockHandler} />
    )

    const likesButton = getByText('like')
    fireEvent.click(likesButton)
    fireEvent.click(likesButton)

    expect(mockHandler.mock.calls.length).toBe(2)
  })
})
