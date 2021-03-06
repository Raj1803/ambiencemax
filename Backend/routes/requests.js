let express = require("express"),
  async = require("async"),
  router = express.Router(),
  con = require("../mysql_config/config");

  user_id = 2;
  role_id = 2;
  w_id = 1;

  router.post("/all_reqs",(req,res)=>{

    data = req.body;
    user_id = data.user_id;
    console.log(data);
          var sql2 = `select role_id from access where user_id = '${user_id}';`
          con.query(sql2, function (err, result) {
            if (err) {
              console.log(err);
            } else {
              role_id = result[0].role_id;
              console.log(result);
              
                sql3 = `Select h_id from access where user_id = '${user_id}' and role_id = '${role_id}';`
                con.query(sql3,function(err , result){
                  if(err){
                    console.log(err);
                  }else{
                    h_id = result[0].h_id;
                    len = h_id.length;
                    console.log('length of h_id is ' + len);
                    console.log(result);
                    // h_id is substr of b_id ---> w_id (Link table)
                    sql4 = `Select * from link inner join access on link.b_id = access.h_id where '${h_id}' = substr(b_id,1,'${len}');`
                    con.query(sql4,function(err,result){
                      if(err){
                        console.log(err);
                      }else{
                        if(result.length > 0){
                          let w_id;
                          reqData = [];
                          const loop = new Promise((resolve,reject) =>{  result.forEach((element,index) => {
                                w_id = element.work_id;
                                console.log(w_id);
                                sql5 = `Select * from requests where w_id = '${w_id}' order by req_id desc;select count(*) as "closed" from requests where w_id = '${w_id}' and req_status = 'closed'`;
                                let fetch = new Promise((resolve,reject)=>{
                                con.query(sql5,function(err,result){
                                  if(err){
                                    console.log(err);
                                  }else{
                                    reqData.push(...result[0]);
                                    resolve();
                                  }
  
                                })
                              })
                              fetch.then(()=>{
                                // console.log(reqData);
                                if(index === result.length -1){
                                  resolve();
                                }
                              })
  
                          })
  
                        })
                        loop.then(()=>{
                          // console.log(reqData);
                          res.send(
                            JSON.stringify({
                              result: "passed",
                             // user_id: user_id,
                              //req_data: reqData.slice(0,10),
                              req_data: reqData,
                              role_id : role_id,
                              //req_stats: req_stats,
                              h_id: h_id
                            })
                          );
                        })
                        }
                      }
                    })
                  }
                })
              //}
            }
          })

    //   console.log(req.body);

    //   if(role_id === 1)
    //   {
    //     sql1 = `Select * from requests where req_initiator_id = '${user_id}' order by req_id desc;`

    //     con.query(sql1,(err,result)=>{
    //         if(err){
    //           console.log(err);
    //         }
    //         else{
    //             console.log(result);
    //             res.send(
    //                 JSON.stringify({
    //                     result:"passed",
    //                     req_data: result
    //                 })
    //             );
    //         }
    //     })
    //   }
    //   else{
    //     sql2 = `Select * from requests where w_id = '${w_id}' order by req_id desc;`

    //     con.query(sql2,(err,result)=>{
    //         if(err){
    //           console.log(err);
    //         }
    //         else{
    //             console.log(result);
    //             res.send(
    //                 JSON.stringify({
    //                     result:"passed",
    //                     req_data: result
    //                 })
    //             );
    //         }
    //     })
    //   }

      

  });


  router.post("/pending_reqs",(req,res)=>{

    data = req.body;
    user_id = data.user_id;
    console.log(data);
    sql1 = `select * from requests inner join workflow on(workflow.w_id=requests.w_id) where req_status='Pending' and (w_flow like '%${user_id},%' or req_initiator_id='${user_id}') and req_level<>'${user_id}' order by req_id desc;`
      con.query(sql1, (err, result) => {
    if (err) {
      console.log(err);
    }
    else {
      console.log(result);
      res.send(
        JSON.stringify({
          result: "passed",
          req_data: result
        })
      );
    }
  })



    // console.log(req.body);

    // if(role_id === 1)
    // {
    //     sql1 = `Select * from requests where req_status = 'Pending' and req_initiator_id = '${user_id}' order by req_id desc;`

    //     con.query(sql1,(err,result)=>{
    //         if(err){
    //           console.log(err);
    //         }
    //         else{
    //             console.log(result);
    //             res.send(
    //                 JSON.stringify({
    //                     result:"passed",
    //                     req_data: result
    //                 })
    //             );
    //         }
    //     })
    // }
    // else{
    //     sql2=`select * from requests inner join workflow on(workflow.w_id=requests.w_id) where req_status='Pending' and w_flow like '%${user_id},%' and ${user_id}<>req_level order by req_id desc;`
    //     //sql2 = `Select * from requests where req_status = 'Pending' and w_id = '${w_id}' order by req_id desc;`

    //     con.query(sql2,(err,result)=>{
    //         if(err){
    //           console.log(err);
    //         }
    //         else{
    //             console.log(result);
    //             res.send(
    //                 JSON.stringify({
    //                     result:"passed",
    //                     req_data: result
    //                 })
    //             );
    //         }
    //     })

    // }

    

});


