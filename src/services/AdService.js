import { AppState } from '../AppState'
import { Ad } from "../models/Ad"
import { api } from './AxiosService'

class AdService {
  async getAds() {
    const res = await api.get(`/api/ads`)
    AppState.ads = res.data.map(a => new Ad(a))
  }
}



export const adService = new AdService()
