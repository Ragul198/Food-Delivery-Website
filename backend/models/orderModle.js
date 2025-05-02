import mongoose from "mongoose";

const order = new mongoose.Schema({
    
    userId:{
        type:String,
        required:true
    },
    items:{
            type:Array,
            required:true
     },
     amount:{
         type:Number,
         required:true
     },
     address:{
         type:Object,
         required:true
     },
     status:{
         type:String,
         default:"Food Processing"
     },
     date:{
         type:Date,
         default:new Date()
     },
     paymentStatus:{
        type:String,
        default:"pending"
     },
     paymentId:{
        type:String,
        default:null
     }
    

})


const OrderModel=mongoose.models.order || mongoose.model('order',order)
   
export default OrderModel;