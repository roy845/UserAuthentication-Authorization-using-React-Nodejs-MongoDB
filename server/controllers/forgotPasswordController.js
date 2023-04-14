const PasswordResetToken = require('../model/PasswordResetToken');
const User = require('../model/User');
const {sendEmailResetPassword} = require('../middleware/SendEmail');
const crypto = require('crypto');

module.exports = {
    forgotPassword:async (req,res)=>{
        // retrieve user email from request body
        const { email } = req.body;
        console.log(email);

        // check if user exists in database
        const user = await User.findOne({username:email}).exec();
       
        if (!user) {
            res.status(400).json({ message: 'User not found' });
        } else {
            // generate unique token for reset password request
            const token = crypto.randomBytes(20).toString('hex');

            // create password reset token document and save to database
            const passwordResetToken = new PasswordResetToken({
            email,
            token,
            expires_at: new Date(Date.now() + 900000) // token is valid only for 15 min from generation
            });
            await passwordResetToken.save();

           
            try {
                await sendEmailResetPassword(email, token);
                res.json({ message: 'Email sent' });
              } catch (error) {
                console.log(error);
                res.status(500).json({ message: 'Error sending email' });
              }
       
    }
 }
}

