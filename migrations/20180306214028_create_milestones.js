
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.hasTable('milestones').then(function(exists) {
      if (!exists) {
        console.log('creating table')
        knex.schema.createTable('milestones', function (table) {
          console.log('running');
          table.increments('id').primary();
          table.string('description');
          table.date('date_achieved');
        })
        .then(console.log('hi'))
      }
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTableIfExists('milestones')
  ])
};
