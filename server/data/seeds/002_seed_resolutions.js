exports.seed = (knex) => {
  return knex('resolution')
    .del()
    .then(() =>
      knex
        .select('id')
        .from('user')
        .then(([{ id }]) =>
          knex('resolution').insert([
            { user_id: id, content: 'Lose 15 lbs' },
            { user_id: id, content: 'Actually fulfill resolutions this year' },
          ])
        )
    );
};
