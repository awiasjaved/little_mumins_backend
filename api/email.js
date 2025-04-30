import { sendEmail } from '../middleware/nodemailer'; 

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  const { formData, shipToDifferent, orderNotes, cartItems, subtotal, shipping, total } = req.body;

  const fixedEmail = 'hafizamirsaeed906@gmail.com';

  const text = `
NEW ORDER RECEIVED

Customer Information:
--------------------------------
Name: ${formData.firstName} ${formData.lastName}
Company: ${formData.company || 'N/A'}
Address: ${formData.address}${formData.apartment ? ', ' + formData.apartment : ''}, ${formData.city}, ${formData.state}, ${formData.zip}, ${formData.country}
Phone: ${formData.phone}
Email: ${formData.email}
Ship to Different Address: ${shipToDifferent ? 'Yes' : 'No'}

Order Notes:
--------------------------------
${orderNotes ? orderNotes : 'None'}

Cart Details:
--------------------------------
${cartItems.map(item => (
  `• ${item.title} (x${item.quantity}) - Rs ${item.price * item.quantity}`
)).join('\n')}

Price Summary:
--------------------------------
Subtotal: Rs ${subtotal}
Shipping: Rs ${shipping}
TOTAL: Rs ${total}

Thank you.
`;

  const subject = `New Order Received - Little Mumins`;

  const result = await sendEmail(fixedEmail, subject, text);

  if (result.success) {
    res.status(200).json({ message: result.message });
  } else {
    res.status(500).json({ message: result.message, error: result.error });
  }
}
