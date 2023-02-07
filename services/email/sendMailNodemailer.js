const nodemailer = require("nodemailer")
const { EMAIL_USER, EMAIL_PASS } = process.env;

const sendMailNodemailer = async (data) => {
  try {
    const email = { ...data, from: "ketrins1993@gmail.com" };
    const transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
    },
    });

    await transport.sendMail(email);
    return true;
    } catch (err) {
        throw err;
    }
};

module.exports = {
    sendMailNodemailer,
}