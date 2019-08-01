const nodemailer = require('nodemailer');

const { welcome } = require('./templates/welcome');
const { resetPass } = require('./templates/resetPass');
const { purchase } = require('./templates/purchase');


require('dotenv').config();


const getEmailData = (to, name, token, template, actionData) => {
  let data = null;

  switch (template) {
    case 'welcome':
      data = {
        from: `Waves: <${process.env.EMAIL_USER}>`,
        to,
        subject: `Welcome to Waves, ${name}`,
        html: welcome()
      };
      break;

    case 'reset-password':
      data = {
        from: `Waves: <${process.env.EMAIL_USER}>`,
        to,
        subject: `Hey, ${name}, reset your password!`,
        html: resetPass(actionData)
      };
      break;

    case 'purchase':
      data = {
        from: `Waves: <${process.env.EMAIL_USER}>`,
        to,
        subject: `Thanks for shopping with us, ${name}!`,
        html: purchase(actionData)
      };
      break;

    default:
      data;
  };

  return data;
};


const sendEmail = (to, name, token, type, actionData = null) => {
  const smtpTransport = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    },
    tls: { rejectUnauthorized: false }
  });

  const mail = getEmailData(to, name, token, type, actionData);

  smtpTransport.sendMail(mail, (err, res) => {
    if (err) console.error(err);

    smtpTransport.close();
  });
};


module.exports = { sendEmail };
