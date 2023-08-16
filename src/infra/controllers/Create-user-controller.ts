import { FastifyRequest } from 'fastify'
import { z } from 'zod'

import { CreateUser } from '../../application/use-cases/create-users'
import { UserView } from '../view-models/user-view-model'

export class CreateUserController {
  constructor(private create: CreateUser) {
    Promise<void>
  }

  async createUser(request: FastifyRequest) {
    const createSchema = z.object({
      name: z.string(),
      email: z.string(),
      password: z.string(),
    })

    const { name, email, password } = createSchema.parse(request.body)

    const { user } = await this.create.execute({
      name,
      email,
      password,
    })

    return {
      user: UserView.toHTTP(user),
    }
  }
}
