const page = require('../../page');
const helper = require('../../helper')

describe('Create an order', () => {
    it('should open phone number modal', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const phoneNumberButton = await $(page.phoneNumberButton);
        await phoneNumberButton.waitForDisplayed();
        await phoneNumberButton.click();
        const phoneNumberModal = await $(page.phoneNumberModal);
        await expect(phoneNumberModal).toBeExisting();
    })

    it('should save the phone', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const phoneNumber = helper.getPhoneNumber("+1");
        await page.submitPhoneNumber(phoneNumber);
        await expect(await helper.getElementByText(phoneNumber)).toBeExisting();
    })
    it('should select supportive plan', async () => {
        await browser.url(`/`);
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const tCard = await $(page.tCard);
        await tCard.waitForDisplayed();
        await tCard.click();
        //await browser.pause(1000);
        await expect(await $(page.tCard)).toBeExisting();
    })

    it('should save credit card', async () => {
        await browser.url(`/`);
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await page.fillCard('123400004321', '12');
    })

   it('should send message to the driver', async () => {
        await browser.url(`/`);
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const labelField = await $(page.labelField);
        await labelField.click();
        const messageToTheDriverField = await $(page.messageToTheDriverField);
        await messageToTheDriverField.waitForDisplayed();
        await messageToTheDriverField.waitForClickable(); // Wait until it's actually clickable
        await messageToTheDriverField.setValue('Get some Whiskey');
        const comment = 'Get some Whiskey';
        await messageToTheDriverField.setValue(comment);
    })

    it('should order requirement', async () => {
        await browser.url(`/`);
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const tCard = await $(page.tCard);
        await tCard.waitForDisplayed();
        await tCard.click();
        const blanketAndHandkerchiefsLabel = await $(page.blanketAndHandkerchiefsLabel);
        await blanketAndHandkerchiefsLabel.scrollIntoView();
        const blanketAndHandkerchiefs = await $(page.blanketAndHandkerchiefs);
        await blanketAndHandkerchiefs.scrollIntoView();
        await blanketAndHandkerchiefs.click();
        //await browser.pause(1000);
        const iceBucketButton = await $(page.iceBucketButton);
        await iceBucketButton.click();
        //await browser.pause(1000);
        const iceCreamValue = await $(page.iceCreamValue);
        await iceCreamValue.scrollIntoView();
        const iceCreamPlusButton = await $(page.iceCreamPlusButton);
        await iceCreamPlusButton.click();
        await browser.waitUntil(
    async () => (helper.getIceCreamValue()) === 1,
    {
        timeout: 3000,
        timeoutMsg: 'Expected ice cream value to be 1 after first click'
    }
);
       // await expect(helper.getIceCreamValue()).toBe(1);
        //await iceCreamValue.scrollIntoView();
        await iceCreamPlusButton.waitForClickable();
        //await browser.pause(1000);
        await iceCreamPlusButton.click();
        await browser.waitUntil(
    async () => (helper.getIceCreamValue()) === 2,
    {
        timeout: 3000,
        timeoutMsg: 'Expected ice cream value to be 2 after second click'
    }
);
        //await expect(helper.getIceCreamValue()).toBe(2);
        //await browser.pause(1000);

})
    it('should open the car search modal', async () => {
        await browser.url(`/`);
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const phoneNumber = helper.getPhoneNumber("+1");
        await page.submitPhoneNumber(phoneNumber);
        await expect(await helper.getElementByText(phoneNumber)).toBeExisting();
        const orderButton = await $(page.orderButton);
        await orderButton.click();
        const carSearchModal = await $(page.carSearchModal);
        await expect(carSearchModal).toBeExisting();
    })
    });