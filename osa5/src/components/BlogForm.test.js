import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import {fireEvent, render} from '@testing-library/react'
import BlogForm from './BlogForm'

describe('blogform', () => {
  test('component is called with right values', () => {
    const addBlog = jest.fn()

    const {container} = render(<BlogForm addBlog={addBlog} />)

    const title = container.querySelector('#input-title')
    const author = container.querySelector('#input-author')
    const url = container.querySelector('#input-url')
    const blogForm = container.querySelector('#blog-form')

    fireEvent.change(title, {target: {value: 'Test Blog'}})
    fireEvent.change(author, {target: {value: 'Wayne Writer'}})
    fireEvent.change(url, {target: {value: 'www.blog.com'}})
    fireEvent.submit(blogForm)

    expect(addBlog.mock.calls).toHaveLength(1)

    expect(addBlog.mock.calls[0][0].title).toBe('Test Blog')
    expect(addBlog.mock.calls[0][0].author).toBe('Wayne Writer')
    expect(addBlog.mock.calls[0][0].url).toBe('www.blog.com')
  })
})
