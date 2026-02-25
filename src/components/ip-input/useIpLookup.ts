import { useState, useCallback } from 'react'
import { useQuery } from '@tanstack/react-query'
import { ipSchema } from '../../schemas/ip'
import { lookupIp } from '../../server-fns/ip-lookup'

export function useIpLookup() {
  const [queryIp, setQueryIp] = useState<string | null>(null)
  const [validationError, setValidationError] = useState<string | null>(null)

  const { data, isLoading, error: queryError } = useQuery({
    queryKey: ['ip-lookup', queryIp],
    queryFn: () => lookupIp({ data: queryIp! }),
    enabled: !!queryIp,
    staleTime: 1000 * 60 * 60 * 24, // 24 hours - should be more than enough on a per session basis
  })

  const lookup = useCallback((ip: string) => {
    setValidationError(null)

    const result = ipSchema.safeParse(ip)
    if (!result.success) {
      setValidationError(result.error.issues[0].message)
      setQueryIp(null)
      return
    }

    setQueryIp(ip)
  }, [setValidationError, setQueryIp])

  const clearError = useCallback(() => {
    setValidationError(null)
  }, [setValidationError])

  const error = validationError ?? (queryError?.message || null)

  return {
    lookup,
    clearError,
    countryCode: data?.country_code?.toLowerCase() ?? null,
    timeZone: data?.time_zone ?? null,
    isLoading,
    error,
  }
}
