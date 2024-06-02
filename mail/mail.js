import "dotenv/config";
import nodemailer from "nodemailer";

const { MAIL_USERNAME, MAIL_PASSWORD, MAIL_SENDER, HOST_PORT } = process.env;

const transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  type: "LOGIN",
  auth: {
    user: MAIL_USERNAME,
    pass: MAIL_PASSWORD,
  },
});
function sendMail(email) {
    const message = {
      to: email,
      from: MAIL_SENDER,
      subject: "Learn node.js it easy",
      html: `Thank you for registration, to confirm your email please go to this link <a href="${HOST_PORT}/users/verify/${token}">Confirm registration</a>`,
      text: `Thank you for registration, to confirm your email please go to this link ${HOST_PORT}/users/verify/${token}`,
    };
  
    return transport.sendMail(message);
  }
  
  export default { sendMail };