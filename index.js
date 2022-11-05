import 'dotenv/config'
import Fastify from 'fastify'
import cors from '@fastify/cors'
import swagger from '@fastify/swagger'
import swaggerUI from '@fastify/swagger-ui'
import { getTrophyTitles, getGameTrophy, getEarnedTrophy, getTrophySummary, getGameTrophyGroup, getSingleTitle } from './psnAPI/trophy.js'
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

await fastify.register(cors, {})
await fastify.register(swagger, {
  swagger: {
    info: {
      title: 'PS Trophy',
      description: 'A wrapper of ps api',
      version: '1.0.0',
    },
    externalDocs: {
      url: 'https://swagger.io',
      description: 'Find more info here',
    },
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: [
      { name: 'user', description: 'User related end-points' },
      { name: 'code', description: 'Code related end-points' },
    ],
    definitions: {
      User: {
        type: 'object',
        required: ['id', 'email'],
        properties: {
          id: { type: 'string', format: 'uuid' },
          firstName: { type: 'string' },
          lastName: { type: 'string' },
          email: { type: 'string', format: 'email' },
        },
      },
    },
  },
})
await fastify.register(swaggerUI, {
  routePrefix: '/doc',
})

fastify.get('/test', {
  schema: {
    description: 'post some data',
    tags: ['test'],
    summary: 'test',
  },
}, async (_, reply) => {
  reply.type('application/json').code(200).send({ hello: 'ps-trophy' })
})

fastify.get('/trophyTitles', {
  schema: {
    query: {
      type: 'object',
      properties: {
        accountId: {
          type: 'string',
          description: 'accountId or me',
        },
        offset: {
          type: 'string',
        },
      },
    },
  },
}, async (request, reply) => {
  const data = await getTrophyTitles(request.query)
  reply.type('application/json').code(200)
  return data
})

fastify.get('/trophyTitle', {
  schema: {
    query: {
      type: 'object',
      properties: {
        npCommunicationId: {
          type: 'string',
          description: 'npCommunicationId',
        },
      },
    },
  },
}, async (request, reply) => {
  const data = await getSingleTitle(request.query.npCommunicationId)
  reply.type('application/json').code(200)
  return data
})

fastify.get('/profile', async (request, reply) => {
  const data = await getProfile(request.query.accountId)
  reply.type('application/json').code(200)
  return data
})

fastify.get('/profiles', {
  schema: {
    query: {
      type: 'object',
      properties: {
        accountIds: {
          type: 'array',
          description: 'accountIds array',
        },
      },
    },
  },
}, async (request, reply) => {
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

fastify.get('/gameTrophy', {
  schema: {
    query: {
      type: 'object',
      properties: {
        npCommunicationId: {
          type: 'string',
        },
        trophyGroupId: {
          type: 'string',
        },
        npServiceName: {
          type: 'string',
        },
      },
    },
  },
}, async (request, reply) => {
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

await fastify.listen({ port: process.env.PORT || 2333, address: '0.0.0.0' })
