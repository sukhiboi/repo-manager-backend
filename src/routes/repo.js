const express = require('express');
const getRepoInfo = require('./../repoApi');

const router = express.Router();

router.post('/addRepo', (req, res) => {
  const payload = req.body;
  req.app.locals.sessions.getSession(req.cookies.id).then(({ username }) => {
    req.app.locals.db
      .saveRepo({ ...payload, username })
      .then(id => res.end(`${id}`));
  });
});

router.get('/getRepos', (req, res) => {
  const db = req.app.locals.db;
  db.getRepos(20)
    .then(repos => {
      const reposDetails = repos.map(repo => {
        return getRepoInfo(`${repo.username}/${repo.repoName}`).then(data => ({
          ...data,
          ...repo,
        }));
      });
      return Promise.all(reposDetails);
    })
    .then(reposDetails => {
      res.json(reposDetails);
    });
});

module.exports = router;
