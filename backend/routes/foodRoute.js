import express from "express";
import {addfood,getfoods,removefood} from '../controllers/foodController.js';
import multer from "multer";

const foodRouter = express.Router();

//image storage engine 


const storage = multer.diskStorage({
    destination:"uploads",
    filename:(req,file,cb)=>{
        return cb(null,`${Date.now()}-${file.originalname}`);
    }
})

const upload = multer({storage:storage});

foodRouter.post('/add', upload.single("image") ,addfood);
foodRouter.get("/list", getfoods);
foodRouter.post("/remove", removefood);




export default foodRouter;