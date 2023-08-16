import fastify from 'fastify'
import jwt from '@fastify/jwt'
import { usuario } from './infra/routes/users'
import { env } from './middlewares/env'

export const app = fastify()
app.register(jwt, {
  secret: env.SECRET_KEY,
})

app.register(usuario, {
  prefix: '/',
})
