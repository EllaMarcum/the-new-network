import { AppState } from '../AppState'
import { Post } from "../models/Post"
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class PostService {
  async getPosts() {
    const res = await api.get(`/api/posts?page=${AppState.postsPage}`)
    AppState.posts = res.data.posts.map(p => new Post(p))
    AppState.totalPages = res.data.totalPages
    AppState.pageCount = res.data.page
  }

  async createPost(postData) {
    const res = await api.post('/api/posts', postData)
    AppState.posts.unshift(new Post(res.data))
  }

  async deletePost(postId) {
    const res = await api.delete(`/api/posts/${postId}`)
    AppState.posts = AppState.posts.filter(p => p.id != postId)
  }
  async likePost(postId) {
    const res = await api.post(`/api/posts/${postId}/like`)
    const index = AppState.posts.findIndex(p => p.id == postId)
    AppState.posts.splice(index, 1, new Post(res.data))
  }
}



export const postService = new PostService()
