import { prisma } from '@/lib/prisma'
import { PrismaUsersRepository } from '@/repositories/prisma-users-repositories'
import { hash } from 'bcryptjs'

interface RegisterUseCaseProps {
  name: string
  email: string
  password: string
}

export const registerUseCase = async (props: RegisterUseCaseProps) => {
  const { email, name, password } = props

  const password_hash = await hash(password, 6)

  const userWithSameEmail = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (userWithSameEmail) {
    throw new Error('User already exists')
  }

  const prismaUsersRepository = new PrismaUsersRepository()

  await prismaUsersRepository.create({
    name,
    email,
    password_hash,
  })
}
