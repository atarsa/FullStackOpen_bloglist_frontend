import React from 'react'
import { render, waitForElement } from '@testing-library/react'
jest.mock('./services/blogs.js')
import App from './App'

describe('<App />', () => {
  test('if no user logged, blogs are not rendered', async () => {
    const component = render(
      <App />
    )
    component.rerender(<App />)

    await waitForElement(
      () => component.getByText('Login')
    )

    const blogs = component.container.querySelectorAll('.blog')
    expect(blogs.length).toBe(0)

    expect(component.container).toHaveTextContent('Log in to application')
    expect(component.container).toHaveTextContent('username')
    expect(component.container).toHaveTextContent('password')

  })

  test('Only logged user can see the blogs', async () => {
    const user = {
      username: 'tester',
      token: '1231231214',
      name: 'Donald Tester'
    }

    localStorage.setItem('loggedBlogsAppUser', JSON.stringify(user))

    const component = render(
      <App />
    )
    component.rerender(<App />)
    await waitForElement(
      () => component.container.querySelector('.blog')
    )

    const blogs = component.container.querySelectorAll('.blog')
    expect(blogs.length).toBe(2)

    expect(component.container).toHaveTextContent('Go To Statement Considered Harmful')
    expect(component.container).toHaveTextContent('Testing test')
  })
})