import { sendEmail } from '../middleware/nodemailer.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  try {
    const {
      formData,
      shipToDifferent,
      orderNotes,
      cartItems,
      subtotal,
      shipping,
      total
    } = req.body;

    // Basic validation to prevent crashes
    if (
      !formData ||
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !Array.isArray(cartItems) ||
      cartItems.length === 0
    ) {
      return res.status(400).json({ success: false, message: 'Missing or invalid form data' });
    }

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
${orderNotes || 'None'}

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
      return res.status(200).json({ message: result.message });
    } else {
      return res.status(500).json({ message: result.message, error: result.error });
    }
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Unexpected server error',
      error: error.message,
    });
  }
}
