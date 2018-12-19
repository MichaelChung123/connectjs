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

const name = process.argv[2];

knex.select().from('famous_people').where({first_name : name}).asCallback((err,res) => {
    if(err) {
        throw err;
    }
    
    let num = 1;

    console.log(`Found ${res.length} person(s) by the name of '${name}'`);
    
    for(let obj of res) {
        let dateFormat = moment(obj.birthdate).format('YYYY-MM-DD');
        console.log(`- ${num}: ${obj.first_name} ${obj.last_name}, born '${dateFormat}'`);
        num++;
    }
    knex.destroy();
});