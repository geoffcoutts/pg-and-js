function findPerson(client, person, callback) {
  client.query(`SELECT * FROM famous_people WHERE first_name =$1 OR last_name=$1;`, [person], (err, result) => {
    if (err) {
      callback(err);
      return
    }
    callback(null, result.rows)
    client.end();
  });

};


module.exports = {
  findPerson : findPerson
}