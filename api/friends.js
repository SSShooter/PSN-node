import { getFriends } from './psnAPI/user.js'
import redisClient from '../redis.js'
export default async function handler(request, response) {
  await redisClient.connect()
  const data = await getFriends(request.query.accountId)
  return response.status(200).json(data)
}
