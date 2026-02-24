import { createServerFn } from '@tanstack/react-start'
import { env } from '../env'
import { ipSchema, ipLookupResponseSchema } from '../schemas/ip'

export const lookupIp = createServerFn({ method: 'GET' })
  .inputValidator((data: unknown) => ipSchema.parse(data))
  .handler(async ({ data: ip }) => {
    const url = `https://api.ip2location.io/?key=${env.IP2LOCATION_API_KEY}&ip=${ip}&format=json`
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`IP lookup failed with status ${response.status}`)
    }

    const json = await response.json()
    return ipLookupResponseSchema.parse(json)
  })
