const express = require('express');
const router = express.Router();

// GET all code sessions (for future use)
router.get('/', (req, res) => {
  res.json({ 
    message: 'Get all code sessions',
    sessions: [] 
  });
});

// GET specific code session by ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  res.json({ 
    message: `Get code session ${id}`,
    sessionId: id,
    code: {
      html: '',
      css: '',
      js: ''
    }
  });
});

// POST create new code session
router.post('/', (req, res) => {
  const { html, css, js } = req.body;
  res.status(201).json({ 
    message: 'Code session created',
    sessionId: 'temp-id-' + Date.now(),
    code: { html, css, js }
  });
});

// PUT update existing code session
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { html, css, js } = req.body;
  res.json({ 
    message: `Code session ${id} updated`,
    sessionId: id,
    code: { html, css, js }
  });
});

// DELETE code session
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  res.json({ 
    message: `Code session ${id} deleted`,
    sessionId: id
  });
});

module.exports = router;
