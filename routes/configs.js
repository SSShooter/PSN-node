import variables from '../variables.js'

export default function (fastify, opts, done) {
  fastify.post(
    '/npsso',
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
        reply
          .type('application/json')
          .code(200)
          .send({ msg: 'NPSSO is setted' })
      } else {
        reply.type('application/json').code(401).send({ error: 'Unauthorized' })
      }
    }
  )
  done()
}
