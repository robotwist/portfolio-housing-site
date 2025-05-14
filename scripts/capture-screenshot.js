const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const PROJECTS = [
  {
    name: '100-meter-dash',
    url: 'https://robotwist.github.io/100-meter-dash/',
    width: 1280,
    height: 800,
    waitForSelector: 'h1',
    waitTime: 5000,
    evaluate: async (page) => {
      try {
        await page.click('button:has-text("Bolt Shock")', { timeout: 60000 });
        await page.waitForTimeout(1000);
      } catch (error) {
        console.log('Button not found or click failed, proceeding with screenshot...');
      }
    }
  },
  {
    name: 'authentic-reader',
    url: 'https://authentic-reader.herokuapp.com/',
    width: 1280,
    height: 800,
    waitForSelector: 'body',
    waitTime: 2000
  },
  {
    name: 'authentic-internet',
    url: 'https://authentic-internet.herokuapp.com/',
    width: 1280,
    height: 800,
    waitForSelector: 'body',
    waitTime: 2000
  },
  {
    name: 'authentic-dashboard',
    url: 'https://authentic-dashboard.herokuapp.com/',
    width: 1280,
    height: 800,
    waitForSelector: 'body',
    waitTime: 2000
  },
  {
    name: 'coin-flip',
    url: 'https://robotwist.github.io/coin-flip/',
    width: 1280,
    height: 800,
    waitForSelector: 'h1',
    waitTime: 2000
  },
  {
    name: 'game-platform',
    url: 'https://your-game-platform-url.com', // Update this URL
    width: 1280,
    height: 800
  }
];

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function captureScreenshots() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  for (const project of PROJECTS) {
    try {
      console.log(`Capturing screenshot for ${project.name}...`);
      
      // Set viewport size
      await page.setViewportSize({
        width: project.width,
        height: project.height
      });

      // Navigate to the project URL
      await page.goto(project.url, {
        waitUntil: 'networkidle',
        timeout: 30000
      });

      // Wait for specific element if selector is provided
      if (project.waitForSelector) {
        await page.waitForSelector(project.waitForSelector, { timeout: 10000 })
          .catch(() => console.log(`Warning: Selector ${project.waitForSelector} not found for ${project.name}`));
      }

      // Run any custom evaluation if provided
      if (project.evaluate) {
        await project.evaluate(page);
      }

      // Wait for animations and loading
      await sleep(project.waitTime || 2000);

      // Create images directory if it doesn't exist
      const imagesDir = path.join(__dirname, '../public/images');
      if (!fs.existsSync(imagesDir)) {
        fs.mkdirSync(imagesDir, { recursive: true });
      }

      // Capture screenshot
      const screenshotPath = path.join(imagesDir, `${project.name}.jpg`);
      await page.screenshot({
        path: screenshotPath,
        type: 'jpeg',
        quality: 90,
        fullPage: true
      });

      console.log(`✓ Screenshot saved for ${project.name}`);
    } catch (error) {
      console.error(`✗ Error capturing ${project.name}:`, error.message);
    }
  }

  await browser.close();
  console.log('Screenshot capture complete!');
}

captureScreenshots().catch(console.error); 