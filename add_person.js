const pg = require("pg");
const moment = require("moment");
const settings = require("./settings"); // settings.json

const knex = require('knex')( {
    client: 'pg',
    connection: {
        "user": "development",
        "password": "development",
        "database": "test_db",
        "hostname": "localhost",
        "port": 5432,
        "ssl": true
    }
});

const firstName = process.argv[2];
const lastName = process.argv[3];
const bday = process.argv[4];

knex
.insert({first_name : firstName, last_name : lastName, birthdate : bday})
.into('famous_people')
.asCallback((err, res) => {
    if(err) {
        throw err;
    }
    knex.destroy();
});