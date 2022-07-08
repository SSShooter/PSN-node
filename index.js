import 'dotenv/config'
import Fastify from 'fastify'
import cors from 'fastify-cors'
import {
  getTrophyTitles,
  getGameTrophy,
  getEarnedTrophy,
  getTrophySummary,
  getGameTrophyGroup,
  getSingleTitle,
} from './psnAPI/trophy.js'
import { searchPlayer } from './psnAPI/search.js'
import { getProfile, getProfiles, getFriends } from './psnAPI/user.js'
import { getGameInfo } from './psnAPI/game.js'

import redisClient from './redis.js'

await redisClient.connect()
await redisClient.set('ps-trothy-test', 'ok')
const value = await redisClient.get('ps-trothy-test')
console.log('ps-trothy-test', value)

const fastify = Fastify({
  logger: true,
})

fastify.register(cors, {})

fastify.get('/', async (request, reply) => {
  reply.type('application/json').code(200).send({ hello: 'ps-trophy' })
})

fastify.get('/trophyTitles', async (request, reply) => {
  // accountId offset
  const data = await getTrophyTitles(request.query)
  reply.type('application/json').code(200)
  return data
})

fastify.get('/trophyTitle', async (request, reply) => {
  const data = await getSingleTitle(request.query.npCommunicationId)
  reply.type('application/json').code(200)
  return data
})

fastify.get('/profile', async (request, reply) => {
  const data = await getProfile(request.query.accountId)
  reply.type('application/json').code(200)
  return data
})

fastify.get('/profiles', async (request, reply) => {
  const data = await getProfiles(request.query.accountIds)
  reply.type('application/json').code(200)
  return data
})

fastify.get('/friends', async (request, reply) => {
  const data = await getFriends(request.query.accountId)
  reply.type('application/json').code(200)
  return data
})

fastify.get('/trophySummary', async (request, reply) => {
  const data = await getTrophySummary(request.query.accountId)
  reply.type('application/json').code(200)
  return data
})

fastify.get('/gameTrophy', async (request, reply) => {
  // NPWR25264_00
  const data = await getGameTrophy(request.query)
  reply.type('application/json').code(200)
  return data
})

fastify.get('/gameTrophyGroup', async (request, reply) => {
  const data = await getGameTrophyGroup(request.query)
  reply.type('application/json').code(200)
  return data
})

fastify.get('/earnedTrophy', async (request, reply) => {
  // NPWR25264_00
  const data = await getEarnedTrophy(request.query)
  reply.type('application/json').code(200)
  return data
})

fastify.get('/gameInfo', async (request, reply) => {
  // NPWR25264_00
  const data = await getGameInfo(request.query)
  reply.type('application/json').code(200)
  return data
})

fastify.post('/searchPlayer', async (request, reply) => {
  const data = await searchPlayer(request.body)
  reply.type('application/json').code(200)
  return data
})

fastify.listen(process.env.PORT || 2333, '0.0.0.0', (err, address) => {
  if (err) throw err
  // Server is now listening on ${address}
})
