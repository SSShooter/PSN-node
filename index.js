import 'dotenv/config'
import Fastify from 'fastify'
import cors from '@fastify/cors'
import swagger from '@fastify/swagger'
import swaggerUI from '@fastify/swagger-ui'
import psn from './routes/psn.js'
import configs from './routes/configs.js'
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
  },
})
await fastify.register(swaggerUI, {
  routePrefix: '/doc',
})

fastify.get('/ping', async (_, reply) => {
  reply.type('application/json').code(200).send({ hello: 'ps-trophy' })
})

fastify.register(configs, { prefix: '/configs' })
fastify.register(psn, { prefix: '/psn' })

await fastify.listen({ port: process.env.PORT || 2333, address: '0.0.0.0' })
