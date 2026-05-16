import { test, expect } from '@playwright/test';

test('demoqa.com', async ({page}) => {

//1. Enter URL and Launch the application (https://demoqa.com/automation-practice-form)
await page.goto(`https://demoqa.com/automation-practice-form`);

// 2. Wait for Page-load
const logo = await page.locator(`img[src="/assets/Toolsqa-DZdwt2ul.jpg"]`);
await expect(logo).toBeVisible(); 

// 3. Enter First name and Last name
const fname = await page.locator(`input[id="firstName"]`);
await fname.fill(`Prashant`);
console.log(`Firstname Entered`);

const lname = await page.locator(`input[id="lastName"]`);
await lname.fill(`Bans`);
console.log(`Lastname Entered`);

// 4. Enter Email
const emailID = await page.locator(`input[id="userEmail"]`);
await emailID.fill(`prashant.ban@gmail.com`);
console.log(`Entered emailID`);

// 5. Select Gender (Male)
// const maleRadio = await page.locator(`input[value="Male"]`);
// await maleRadio.click();
//or
await selectGender(page, "Male");
console.log(`Radio button Clicked`);

// 6. Enter mobile number
const mobileNumber = await page.locator(`input[id="userNumber"]`);
await mobileNumber.fill(`9021273048`);
console.log(`Entered Mobile No.`);

// 7.Select DOB (1-Feb-1991)
await selectDOB(page, "15", "January", "1993");
console.log(`Selected DOB`);

// 8.Search and Select Computer Science and English
const subjects:string [] = ["Computer Science", "English"];
await selectSubject(page, subjects);
console.log('Search & selected subjects');

// 9.Select Hobbies as Sports and Reading
const hobbies:string[] = ["Sports", "Reading"];
await selectHobbies(page, hobbies);
console.log('Hobbies check boxes are checked');

// 10.Upload photo
const uploadInput = page.locator(`input[id="uploadPicture"]`);
const filePath = "C:\AutomationTraining\Files\text.txt"
await uploadInput.setInputFiles(filePath);
console.log(`File uploaded successfully`);

// 11.Submit Details
const submit = await page.locator('button[id="submit"]'); 
await submit.click();
console.log(`submit button clicked`);
});

async function selectHobbies(page:any , hobbies:string[]) {
    for (const hobby of hobbies){
        const hobbyLocator = await page.locator(`//label[text()="${hobby}"]`);
        await hobbyLocator.check();
    }
}

async function selectGender(page:any , option:string) {
    const gender = await page.locator(`input[value="${option}"]`);
    await gender.check();
}

async function selectDOB(page:any , date:string, month:string , year:string) {
    //locate dob input field and click on it to open the date picker
    const DOB = await page.locator(`input[id="dateOfBirthInput"]`);
    await DOB.click();  

    //select the month from month drop down
    const monthDropdown = await page.locator(`select.react-datepicker__month-select`); //class
    await monthDropdown.selectOption({label: month});

    //select the year from year drop down
    const yearDropdown = await page.locator(`select.react-datepicker__year-select`);
    await yearDropdown.selectOption({label: year});

    //select the date from the date picker
    const dateLocator = await page.locator(`//div[contains(@aria-label, "${month}") and text()="${date}"]`);
    await dateLocator.click(); 
}

async function selectSubject(page:any, subjects:string[]) {
    //Locate the element and click on it
    const subjectInput = await page.locator(`div[class*="subjects-auto-complete__input-container"]`);
    await subjectInput.click();
    
    //Locate the subject inoput internal container
    const subjectInputInternal = await page.locator(`input[id="subjectsInput"]`);

    //Select the subject provide in array
    for (const subject of subjects){

        //Enter the subject
        await subjectInputInternal.fill(subject);

        //press enter to select the subject from autosuggestion option
        await subjectInputInternal.press(`Enter`);
    }
}