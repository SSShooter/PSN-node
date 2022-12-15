import axios from 'axios'
import getToken from './auth.js'
import redisClient from './redis.js'

// ;('fi-FI')
// ;('de-DE')
// ;('en-US')
// ;('ko-KR')
// ;('pt-BR')
// ;('es-ES')
// ;('ar-AE')
// ;('no-NO')
// ;('fr-CA')
// ;('it-IT')
// ;('pl-PL')
// ;('ru-RU')
// ;('zh-Hans')
// ;('nl-NL')
// ;('pt-PT')
// ;('zh-Hant')
// ;('sv-SE')
// ;('da-DK')
// ;('tr-TR')
// ;('fr-FR')
// ;('en-GB')
// ;('es-419')
// ;('ja-JP')

export const link = axios.create({
  baseURL: 'https://m.np.playstation.com/',
  timeout: 15000,
  headers: { 'Accept-Language': process.env.LANGUAGE },
})

link.interceptors.request.use(
  async function (config) {
    // cache token 
    let token = await redisClient.get('auth:token')
    if (!token) {
      token = await getToken()
      if (!token) {
        return Promise.reject(new Error('Can not get token, try renewing NPSSO.'))
      }
      await redisClient.set('auth:token', token, {
        EX: 60 * 60,
      })
    }
    config.headers.Authorization = 'Bearer ' + token
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

link.interceptors.response.use(
  function (response) {
    redisClient.set(response.config.url,
      JSON.stringify(response.data), {
      EX: 60 * 60 * 12,
    })
    return response.data
  },
  function (error) {
    return Promise.reject(error?.response?.data?.error || error)
  }
)

const linkWrapper = async (config) => {
  if (config.method === 'get') {
    const cache = await redisClient.get(config.url)
    if (cache) {
      return JSON.parse(cache)
    } else {
      return link(config)
    }
  } else {
    return link(config)
  }
}

export default linkWrapper
