exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('campaigns').del()
    .then(() =>
      // Inserts seed entries
      knex('campaigns').insert([
        {
          id: 1,
          title: 'FIRST! Campaign',
          scenario: 'looky here',
          overview: 'I can see your house from here',
          notes: 'mark my words',
          gameSettings: {
            minPlayers: 3,
            maxPlayers: 5,
            skillLevel: 2,
            postingFrequency: 3
          }
        }
      ]));
};
