var mongoose= require('mongoose');
var order=new mongoose.Schema({
  userId:Number,
  orderId:Number,
  subTotal:Number,
  date:Date,

});

module.exports=mongoose.model('Order',order); // it is used to populate as a model.