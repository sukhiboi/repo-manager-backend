const express = require('express');
const router = express.Router();

const {
  authorizeUser,
  getGithubAccessToken,
  getUserDetailsByAccessToken,
} = require('./../auth/github.auth');

router.get('/login', authorizeUser);

router.get('/callback', async (req, res) => {
  const sessions = req.app.locals.sessions;
  const db = req.app.locals.db;
  const code = req.query.code;

  const accessToken = await getGithubAccessToken(code);
  const { data } = await getUserDetailsByAccessToken(accessToken);

  const githubUser = {
    username: data.login,
    imgURL: data.avatar_url,
    bio: data.bio,
  };

  const userId = await db.getUser(data.login).then(([user]) => {
    if (!user)
      return db.saveUser(githubUser).then(details => details[0].userId);
    return Promise.resolve(user.userId);
  });

  await sessions.createSession({
    accessToken,
    username: data.login,
    userId,
  });

  res.cookie('id', userId);
  res.redirect(process.env.LOGIN_REDIRECT);
});

module.exports = router;
