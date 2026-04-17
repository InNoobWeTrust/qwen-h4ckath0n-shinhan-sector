import { chromium } from 'playwright';

const delay = (ms: number): Promise<void> => new Promise(resolve => setTimeout(resolve, ms));
const cred = {
  kilo: {
    baseUrl: 'https://api.kilo.ai/api/gateway',
    apiKey: '',  // FIXME: fill this to inject credential to the browser that is recorded
    model: 'bytedance-seed/dola-seed-2.0-pro:free'
  }
}

async function main() {
  const browser = await chromium.launch({
    headless: false,
    args: [
      '--disable-web-security',
      '--disable-features=IsolateOrigins,site-per-process'
    ]
  });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    recordVideo: {
      dir: `${__dirname}/../../docs/videos`,
      size: { width: 1920, height: 1080 }
    }
  });

  // Inject sessionStorage from the prepared browser session
  await context.addInitScript(() => {
    // @ts-ignore
    window.sessionStorage.setItem('explain_provider_credentials', JSON.stringify(cred));
    // @ts-ignore
    window.sessionStorage.setItem('explain_active_provider', 'kilo');
    // @ts-ignore
    window.sessionStorage.setItem('react-router-scroll-positions', JSON.stringify({ 'm1agnc91sio': 0, 'dufujxpy': 634 }));
  });

  const page = await context.newPage();

  // Handle page errors
  page.on('pageerror', err => console.error('Page error:', err.message));
  page.on('crash', () => console.error('Page crashed!'));

  await page.goto('http://localhost:8787/', { waitUntil: 'domcontentloaded' });
  await delay(3000);

  // Scroll to bottom of home page
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await delay(2000);

  // Click "Đơn hàng" tab in TopNav
  await page.locator('nav button').filter({ hasText: 'Đơn hàng' }).click();
  await delay(2000);

  // Click "Kho hàng" tab
  await page.locator('nav button').filter({ hasText: 'Kho hàng' }).click();
  await delay(2000);

  // Click "Nhân viên" tab
  await page.locator('nav button').filter({ hasText: 'Nhân viên' }).click();
  await delay(2000);

  // Click "Biên lai" tab
  await page.locator('nav button').filter({ hasText: 'Biên lai' }).click();
  await delay(2000);

  // Navigate to /von-kinh-doanh
  await page.goto('http://localhost:8787/von-kinh-doanh', { waitUntil: 'domcontentloaded' });
  await delay(4000);

  // Scroll down
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 2));
  await delay(2000);

  // Scroll down more
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await delay(2000);

  // Find and click the "Giải thích tổng điểm" SparkleButton
  const explainBtn = page.locator('button').filter({ hasText: 'Giải thích tổng điểm' });
  if (await explainBtn.isVisible().catch(() => false)) {
    await explainBtn.click();
    console.log('Clicked Giải thích tổng điểm, waiting 15s for AI response...');
    await delay(15000);
  } else {
    console.log('Button not visible, skipping...');
  }

  // SAVE VIDEO BEFORE CLOSING - this is critical
  const videoPath = '/Volumes/SS850Evo/Developer/InNoobWeTrust/qwen-h4ckath0n-shinhan-sector/docs/videos/demo.webm';
  let videoSaved = false;
  try {
    const video = await page.video();
    if (video) {
      await video.saveAs(videoPath);
      console.log('Video saved to:', videoPath);
      videoSaved = true;
    }
  } catch (e) {
    console.error('Error saving video:', e.message);
  }

  // Now close everything
  await context.close().catch(e => console.error('Context close error:', e.message));
  await browser.close().catch(e => console.error('Browser close error:', e.message));

  if (videoSaved) {
    console.log('Recording complete!');
  }

  console.log('Done');
}

main().catch(console.error);