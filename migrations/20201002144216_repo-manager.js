exports.up = function (knex) {
  return knex.schema.createTable('users', table => {
    table.increments('user_id');
    table.string('user_name').notNullable();
    table.text('img_url');
    table.text('bio');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('posts').dropTable('users');
};
