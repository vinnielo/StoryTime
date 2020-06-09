/// Node Mailer
const nodemailer = require("nodemailer");


function sendStory(to, body){

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
        subject: "Your story from StoryTime.", // Subject line
        html: body, // html body
    });

    console.log("Message sent: %s", info.messageId);
    

    
    }

    main().catch(console.error);

    


}

module.exports = sendStory;