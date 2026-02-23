import AddInputButton from '@/components/AddInputButton'
import IpInput from '@/components/ip-input/IpInput'
import { createFileRoute } from '@tanstack/react-router'
import { useCallback, useState } from 'react'

export const Route = createFileRoute('/')({ component: App })

function App() {
  const [inputsCount, setInputsCount] = useState(0)

  const addInputHandler = useCallback(() => {
    setInputsCount(prevInputCount => prevInputCount + 1)
  }, [setInputsCount])

  return (
    <div className="min-h-screen">
      <section className="relative py-20 px-6 text-center overflow-hidden">
        <h1 className="text-4xl font-bold">IP Mapper</h1>
        <p className="text-lg">
          Map IP addresses to countries and timezones
        </p>
        <AddInputButton onAddInput={addInputHandler} />
        <div className="mt-8 flex flex-col items-center gap-2">
          {Array.from({ length: inputsCount }).map((_, index) => <IpInput key={index} index={index} />)}
        </div>
      </section>
    </div>
  )
}
