import {createSlice} from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    likeBlog(state, action) {
      const blogToLike = action.payload
      return state.map(blog =>
        blog.id !== blogToLike.id
          ? blog
          : blogToLike
      )
    },
    createBlog(state, action) {
      state.push(action.payload)
    },
    setBlog(state, action) {
      return action.payload
    },
    removeBlog(state, action) {
      return state.filter(blog => blog.id !== action.payload)
    }
  }
})

export const addLikeToBlog = (id, updated) => {
  return async dispatch => {
    const like = await blogService.update(id, updated)
    dispatch(likeBlog(like))
  }
}

export const createNewBlog = (content) => {
  return async dispatch => {
    const newBlog = await blogService.create(content)
    dispatch(createBlog(newBlog))
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlog(blogs))
  }
}

export const deleteBlog = (id) => {
  return async dispatch => {
    const blogs = await blogService.remove(id)
    dispatch(removeBlog(blogs))
  }
}

export const {likeBlog, createBlog, setBlog, removeBlog} = blogSlice.actions
export default blogSlice.reducer
