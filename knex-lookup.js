var knex = require('knex')({
  client: 'pg',
  connection: {
      "user": "development",
  "password": "development",
  "database": "vagrant",
      "host": "localhost"
   }
});

let result ="";
knex('famous_people')
  .select("*")
  .where({last_name: process.argv[2]})
  .orWhere({first_name: process.argv[2]})
  .then(function(query) {
    result = query;
    output(result)
    knex.destroy()
  })

function output (result) {
  let totalresults = result.length
  // console.log(result)
  console.log(`Found ${totalresults} person(s) by the name of "${process.argv[2]}":`)
  for (let i = 0; i < totalresults; i++) {
    console.log (`- ${i + 1}: ${result[i].first_name} ${result[i].last_name}, born ${result[i].birthdate}`)
}};