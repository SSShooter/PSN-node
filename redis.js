import { createClient } from 'redis'

const client = createClient({
  url: process.env.REDIS_URL,
  password: process.env.REDIS_PW,
})

client.on('error', (err) => console.log('Redis Client Error', err))

export default client
