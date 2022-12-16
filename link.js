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
    return response.data
  },
  function (error) {
    return Promise.reject(error?.response?.data?.error || error)
  }
)

const defaultOptions = {
  EX: process.env.CACHE_EXPIRED_TIME || 86400,
}
const linkWrapper = async (config, cacheKey, options) => {
  const cache = await redisClient.get(cacheKey || config.url)
  if (cache) {
    return JSON.parse(cache)
  }
  const data = await link(config)
  redisClient.set(
    cacheKey || config.url,
    JSON.stringify(data),
    options || defaultOptions
  )
  return data
}

export default linkWrapper
