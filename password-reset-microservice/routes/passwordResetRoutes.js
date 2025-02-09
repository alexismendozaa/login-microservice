const express = require('express');
const router = express.Router();
const { initiatePasswordReset, resetPassword } = require('../controllers/passwordResetController');

// Route to initiate password reset
router.post('/password-reset', initiatePasswordReset);

// Route to reset the password
router.post('/reset-password', resetPassword);

module.exports = router;
