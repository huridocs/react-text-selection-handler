/* global page */
import { toMatchImageSnapshot } from 'jest-image-snapshot';
import { AppURL } from './config';

expect.extend({ toMatchImageSnapshot });

describe('Text selection', () => {
  beforeAll(async () => {
    await page.goto(AppURL);
    await page.setViewport({
      width: 640,
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
    const screenshot = await (await querySelector('div#main div')).screenshot();
    expect(screenshot).toMatchImageSnapshot();
  };

  const { mouse } = page;
  const clickOutside = async () => mouse.click(999, 999);

  it('should highlight a word on dbl click', async () => {
    await mouse.click(175, 93, { clickCount: 2 });
    await clickOutside();

    await selectionSnapshot();

    const textSelected = await (await querySelector('#textSelected')).screenshot();
    expect(textSelected).toMatchImageSnapshot();
  });

  it('should unselect when there is no range selected on mouse up', async () => {
    await mouse.click(175, 93, { clickCount: 2 });
    await mouse.click(175, 250);

    const text = await (await querySelector('#textSelected')).evaluate(el => el.textContent);
    expect(text).toBe('UNSELECTED');
  });

  it('should select multiple lines', async () => {
    await mouse.move(150, 100);
    await mouse.down();
    await mouse.move(50, 140);
    await mouse.up();
    await clickOutside();

    await selectionSnapshot();
  });

  it('should properly handle text nodes when the endNode is the same as the current', async () => {
    await mouse.move(175, 93);
    await mouse.down();
    await mouse.move(175, 550);
    await mouse.up();
    await clickOutside();

    await selectionSnapshot();
  });

  it('should properly select the first text node', async () => {
    await mouse.move(110, 880);
    await mouse.down();
    await mouse.move(150, 634);
    await mouse.up();
    await mouse.click(999, 999);

    await selectionSnapshot();
  });

  it('should select multiple lines in multiple regions', async () => {
    await mouse.move(175, 93);
    await mouse.down();
    await mouse.move(175, 1000);
    await mouse.up();
    await clickOutside();

    await selectionSnapshot();
  });
});
