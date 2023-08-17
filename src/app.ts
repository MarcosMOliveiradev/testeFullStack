import fastify from 'fastify'
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'

import { usuario } from './infra/routes/users'
import { env } from './middlewares/env'

export const app = fastify()
app.register(cors, {
  origin: true,
})
app.register(jwt, {
  secret: env.SECRET_KEY,
})

app.register(usuario, {
  prefix: '/',
})
