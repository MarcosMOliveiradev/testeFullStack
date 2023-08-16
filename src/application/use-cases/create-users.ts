import { Users } from '../entites/users'
import { UserRepository } from '../repository/users-repository'
import { hash } from 'bcrypt'
import emailValidator from 'email-validator'

interface ICreateUserRequest {
  name: string
  email: string
  password: string
}

interface ICreateUserResponse {
  user: Users
}

export class CreateUser {
  constructor(private userRepository: UserRepository) {
    Promise<void>
  }

  async execute(request: ICreateUserRequest): Promise<ICreateUserResponse> {
    const { name, email, password } = request

    await emailValidator.validate(email)

    await await this.userRepository.email(email)

    const passwordHash = await hash(password, 6)

    const user = new Users({
      name,
      email,
      password: passwordHash,
    })

    await this.userRepository.create(user)

    return { user }
  }
}
