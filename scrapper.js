const puppeteer = require('puppeteer');

const scrapper = async (url) => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.setDefaultTimeout(20000);
  await page.goto(url);
  await page.waitForSelector('video');
  await page.screenshot({ fullPage: true, path: 'screen.jpg' });

  const getPageData = async (page) => {
    const page_data = await page.evaluate(() => {
      const video_url = 'hola';

      try {
        const $video = document.querySelector('video');

        video_url = 'No';
      } catch (error) {
        console.error(error);
      }

      return video_url;
    });

    return page_data;
  };

  const data = await getPageData(page);

  // await browser.close();

  return data;
};

async function get() {
  const data = await scrapper(
    'https://clips.twitch.tv/FrailFrigidPterodactylBleedPurple'
  );
  console.log(data);
}

get();

module.exports = scrapper;
