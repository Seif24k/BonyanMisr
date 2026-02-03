const { chromium } = require('playwright');
const path = require('path');

(async () => {
    console.log('Launching browser...');
    const browser = await chromium.launch();
    const page = await browser.newPage();

    console.log('Navigating to localhost:3000...');
    await page.goto('http://localhost:3000');

    // Set viewport
    await page.setViewportSize({ width: 1280, height: 720 });

    // Take screenshot 1: Immediately (Reveal Animation)
    console.log('Taking screenshot 1...');
    await page.screenshot({ path: 'reveal_state.png' });

    // Wait for 3 seconds (Mid-animation)
    console.log('Waiting 3s...');
    await page.waitForTimeout(3000);

    // Take screenshot 2: Mid Reveal
    console.log('Taking screenshot 2...');
    await page.screenshot({ path: 'reveal_pause.png' });

    // Wait for 3 more seconds (Post-animation)
    console.log('Waiting 3s...');
    await page.waitForTimeout(3000);

    // Take screenshot 3: Final State
    console.log('Taking screenshot 3...');
    await page.screenshot({ path: 'final_state.png' });

    await browser.close();
    console.log('Done!');
})();
