import axios from 'axios'
import { getCookie } from './cookie'

export default axios.create({
  headers: {
    accessToken: await getCookie('accessToken'),
  },
})