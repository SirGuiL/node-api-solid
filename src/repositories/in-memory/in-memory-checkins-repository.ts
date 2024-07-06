import { CheckIn, Prisma } from '@prisma/client'
import { CheckInsRepository } from '../checkins-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryCheckInsRepository implements CheckInsRepository {
  public checkIns: CheckIn[] = []

  async findByUserIdOnDay(userId: string, day: Date) {
    const checkInOnSameDate = this.checkIns.find(
      (checkIn) => checkIn.user_id === userId,
    )

    if (!checkInOnSameDate) {
      return null
    }

    return checkInOnSameDate
  }

  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const { gym_id, user_id, validated_at } = data

    const checkIn = {
      id: randomUUID(),
      user_id,
      gym_id,
      created_at: new Date(),
      validated_at: validated_at ? new Date(validated_at) : null,
    }

    this.checkIns.push(checkIn)

    return checkIn
  }
}
