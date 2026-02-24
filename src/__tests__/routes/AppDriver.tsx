import { screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
import { App } from '@/routes/index'
import { renderWithQueryClient } from '../test-utils'

vi.mock('@/server-fns/ip-lookup', () => ({
  lookupIp: vi.fn(),
}))

export class AppDriver {
  get = {
    addInputButton: () => screen.getByRole('button', { name: /add input/i }),
    ipInputs: () => screen.queryAllByPlaceholderText('Enter IP address'),
  }

  set = {
    clickAddInput: () => fireEvent.click(this.get.addInputButton()),
    clickAddInputTimes: (n: number) => {
      for (let i = 0; i < n; i++) this.set.clickAddInput()
    },
  }

  render() {
    return renderWithQueryClient(<App />)
  }
}
