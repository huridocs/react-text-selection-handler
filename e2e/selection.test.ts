/* global page */
import { toMatchImageSnapshot } from 'jest-image-snapshot';
import { AppURL } from './config';

expect.extend({ toMatchImageSnapshot });

describe('Text selection', () => {
  beforeAll(async () => {
    await page.goto(AppURL);
    await page.setViewport({
      width: 1000,
      height: 2000,
      deviceScaleFactor: 1,
    });
  });

  const querySelector = async (selector: string) => {
    const container = await page.$(selector);
    if (!container) {
      throw new Error(`selector => ${selector} <= not found !`);
    }
    return container;
  };

  const selectionSnapshot = async () => {
    const screenshot = await (await querySelector('div#main-test')).screenshot();
    expect(screenshot).toMatchImageSnapshot();
  };

  const { mouse } = page;

  it('should highlight a word on double click', async () => {
    await mouse.click(175, 93, { clickCount: 2, delay: 10 });

    await selectionSnapshot();
    const textSelected = await (await querySelector('#textSelected')).screenshot();
    expect(textSelected).toMatchImageSnapshot();
  });

  it('should unselect when there is no range selected on mouse up', async () => {
    await mouse.click(175, 93, { clickCount: 2, delay: 10 });
    await mouse.click(175, 250);

    const text = await (await querySelector('#textSelected')).evaluate(el => el.textContent);
    expect(text).toBe('UNSELECTED');
  });

  it('should unselect properly when click over the current selection', async () => {
    await mouse.move(627, 96);
    await mouse.down();
    await mouse.move(756, 263);
    await mouse.up();

    await mouse.click(656, 203);

    const text = await (await querySelector('#textSelected')).evaluate(el => el.textContent);
    expect(text).toBe('UNSELECTED');
  });

  it('should select multiple lines', async () => {
    await mouse.move(150, 100);
    await mouse.down();
    await mouse.move(50, 140);
    await mouse.up();

    await selectionSnapshot();
  });

  it('should properly handle text nodes when the endNode is the same as the current', async () => {
    await mouse.move(175, 93);
    await mouse.down();
    await mouse.move(175, 550);
    await mouse.up();

    await selectionSnapshot();
  });

  it('should properly select the first text node', async () => {
    await mouse.move(110, 880);
    await mouse.down();
    await mouse.move(150, 634);
    await mouse.up();

    await selectionSnapshot();
  });

  it('should select multiple lines in multiple regions', async () => {
    await mouse.move(175, 93);
    await mouse.down();
    await mouse.move(175, 1000);
    await mouse.up();
    await page.mainFrame().focus('div');
    await page.keyboard.press('Tab');
    await selectionSnapshot();
  });

  it('should not loose selecions when right clicking', async () => {
    await mouse.move(13, 15);
    await mouse.down();
    await mouse.move(150, 15);
    await mouse.up();
    await mouse.click(140, 15, { button: 'right', delay: 100 });

    await (
      await querySelector('#textSelected')
    )
      .evaluate(el => el.textContent)
      .then(text => {
        expect(text).toBe('Nulla vestibulum eget');
      });
  });
});
