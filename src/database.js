class Database {
  constructor(client) {
    this.client = client;
  }

  saveUser(user) {
    return new Promise((resolve, reject) => {
      this.client('users')
        .insert(user, ['user_id'])
        .then(resolve)
        .catch(reject);
    });
  }

  getUser(user_name) {
    return new Promise((resolve, reject) => {
      this.client('users')
        .select('*')
        .where('user_name', '=', user_name)
        .then(resolve)
        .catch(reject);
    });
  }
}

module.exports = Database;
