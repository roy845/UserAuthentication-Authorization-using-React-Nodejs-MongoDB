const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USERNAME, 
    pass: process.env.EMAIL_PASSWORD
  }
});

const sendEmailResetPassword = async (email,token)=> {
  const ResetPasswordMessage = {
    from: process.env.EMAIL_USERNAME, 
    to: email,
    subject: 'Reset Your Password',
    html: `
      <p>To reset your password, click the link below:</p>
      <a href="http://localhost:3000/reset-password/${token}">Reset Password</a>
    `
  };

    transporter.sendMail(ResetPasswordMessage);
}

const sendEmail = async (email,subject,text)=> {
    const WelcomeMessage = {
      from: process.env.EMAIL_USERNAME, 
      to: email,
      subject: subject,
      text:text
    };
  
    return await transporter.sendMail(WelcomeMessage);
}


module.exports = {
    sendEmail,
    sendEmailResetPassword
};
