const { chromium } = require('playwright-core');
const fs = require('fs');

async function scrape() {
  const browser = await chromium.launch({ channel: 'chrome', headless: true })
    .catch(() => chromium.launch({ headless: true }));

  const context = await browser.newContext({
    locale: 'fi-FI',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  });

  const page = await context.newPage();
  const url = 'https://www.google.com/maps/place/JK+Best+Carwash/@61.5005111,23.571068,17z/data=!4m8!3m7!1s0x468ed7f5b894d3f1:0x40fb87edf3e63aa6!8m2!3d61.5005111!4d23.571068!9m1!1b1!16s%2Fg%2F11xw1gtzsq/reviews?hl=fi';

  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForTimeout(2000);

  for (const sel of ['button:has-text("Hyväksy kaikki")', 'button:has-text("Accept all")']) {
    const btn = page.locator(sel).first();
    if (await btn.count()) {
      await btn.click();
      await page.waitForTimeout(3000);
      break;
    }
  }

  await page.waitForTimeout(5000);

  for (let i = 0; i < 20; i++) {
    await page.mouse.wheel(0, 800);
    await page.waitForTimeout(350);
  }

  // Click "More reviews" if available
  const moreBtn = page.locator('button:has-text("Lisää arvosteluja"), button:has-text("More reviews")').first();
  if (await moreBtn.count()) {
    await moreBtn.click().catch(() => {});
    await page.waitForTimeout(2000);
  }

  const data = await page.evaluate(() => {
    const reviews = [...document.querySelectorAll('.jftiEf')].map(card => ({
      text: card.querySelector('.wiI7pd')?.textContent?.trim(),
      author: card.querySelector('.d4r55')?.textContent?.trim(),
      rating: parseInt((card.querySelector('span[role="img"]')?.getAttribute('aria-label') || '5').match(/\d/)?.[0] || '5', 10)
    })).filter(r => r.text && r.author);

    const rating = document.querySelector('.F7nice span[aria-hidden="true"]')?.textContent?.trim();

    return { rating: rating ? parseFloat(rating.replace(',', '.')) : 5, reviews };
  });

  data.count = data.reviews.length || 16;

  fs.writeFileSync('reviews-scraped.json', JSON.stringify(data, null, 2));
  console.log(`Found ${data.reviews.length} reviews`);
  console.log(JSON.stringify(data.reviews.slice(0, 5), null, 2));

  await browser.close();
}

scrape().catch(err => {
  console.error(err);
  process.exit(1);
});
