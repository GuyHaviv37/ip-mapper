import { describe, it, expect, vi } from 'vitest'
import { AppDriver } from './AppDriver'

vi.mock('@/server-fns/ip-lookup', () => ({
  lookupIp: vi.fn(),
}))

describe('App', () => {
  it('clicking Add Input X times creates X inputs', () => {
    const driver = new AppDriver()
    driver.render()

    driver.set.clickAddInputTimes(3)

    expect(driver.get.ipInputs()).toHaveLength(3)
  })
})
