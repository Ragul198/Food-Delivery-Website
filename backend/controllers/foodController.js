import foodModel from "../models/foodModle.js";
import fs from "fs";


//add food item

const addfood = async(req,res)=>{

    let image_filename = `${req.file.filename}`;
    const food = new foodModel({
        name:req.body.name,
        price:req.body.price,
        description:req.body.description,
        category:req.body.category,
        image:image_filename
    })

    try{
        await food.save();
        res.json({sucess:true,message:"Food Item Added Successfully"});
    }catch(err){
        console.log("error",err)
        res.json({success:false,message:"Error in adding Food Item"});
    }

}
const getfoods=async(req,res)=>{
    try {
        const foods = await foodModel.find()
        res.json({ success: true, data: foods })
      } catch (error) {
        res.json({ success: false, message: error.message })
      }
}
const removefood=async(req,res)=>{
    try{
        const food = await foodModel.findById(req.body.id)
        fs.unlink(`uploads/${food.image}`,()=>{});

        await foodModel.findByIdAndDelete(req.body.id);
        res.json({success:true,message:"Food Item Deleted Successfully"})
    }
    catch(error){
        console.log("error",error);
        res.json({success:false,message:error.message})
    }
}
export {addfood ,getfoods , removefood}