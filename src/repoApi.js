const axios = require('axios');
const standard = require('./../standard.json');

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
        const fields = standard.reduce(
          (fields, key) => ({ ...fields, [key]: data[key] }),
          {}
        );
        resolve(fields);
      })
      .catch(reject);
  });
};

module.exports = getRepoInfo;
