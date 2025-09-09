import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'Outlook',
  auth: {
    user: 'fredy.choquecota@outlook.com',
    pass: 'aA-7852396541'
  }
});

export const sendMail = async (to, subject, text) => {
  const mailOptions = {
    from: 'fredy.choquecota@outlook.com',
    to,
    subject,
    text
  };
  return transporter.sendMail(mailOptions);
};