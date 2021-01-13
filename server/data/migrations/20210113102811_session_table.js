exports.up = (knex) =>
  knex.schema.createTable('sessions', (table) => {
    table.string('sid').notNullable();
    table.json('sess').notNullable();
    table.timestamp('expired').notNullable();
  });
exports.down = (knex) => knex.schema.dropTableIfExists('sessions');
