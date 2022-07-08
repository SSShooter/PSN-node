import { searchPlayer } from './psnAPI/search.js'
import redisClient from '../redis.js'
export default async function handler(request, response) {
  await redisClient.connect()
  const data = await searchPlayer(request.query.accountId)
  return response.status(200).json(data)
}
