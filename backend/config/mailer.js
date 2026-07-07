const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // usa STARTTLS en vez de TLS directo (puerto 465)
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
    family: 4 // fuerza IPv4: evita el error ENETUNREACH por IPv6 en Render
});

module.exports = transporter;