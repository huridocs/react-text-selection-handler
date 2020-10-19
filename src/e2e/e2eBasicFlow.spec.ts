describe('PdfHandler', () => {
  beforeAll(async () => {
    await page.goto('http://localhost:3005/');
    await page.waitForXPath('//*[contains(text(),"General Assembly")]')
  })

  it('should not highlight whole page when two pages selection', async () => {
    const pdfScrollDiv = await page.waitForXPath('//*[@class="react-pdf__Document"]/div');

    await page.evaluate((selector) => {
      selector.scrollTop = 600;
    }, pdfScrollDiv);

    const selectionStart = await page.evaluate((element) => {
      const {top, left, bottom, right} = element.getBoundingClientRect();
      return {top, left, bottom, right};
    }, await page.waitForXPath('//span[contains(text(),"(E)")]'));

    const selectionEnd = await page.evaluate((element) => {
      const {top, left, bottom, right} = element.getBoundingClientRect();
      return {top, left, bottom, right};
    }, await page.waitForXPath('//span[contains(text(),"Introduction")]'));


    await page.mouse.move(selectionStart.left, selectionStart.top);
    await page.mouse.down();
    await page.mouse.move(selectionEnd.right, selectionEnd.bottom);
    await page.mouse.up();

    const rectangles = await page.$$('.highlight-rectangle');

    expect(rectangles.length).toEqual(141);
  })

  it('should create a highlight', async () => {
    await page.reload()
    await page.click('#goToPage1');

    const selectionBoundingRectangle = await page.evaluate((highlightRectangle) => {
      const {top, left, bottom, right} = highlightRectangle.getBoundingClientRect();
      return {top, left, bottom, right};
    }, await page.waitForXPath('//span[contains(text(),"General Assembly")]'));

    await page.mouse.move(selectionBoundingRectangle.left, selectionBoundingRectangle.top);
    await page.mouse.down();

    await page.mouse.move(selectionBoundingRectangle.right, selectionBoundingRectangle.bottom);
    await page.mouse.up();

    await page.waitForXPath("//div[contains(@class, 'highlight-rectangle')]");

    const rectangles = await page.$$('.highlight-rectangle');

    const rect1 = await page.evaluate((highlightRectangle) => {
      const {top, left, bottom, right} = highlightRectangle.getBoundingClientRect();
      return {top, left, bottom, right};
    }, rectangles[0]);

    expect(rect1.left).toEqual(selectionBoundingRectangle.left);
    expect(rect1.top).toEqual(selectionBoundingRectangle.top);
    expect(rect1.right).toEqual(selectionBoundingRectangle.right);
    expect(rect1.bottom).toBeGreaterThan(selectionBoundingRectangle.bottom);
    expect(rect1.bottom).toBeLessThan(selectionBoundingRectangle.bottom + 3);
  })

  it('should go to highlights', async () => {
    await page.click('#goToPage10');
    await page.waitForXPath('//div[@data-region-selector-id=10]');
    await expect(page).toMatch('120.1');

    await page.click('#goToTheEnd');
    await page.waitForXPath('//div[@data-region-selector-id=22]');
    await expect(page).toMatch('Annex');
  })

  it('should render a different PDF', async () => {
    await page.click('#renderOtherPdf')
    await page.waitForXPath('//*[contains(text(),"Egypt")]')
    await expect(page).toMatch('Egypt');
    await page.click('#goToTheEnd');
    await page.waitForXPath('//div[@data-region-selector-id=27]');
    await expect(page).toMatch('Annex');
  })
})
