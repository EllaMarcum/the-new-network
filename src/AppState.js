import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  /**@type {import('./models/Account.js').Account} */
  account: {},

  posts: [],
  postsPage: 1,
  totalPages: 0,
  pageCount: '0 of 0',
  activeProfile: {},
  searchedProfiles: [],
  ads: []
})

