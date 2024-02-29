const nodemailer = require('nodemailer');

module.exports.sendMail = (email, subject, html) => {

    const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS//- mật khẩu ứng dụng trên chỗ xác mình 2 bước
    }
    });

    const mailOptions = {
    from: 'hello@example.com',
    to: email,
    subject: subject,
    html:html
    //-text: 'Email content'
    };

    transporter.sendMail(mailOptions, function(error, info){
    if (error) {
    console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
        // do something useful
    }
    });
}