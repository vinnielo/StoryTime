/// Node Mailer
"use strict";
const nodemailer = require("nodemailer");


function sendStory(to){

    // async..await is not allowed in global scope, must use a wrapper
    async function main() {

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        service: "Gmail",
        // port: 587,
        // secure: false, // true for 465, false for other ports
        auth: {
        user: "storytime.official.app@gmail.com", // generated ethereal user
        pass: "UCLA_prjct2", // generated ethereal password
        }
        // tls:{
        //   rejectUnauthorized:false
        // }
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"Nodemailer Contact" <storytime.official.app@gmail.com>', // sender address
        to: to, // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>", // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    }

    main().catch(console.error);

    


}

module.exports = sendStory;