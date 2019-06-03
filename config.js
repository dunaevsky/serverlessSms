const dotenv = require('dotenv');
dotenv.config();
module.exports = {
    port: process.env.PORT || 3000,
    twilioAccountSid: process.env.TWILIO_ACCOUNT_SID,
    twilioAuthToken: process.env.TWILIO_AUTH_TOKEN,
    twilioNotifyServiceSid: process.env.TWILIO_NOTIFY_SID,
};
