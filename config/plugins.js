// ./config/email.js

module.exports = ({ env }) => ({
    email: {
      provider: 'nodemailer',
      providerOptions: {
        host: env('SMTP_HOST', 'smtp.gmail.com'),
        port: env('SMTP_PORT', 587),
        auth: {
          user: env('SMTP_USERNAME', 'kitukalea2@gmail.com'),
          pass: env('SMTP_PASSWORD', 'incudash'),
        },
      },
      settings: {
        defaultFrom: 'kitukalea2@gmail.com',
        defaultReplyTo: 'kitukalea2@gmail.com',
      },
    },
  });
  