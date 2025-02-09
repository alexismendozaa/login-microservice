const crypto = require('crypto');
const User = require('../models/User');
const nodemailer = require('nodemailer');

// Function to generate reset token and send email
async function initiatePasswordReset(req, res) {
    const { email } = req.body;

    // Find user by email
    const user = await User.findOne({ where: { email } });
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    // Generate a reset token
    const token = crypto.randomBytes(32).toString('hex');
    user.passwordResetToken = token;
    user.passwordResetTokenExpiry = Date.now() + 3600000; // Token valid for 1 hour
    await user.save();

    // Send reset email
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: 'Password Reset',
        text: `Click the following link to reset your password: \n\nhttp://your-frontend-url/reset-password/${token}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).json({ message: 'Error sending email' });
        }
        res.status(200).json({ message: 'Password reset email sent' });
    });
}

// Function to reset password
async function resetPassword(req, res) {
    const { token, newPassword } = req.body;

    // Find user by reset token
    const user = await User.findOne({
        where: { passwordResetToken: token, passwordResetTokenExpiry: { [Op.gt]: Date.now() } }
    });

    if (!user) {
        return res.status(400).json({ message: 'Invalid or expired reset token' });
    }

    // Update the password
    user.password = newPassword;
    user.passwordResetToken = null;  // Clear the reset token
    user.passwordResetTokenExpiry = null;
    await user.save();

    res.status(200).json({ message: 'Password reset successful' });
}

module.exports = { initiatePasswordReset, resetPassword };
