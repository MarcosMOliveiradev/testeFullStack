import { compare } from 'bcrypt'
import { UserRepository } from '../repository/users-repository'
import { FastifyInstance } from 'fastify'

interface IUser {
  email: string
  password: string
}

interface ResponseUser {
  token: string
}

export class AuthenticationUser {
  constructor(private userRpository: UserRepository) {
    Promise<void>
  }

  async auth(request: IUser, app: FastifyInstance): Promise<ResponseUser> {
    const { email, password } = request

    const authentication = await this.userRpository.auth(email)

    const passwordHash = compare(password, authentication.password)

    if (!passwordHash) {
      throw new Error('Senha ou E-mail Incorreta')
    }

    const getUSer = await this.userRpository.findUnique(email)

    const token = app.jwt.sign(
      {
        name: getUSer.name,
        email: getUSer.email,
      },
      {
        sub: getUSer.id,
        expiresIn: '10 days',
      },
    )

    return { token }
  }
}
