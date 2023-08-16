import { hash } from 'bcrypt'
import { UserRepository } from '../repository/users-repository'

interface IUser {
  name?: string
  email?: string
  password: string
  _email: string
}

export class UpdateUser {
  constructor(private userRepository: UserRepository) {
    Promise<void>
  }

  async update(request: IUser) {
    const { name, email, password, _email } = request

    const passwordHash = await hash(password, 6)

    await this.userRepository.update(_email, name, email, passwordHash)
  }
}
