const nodemailer = require("nodemailer");

const user = process.env.EMAIL_USER
const pass = process.env.EMAIL_PASSWORD

async function sendMail(email) {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: user, 
      pass: pass 
    }
  });

  let info = await transporter.sendMail({
    from: '"Highlight Helper" <noreply@highlighthelper.com>', 
    to: email, 
    subject: "Hello ✔", 
    text: "Hello world?", 
    html: "<b>Hello world?</b>" 

  });
  console.log("info:", info)
}

module.exports = sendMail
