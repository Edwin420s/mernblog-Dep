const express = require('express');
const router = express.Router();

// Example category route
router.get('/', (req, res) => {
  res.json({ message: 'Category route working ✅' });
});

module.exports = router;
