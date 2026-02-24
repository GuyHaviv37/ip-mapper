import { screen, fireEvent } from '@testing-library/react'
import { App } from '@/routes/index'
import { renderWithQueryClient } from '../test-utils'

export class AppDriver {
  get = {
    addInputButton: () => screen.getByRole('button', { name: /add input/i }),
    ipInputs: () => screen.queryAllByPlaceholderText('Enter IP address'),
    inputIndex: (n: number) => screen.getByText(String(n)),
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
