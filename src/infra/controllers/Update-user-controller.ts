import { FastifyRequest } from 'fastify'
import { UpdateUser } from '../../application/use-cases/update-use'
import { z } from 'zod'

export class UpdateUserController {
  constructor(private updateUser: UpdateUser) {
    Promise<void>
  }

  async update(request: FastifyRequest) {
    const emailParans = z.object({
      _email: z.string(),
    })

    const { _email } = emailParans.parse(request.params)
    console.log(request.params)

    const userSchema = z.object({
      name: z.string().optional(),
      email: z.string().optional(),
      password: z.string(),
    })

    const { name, email, password } = userSchema.parse(request.body)

    const user = await this.updateUser.update({
      _email,
      email,
      name,
      password,
    })

    return user
  }
}
