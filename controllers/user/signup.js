const { User } = require("../../models/users");
const { httpError } = require("../../helpers");
const gravatar = require("gravatar");
const bcrypt = require("bcrypt");
const { nanoid } = require("nanoid");
const { sendEmail } = require("../../services/email");

const signup = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const avatarURL = gravatar.url(email);

    const verificationToken = nanoid();

    const savedUser = await User.create({
      email,
      password: hashedPassword,
      avatarURL,
      verificationToken,
    });

    const mail = {
      to: email,
      subject: "Please confirm your email",
      html: `<a href="http://localhost:3000/api/users/verify/${verificationToken}" target="_blank">Confirm your email</a>`,
    };
    await sendEmail(mail);

    return res.status(201).json({
      user: {
        email,
        subscription: savedUser.subscription,
      },
    });
  } catch (error) {
    if (error.message.includes("E11000 duplicate key error")) {
      return next(httpError(409, "Email in use"));
    }
    next(error);
  }
};

module.exports = {
  signup,
};
