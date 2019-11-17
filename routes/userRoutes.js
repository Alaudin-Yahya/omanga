let express = require('express');
let router = express.Router();
const bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
//var url = "mongodb+srv://yahya:yahya@cluster0-uhwft.mongodb.net/test?retryWrites=true&w=majority"  ;
 var url = "mongodb://localhost:27017/db";

router.post('/api/signup', (req,res)=>{
    console.log('user Route')
    //res.send(req.body);ss
    let found = false;
    MongoClient.connect(url,{ useNewUrlParser: true } ,function(err, db) {
      if (err) {throw err};
      var dbo = db.db("signup");
      dbo.collection("users").find({}, { projection: {  } }).toArray(function(err, result) {
        if (err) throw err;
        result.map((item,index)=>{
          if (req.body.email===item.email){
             console.log(item.email+"_already exists");
            //res.send("Email ALready Exists..!!")
            found=true;
          }
          
        })
        if (found==false){
          MongoClient.connect(url,{ useNewUrlParser: true } ,(err, db)=> {
              if (err) throw err;//
              var dbo = db.db("signup");
              //var myobj = { firstname: "Abuabakr", lastname: "Ali", email:"hamza@gmail.com" , password: "lala" };
              var myobj = req.body;
              dbo.collection("users").insertOne(myobj, (err, res)=> {
                if (err) throw err;
                //console.log(res);
                console.log("1 document inserted");
                db.close();
              });
              res.json("Account created")
                
          });
        }
        else {
          res.json('Email Already Existsss!!')
        }    
        db.close();
      });
    });
    
      
})

router.post('/api/login',(req,res)=>{
  let found = false;
  MongoClient.connect(url,{ useNewUrlParser: true } ,function(err, db) {
    if (err) throw err;
    var dbo = db.db("signup");
    dbo.collection("users").find({}, { projection: {  } }).toArray(function(err, result) {

      if (err) throw err;
      result.map((item,index)=>{
        if (req.body.email==item.email && req.body.password===item.password){

          //console.log(+" exists");
          res.json(item._id)
          found=true;
          //var name = item.firstname+" "+ item.lastname;
         // console.log(item._id)
        }
        
        
      })
      if (!found){
        res.json(false)
      }

    });
  });
  
})


router.post('/api/auth',(req,res)=>{
  console.log("jsjsj")
  MongoClient.connect(url,{ useNewUrlParser: true } ,function(err, db) {
    if (err) throw err;
    var dbo = db.db("signup");
    dbo.collection("users").find({}, { projection: {  } }).toArray(function(err, result) {
      
      if (err) {console.log("error ara ha bhai")};
      
      result.map((item,index)=>{
        
        if (req.body.token==item._id){
          var name = item.firstname+" "+ item.lastname;
          console.log(req.body)
    
          console.log(name+" exists");
          res.json(name)
          //found=true;
          
        }
        
        
      })
      // if (!found){
      //   res.json(false)
      // }

    });
  });

})


router.post('/api/reviewPost',(req,res)=>{
  MongoClient.connect(url,{ useNewUrlParser: true } ,(err, db)=> {
    if (err) throw err;//
    var dbo = db.db("signup");
    //var myobj = { firstname: "Abuabakr", lastname: "Ali", email:"hamza@gmail.com" , password: "lala" };
    var myobj = req.body;
    dbo.collection("reviews").insertOne(myobj, (err, res)=> {
      if (err) throw err;
      //console.log(res);
      console.log("1 document inserted");
      db.close();
    });
    res.json("Review Submitted")
      
});

})

router.get('/api/reviewGet',(req,res)=>{
  MongoClient.connect(url,{ useNewUrlParser: true } ,function(err, db) {
    if (err) throw err;
    var dbo = db.db("signup");
    dbo.collection("reviews").find({}, { projection: {  } }).toArray(function(err, result) {
      
      if (err) {console.log("error ara ha bhai")};
      res.json(result.reverse())
      
      // if (!found){
      //   res.json(false)
      // }

    });
  });
})

module.exports = router