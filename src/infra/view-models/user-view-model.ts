import { Users } from '../../application/entites/users'

export class UserView {
  static toHTTP(user: Users) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
    }
  }
}
