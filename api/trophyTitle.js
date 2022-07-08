import { getSingleTitle } from '../psnAPI/trophy.js'
import redisClient from '../redis.js'
export default async function handler(request, response) {
  await redisClient.connect()
  const data = await getSingleTitle(request.query.npCommunicationId)
  return response.status(200).json(data)
}
