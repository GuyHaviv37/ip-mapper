import { screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
import { lookupIp } from '@/server-fns/ip-lookup'
import type { IpLookupResponse } from '@/schemas/ip'
import { AppDriver } from '../../routes/AppDriver'

export class IpInputDriver {
  private appDriver = new AppDriver()

  get = {
    input: () => screen.getByPlaceholderText('Enter IP address'),
    errorByText: (text: string) => screen.queryByText(text),
    queryErrorByText: (text: string) => screen.queryByText(text),
    findErrorByText: (text: string) => screen.findByText(text),
    flagImage: () => screen.queryByRole('img'),
    findFlagImage: () => screen.findByRole('img'),
    time: () => screen.getByText(/\d{2}:\d{2}:\d{2}/),
    findTime: () => screen.findByText(/\d{2}:\d{2}:\d{2}/),
  }

  set = {
    typeIp: (value: string) => {
      fireEvent.change(this.get.input(), { target: { value } })
    },
    blur: () => {
      fireEvent.blur(this.get.input())
    },
    typeAndBlur: (value: string) => {
      this.set.typeIp(value)
      this.set.blur()
    },
  }

  mocks = {
    lookupSuccess: (data: IpLookupResponse) => {
      vi.mocked(lookupIp).mockResolvedValue(data)
    },
    lookupError: (message: string) => {
      vi.mocked(lookupIp).mockRejectedValue(new Error(message))
    },
    reset: () => {
      vi.mocked(lookupIp).mockReset()
    },
  }

  render() {
    this.appDriver.render()
    this.appDriver.set.clickAddInput()
  }
}
