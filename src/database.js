class Database {
  constructor(client) {
    this.client = client;
  }

  saveRepo(repo) {
    return this.client('repos').insert(repo, ['repoId']);
  }

  getRepos(repoCount) {
    return this.client('repos').select('*').limit(repoCount);
  }

  saveUser(user) {
    return this.client('users').insert(user, ['userId']);
  }

  getUser(username) {
    return this.client('users').select('*').where('username', '=', username);
  }
}

module.exports = Database;
