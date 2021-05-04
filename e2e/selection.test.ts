/*global page*/
import { toMatchImageSnapshot } from 'jest-image-snapshot'
import { app_url } from './config'
import { buildTestApp } from './buildTestApp'
expect.extend({ toMatchImageSnapshot })

describe('Text selection', () => {
  beforeAll(async () => {
    await buildTestApp()
    await page.goto(app_url)
    await page.setViewport({
      width: 640,
      height: 2000,
      deviceScaleFactor: 1
    })
  })

  it('should highlight a word on dbl click', async () => {
    const mouse = page.mouse
    await mouse.click(175, 93, { clickCount: 2 })
    await mouse.click(999, 999)

    const container = await page.$('div[role=none]')
    const screenshot = await container.screenshot()
    expect(screenshot).toMatchImageSnapshot()

    const textSelected = await (await page.$('#textSelected')).screenshot()
    expect(textSelected).toMatchImageSnapshot()
  })

  it('should unselect when there is no range selected on mouse up', async () => {
    const mouse = page.mouse
    await mouse.click(175, 93, { clickCount: 2 })
    await mouse.click(175, 250)

    const text = await (await page.$('#textSelected')).evaluate(el => el.textContent);
    expect(text).toBe('UNSELECTED');
  })

  it('should select multiple lines', async () => {
    const mouse = page.mouse
    await mouse.move(150, 100)
    await mouse.down()
    await mouse.move(50, 140)
    await mouse.up()
    await mouse.click(999, 999)

    const container = await page.$('div[role=none]')
    const screenshot = await container.screenshot()
    expect(screenshot).toMatchImageSnapshot()
  })

  it('should select multiple lines in multiple regions', async () => {
    const mouse = page.mouse
    await mouse.move(175, 93)
    await mouse.down()
    await mouse.move(175, 1000)
    await mouse.up()
    await mouse.click(999, 999)

    const container = await page.$('div[role=none]')
    const screenshot = await container.screenshot()
    expect(screenshot).toMatchImageSnapshot()
  })
})
