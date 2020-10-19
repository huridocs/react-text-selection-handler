module.exports = {
  launch: {
    dumpio: false,
    headless: true,
    slowMo: 5,
    defaultViewport: null,
    devtools: false,
    args: ['--disable-infobars', '--disable-gpu', '--window-size=800,600'],
  },
  browserContext: 'default',
};
