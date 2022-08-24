const mysql = require('mysql2');

// Change info to your database
const mysqlConnection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'demo',
});

mysqlConnection.connect((error) => {
  if (error) {
    console.log(error);
    return;
  } else {
    console.log('Database is connected');
  }
});

module.exports = mysqlConnection;
