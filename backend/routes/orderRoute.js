import express from "express";
import authMiddleware from "../middleware/auth.js";
import { placeOrder ,verifyPayment , clear_orders ,userOrders ,ListOders_admin,updatestatus } from "../controllers/orderController.js";


const OrderRouter = express.Router();



OrderRouter.post("/placeorder",authMiddleware,placeOrder);
OrderRouter.post("/verifyPayment",verifyPayment);
OrderRouter.post("/clear",clear_orders);
OrderRouter.post("/userOrders",authMiddleware,userOrders);
OrderRouter.get("/list",ListOders_admin);
OrderRouter.post("/status",updatestatus);










export default OrderRouter;





