import express from 'express';
import { addItem , removeItem , getcartItems ,clearCart} from '../controllers/cartController.js';
import authMiddleware from "../middleware/auth.js";

const cartRouter = express.Router();



cartRouter.post('/add',authMiddleware,addItem )
cartRouter.post('/remove',authMiddleware,removeItem)
cartRouter.post('/get',authMiddleware,getcartItems)
cartRouter.post('/clear',authMiddleware,clearCart)

export default cartRouter;

