var mysql = require('mysql');
var connection = mysql.createConnection({
    host     : 'compacterpdb.cs5vzna1xokp.ap-southeast-1.rds.amazonaws.com',
    user     : 'compactErpDB',
    password : 'Password12!',
    port     : 3306
});

connection.connect(function(error){
  if(!!error){
    console.log(error);
  }else{
    console.log('Connected!:)');
  }
});  
module.exports = connection; 