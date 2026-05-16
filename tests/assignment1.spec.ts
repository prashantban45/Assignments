import { test, expect } from '@playwright/test';

test('Verify parabank app', async ({page}) => {

    //Open App
    await page.goto('https://parabank.parasoft.com/parabank/index.htm');  
    
    // verify logo is visible
    const logo = await page.locator('img.logo');
    await expect(logo).toBeVisible();

    //Verify application caption displayed as "Experience the difference"
    const caption = await page.locator('p[class="caption"]');
    await expect(caption).toHaveText('Experience the difference');

    //Enter invalid username
    const username =await page.locator('input[name="username"]');
    await username.fill('prashant.ban@gmail.co');

    //Enter invalid password
    const password = await page.locator('input[name="password"]');
    await password.fill('prashant');

    //Click on login button
    const LoginButton = await page.locator('input[value="Log In"]');
    await LoginButton.click();

    //Verify the error message "Please enter a username and password.
    // await LoginButton.click();
    // const errorMsg = await page.locator('p.error');
    // await expect(errorMsg).toHaveText('Please enter a username and password.');

    //Click on admin page link
    const adminPageLink = await page.locator('//a[text()="Admin Page"]'); //xpath
    await adminPageLink.click();
    console.log('admin Page Clicked');

    //select the option "soap" from dba mode radio button
    const soapRadioBtn = await page.locator('input[value="soap"]');
    await soapRadioBtn.click();
    console.log('SOAP radio button selected')

    //Scroll to element dropdown
    const loanProviderDropdown = await page.locator('select[id="loanProvider"]');
    await loanProviderDropdown.scrollIntoViewIfNeeded();

    //Select the option web service from the dropdown
    await loanProviderDropdown.selectOption('Web Service');
    console.log('Web Service Dropdown selected');

    //click on submit button
    const submitBtn = await page.locator('input[value="Submit"]');
    await submitBtn.click();

    //verify submission is successful by validating success message
    const confirmationMsg = await page.locator('//b[text()="Settings saved successfully."]'); //xpath
    await expect(confirmationMsg).toHaveText('Settings saved successfully.');
    console.log('confirmation message validated')

    //Click on services page link
    const servicePageLink = await page.locator('//ul[@class="leftmenu"]//a[text()="Services"]');
    await servicePageLink.click();
    console.log('Services Page link is clicked');

    //wait for service page
    const bookstoreServicesTable = page.locator('//span[text()="Bookstore services:"]');
    await expect(bookstoreServicesTable).toBeVisible();

    //Scroll down till bookstore services table
    await bookstoreServicesTable.scrollIntoViewIfNeeded();
    console.log('scrolled to bookstore services')

    //get total rows of books store services table
    const rows = await page.locator('//span[text()="Bookstore services:"]/following-sibling::table[1]//tr');
    const totalRows = await rows.count();
    console.log(`Total no. of rows in Bookstore services table: ${totalRows}`);

    //get total columns of books store services table
    const columns = await page.locator('//span[text()="Bookstore services:"]/following-sibling::table[1]//tr[1]//td');
    const totalColumns = await columns.count();
    console.log(`Total no. of columns in Bookstore table: ${totalColumns}`);

    //Print table data (row wise and column wise data)
    for(let i=1; i <= totalRows; i++){
        for(let j=1; j <= totalColumns; j++){
            const cell = await page.locator(`//span[text()="Bookstore services:"]/following-sibling::table[1]//tr[${i}]//td[${j}]`)
            const cellData = await cell.textContent();
            console.log(`Row ${i} Column ${j} : ${cellData}`);
        }
    }

});