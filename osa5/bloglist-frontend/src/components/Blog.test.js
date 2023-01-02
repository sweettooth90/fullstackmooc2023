import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('blog', () => {
  test('component shows title and author', () => {
    const blog = {
      title: 'Test Blog',
      author: 'Wayne Writer'
    }

    const {container} = render(<Blog blog={blog} />)

    const div = container.querySelector('[data-testid="blog-title"]')
    expect(div).toHaveTextContent('Test Blog - Wayne Writer')
  })

  test('component shows title, author, url and likes when clicking view button', async () => {
    const blog = {
      title: 'Test Blog',
      author: 'Wayne Writer',
      url: 'www.blog.com',
      likes: 5
    }

    const {container} = render(<Blog blog={blog} />)

    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const div = container.querySelector('[data-testid="open-blog"]')
    expect(div).toHaveTextContent('Test Blog - Wayne Writer hidewww.blog.comlikes 5 like')
  })

  test('component like button calls the event handler twice when clicking the button twice', async () => {
    const blog = {
      title: 'Test Blog',
      author: 'Wayne Writer',
      url: 'www.blog.com',
      likes: 5
    }

    const mockHandler = jest.fn()

    const component = render(<Blog blog={blog} likeBlog={mockHandler} />)

    const user = userEvent.setup()
    const viewButton = component.getByText('view')
    await user.click(viewButton)
    const likeButton = component.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})
