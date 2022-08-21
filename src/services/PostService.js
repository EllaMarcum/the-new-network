import { AppState } from '../AppState'
import { Post } from "../models/Post"
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class PostService {
  async getPosts() {
    const res = await api.get(`/api/posts?page=${AppState.postsPage}`)
    AppState.posts = res.data.posts.map(p => new Post(p))
  }
}

export const postService = new PostService()
