exports.up = function (knex) {
  return knex.schema
    .createTable('repos', table => {
      table.increments('repoId');
      table.string('username');
      table.string('repoName');
      table.string('appLink');
    })
    .createTable('users', table => {
      table.increments('userId');
      table.string('username').notNullable();
      table.text('imgURL');
      table.text('bio');
    });
};

exports.down = function (knex) {
  return knex.schema.dropTable('repos').dropTable('users');
};
