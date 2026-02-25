import { useMemo } from 'react'
import { useNow } from '@/hooks/useNow'

const formatter = new Intl.DateTimeFormat('en-US', {
  timeZone: 'UTC',
  timeStyle: 'medium',
  hour12: false,
})

function parseUtcOffset(offset: string): number | null {
  const match = offset.match(/^([+-])(\d{2}):(\d{2})$/)
  if (!match) return null
  const sign = match[1] === '+' ? 1 : -1
  return sign * (parseInt(match[2]) * 60 + parseInt(match[3]))
}

export const useIpInputClock = (props: { utcOffset: string | null }) => {
  const now = useNow()

  const offsetMs = useMemo(() => {
    if (!props.utcOffset) return null
    const minutes = parseUtcOffset(props.utcOffset)
    return minutes != null ? minutes * 60_000 : null
  }, [props.utcOffset])

  return { time: offsetMs == null ? undefined : formatter.format(new Date(now + offsetMs)) }
}
