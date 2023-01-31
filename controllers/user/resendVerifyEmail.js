const { User } = require("../../models/users");
const { httpError } = require("../../helpers");

const resendVerifyEmail = async (req, res, next) => {
  try {
    const { email} = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return next(httpError(404, "User not found"));
    }

    if (user.verify) {
        return next(httpError(400, "Verification has already been passed"));
    }
    
    const mail = {
      to: email,
      subject: "Підтвердження реєстраціїї на сайті",
      html: `<a href="http://localhost:3000/api/users/verify/${user.verificationToken}" target="_blank">Клікніть для підтвердження Реєстрації</a>`,
    };
    await sendEmail(mail);

    // await User.findByIdAndUpdate(user._id, {
    //   verify: true,
    //   verificationToken: null,
    // });
    return res.status(200).json({
      message: "Verification email sent",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = resendVerifyEmail;
