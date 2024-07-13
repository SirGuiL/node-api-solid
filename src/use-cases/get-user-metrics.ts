import { CheckIn } from '@prisma/client'

import { CheckInsRepository } from '@/repositories/checkins-repository'

interface GetUserMetricsUseCaseRequest {
  userId: string
}

interface GetUserMetricsUseCaseResponse {
  checkInsCount: number
}

export class GetUserMetricsUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute(
    props: GetUserMetricsUseCaseRequest,
  ): Promise<GetUserMetricsUseCaseResponse> {
    const { userId } = props

    const checkInsCount = await this.checkInsRepository.countByUserId(userId)

    return { checkInsCount }
  }
}
