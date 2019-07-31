const nodemailer = require('nodemailer');

const { welcome } = require('./templates/welcome');


require('dotenv').config();


const getEmailData = (to, name, token, template) => {
  let data = null;

  switch (template) {
    case 'welcome':
      data = {
        from: 'Waves: <124c4alll@gmail.com>',
        to,
        subject: `Welcome to Waves, ${name}`,
        html: welcome()
      };
    default:
      data;
  };

  return data;
};


const sendEmail = (to, name, token, type) => {
  const smtpTransport = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    },
    tls: { rejectUnauthorized: false }
  });

  const mail = getEmailData(to, name, token, type);

  smtpTransport.sendMail(mail, (err, res) => {
    if (err) console.error(err);

    smtpTransport.close();
  });
};


module.exports = { sendEmail };
