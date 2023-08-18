const config = require('config.json');
const mysql = require('mysql2/promise');
// const mysql = require('mysql2');
const { Sequelize } = require('sequelize');

module.exports = db = {};

// // Testing
// const { host, port, user, password, database } = config.database;
// // create the connection to database
// const connection = mysql.createConnection({
//     host: host,
//     user: user,
//     password: password,
//     database: database,
//     port: port
//   });
  
//   // simple query
//   connection.query(
//     'SELECT * FROM student',
//     function(err, results, fields) {
//       console.log(results); // results contains rows returned by server
//     //   console.log(fields); // fields contains extra meta data about results, if available
//     }
//   );
// // Testing END

initialize();

async function initialize() {
    // create db if it doesn't already exist
    const { host, port, user, password, database } = config.database;
    const connection = await mysql.createConnection({ host, port, user, password });
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);

    // connect to db
    const sequelize = new Sequelize(database, user, password, { host: host, dialect: 'mysql' });

    // init models and add them to the exported db object
    db.Student = require('../students/student.model')(sequelize);

    // sync all models with database
    await sequelize.sync(
        // { alter: true }
    );

}