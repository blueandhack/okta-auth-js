const express = require('express');
const { renderTemplate, getAuthClient } = require('../utils');

const router = express.Router();

router.get('/terminal', (req, res) => {
  const idxMessages = req.getIdxMessages();
  req.clearIdxMessages();

  const messages = idxMessages.reduce((acc, curr) => {
    acc.push(curr.message);
    return acc;
  }, []);

  // Clear transaction meta at app layer when reach to terminal state
  const authClient = getAuthClient(req);
  authClient.transactionManager.clear();

  // Render
  renderTemplate(req, res, 'terminal', {
    messages
  });
});

module.exports = router;
