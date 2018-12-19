// Update with your config settings.
const settings = require("./settings"); // settings.json

module.exports = {
  settings,
  development: {
    client: 'pg',
    connection: {
      user     : settings.user,
      password : settings.password,
      database : settings.database,
      host     : settings.hostname,
      port     : settings.port,
      ssl      : settings.ssl
    }
  }
};