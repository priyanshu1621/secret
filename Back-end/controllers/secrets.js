// controllers/secrets.js
const User = require('../User');

exports.postSecret = async (req, res) => {
  const { userId, secretMessage } = req.body;

  try {
    // Update the user's secret in the database
    await User.findByIdAndUpdate(userId, { secret: secretMessage });
    res.status(200).json({ message: 'Secret posted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getSecrets = async (req, res) => {
  try {
    // Fetch secrets from the database without revealing user identities
    const secrets = await User.find({}, { secret: 1, _id: 0 });
    res.status(200).json(secrets);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
