import nodemailer from 'nodemailer';


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'fchoquecota1@gmail.com',
    pass: 'coghcnfqlbjomzro'
  }
});

export const sendMail = async (to, subject, text) => {
  const mailOptions = {
    from: 'fchoquecota1@gmail.com',
    to,
    subject,
    text
  };
  return transporter.sendMail(mailOptions);
};