import { Users } from '../../../application/entites/users'
import { UserRepository } from '../../../application/repository/users-repository'
import { prisma } from '../prisma'

export class PrismaUserRepository extends UserRepository {
  async update(
    _email: string,
    name?: string | undefined,
    email?: string | undefined,
    password?: string | undefined,
  ): Promise<Users> {
    const updateUser = await prisma.usuarios.update({
      where: {
        email: _email,
      },
      data: {
        email,
        name,
        password,
      },
    })

    console.log('prisma-user-repository', updateUser)
    return updateUser
  }

  async findUnique(email: string): Promise<Users> {
    const getUSer = await prisma.usuarios.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    })
    return getUSer
  }

  async auth(email: string): Promise<Users> {
    const auth = await prisma.usuarios.findUnique({
      where: {
        email,
      },
      select: {
        password: true,
      },
    })
    return auth
  }

  async email(verifyEmail: string): Promise<void> {
    const email = await prisma.usuarios.findUnique({
      where: {
        email: verifyEmail,
      },
    })

    if (email) {
      throw new Error('Usuario já existe!')
    }
  }

  async create(user: Users): Promise<void> {
    await prisma.usuarios.create({
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        password: user.password,
      },
    })
  }
}
