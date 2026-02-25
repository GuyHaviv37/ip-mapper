import { useSyncExternalStore } from 'react'

type Callback = () => void

let now = Date.now()
const listeners = new Set<Callback>()

setInterval(() => {
  now = Date.now()
  listeners.forEach((l) => l())
}, 1000)

function subscribe(cb: Callback) {
  listeners.add(cb)
  return () => listeners.delete(cb)
}

function getSnapshot() {
  return now
}

export function useNow() {
  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot)
}
