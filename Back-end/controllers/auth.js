const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const User = require('../User');
const mongoose = require('mongoose')



const generateToken = (userId) => {
    return jwt.sign({ userId }, 'hero', { expiresIn: '1h' });
};

const sendRecoveryEmail = (email, recoveryToken) => {
    // Use nodemailer or any other email service to send a recovery email
    // Include a link with the recoveryToken to reset the password
    // Example using nodemailer:
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'your-email@gmail.com',
            pass: 'your-email-password',
        },
    });

    const mailOptions = {
        from: 'priyanshu168@gmail.com',
        to: email,
        subject: 'Password Recovery',
        text: `Click the following link to reset your password: http://your-frontend-url/reset-password/${recoveryToken}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
};


const register = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, email, password: hashedPassword });
        await user.save();

        const token = generateToken(user._id);

        res.status(201).json({ userId: user._id, token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        

        const token = generateToken(user._id);

        res.status(200).json({ userId: user._id, token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const recoverPassword = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const recoveryToken = jwt.sign({ userId: user._id }, 'your-recovery-secret-key', { expiresIn: '1h' });

        // Save recoveryToken in the database for later verification
        user.recoveryToken = recoveryToken;
        await user.save();

        sendRecoveryEmail(email, recoveryToken);

        res.status(200).json({ message: 'Recovery email sent' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const resetPassword = async (req, res) => {
    const { recoveryToken, newPassword } = req.body;

    try {
        const decodedToken = jwt.verify(recoveryToken, 'your-recovery-secret-key');

        const user = await User.findOne({ _id: decodedToken.userId, recoveryToken });

        if (!user) {
            return res.status(401).json({ error: 'Invalid or expired recovery token' });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        user.recoveryToken = undefined;
        await user.save();

        res.status(200).json({ message: 'Password reset successful' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    register,
    login,
    recoverPassword,
    resetPassword,
};
