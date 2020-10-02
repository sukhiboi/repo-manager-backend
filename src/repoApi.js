const axios = require('axios');

const getRepoInfo = repo => {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://raw.githubusercontent.com/${repo}/master/repoInfo.json`, {
        headers: {
          Accept: 'application/json',
          'User-Agent': 'node.js',
        },
      })
      .then(({ data }) => {
        resolve(data);
      })
      .catch(reject);
  });
};

module.exports = getRepoInfo;
