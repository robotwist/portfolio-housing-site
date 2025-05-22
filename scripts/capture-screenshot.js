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
  },
  {
    name: 'instagone',
    url: 'https://chromewebstore.google.com/detail/cfkohckelcbibalhhmgjllhfibkbeknl',
    width: 1280,
    height: 800,
    waitForSelector: 'body',
    waitTime: 5000,
    evaluate: async (page) => {
      try {
        // Wait for the main content to load
        await page.waitForSelector('h1', { timeout: 10000 });
        // Scroll to ensure all content is loaded
        await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
        await page.waitForTimeout(2000);
      } catch (error) {
        console.log('Warning: Could not fully load Instagone page');
      }
    }
  },
  {
    name: 'facebook-friends-only',
    url: 'https://chromewebstore.google.com/detail/lemgnohfbnoclnblnhiadeabkmjbbilj',
    width: 1280,
    height: 800,
    waitForSelector: 'body',
    waitTime: 5000,
    evaluate: async (page) => {
      try {
        await page.waitForSelector('h1', { timeout: 10000 });
        await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
        await page.waitForTimeout(2000);
      } catch (error) {
        console.log('Warning: Could not fully load Facebook Friends Only page');
      }
    }
  },
  {
    name: 'linkedin-jobs-only',
    url: 'https://chromewebstore.google.com/detail/eojclkjofepnlmopjcpmblbkjmipipcn',
    width: 1280,
    height: 800,
    waitForSelector: 'body',
    waitTime: 5000,
    evaluate: async (page) => {
      try {
        await page.waitForSelector('h1', { timeout: 10000 });
        await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
        await page.waitForTimeout(2000);
      } catch (error) {
        console.log('Warning: Could not fully load LinkedIn Jobs Only page');
      }
    }
  },
  {
    name: 'summon-nkd-man',
    url: 'https://chromewebstore.google.com/detail/penadbpfpdlcikkahaniobpnoikgjfoh',
    width: 1280,
    height: 800,
    waitForSelector: 'body',
    waitTime: 5000,
    evaluate: async (page) => {
      try {
        await page.waitForSelector('h1', { timeout: 10000 });
        await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
        await page.waitForTimeout(2000);
      } catch (error) {
        console.log('Warning: Could not fully load Summon NK D Man page');
      }
    }
  },
  {
    name: 'virgil-ai',
    url: 'https://virgil-ai-assistant.netlify.app/',
    width: 1280,
    height: 800,
    waitForSelector: 'body',
    waitTime: 5000,
    evaluate: async (page) => {
      try {
        await page.waitForSelector('h1', { timeout: 10000 });
        await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
        await page.waitForTimeout(2000);
      } catch (error) {
        console.log('Warning: Could not fully load Virgil AI Assistant page');
      }
    }
  }
];

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function captureScreenshots() {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    viewport: { width: 1280, height: 800 }
  });

  // Enable request interception
  await context.route('**/*', route => {
    // Block unnecessary resources
    if (route.request().resourceType() === 'image' || 
        route.request().resourceType() === 'font' ||
        route.request().resourceType() === 'media') {
      return route.abort();
    }
    return route.continue();
  });

  const page = await context.newPage();

  for (const project of PROJECTS) {
    try {
      console.log(`Capturing screenshot for ${project.name}...`);
      
      // Set viewport size
      await page.setViewportSize({
        width: project.width,
        height: project.height
      });

      // Navigate to the project URL with additional options
      await page.goto(project.url, {
        waitUntil: 'networkidle',
        timeout: 30000
      }).catch(error => {
        console.log(`Warning: Navigation error for ${project.name}: ${error.message}`);
      });

      // Wait for specific element if selector is provided
      if (project.waitForSelector) {
        await page.waitForSelector(project.waitForSelector, { timeout: 10000 })
          .catch(() => console.log(`Warning: Selector ${project.waitForSelector} not found for ${project.name}`));
      }

      // Run any custom evaluation if provided
      if (project.evaluate) {
        await project.evaluate(page).catch(error => {
          console.log(`Warning: Evaluation error for ${project.name}: ${error.message}`);
        });
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