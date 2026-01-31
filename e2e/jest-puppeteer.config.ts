/* eslint-disable import/no-default-export */
export default {
  launch: {
    dumpio: false,
    headless: true,
    slowMo: 0,
    defaultViewport: null,
    devtools: false,
    args: ['--disable-infobars', '--disable-gpu', '--window-size=1300,800', '--no-sandbox'],
  },
  browserContext: 'default',
};
