const pg = require("pg");
const settings = require("./settings");

const peopledb = require("./famous_people.js")

const config = {
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
};

const db = new pg.Client(config);


db.connect((err, connection) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }

  peopledb.findPerson(db, process.argv[2], (err, result) => {
      console.log("Searching...")
      if (err) {
        console.error(err)
      }
      let totalresults = result.length
      // console.log(result)
      console.log(`Found ${totalresults} person(s) by the name of "${process.argv[2]}":`)
      for (let i = 0; i < totalresults; i++) {
        console.log (`- ${i + 1}: ${result[i].first_name} ${result[i].last_name}, born ${result[i].birthdate}`)
      }
  })

  // setTimeout(() => {db.end()}, 2000) // We need to wait queries to be done
                                     // before closing the connection.
                                     // I *promise* there's a better way to
                                     // do this! ;)
})
