var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "ieee"
});

con.connect((err)=>{
  if(!err)
  console.log('Connected to db');
  else
  console.log('lol: ' + JSON.stringify(err,undefined,2));
});

var express        =        require("express");
var bodyParser     =        require("body-parser");
var test           =        express();
test.use(bodyParser.urlencoded({ extended: false }));
test.use(bodyParser.json());

test.use('/', express.static('files'));

test.post('/reg',function(req,res){
    var user_name = req.body.pfname;
    if(user_name == null){
      res.end("must enter username");
      return;
    }
    if(user_name.length < 4)
    {
      res.end("username length must be 4 chars or more");
      return;
    }

    // lol ana zh2t mesh h3mel checks

    con.query('INSERT INTO `form` (`name`,`email`,`phone`,`university`,`faculty`,`academic_year`,`first_choice`,`second_choice`) VALUES ("'+user_name+'","'+req.body.pfemail+'","'+req.body.pfphone+'","'+req.body.pfuniversity+'","'+req.body.pffaculty+'","'+req.body.pfgraduationYear+'" , 0 , 0)', function(error, results, fields){
      if(error){
        res.end(error.message);
      }
      else{
        res.end("done");
      }
    });
    
});

test.listen(3000,function(){
  console.log("Started on PORT 3000");
})