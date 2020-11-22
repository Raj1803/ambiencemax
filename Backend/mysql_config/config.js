var mysql = require('mysql');
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "birthdate@18",
    database: "ambi",
    insecureAuth : true,
    multipleStatements: true
});

con.connect((err)=>{
  if(!err){
    console.log("Connect");
  }
  else{
    console.log("connection fail \n Error : " + JSON.stringify(err,undefined,2));
  }
});

module.exports = con;
