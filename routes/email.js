const express = require('express');
const router = express.Router();
const { sendEmail } = require("../Middleware/nodemailer"); // correct path

router.post('/send', async (req, res) => {
  const { to, subject, text } = req.body;

  const result = await sendEmail(to, subject, text);

  if (result.success) {
    res.status(200).json({ message: result.message });
  } else {
    res.status(500).json({ message: result.message, error: result.error });
  }
});

module.exports = router;