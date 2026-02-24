import { describe, it, expect } from 'vitest'
import { AppDriver } from './AppDriver'

describe('App', () => {
  it('clicking Add Input 3 times creates 3 IP inputs', () => {
    const driver = new AppDriver()
    driver.render()

    driver.set.clickAddInputTimes(3)

    expect(driver.get.ipInputs()).toHaveLength(3)
  })
})
