import { AppState } from '../AppState'
import { Profile } from "../models/Profile"
import { Post } from "../models/Post"
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class ProfileService {
  async getProfile(profileId) {
    const res = await api.get(`/api/profiles/${profileId}`)
    AppState.activeProfile = new Profile(res.data)
  }

  async getPostByProfileId(profileId) {
    const res = await api.get(`/api/profiles/${profileId}/posts?page=${AppState.postsPage}`)
    console.log(res)
    AppState.posts = res.data.posts.map(p => new Post(p))
    AppState.totalPages = res.data.totalPages
    AppState.pageCount = res.data.page
  }

  async getProfilesByQuery(searchText) {
    const res = await api.get(`/api/profiles?query=${searchText}`)
    AppState.searchedProfiles = res.data.map(p => new Profile(p))
  }
}



export const profileService = new ProfileService()
