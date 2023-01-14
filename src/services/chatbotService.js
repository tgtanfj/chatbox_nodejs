import request from 'request'
require('dotenv').config();

const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN
const IMAGE_GETSTARTED = 'https://cdn-ankjd.nitrocdn.com/OjLCEthUUXPAtvGuKItSofVslLLbuvft/assets/static/optimized/rev-ea354dc/wp-content/uploads/2017/12/shutterstock_400002673-1-1024x614.jpg'

let callSendAPI = (sender_psid, response) => {
    // Construct the message body
    let request_body = {
        "recipient": {
            "id": sender_psid
        },
        "message": response
    }

    // Send the HTTP request to the Messenger Platform
    request({
        "uri": "https://graph.facebook.com/v2.6/me/messages",
        "qs": { "access_token": process.env.PAGE_ACCESS_TOKEN },
        "method": "POST",
        "json": request_body
    }, (err, res, body) => {
        if (!err) {
            console.log('message sent!')
        } else {
            console.error("Unable to send message:" + err);
        }
    });
}

let getUserName = (sender_psid) => {
    return new Promise((resolve, reject) => {
        request({
            "uri": `https://graph.facebook.com/${sender_psid}?fields=first_name,last_name,profile_pic&access_token=${PAGE_ACCESS_TOKEN}`,
            "method": "GET",
        }, (err, res, body) => {
            if (!err) {
                body = JSON.parse(body)
                let username = `${body.first_name} ${body.last_name}`
                resolve(username)
            } else {
                console.error("Unable to send message:" + err);
                reject(err)
            }
        });
    })
}

let handleGetStarted = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let username = await getUserName(sender_psid)
            let response1 = { "text": `Chào mừng ${username} đến với dịch vụ đặt lịch khám HealthCare!` }
            let response2 = sendGetStartedTemplate()
            //send text message
            await callSendAPI(sender_psid, response1)
            //send text template
            await callSendAPI(sender_psid, response2)

            resolve('OK')
        } catch (e) {
            reject(e)
        }
    })
}

let sendGetStartedTemplate = () => {
    let response = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [{
                    "title": "Xin chào bạn đến với HealthCare!",
                    "subtitle": "Dưới đây là các lựa chọn của HealthCare:",
                    "image_url": IMAGE_GETSTARTED,
                    "buttons": [
                        {
                            "type": "postback",
                            "title": "GHÉ THĂM CHÚNG TÔI",
                            "payload": "MAIN_MENU",
                        },
                        {
                            "type": "postback",
                            "title": "ĐẶT LỊCH KHÁM",
                            "payload": "BOOK_APPOINTMENT",
                        },
                        {
                            "type": "postback",
                            "title": "HƯỚNG DẪN SỬ DỤNG CHATBOT",
                            "payload": "GUIDE_TO_USE",
                        }
                    ],
                }]
            }
        }
    }
    return response
}

module.exports = {
    handleGetStarted
}