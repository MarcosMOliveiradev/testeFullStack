import { FastifyRequest, FastifyInstance, FastifyReply } from 'fastify'
import { z } from 'zod'

import { AuthenticationUser } from '../../application/use-cases/authentication-use'

export class AuthenticationUserControler {
  constructor(private authenticateUser: AuthenticationUser) {
    Promise<void>
  }

  async authenticate(
    request: FastifyRequest,
    reply: FastifyReply,
    app: FastifyInstance,
  ) {
    const userSchema = z.object({
      email: z.string(),
      password: z.string(),
    })

    const { email, password } = userSchema.parse(request.body)

    const { token } = await this.authenticateUser.auth({ email, password }, app)

    return reply.send(JSON.stringify(token))
  }
}
