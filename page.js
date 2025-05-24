const { getCreditCardDetails } = require("./helper");

module.exports = {
    // Inputs
    fromField: '#from',
    toField: '#to',
    phoneNumberField: '#phone',
    codeField: '#code',
    codeInput: '//input[@type="text" and @id="code" and @name="code" and @placeholder="12" and contains(@class, "card-input")]',
    cardInput: '#number',
    messageToTheDriverField: '//*[@id="comment"]', 
    labelField: '//*[@id="root"]/div/div[3]/div[3]/div[2]/div[2]/div[3]/div/label',
    tCard: '#tCard',
    blanketAndHandkerchiefs: '//*[@id="root"]/div/div[3]/div[3]/div[2]/div[2]/div[4]/div[2]/div[1]/div/div[2]/div',
    blanketAndHandkerchiefsLabel: '//*[@id="root"]/div/div[3]/div[3]/div[2]/div[2]/div[4]/div[2]/div[1]/div/div[1]',

    // Buttons
    callATaxiButton: 'button=Call a taxi',
    phoneNumberButton: '//div[starts-with(text(), "Phone number")]',
    nextButton: 'button=Next',
    confirmButton: 'button=Confirm',
    taxiButton: '//div[starts-with(text(), "Taxi")]',
    tCard: '//div[starts-with(text(), "Supportive")]',
    ppValueArrow: '.pp-text',
    ppPlus: 'div=Add card',
    linkButton: 'button=Link',
    messageToTheDriverButton: '//div[starts-with(text(), "Message to the driver")]',
    reqsArrowButton: '//*[@id="root"]/div/div[3]/div[3]/div[2]/div[2]/div[4]/div[1]/div[2]',
    iceBucketButton: '//*[@id="root"]/div/div[3]/div[3]/div[2]/div[2]/div[4]/div[2]/div[2]/div/div[2]',
    orderButton: '//*[@id="root"]/div/div[3]/div[4]/button',

    // Counter controls
    iceCreamValue: '//*[@id="root"]/div/div[3]/div[3]/div[2]/div[2]/div[4]/div[2]/div[3]/div/div[2]/div[1]/div/div[2]/div/div[2]',
    iceCreamPlusButton: '//*[@id="root"]/div/div[3]/div[3]/div[2]/div[2]/div[4]/div[2]/div[3]/div/div[2]/div[1]/div/div[2]/div/div[3]',
    iceCreamMinusButton: 'div.ice-cream-quantity .counter-minus',

    // Modals
    phoneNumberModal: '.modal',
    carSearchModal: '//*[@id="root"]/div/div[5]/div[2]',

    // Functions
    fillAddresses: async function(from, to) {
        const fromField = await $(this.fromField);
        await fromField.setValue(from);
        const toField = await $(this.toField);
        await toField.setValue(to);
        const callATaxiButton = await $(this.callATaxiButton);
        await callATaxiButton.waitForDisplayed();
        await callATaxiButton.click();
    },
    fillPhoneNumber: async function(phoneNumber) {
        const phoneNumberButton = await $(this.phoneNumberButton);
        await phoneNumberButton.waitForDisplayed();
        await phoneNumberButton.click();
        const phoneNumberModal = await $(this.phoneNumberModal);
        await phoneNumberModal.waitForDisplayed()
        const phoneNumberField = await $(this.phoneNumberField);
        await phoneNumberField.waitForDisplayed();
        await phoneNumberField.setValue(phoneNumber);
    },
    submitPhoneNumber: async function(phoneNumber) {
        await this.fillPhoneNumber(phoneNumber);
        // we are starting interception of request from the moment of method call
        await browser.setupInterceptor();
        await $(this.nextButton).click();
        // we should wait for response
        // eslint-disable-next-line wdio/no-pause
        await browser.pause(2000);
        const codeField = await $(this.codeField);
        // collect all responses
        const requests = await browser.getRequests();
        // use first response
        await expect(requests.length).toBe(1)
        const code = await requests[0].response.body.code
        await codeField.setValue(code)
        await $(this.confirmButton).click()
    },
    fillCard: async function(cardNumber, code) {
        const ppValueArrow = await $(this.ppValueArrow)
        await ppValueArrow.click()
        await browser.pause(5000)
        const ppPlus = await $(this.ppPlus)
        await ppPlus.click()
        const cardInput = await $(this.cardInput)
        await cardInput.click()
        await cardInput.setValue(cardNumber)
        const codeInput = await $(this.codeInput)
        await codeInput.click()
        await codeInput.setValue(code)
        await cardInput.click()
        await $(this.linkButton).click();
    },

};