var mongoose= require('mongoose');
var User=new mongoose.Schema({
  userId:Number,
  name:String,
  noOfOrders:{type:Number,default:0}
});

module.exports=mongoose.model('User',User); // it is used to populate as a model.
