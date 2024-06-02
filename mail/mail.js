import nodemailer from "nodemailer";
import "dotenv/config";

const transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: process.env.MAILTRAP_USERNAME,
        pass: process.env.MAILTRAP_PASSWORD,
    },
});

function sendMail(email) {
    const message = {
        to: email,
        from: process.env.MAIL_SENDER,
        subject: "Welcome to Contacts list",
        html: `<h2 style="color: blue">Confirm your email address by following the <a href="http://localhost:3000/users/verify/${verificationToken}">link</a></h2>`,
        text: `Confirm your email address by open the link: http://localhost:3000/users/verify/${verificationToken}`,
    };
         return transport.sendMail(message);    
}

export default {sendMail}; 
