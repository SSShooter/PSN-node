import { getGameTrophyGroup } from '../psnAPI/trophy.js'
import redisClient from '../redis.js'
export default async function handler(request, response) {
  await redisClient.connect()
  const data = await getGameTrophyGroup(request.query)
  return response.status(200).json(data)
}
