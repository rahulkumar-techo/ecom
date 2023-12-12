import nodemailer from "nodemailer";

const sendEmail = async (data) => {
  const { to, subject, text, html } = data;
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const info = await transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to,
    text,
    subject,
    html,
  });

  console.log("Message sent: \n", info.messageId);
};

export default sendEmail;
