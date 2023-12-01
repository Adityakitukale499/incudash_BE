// ./config/email.js

module.exports = ({ env }) => ({
    email: {
      provider: 'nodemailer',
      providerOptions: {
        host: env('SMTP_HOST', 'smtp.gmail.com'),
        port: env('SMTP_PORT', 587),
        auth: {
          user: env('SMTP_USERNAME', 'testmailnode63@gmail.com'),
          pass: env('SMTP_PASSWORD', 'zfry jjhg yvmc umnz'),
        },
      },
      settings: {
        defaultFrom: 'testmailnode63@gmail.com',
        defaultReplyTo: 'testmailnode63@gmail.com',
      },
    },
  });
  