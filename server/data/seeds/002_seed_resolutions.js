exports.seed = (knex) => {
  return knex('resolution')
    .del()
    .then(() => {
      return knex('resolution').insert([
        { user_id: 1, content: 'lose 15 lbs' },
        { user_id: 1, content: 'actually fulfill resolutions this year' },
      ]);
    });
};
