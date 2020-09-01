const express= require('express');
const mongoose=require('mongoose');
const url= 'mongodb://localhost/Test';
const app= express();
mongoose.connect(url, {useNewUrlParser:true,useUnifiedTopology: true});

const con=mongoose.connection;

con.on('open',function(){
})
const routing= require('../Challenge/routing/url');
app.use('/',routing)
app.listen(3000);
module.exports = app;


