import 'dotenv/config'
import Fastify from 'fastify'
import cors from '@fastify/cors'
import swagger from '@fastify/swagger'
import swaggerUI from '@fastify/swagger-ui'
import variables from './variables.js'
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

import { schemaGen } from './utils.js'

import redisClient from './redis.js'

await redisClient.connect()

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
      url: 'https://github.com/ssshooter/ps-trophy',
      description: 'Find more info here',
    },
    consumes: ['application/json'],
    produces: ['application/json'],
    // tags: [
    //   { name: 'user', description: 'User related end-points' },
    // ],
  },
})
await fastify.register(swaggerUI, {
  routePrefix: '/doc',
})

fastify.get(
  '/test',
  {
    schema: {
      description: 'test',
      tags: ['test'],
      summary: 'test',
    },
  },
  async (_, reply) => {
    reply.type('application/json').code(200).send({ hello: 'ps-trophy' })
  }
)

fastify.post(
  '/setNPSSO',
  {
    schema: {
      description: 'Set NPSSO, password is needed.',
      body: {
        type: 'object',
        properties: {
          password: {
            type: 'string',
            description: 'Use password to set NPSSO',
          },
          NPSSO: {
            type: 'string',
            description: 'NPSSO',
          },
        },
      },
    },
  },
  async (request, reply) => {
    if (request.body.password === process.env.password) {
      variables.NPSSO = request.body.NPSSO
      reply.type('application/json').code(200).send({ msg: 'NPSSO is setted' })
    } else {
      reply.type('application/json').code(401).send({ error: 'Unauthorized' })
    }
  }
)

fastify.get(
  '/trophyTitles',
  {
    schema: schemaGen(['accountId', 'offset']),
  },
  async (request, reply) => {
    const data = await getTrophyTitles(request.query)
    reply.type('application/json').code(200)
    return data
  }
)

fastify.get(
  '/trophyTitle',
  {
    schema: schemaGen(['npCommunicationId']),
  },
  async (request, reply) => {
    const data = await getSingleTitle(request.query.npCommunicationId)
    reply.type('application/json').code(200)
    return data
  }
)

fastify.get(
  '/profile',
  {
    schema: schemaGen(['accountId']),
  },
  async (request, reply) => {
    const data = await getProfile(request.query.accountId)
    reply.type('application/json').code(200)
    return data
  }
)

fastify.get(
  '/profiles',
  {
    schema: schemaGen(['accountIds']),
  },
  async (request, reply) => {
    const data = await getProfiles(request.query.accountIds)
    reply.type('application/json').code(200)
    return data
  }
)

fastify.get(
  '/friends',
  {
    schema: schemaGen(['accountId']),
  },
  async (request, reply) => {
    const data = await getFriends(request.query.accountId)
    reply.type('application/json').code(200)
    return data
  }
)

fastify.get(
  '/trophySummary',
  {
    schema: schemaGen(['accountId']),
  },
  async (request, reply) => {
    const data = await getTrophySummary(request.query.accountId)
    reply.type('application/json').code(200)
    return data
  }
)

fastify.get(
  '/gameTrophy',
  {
    schema: schemaGen(['npCommunicationId', 'trophyGroupId', 'npServiceName']),
  },
  async (request, reply) => {
    const data = await getGameTrophy(request.query)
    reply.type('application/json').code(200)
    return data
  }
)

fastify.get(
  '/gameTrophyGroup',
  {
    schema: schemaGen(['npCommunicationId', 'npServiceName']),
  },
  async (request, reply) => {
    const data = await getGameTrophyGroup(request.query)
    reply.type('application/json').code(200)
    return data
  }
)

fastify.get(
  '/earnedTrophy',
  {
    schema: schemaGen([
      'npCommunicationId',
      'trophyGroupId',
      'npServiceName',
      'accountId',
    ]),
  },
  async (request, reply) => {
    const data = await getEarnedTrophy(request.query)
    reply.type('application/json').code(200)
    return data
  }
)

fastify.get('/gameInfo', async (request, reply) => {
  const data = await getGameInfo(request.query)
  reply.type('application/json').code(200)
  return data
})

// {"searchTerm":"a","domainRequests":[{"domain":"SocialAllAccounts"}]}
fastify.post('/searchPlayer', async (request, reply) => {
  const data = await searchPlayer(request.body)
  reply.type('application/json').code(200)
  return data
})

await fastify.listen({ port: process.env.PORT || 2333, address: '0.0.0.0' })
