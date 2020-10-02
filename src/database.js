class Database {
  constructor(client) {
    this.client = client;
  }

  saveRepo(repo) {
    return new Promise((resolve, reject) => {
      this.client('repos').insert(repo, ['repoId']).then(resolve).catch(reject);
    });
  }

  saveUser(user) {
    return new Promise((resolve, reject) => {
      this.client('users')
        .insert(user, ['userId'])
        .then(resolve)
        .catch(reject);
    });
  }

  getUser(username) {
    return new Promise((resolve, reject) => {
      this.client('users')
        .select('*')
        .where('username', '=', username)
        .then(resolve)
        .catch(reject);
    });
  }
}

module.exports = Database;
