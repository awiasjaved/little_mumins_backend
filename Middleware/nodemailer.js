import nodemailer from 'nodemailer';

export const sendEmail = async (to, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'infosophieturner480@gmail.com',
        pass: 'rpsyiwlyzwmcusub', 
      },
    });

    const mailOptions = {
      from: 'Little Mum\'ins <infosophieturner480@gmail.com>', 
      to,
      subject,
      text,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);

    return {
      success: true,
      message: 'Email sent successfully!',
      info,
    };
  } catch (error) {
    console.error('Error sending email:', error);
    return {
      success: false,
      message: 'Failed to send email',
      error: error.message,
    };
  }
};
