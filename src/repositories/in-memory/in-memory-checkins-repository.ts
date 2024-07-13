import { randomUUID } from 'node:crypto'
import { isSameDay } from 'date-fns'

import { CheckIn, Prisma } from '@prisma/client'
import { CheckInsRepository } from '../checkins-repository'

export class InMemoryCheckInsRepository implements CheckInsRepository {
  public checkIns: CheckIn[] = []

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

  async save(checkIn: CheckIn) {
    const checkInIndex = this.checkIns.findIndex(
      (item) => item.id === checkIn.id,
    )

    if (checkInIndex >= 0) {
      this.checkIns[checkInIndex] = checkIn
    }

    return checkIn
  }

  async findManyByUserId(userId: string, page: number) {
    return this.checkIns
      .filter((checkIn) => checkIn.user_id === userId)
      .slice((page - 1) * 20, page * 20)
  }

  async findByUserIdOnDay(userId: string, day: Date) {
    const checkInOnSameDate = this.checkIns.find((checkIn) => {
      const isOnSameDate = isSameDay(
        new Date(checkIn.created_at),
        new Date(day),
      )

      return checkIn.user_id === userId && isOnSameDate
    })

    if (!checkInOnSameDate) {
      return null
    }

    return checkInOnSameDate
  }

  async countByUserId(userId: string) {
    return this.checkIns.filter((checkIn) => checkIn.user_id === userId).length
  }

  async findById(id: string) {
    const checkIn = this.checkIns.find((item) => item.id === id)

    if (!checkIn) {
      return null
    }

    return checkIn
  }
}
