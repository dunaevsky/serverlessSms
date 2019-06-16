// load env data
const {twilioAccountSid, twilioAuthToken, twilioNotifyServiceSid} = require('../config');

const twilioClient = require('twilio')(twilioAccountSid, twilioAuthToken);

module.exports = {
    sendTwilioMessage: sendTwilioMessage,
}

const service = twilioClient.notify.services(twilioNotifyServiceSid);

async function sendTwilioMessage(notificationOpts) {
    const bindings = notificationOpts.toNumbers.map(number => {
        return JSON.stringify({
            binding_type: (number.type && number.type.toLowerCase()) || 'sms',
            address: number.number
        });
    });

    const twilioOptions = {
        toBinding: bindings,
        body: notificationOpts.messageText || '',
        sms: {
            // body: 'what will happen?',
            from: notificationOpts.sender || '',
        }
    }

    let notificationSent, err;

    try {
        notificationSent = await service.notifications.create({...twilioOptions});
    } catch(e) {
        err = e;
    }

    return {notificationSent, err}
}