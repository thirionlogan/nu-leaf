exports.up = (knex) =>
  knex.schema.createTable('resolution', (table) => {
    table.increments();
    table.integer('user_id').references('user.id').onDelete('CASCADE');
    table.text('content').notNullable();
    table.timestamps(true, true);
  });

exports.down = (knex) => knex.schema.dropTableIfExists('resolution');
