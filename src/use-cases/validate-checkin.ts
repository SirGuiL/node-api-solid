import { CheckIn } from '@prisma/client'
import { differenceInMinutes } from 'date-fns'

import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { LateCheckInValidationError } from './errors/late-checkin-validation-error'

import { CheckInsRepository } from '@/repositories/checkins-repository'

interface ValidateCheckInUseCaseRequest {
  checkInId: string
}

interface ValidateCheckInUseCaseResponse {
  checkIn: CheckIn
}

export class ValidateCheckInUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute(
    props: ValidateCheckInUseCaseRequest,
  ): Promise<ValidateCheckInUseCaseResponse> {
    const { checkInId } = props

    const checkIn = await this.checkInsRepository.findById(checkInId)

    if (!checkIn) {
      throw new ResourceNotFoundError()
    }

    const distanceInMinutesFromCheckInCreation = differenceInMinutes(
      new Date(),
      new Date(checkIn.created_at),
    )

    if (distanceInMinutesFromCheckInCreation > 20) {
      throw new LateCheckInValidationError()
    }

    checkIn.validated_at = new Date()

    await this.checkInsRepository.save(checkIn)

    return {
      checkIn,
    }
  }
}
