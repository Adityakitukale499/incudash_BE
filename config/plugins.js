// ./config/email.js

module.exports = ({ env }) => ({
    email: {
      provider: 'nodemailer',
      providerOptions: {
        host: 'smtp.gmail.com',
        port: 587,
        auth: {
          user: 'adityakitukale4599@gmail.com',
          pass: 'jyie ecza srcr pnkl'
        }
      },
      settings: {
        defaultFrom: 'kitukalea2@gmail.com',
        defaultReplyTo: 'kitukalea2@gmail.com',
      },
    },
  });
  