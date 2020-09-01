var express= require('express');
var router=express.Router();
const User=require('../models/User')
const order=require('../models/Order');

router.get('/updateNoOfOrders',(req,res,next)=>{
  order.aggregate([{ $match:{}},{$group:{ _id:{
          userId:"$userId",
          },
          noOfOrders:{
          $sum:1
          },
        }
        },{
          $project:{
            _id:0,
            userId:"$_id.userId",
            noOfOrders:1
            }
          }
          ]).then((orderDetails)=>{
          orderDetails.forEach((data,index,arr)=>{
          User.updateMany({userId:data.userId},{
              $set: {
                  noOfOrders: data.noOfOrders,
                  updatedAt: new Date().toISOString()
              }
          }, { new: true }).then((doc) => {
              console.log(doc);
              console.log("Document Updated");
              if (Object.is(arr.length - 1, index)) {
                res.json({success:true,message:"Successfully updated"});
            }
               }).catch((err) => {
              console.log("Something wrong when updating data!");
              console.log(err);
              res.status(400);
              res.json({ code: err.code, name: err.name, msg: err.errmsg });
          });

           })
        }).catch((err)=>{
          res.status(400);
          res.json({ code: err.code, name: err.name, msg: err.errmsg });
        })
});
router.get('/orderDetails',(req,res)=>{
  order.aggregate(
     [
       {
         $match: {
         }
        },
    {
      $group: {
      _id:{
      userId:"$userId",
      },
      noOfOrders:{
      $sum:1
      },
      averageBillValue: { $avg: "$subtotal" }
      }
    },

    // Stage 3
    {
      $lookup: {
          "from" : "users",
          "localField" : "_id.userId",
          "foreignField" : "userId",
          "as" : "userData"
      }
    },

    // Stage 4
    {
      $project: {
        _id:0,
      userId:"$_id.userId",
      name:{$arrayElemAt:["$userData.name",0]},
      noOfOrders:1,
      averageBillValue: { $floor: "$averageBillValue" } 
      }
    } ,
     ] ).then((orderDetails)=>{
         res.json(orderDetails);
     }).catch((err)=>{
      res.status(400);
      res.json({ code: err.code, name: err.name, msg: err.errmsg });
     })
    
 });



module.exports = router; //--> for accessable public
