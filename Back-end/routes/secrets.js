// routes/secrets.js
const express = require('express');
const router = express.Router();
const secretsController = require('../controllers/secrets');

router.post('/post-secret', secretsController.postSecret);
router.get('/get-secrets', secretsController.getSecrets);

module.exports = router;