router.post("/closed_reqs",(req,res)=>{

    data = req.body;
    user_id = data.user_id;
    console.log(data);
          var sql2 = `select role_id from access where user_id = '${user_id}';`
          con.query(sql2, function (err, result) {
            if (err) {
              console.log(err);
            } else {
              role_id = result[0].role_id;
              console.log(result);
              
                sql3 = `Select h_id from access where user_id = '${user_id}' and role_id = '${role_id}';`
                con.query(sql3,function(err , result){
                  if(err){
                    console.log(err);
                  }else{
                    h_id = result[0].h_id;
                    len = h_id.length;
                    console.log('length of h_id is ' + len);
                    console.log(result);
                    // h_id is substr of b_id ---> w_id (Link table)
                    sql4 = `Select * from link inner join access on link.b_id = access.h_id where '${h_id}' = substr(b_id,1,'${len}');`
                    con.query(sql4,function(err,result){
                      if(err){
                        console.log(err);
                      }else{
                        if(result.length > 0){
                          let w_id;
                          reqData = [];
                          const loop = new Promise((resolve,reject) =>{  result.forEach((element,index) => {
                                w_id = element.work_id;
                                console.log(w_id);
                                sql5 = `Select * from requests where req_status = 'closed' and w_id = '${w_id}' order by req_id desc;select count(*) as "closed" from requests where w_id = '${w_id}' and req_status = 'closed'`;
                                let fetch = new Promise((resolve,reject)=>{
                                con.query(sql5,function(err,result){
                                  if(err){
                                    console.log(err);
                                  }else{
                                    reqData.push(...result[0]);

                                    resolve();
                                  }
  
                                })
                              })
                              fetch.then(()=>{
                                // console.log(reqData);
                                if(index === result.length -1){
                                  resolve();
                                }
                              })
  
                          })
  
                        })
                        loop.then(()=>{
                          // console.log(reqData);
                          res.send(
                            JSON.stringify({
                              result: "passed",
                             // user_id: user_id,
                              //req_data: reqData.slice(0,10),
                              req_data: reqData,
                              role_id : role_id,
                              //req_stats: req_stats,
                              h_id: h_id
                            })
                          );
                        })
                        }
                      }
                    })
                  }
                })
              //}
            }
          })
      
    


    // console.log(req.body);

    // if(role_id === 1){
    //     sql1 = `Select * from requests where req_status = 'closed' and req_initiator_id = '${user_id}' order by req_id desc;`

    //     con.query(sql1,(err,result)=>{
    //         if(err){
    //           console.log(err);
    //         }
    //         else{
    //             console.log(result);
    //             res.send(
    //                 JSON.stringify({
    //                     result:"passed",
    //                     req_data: result
    //                 })
    //             );
    //         }
    //     })
    // }
    // else{
    //     sql1 = `Select * from requests where req_status = 'closed' and w_id = '${w_id}' order by req_id desc;`

    //     con.query(sql1,(err,result)=>{
    //         if(err){
    //           console.log(err);
    //         }
    //         else{
    //             console.log(result);
    //             res.send(
    //                 JSON.stringify({
    //                     result:"passed",
    //                     req_data: result
    //                 })
    //             );
    //         }
    //     })
    // }

    

});


router.post("/open_reqs",(req,res)=>{

    data = req.body;
    user_id = data.user_id;
    console.log(data);
    console.log(data);
  sql1 = ` select * from requests inner join workflow on(workflow.w_id=requests.w_id) where req_status='Pending' and ${user_id}=req_level order by req_id desc;`
  con.query(sql1, (err, result) => {
    if (err) {
      console.log(err);
    }
    else {
      console.log(result);
      res.send(
        JSON.stringify({
          result: "passed",
          req_data: result
        })
      );
    }
  })
  
    // console.log(req.body);

    // //sql1 = `Select * from requests where w_id = '${w_id}' and req_level = '${ role_id - 1 }' order by req_id desc;`
    // sql1 = `select * from requests inner join workflow on(workflow.w_id=requests.w_id) where req_status='Pending' and ${user_id}=req_level order by req_id desc;`

    // con.query(sql1,(err,result)=>{
    //     if(err){
    //       console.log(err);
    //     }
    //     else{
    //         console.log(result);
    //         res.send(
    //             JSON.stringify({
    //                 result:"passed",
    //                 req_data: result
    //             })
    //         );
    //     }
    // })

});


  module.exports = router;