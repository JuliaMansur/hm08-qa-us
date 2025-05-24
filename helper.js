module.exports = {
    getPhoneNumber: function(countryCode) {
        const number = Math.floor(1000000000 + Math.random() * 9000000000)
        return `${countryCode}${number}`
    },
    getElementByText: async function(obj) {
        return await $(`div=${obj.toString()}`);
    },
   getAddCard: function() {
        const number = Math.floor(1000000000 + Math.random() * 9000000000);
        return `${number}${number}`;
    },

    getIceCreamValue: function() {
        return Math.floor(Math.random() * 3); // 0, 1, or 2
    },
};
