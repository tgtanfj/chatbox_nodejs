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
            let response2 = getStartedTemplate()
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

let getStartedTemplate = () => {
    let response = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [{
                    "title": "Kính chào quýnh khách đến với HealthCare!",
                    "subtitle": "Dưới đây là các lựa chọn của HealthCare:",
                    "image_url": IMAGE_GETSTARTED,
                    "buttons": [
                        {
                            "type": "web_url",
                            "title": "GHÉ THĂM CHÚNG TÔI",
                            // "payload": "MAIN_MENU",
                            "url": "https://deploy-health-care-react.vercel.app/",
                            "webview_height_ratio": "full"
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

let handleBooking = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response1 = getBookingTemplate()
            await callSendAPI(sender_psid, response1)
            resolve('OK')
        } catch (e) {
            reject(e)
        }
    })
}

let getBookingTemplate = () => {
    let response = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [
                    {
                        "title": "Khám cơ xương khớp",
                        "subtitle": "Dưới đây là các lựa chọn của HealthCare:",
                        "image_url": "https://benhvienphuongdong.vn/public/uploads/tin-tuc/bai-viet/co-xuong-khop-khong-tru-mot-ai-2.jpg",
                        "buttons": [
                            {
                                "type": "web_url",
                                "title": "ĐẶT LỊCH KHÁM",
                                // "payload": "MAIN_MENU",
                                "url": "https://deploy-health-care-react.vercel.app/detail-specialty/3",
                                "webview_height_ratio": "full"
                            }
                        ],
                    },
                    {
                        "title": "Khám thần kinh",
                        "subtitle": "Dưới đây là các lựa chọn của HealthCare:",
                        "image_url": "https://medlatec.vn/Content/images/Chuyen-khoa/anh-chinh-chuyen-khoa-noi-than-kinh.jpg",
                        "buttons": [
                            {
                                "type": "web_url",
                                "title": "ĐẶT LỊCH KHÁM",
                                // "payload": "MAIN_MENU",
                                "url": "https://deploy-health-care-react.vercel.app/detail-specialty/4",
                                "webview_height_ratio": "full"
                            }
                        ],
                    },
                    {
                        "title": "Khám tiêu hóa",
                        "subtitle": "Dưới đây là các lựa chọn của HealthCare:",
                        "image_url": "https://cdn.benhvienthucuc.vn/wp-content/uploads/2021/06/kham-tieu-hoa-la-kham-nhung-gi.jpg",
                        "buttons": [
                            {
                                "type": "web_url",
                                "title": "ĐẶT LỊCH KHÁM",
                                // "payload": "MAIN_MENU",
                                "url": "https://deploy-health-care-react.vercel.app/detail-specialty/5",
                                "webview_height_ratio": "full"
                            }
                        ],
                    },
                    {
                        "title": "Khám tim mạch",
                        "subtitle": "Dưới đây là các lựa chọn của HealthCare:",
                        "image_url": "https://aihealth.vn/app/uploads/2020/10/Picture2-28.png",
                        "buttons": [
                            {
                                "type": "web_url",
                                "title": "ĐẶT LỊCH KHÁM",
                                // "payload": "MAIN_MENU",
                                "url": "https://deploy-health-care-react.vercel.app/detail-specialty/6",
                                "webview_height_ratio": "full"
                            }
                        ],
                    },
                    {
                        "title": "Khám tai mũi họng",
                        "subtitle": "Dưới đây là các lựa chọn của HealthCare:",
                        "image_url": "https://phongkhamtaimuihong.com.vn/wp-content/uploads/2020/07/phong-ngua-tai-mui-hong.jpg",
                        "buttons": [
                            {
                                "type": "web_url",
                                "title": "ĐẶT LỊCH KHÁM",
                                // "payload": "MAIN_MENU",
                                "url": "https://deploy-health-care-react.vercel.app/detail-specialty/7",
                                "webview_height_ratio": "full"
                            }
                        ],
                    },
                    {
                        "title": "Khám cột sống",
                        "subtitle": "Dưới đây là các lựa chọn của HealthCare:",
                        "image_url": "https://tamanhhospital.vn/wp-content/uploads/2021/03/gai-cot-song.jpg",
                        "buttons": [
                            {
                                "type": "web_url",
                                "title": "ĐẶT LỊCH KHÁM",
                                // "payload": "MAIN_MENU",
                                "url": "https://deploy-health-care-react.vercel.app/detail-specialty/8",
                                "webview_height_ratio": "full"
                            }
                        ],
                    },
                    {
                        "title": "Y học cổ truyền",
                        "subtitle": "Dưới đây là các lựa chọn của HealthCare:",
                        "image_url": "https://www.tapchiyhoccotruyen.com/wp-content/uploads/2020/06/chua-viem-hong-bang-thuoc-nam.jpg",
                        "buttons": [
                            {
                                "type": "web_url",
                                "title": "ĐẶT LỊCH KHÁM",
                                // "payload": "MAIN_MENU",
                                "url": "https://deploy-health-care-react.vercel.app/detail-specialty/9",
                                "webview_height_ratio": "full"
                            }
                        ],
                    },
                    {
                        "title": "Châm cứu",
                        "subtitle": "Dưới đây là các lựa chọn của HealthCare:",
                        "image_url": "https://suckhoe123.vn/uploads/suc-khoe/cham-cuu.jpg",
                        "buttons": [
                            {
                                "type": "web_url",
                                "title": "ĐẶT LỊCH KHÁM",
                                // "payload": "MAIN_MENU",
                                "url": "https://deploy-health-care-react.vercel.app/detail-specialty/10",
                                "webview_height_ratio": "full"
                            }
                        ],
                    }
                ]
            }
        }
    }
    return response
}

module.exports = {
    handleGetStarted, handleBooking
}