const express = require('express');
const bodyParser = require('body-parser');
let userroute=require('./routes/userRoutes')
const path = require('path');
const app=express();
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(require("body-parser").json());
app.use(userroute);

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('omanga/build'));

    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'omanga','build','index.html'));
    });
}
const port=5000;

app.listen(process.env.PORT || 5000, ()=>console.log(`Server Started at port ${port}`))