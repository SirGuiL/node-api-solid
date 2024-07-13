import { CheckIn } from '@prisma/client'

import { CheckInsRepository } from '@/repositories/checkins-repository'

interface FetchUsersCheckInsHistoryUseCaseRequest {
  userId: string
  page: number
}

interface FetchUsersCheckInsHistoryUseCaseResponse {
  checkIns: CheckIn[]
}

export class FetchUsersCheckInsHistoryUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute(
    props: FetchUsersCheckInsHistoryUseCaseRequest,
  ): Promise<FetchUsersCheckInsHistoryUseCaseResponse> {
    const { userId, page } = props

    const checkIns = await this.checkInsRepository.findManyByUserId(
      userId,
      page,
    )

    return { checkIns }
  }
}
