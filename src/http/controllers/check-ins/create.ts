import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

import { makeCheckInUseCase } from '@/use-cases/factories/make-checkin-use-case'

export const create = async (request: FastifyRequest, reply: FastifyReply) => {
  const createCheckInBodySchema = z.object({
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
  })

  const createCheckInParamsSchema = z.object({
    gymId: z.string().uuid(),
  })

  const { gymId } = createCheckInParamsSchema.parse(request.params)
  const { latitude, longitude } = createCheckInBodySchema.parse(request.body)

  const createCheckInUseCase = makeCheckInUseCase()

  await createCheckInUseCase.execute({
    userLatitude: latitude,
    userLongitude: longitude,
    gymId,
    userId: request.user.sub,
  })

  return reply.status(201).send()
}
