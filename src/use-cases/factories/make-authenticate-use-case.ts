import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { AuthenticateUseCase } from '../authenticate'

export function makeAutenticateUseCase() {
  const prismaUsersRepository = new PrismaUsersRepository()
  const autenticateUseCase = new AuthenticateUseCase(prismaUsersRepository)

  return autenticateUseCase
}
