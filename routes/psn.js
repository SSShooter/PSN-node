import {
  getTrophyTitles,
  getGameTrophy,
  getEarnedTrophy,
  getTrophySummary,
  getGameTrophyGroup,
  getSingleTitle,
} from '../psnAPI/trophy.js'
import { searchPlayer } from '../psnAPI/search.js'
import { getProfile, getProfiles, getFriends } from '../psnAPI/user.js'
import { getGameInfo } from '../psnAPI/game.js'

import { schemaGen } from '../utils.js'

export default function (fastify, opts, done) {
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
      schema: schemaGen([
        'npCommunicationId',
        'trophyGroupId',
        'npServiceName',
      ]),
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
  done()
}
