// pages/api/sendEmail.js
import { sendEmail } from './emailcontroller.js';
import { sendCustomerDetailsEmail } from './customerDetailEmailController.js'

export default async function handler(req, res) {
    if (req.method === 'POST') {
    try {
        await sendEmail(req.body.email, req.body.subject, req.body.message, req.body.cartData, req.body.quantity);
        await sendCustomerDetailsEmail(req.body.message, req.body.customerDetails);
        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        console.log(error);
      res.status(500).json({ message: 'Failed to send  ' + error });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
};

