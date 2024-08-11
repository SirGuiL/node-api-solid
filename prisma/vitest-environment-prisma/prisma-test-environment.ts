import { Environment } from 'vitest'

export default <Environment>{
  name: 'prisma',
  transformMode: 'web',
  async setup() {
    console.log('Setting up Prisma...')

    return {
      async teardown() {},
    }
  },
}
