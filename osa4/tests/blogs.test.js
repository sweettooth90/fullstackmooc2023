const listHelper = require('../utils/list_helper')
const {blogs, listWithOneBlog} = require('./fixtures')

describe('total likes', () => {
  test('when list has only one blog', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })

  test('when list has multiple blogs', () => {
    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(36)
  })
})

describe('blog', () => {
  test('with the most likes', () => {
    const result = listHelper.favoriteBlog(blogs)
    expect(result).toEqual(
      {
        _id: '5a422b3a1b54a676234d17f9',
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
        likes: 12,
        __v: 0
      }
    )
  })
})

describe('shows', () => {
  test('writer with the most blogs and the number of blogs written', () => {
    const result = listHelper.mostBlogs(blogs)
    expect(result).toEqual(
      {
        author: 'Robert C. Martin',
        blogs: 3
      }
    )
  })

  test('writer whose blogs have the most likes', () => {
    const result = listHelper.mostLikes(blogs)
    expect(result).toEqual(
      {
        author: 'Edsger W. Dijkstra',
        likes: 17
      }
    )
  })
})
