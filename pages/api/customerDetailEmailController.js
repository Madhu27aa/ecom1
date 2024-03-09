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

export const sendCustomerDetailsEmail = async (message, customerDetails) => {
    let details = message + "\n\nCustomer Details:\n";
  
    Object.keys(customerDetails).forEach(key => {
      details += `${key}: ${customerDetails[key]}\n`;
    });
    
    await transporter.sendMail({
    from: 'desertstop71@gmail.com',
    to: 'ramiyaseshaiah@gmail.com',
    subject: "order received",
    text: details
  });
};
