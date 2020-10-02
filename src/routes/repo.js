const express = require('express');
const router = express.Router();

router.post('/addRepo', (req, res) => {
  const payload = req.body;
  req.app.locals.sessions.getSession(req.cookies.id).then(({ username }) => {
    req.app.locals.db
      .saveRepo({ ...payload, username })
      .then(id => res.end(`${id}`));
  });
});

module.exports = router;
