import { z } from 'zod'

const ipv4 = z.ipv4()
const ipv6 = z.ipv6()

export const ipSchema = z
  .string()
  .min(1, 'IP address is required')
  .refine(
    (val) => ipv4.safeParse(val).success || ipv6.safeParse(val).success,
    'Invalid IP address format',
  )

export const ipLookupResponseSchema = z.object({
  country_code: z.string(),
})

export type IpLookupResponse = z.infer<typeof ipLookupResponseSchema>
