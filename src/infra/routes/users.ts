import { FastifyInstance } from 'fastify'
import { CreateUser } from '../../application/use-cases/create-users'
import { PrismaUserRepository } from '../database/repository/prisma-user-repository'
import { CreateUserController } from '../controllers/Create-user-controller'
import { AuthenticationUserControler } from '../controllers/Register-user-controller'
import { AuthenticationUser } from '../../application/use-cases/authentication-use'
import { UpdateUser } from '../../application/use-cases/update-use'
import { UpdateUserController } from '../controllers/Update-user-controller'

// repositorio
const repository = new PrismaUserRepository()

// criar
const createInstance = new CreateUser(repository)
const create = new CreateUserController(createInstance)

// autenticar
const authenticateUser = new AuthenticationUser(repository)
const login = new AuthenticationUserControler(authenticateUser)

const update = new UpdateUser(repository)
const updateCrontroller = new UpdateUserController(update)

export async function usuario(app: FastifyInstance) {
  app.post('/creat', async (request) => {
    return create.createUser(request)
  })

  app.post('/', async (request) => {
    return login.authenticate(request, app)
  })

  app.put('/redefinir/:_email', async (request) => {
    return updateCrontroller.update(request)
  })
}
