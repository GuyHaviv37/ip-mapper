import { describe, it, expect, vi, beforeEach } from 'vitest'
import { lookupIp } from '@/server-fns/ip-lookup'
import { IpInputDriver } from './IpInputDriver'

vi.mock('@/server-fns/ip-lookup', () => ({
  lookupIp: vi.fn(),
}))

describe('IpInput', () => {
  let driver: IpInputDriver

  beforeEach(() => {
    driver = new IpInputDriver()
    driver.mocks.reset()
  })

  it('shows "IP address is required" when input is empty', () => {
    driver.render()

    driver.set.blur()

    expect(driver.get.errorByText('IP address is required')).toBeInTheDocument()
    expect(lookupIp).not.toHaveBeenCalled()
  })

  it('shows "Invalid IP address format" for a non-IP string', () => {
    driver.render()

    driver.set.typeAndBlur('not-an-ip')

    expect(driver.get.errorByText('Invalid IP address format')).toBeInTheDocument()
    expect(lookupIp).not.toHaveBeenCalled()
  })

  it('clears error message when input is changed after previous validation error', async () => {
    driver.render()

    driver.set.typeAndBlur('not-an-ip')
    expect(driver.get.errorByText('Invalid IP address format')).toBeInTheDocument()
    
    driver.set.typeIp('8.8.8.8')
    
    expect(driver.get.errorByText('Invalid IP address format')).not.toBeInTheDocument()
  })

  it('shows country flag and time for a valid IPv4 address', async () => {
    driver.mocks.lookupSuccess({ country_code: 'US', time_zone: '-05:00' })
    driver.render()

    driver.set.typeAndBlur('8.8.8.8')

    const flag = await driver.get.findFlagImage()
    expect(flag).toHaveAttribute('alt', 'us')

    const time = await driver.get.findTime()
    expect(time).toBeInTheDocument()
  })

  

  it('shows country flag and time for a valid IPv6 address', async () => {
    driver.mocks.lookupSuccess({ country_code: 'DE', time_zone: '+01:00' })
    driver.render()

    driver.set.typeAndBlur('2001:4860:4860::8888')

    const flag = await driver.get.findFlagImage()
    expect(flag).toHaveAttribute('alt', 'de')

    const time = await driver.get.findTime()
    expect(time).toBeInTheDocument()
  })

  it('shows error message when the API call fails', async () => {
    driver.mocks.lookupError('Rate limit exceeded')
    driver.render()

    driver.set.typeAndBlur('8.8.8.8')

    expect(await driver.get.findErrorByText('Rate limit exceeded')).toBeInTheDocument()
    expect(driver.get.flagImage()).not.toBeInTheDocument()
  })
})
