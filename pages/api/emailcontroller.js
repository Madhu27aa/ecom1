import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 465,
  secure: true,
  logger: true,
  debug: true,
  secureConnection : false,
  auth: {
    user: 'desertstop71@gmail.com',
    pass: 'gugy kfsj fpnc iaos' 
  },
  tls: {
    rejectUnAuthorized: true
  }
});

export const sendEmail = async (email, subject, message, cartData, quantity) => {
  let detailMessage = message + "\n\nOrder Details:\n";
  
  cartData.forEach((item, index) => {
    detailMessage += `Item ${index + 1}:\n`;
    detailMessage += `Name: ${item.name}\n`;
    detailMessage += `Price: ${item.price}\n`;
    detailMessage += `Image: ${item.image}\n\n`;
  });
  
  await transporter.sendMail({
    from: 'desertstop71@gmail.com',
    to: email,
    subject: subject,
    text: detailMessage
  });
};
