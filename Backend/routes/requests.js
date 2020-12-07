let express = require("express"),
  async = require("async"),
  router = express.Router(),
  con = require("../mysql_config/config");

  user_id = 2;
  role_id = 2;
  w_id = 1;

  router.post("/all_reqs",(req,res)=>{
      console.log(req.body);

      if(role_id === 1)
      {
        sql1 = `Select * from requests where req_initiator_id = '${user_id}' order by req_id desc;`

        con.query(sql1,(err,result)=>{
            if(err){
              console.log(err);
            }
            else{
                console.log(result);
                res.send(
                    JSON.stringify({
                        result:"passed",
                        req_data: result
                    })
                );
            }
        })
      }
      else{
        sql2 = `Select * from requests where w_id = '${w_id}' order by req_id desc;`

        con.query(sql2,(err,result)=>{
            if(err){
              console.log(err);
            }
            else{
                console.log(result);
                res.send(
                    JSON.stringify({
                        result:"passed",
                        req_data: result
                    })
                );
            }
        })
      }

      

  });


  router.post("/pending_reqs",(req,res)=>{
    console.log(req.body);

    if(role_id === 1)
    {
        sql1 = `Select * from requests where req_status = 'Pending' and req_initiator_id = '${user_id}' order by req_id desc;`

        con.query(sql1,(err,result)=>{
            if(err){
              console.log(err);
            }
            else{
                console.log(result);
                res.send(
                    JSON.stringify({
                        result:"passed",
                        req_data: result
                    })
                );
            }
        })
    }
    else{
        sql2 = `Select * from requests where req_status = 'Pending' and w_id = '${w_id}' order by req_id desc;`

        con.query(sql2,(err,result)=>{
            if(err){
              console.log(err);
            }
            else{
                console.log(result);
                res.send(
                    JSON.stringify({
                        result:"passed",
                        req_data: result
                    })
                );
            }
        })

    }

    

});


router.post("/closed_reqs",(req,res)=>{
    console.log(req.body);

    if(role_id === 1){
        sql1 = `Select * from requests where req_status = 'closed' and req_initiator_id = '${user_id}' order by req_id desc;`

        con.query(sql1,(err,result)=>{
            if(err){
              console.log(err);
            }
            else{
                console.log(result);
                res.send(
                    JSON.stringify({
                        result:"passed",
                        req_data: result
                    })
                );
            }
        })
    }
    else{
        sql1 = `Select * from requests where req_status = 'closed' and w_id = '${w_id}' order by req_id desc;`

        con.query(sql1,(err,result)=>{
            if(err){
              console.log(err);
            }
            else{
                console.log(result);
                res.send(
                    JSON.stringify({
                        result:"passed",
                        req_data: result
                    })
                );
            }
        })
    }

    

});


router.post("/open_reqs",(req,res)=>{
    console.log(req.body);

    sql1 = `Select * from requests where w_id = '${w_id}' and req_level = '${role_id - 1 }' order by req_id desc;`

    con.query(sql1,(err,result)=>{
        if(err){
          console.log(err);
        }
        else{
            console.log(result);
            res.send(
                JSON.stringify({
                    result:"passed",
                    req_data: result
                })
            );
        }
    })

});


  module.exports = router;