const pg = require("pg");
const moment = require("moment");
const settings = require("./settings"); // settings.json

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

const name = process.argv[2];

function listPeople(db) {
    db.query(`SELECT * FROM famous_people WHERE first_name LIKE '${name}' OR last_name LIKE '${name}';`, (err, res) => {
        let num = 1;
        console.log('Searching...');
        console.log('res', res.rows);
        
        console.log(`Found ${res.rows.length} person(s) by the name of '${name}'`);

        for(let obj of res.rows) {
            dateFormat = moment(obj.birthdate).format('YYYY-MM-DD');
            console.log(`- ${num}: ${obj.first_name} ${obj.last_name}, born '${dateFormat}'`);
            num++;
        }
        db.end();
    });
}

client.connect((err) => {
    if(name === undefined || name === undefined) {
        console.log("Please add a name to reference");
    }
    console.log('name: ', name);
    listPeople(client);
});