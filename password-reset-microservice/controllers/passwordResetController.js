const crypto = require('crypto');
const { Op } = require('sequelize'); // Importa Op aquí
const User = require('../models/User');
const nodemailer = require('nodemailer');

// Función para generar token de restablecimiento y enviar el email
async function initiatePasswordReset(req, res) {
    const { email } = req.body;

    // Buscar usuario por email
    const user = await User.findOne({ where: { email } });
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    // Generar el token de restablecimiento
    const token = crypto.randomBytes(32).toString('hex');
    user.passwordResetToken = token;
    user.passwordResetTokenExpiry = Date.now() + 3600000; // Token válido por 1 hora
    await user.save();

    // Enviar el email de restablecimiento
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
        text: `Click the following link to reset your password: \n\n${token}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).json({ message: 'Error sending email' });
        }
        res.status(200).json({ message: 'Password reset email sent' });
    });
}

// Función para restablecer la contraseña
async function resetPassword(req, res) {
    const { token, newPassword } = req.body;

    // Buscar usuario por token de restablecimiento
    const user = await User.findOne({
        where: { passwordResetToken: token, passwordResetTokenExpiry: { [Op.gt]: Date.now() } }
    });

    if (!user) {
        return res.status(400).json({ message: 'Invalid or expired reset token' });
    }

    // Actualizar la contraseña
    user.password = newPassword;
    user.passwordResetToken = null;  // Limpiar el token de restablecimiento
    user.passwordResetTokenExpiry = null;
    await user.save();

    res.status(200).json({ message: 'Password reset successful' });
}

module.exports = { initiatePasswordReset, resetPassword };
