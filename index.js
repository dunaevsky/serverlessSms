const smsService = require('./services/sms.twilio.service');

exports.handler = async (event) =>{
    return await sendMessagesBulk(event);
};

async function sendMessagesBulk(event) {
    // Send SMS
    if (!event) return sendRes(500, 'Internal server error');
    // if (!event.body) return sendRes(500, 'Internal server error');
    const params = event;
    if (!params.toNumbers) return sendRes(500, 'Internal server error'); //aint supporting numbers directly
    if (typeof params.toNumbers === 'string') return sendRes(500, 'Internal server error');
    if (!params.message) return sendRes(500, 'Internal server error');

    const smsOptions = {
        sender: params.from,
        messageText: params.message,
        toNumbers: [],// {number, type}its good to store it at twilio if were gonna send more than 100 sms
    };

    if (typeof params.toNumbers === "object" && !Array.isArray(params.toNumbers)) {
        params.toNumbers = [params.toNumbers];
    }
    smsOptions.toNumbers = params.toNumbers;

    const result = await  smsService.sendTwilioMessage(smsOptions);
    return result.err ? sendRes(500, 'Internal server error'): sendRes(200, result);
}

const sendRes = (status, body) => {
    const response = {
        statusCode: status,
        body: body
    }

    return response;
};