/// Node Mailer
const nodemailer = require("nodemailer");

function sendStory(to, body) {

    // async..await is not allowed in global scope, must use a wrapper
   

        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            service: "gmail",
            // port: 587,
            // secure: false, // true for 465, false for other ports
            auth: {
                user: "officialstorytimeapp@gmail.com", 
                pass: "Story1234", 
            }
            // tls:{
            //   rejectUnauthorized:false
            // }
        });

        // send mail with defined transport object
        let mailInfo = {
            from: "Admin <officialstorytimeapp@gmail.com>", // sender address
            to: to, // list of receivers
            subject: "Your story from StoryTime.", // Subject line
            html: body, // html body
        };

        // console.log("Message sent: %s", info.messageId);

        transporter.sendMail(mailInfo, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ');
            }
        });
   




}

module.exports = sendStory;