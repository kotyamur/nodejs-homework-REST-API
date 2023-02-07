const sgMail = require("@sendgrid/mail");

const { SENDGRID_API_KEY } = process.env;
sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async (data) => {
    try {
        const email = { ...data, from: "ketrins1993@gmail.com" };
        await sgMail.send(email);
        return true
    } catch (err) {
        throw err
    }
}

module.exports = sendEmail;