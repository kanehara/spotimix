import Cookies from 'js-cookie'
import {ACCESS_TOKEN_COOKIE_KEY} from '@/utils'

const getters = {
  isLoggedIn: () => !!Cookies.get(ACCESS_TOKEN_COOKIE_KEY),
}

export default {
  getters,
}
