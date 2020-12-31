let express = require("express"),
  async = require("async"),
  router = express.Router(),
  con = require("../mysql_config/config");

  router.post("/viewRequestData",(req,res) =>{
    console.log("+++++++++++++");
    data = req.body;
    req_id=data.reqId;
    console.log(req_id);
    sql1 = `select * from requests where req_id='${req_id}';`
      con.query(sql1, (err, result) => {
    if (err) {
      console.log(err);
    }
    else {
    req_data= result
    console.log('-----',req_data);
    req_level=result[0].req_level;
      console.log('-----',req_level);
      sql = `Select role_name from roles where role_id='${req_level}';`
    con.query(sql,function(err,result){
      if(err){
        console.log(err);
      }else{
        console.log(result);
        role_name=result;
        res.send(
            JSON.stringify({
              req_data: req_data,
              role_name:role_name
            })
          );
      }
    })
    }
  })
});

router.get("/getRole",(req,res)=>{
  reqId = req.body.req_id;
  sql = `Select role_name from roles order by role_id;`
  con.query(sql,function(err,result){
    if(err){
      console.log(err);
    }else{
      console.log(result);
      res.send(JSON.stringify({
        result:"passed",
        role_name:result
    }));
    }
  })
})

router.post("/viewStatus",(req,res)=>{
  reqId = req.body.req_id;
  console.log(reqId);
  w_flow=[];
  role=[];
  role1=[];
  sql = `Select w_flow from requests inner join workflow on requests.w_id = workflow.w_id where req_id = '${reqId}';`
  con.query(sql,function(err,result){
    if(err){
      console.log(err);
    }else{
      w_flow=result[0].w_flow.split(',');
      console.log("............");
      console.log(w_flow);
        sql1= `Select * from roles;`
      
        con.query(sql1,function(err,result){
        if(err){
          console.log(err);
          console.log(result);
         
        }
        else{
         role.push(result[0]);
         role.push(result[1]);
         role.push(result[2]);
         role.push(result[3]);
         role.push(result[4]);
         role.push(result[5]);
         role.push(result[6]);

         role.forEach((e1) => {
          for(let i=0;i<w_flow.length;i++){
            if(e1.role_id==w_flow[i]){
               role1.push(e1);
            }
          }
        });
         res.send(
          JSON.stringify({
              result:"passed",
              w_flow:w_flow,
              role:role1
          })
      );
        }
 
      });
    }
  })
})



module.exports = router;