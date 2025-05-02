import userModle from '../models/userModle.js'


//add cart 
const addItem  = async (req, res) => {
    try{
        let userdata = await userModle.findOne({_id:req.userId})
        let cartData = userdata.cartData;

        if(!cartData[req.body.item]){
            cartData[req.body.item]=1;
        }else{
            cartData[req.body.item]+=1;
        }

        await userModle.findByIdAndUpdate(req.userId,{cartData});
        res.json({ sucess:true, message:"Added to Cart"})
    }catch(err){
        res.json({ sucess:false, message:err.message});
    }
 }

 //remove item
 const removeItem = async(req,res)=>{

    
     try{
        let userdata = await userModle.findOne({_id:req.userId})
        let cartData =  userdata.cartData;

        if(cartData[req.body.item]>0){
            cartData[req.body.item]-=1;
        }

    await userModle.findByIdAndUpdate(req.userId,{cartData});
    res.json({sucess:true,message:'removed'})

    }catch(err){
        console.log(err);
        res.json({sucess:false,message:err.message});

    }

 }


 //get cart items
 const getcartItems = async(req,res)=>{
   try{
       let userdata = await userModle.findOne({_id:req.userId})
       let cartData = userdata.cartData;
       res.json({sucess:true,data:cartData});
   }catch(err){
    console.log(err);
       res.json({sucess:false,message:err.message})
   }

 }

 const clearCart = async(req,res)=>{
    try{
        let userdata = await userModle.findOne({_id:req.userId})
        let cartData = {};
        await userModle.findByIdAndUpdate(req.userId,{cartData});
        res.json({sucess:true,data:{cartData}});
    }
    catch(err){
        console.log(err);
        res.json({sucess:false,message:err.message})
    }
 }

 export  { addItem , removeItem ,getcartItems ,clearCart}