const puppeteer = require('puppeteer');
const clipr = 'https://clipr.xyz/';

const scrapper = async (url) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setDefaultTimeout(20000);
  await page.goto(clipr);
  await page.waitForSelector('#clip_url');
  await page.type('#clip_url', url);
  await page.click('form > button');
  await page.waitForSelector(
    'div.row.text-center > div:nth-child(2) > div.mt-3.text-center > a:nth-child(2)'
  );
  await page.screenshot({ fullPage: true, path: 'screen.jpg' });

  const getPageData = async (page) => {
    const page_data = await page.evaluate(() => {
      let video_url = 'hola';

      try {
        const $video = document.querySelector(
          'div.row.text-center > div:nth-child(2) > div.mt-3.text-center > a:nth-child(2)'
        );

        video_url = $video.getAttribute('href');
      } catch (error) {}

      return video_url;
    });

    return page_data;
  };

  const data = await getPageData(page);
  const video_url = `https:${data}`;

  await browser.close();

  return video_url;
};

async function get() {
  const data = await scrapper(
    'https://clips.twitch.tv/FrailFrigidPterodactylBleedPurple'
  );
  console.log(data);
}

get();

module.exports = scrapper;
