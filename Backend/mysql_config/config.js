var multer = require('multer');
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

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const port = 5600;
const app = express();
app.use(cors());
app.use(bodyParser.json());

let mysqlConnection2 = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'birthdate@18',
    database: 'ambi',
    multipleStatements: true
})

var DIR = './uploads/';

const storage = multer.diskStorage({
  destination: (req, file, callBack) => {
      callBack(null, 'uploads')
  },
  filename: (req, file, callBack) => {
      callBack(null, `FunOfHeuristic_${file.originalname}`)
  }
})

const upload = multer({ storage: storage })
app.post('/multipleFiles', upload.array('files'), (req, res, next) => {
  const files = req.files;
  console.log(files);
  if (!files) {
    const error = new Error('No File')
    error.httpStatusCode = 400
    return next(error)
  }
    res.send({sttus:  'ok',
    files:files
  });
})

mysqlConnection2.connect((err) => {
  if (!err) {
      console.log('DB connection successful!');
  }
  else {
      console.log('Db Connection Failed : ' + JSON.stringify(err, undefined, 2));
  }
})

app.get('/api', function (req, res) {
  res.end('file catcher example');
});
 
app.post('/api', function (req, res) {
  upload(req, res, function (err) {
    if (err) {
      return res.end(err.toString());
    }
 
    res.end('File is uploaded');
  });
});


app.post("/resendReq",(req,res)=>{
  role = req.body.userRole;
  reqId = req.body.req_id;
  sql = `update requests set req_level = '${role}' where req_id = '${reqId}';`
  con.query(sql,function(err,result){
    if(err){
      console.log(err);
    }else{
      console.log(result);
      res.send(JSON.stringify({
        result:"passed"
      }));
    }
  })
});

app.post("/addLog",(req,res)=>{
  role = req.body.userRole;
  reqId = req.body.req_id;
  action_by=req.body.action_taken_by;
  console.log("........role",role,reqId,action_by);
  sql = `insert into request_actionnnn (req_id,acc_id,areq_action,aaction_taken_by,acomment) values(${reqId},${role},"Approved",'${action_by}',"Approved")`
  con.query(sql,function(err,result){
    if(err){
      console.log(err);
    }else{
      console.log(result);
      res.send(JSON.stringify({
        result:"passed",
        id:res.insertId
      }));
    }
  })
});

app.post("/addResendReqLog",(req,res)=>{
  role = req.body.userRole;
  reqId = req.body.req_id;
  action_by=req.body.action_taken_by;
  sql = `insert into request_actionnnn (req_id,acc_id,areq_action,aaction_taken_by,acomment) values(${reqId},${role},"Resent",'${action_by}',"Resent")`
  con.query(sql,function(err,result){
    if(err){
      console.log(err);
    }else{
      console.log(result);
      res.send(JSON.stringify({
        result:"passed",
        id:res.insertId
      }));
    }
  })
});

app.post("/addLogNewReq",(req,res)=>{
  role = req.body.userRole;
  reqId = req.body.req_id;
  //aprocessingTime=moment(Date.now()).format('HH:mm:ss');;
  sql = `insert into request_actionnnn (req_id,acc_id,areq_action,aaction_taken_by,acomment) values(${reqId},${role},"Request Initiate","Initiator","Request Initiated")`
  con.query(sql,function(err,result){
    if(err){
      console.log(err);
    }else{
        
      console.log(result);
      res.send(JSON.stringify({
        result:"passed",
        id:res.insertId
      }));
    }
  })
});

app.get('/api/users/:id', (req, res) => {
  let req_id = req.params.id;
  console.log(req_id);
  mysqlConnection2.query(`select distinct aaction_taken_by from request_actionnnn where req_id=${req_id} ;`, (err, rows, fields) => {
      if (!err) {
        console.log("..........//");
          console.log(rows);
          res.send(rows);

      }
      else {
          console.log(err);
      }
  })
});

app.listen(port, () => {
  console.log(`Server Started at Port number ${port}`);
});
