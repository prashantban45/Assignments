import { test, expect } from '@playwright/test';

test('Demoqa Alert Handling ', async ({page}) => {

    //1. Enter URL and Launch the application (https://demoqa.com/alerts)
     await page.goto(`https://demoqa.com/alerts`);

    // 2. Locate Alert buttons to trigger the alerts
     const infoAlertButton = await page.locator(`button[id="alertButton"]`);
     const confirmAlertButton = await page.locator(`button[id="confirmButton"]`);
     const promptAlertButton = await page.locator(`button[id="promtButton"]`);

    // 3. Click on the information alert and copy the alert message and then select OK button.
    page.once(`dialog`, async dialog =>{

        //print allert message
        console.log(await dialog.message());

        //click on ok button
        await dialog.accept();
    })

    //trigger the information alert
    await infoAlertButton.click();

    // 4. Click on the Confirmation alert, copy the alert message, and select the Cancel button.
    page.once(`dialog`, async dialog =>{

        //print allert message
        console.log(await dialog.message());

        //click on ok button
        await dialog.dismiss();
    })

    //trigger confirmation alert
    await confirmAlertButton.click();

    // 5. Click on the prompt alert. Copy the alert message. Enter text. Then Select OK button.
     page.once(`dialog`, async dialog =>{

        //print allert message
        console.log(await dialog.message());

        //click on ok button
        await dialog.accept("Playwright");
    })

    //trigger prompt alert
    await promptAlertButton.click();
});