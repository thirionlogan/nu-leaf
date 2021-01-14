exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('user')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('user').insert([
        {
          firstName: 'John',
          lastName: 'Doe',
          email: 'johndoe@email.com',
          password:
            '$2a$10$YSPUaf2rbvPwyxROi7zOaeEQQUM6G1m.1K3dkoJzrGYlAIlilnEre',
        },
      ]);
    });
};
