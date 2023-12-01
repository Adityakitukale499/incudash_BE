const nodemailer = require("nodemailer");

const mailSender = async(email, title, body) => {
    // let testAccount = await nodemailer.createTestAccount();
    let transporter = nodemailer.createTransport({
        host:"smtp.gmail.com",
        port:587,
        secure:false,
        auth:{
            user:"testmailnode63@gmail.com",
            pass:"zfry jjhg yvmc umnz",
        }
    });

    const html =
    `<h1>Hello I am mail sent from a server </h1>
    <p>You have an attachment with this mail </p>
    `;

    let info = await transporter.sendMail({
        from:'"Test Mail" , <testmailnode63@gmail.com>',
        to : 'adityakitukale4599@gmail.com ,punamlohot4@gmail.com',
        subject:"Test Email Sent From Server",
        html : html,
        // to: `${email}`,
        // subject: `${title}`,
        // html: `${body}`
    })

// let info = await transporter.sendMail({
//     from:'"Test Mail" , <testmailnode63@gmail.com>',
//     to : 'lohotpm512@gmail.com ,punamlohot4@gmail.com',
//     subject:"Test Email Sent From Server",
//     text : "This mail is sent using NodeMailer",
//     html : html,
//     // attachments :{
//     //     filename: "Image2.jpeg",
//     //     path:'src/NodeMailer/Image2.jpeg',
//     //     //cid: 'unique@gmail.com'
//     // }
// });

console.log("message sent : %s", info.messageId);

console.log("Preview URL : %s " , nodemailer.getTestMessageUrl(info));
}

// mailSender().catch(console.error);

module.exports = mailSender;