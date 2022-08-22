import { AppState } from '../AppState'
import { Account } from "../models/Account"
import { Profile } from "../models/Profile"
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class AccountService {
  async getAccount() {
    try {
      const res = await api.get('/account')
      AppState.account = new Account(res.data)
      const resProfile = await api.get(`/api/profiles/${AppState.account.id}`)
      console.log(resProfile)
      AppState.userProfile = new Profile(resProfile.data)
    } catch (err) {
      logger.error('HAVE YOU STARTED YOUR SERVER YET???', err)
    }
  }

  async editAccount(accountData) {
    const res = await api.put('account', accountData)
    const newAccount = AppState.account
    newAccount.name = accountData.name
    newAccount.picture = accountData.picture
    newAccount.coverImg = accountData.coverImg
    newAccount.bio = accountData.bio

    AppState.account = newAccount
  }
}

export const accountService = new AccountService()
