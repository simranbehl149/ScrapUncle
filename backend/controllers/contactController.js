exports.sendMessage = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    console.log('📩 Contact:', { name, email, subject });
    res.json({ success: true, message: 'Message sent' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};