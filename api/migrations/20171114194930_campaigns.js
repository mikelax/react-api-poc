exports.up = function(knex) {

  return knex.schema.createTable('campaigns', function(table) {
    table.increments().primary();

    table.string('title');
    table.text('scenario');
    table.text('overview');

    // JSON column to contain
    // minPlayers
    // maxPlayers
    // skillLevel
    // postingFrequency
    table.jsonb('gameSettings');

    table.text('notes');

    table.timestamps();
  })

};

exports.down = function(knex) {
  return knex.schema.dropTable('campaigns');
};