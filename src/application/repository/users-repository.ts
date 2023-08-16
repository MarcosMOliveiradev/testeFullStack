import { Users } from '../entites/users'

export abstract class UserRepository {
  abstract create(user: Users): Promise<void>
  abstract email(verifyEmail: string): Promise<void>
  abstract auth(email: string): Promise<Users>
  abstract findUnique(email: string): Promise<Users>
  abstract update(
    _email: string,
    name?: string | undefined,
    email?: string | undefined,
    password?: string | undefined,
  ): Promise<Users>
}
