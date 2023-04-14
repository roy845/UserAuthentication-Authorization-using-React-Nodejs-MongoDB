const PasswordResetToken = require('../model/PasswordResetToken');
const bcrypt = require('bcrypt');
const User = require('../model/User');

let SALT_ROUNDS = 10;

module.exports = {
    resetPassword:async (req,res)=>{

    const { token,password} = req.body;
    console.log(req.body)
    console.log(token);
    console.log(password)

    // find password reset token in database and check expiration time
    const passwordResetToken = await PasswordResetToken.findOne({ token, expires_at: { $gt: new Date() } });

    if (!passwordResetToken) {
        res.status(400).json({ message: 'Invalid or expired token' });
    } else {
        // encrypt new password using bcrypt
        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

        // update user password in database
        await User.updateOne({ username: passwordResetToken.email,password: hashedPassword });

        // delete password reset token from database
        await passwordResetToken.deleteOne({token:token});

        res.status(200).json({ message: 'Password reset successfully' });
    }
 }
}
