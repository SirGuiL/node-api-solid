import { CheckIn, Prisma } from '@prisma/client'

export interface CheckInsRepository {
  create: (data: Prisma.CheckInUncheckedCreateInput) => Promise<CheckIn>
  findManyByUserId: (userId: string, page: number) => Promise<CheckIn[]>
  findByUserIdOnDay: (userId: string, day: Date) => Promise<CheckIn | null>
}
