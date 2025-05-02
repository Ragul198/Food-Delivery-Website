import OrderModel from "../models/orderModle.js";
import userModel from "../models/userModle.js";
import Razorpay from "razorpay";
import crypto from "crypto";
import { log } from "console";

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET_KEY, // DO NOT expose this on frontend!
  });

//place order using frontend
const placeOrder = async(req,res)=>{

    try {

        const newOrder = new OrderModel({
            userId:req.userId,
            items:req.body.items,
            amount:req.body.amount,
            address:req.body.address
        })
        
        await newOrder.save();
        await userModel.findByIdAndUpdate(req.userId,{cartData:{}}); 
        console.log(newOrder);

        const payment_order = await razorpay.orders.create({
            amount: req.body.amount*100 , // Amount in paise
            currency: "INR",
            receipt: `receipt_order_${newOrder._id}`,
            notes: {
              userId: req.userId.toString()
            }
          });
        

          res.json({
            success: true,
            razorpayOrder: payment_order,
            orderId: newOrder._id
          });

        
        
 } 
 catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
    }
};

const verifyPayment = async(req,res)=>{
    const {
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        orderId
        
      } = req.body;

      

      try{
    
      const body = razorpay_order_id + "|" + razorpay_payment_id;
    
      const expectedSignature = crypto
        .createHmac("sha256",process.env.RAZORPAY_SECRET_KEY)
        .update(body.toString())
        .digest("hex");
    
      if (expectedSignature === razorpay_signature) {
        //  Signature matched — mark order as paid
        await OrderModel.findByIdAndUpdate(orderId, {
          paymentId: razorpay_payment_id,
          paymentStatus: "Paid"
        });
    
        return res.json({ success: true , message:"payment successful" });
      } else {
        //  Signature mismatch — possible fraud
        await OrderModel.findByIdAndDelete(orderId);
        return res.json({ success: false ,message:"payment unsuccessful order canceled" });
      }
    } catch(error){
        console.log(error);
        return res.json({ success: false,message:error.message});
    }
    };

 //user orders for frontend
 
 const userOrders = async (req ,res)=>{
  try{

    const orders = await OrderModel.find({userId:req.userId}).populate("items.productId").sort({_id:-1});
    res.json({success:true,data:orders});

  }catch(err){
    console.log(err);
    res.json({success:false,message:err.message});
    
  }
 }

 //getting all orders for admin dashboard

 const ListOders_admin = async(req,res)=>{

try{
  const orders = await OrderModel.find().sort({_id:-1});
  res.json({success:true,data:orders});

}catch(err){
  console.log(err);
  res.json({success:false,message:err.message});

}

 }
// API for updating order status
const updatestatus = async(req,res)=>{
  try{
    await OrderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status})
    res.json({success:true,message:'order updated successfully'})

  }
  catch(err){
    console.log(err);
    res.json({success:false,message:err.message});

  }
}
//clear all orders of testing purpose
const clear_orders = async(req,res)=>{
    try {
        await OrderModel.deleteMany({});
        res.json({success:true,message:'all orders cleared'});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message});
    }
};





export {placeOrder , verifyPayment ,clear_orders,userOrders,ListOders_admin,updatestatus};