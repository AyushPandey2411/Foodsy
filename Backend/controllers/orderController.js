import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";


// Initialize Razorpay with environment variables
const stripe = new Stripe(
  process.env.STRIPE_SECRET_KEY
);

//this frontend url will be changed when deploying online

 const frontend_url = "https://foodsyrest.netlify.app";
// const frontend_url = "http://localhost:5174";

// Placing user order from frontend
const placeOrder = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;

    // Create new order
    const newOrder = new orderModel({ userId, items, amount, address });

    // Save order in database
    await newOrder.save();

    // Clear user cart after order
    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    // Prepare line items for Razorpay
    const line_items = items.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: { name: item.name },
        unit_amount: item.price * 100 * 80, // Convert dollars to rupees
      },
      quantity: item.quantity,
    }));

    line_items.push({
      price_data: {
        currency: "inr",
        product_data: { name: "Delivery Charges" },
        unit_amount: 2 * 100 * 80, // Delivery charge
      },
      quantity: 1,
    });

  
    const session=await stripe.checkout.sessions.create({
      line_items:line_items,
      mode:'payment',
      success_url:`${frontend_url}/myorders`,
      cancel_url:`${frontend_url}/paymentError`
    }
  )

  res.json({success:true,session_url:session.url})
}
catch(error)
  {
    console.log(error);
    res.json({success:false,message:"Error"})
  }
}

const verifyOrder=async (req,res) => {
    const{orderId,success}=req.body;
    try {
      if(success=="true")
      {
        await orderModel.findByIdAndUpdate(orderId,{payment:true});
        res.json({success:true,message:"Paid"})
      }
      else{
        await orderModel.findByIdAndDelete(orderId);
        res.json({success:false,message:"Not Paid"})
    }
    } catch (error) {
      console.log(error);
      res.json({success:false,message:"Error"}) 
    }
}



// User orders for frontend
const userOrders = async (req, res) => {
  try {
    const { userId } = req.body;

    // Get all orders of user
    const orders = await orderModel.find({ userId:req.body.userId});
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error fetching user orders" });
  }
};

//getting all orders in admin panel
const listOrders=async(req,res)=>{
    try {
      const orders=await orderModel.find({});
      res.json({success:true,data:orders})

    } catch (error) {
      console.log(error);
      res.json({success:false,message:"Error"})
      
    }
}


//api for updating order status
const updateStatus=async(req,res)=>{
     try {
      //updating status in database
       await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status});
       res.json({success:true,message:"Status Updated"})

     } catch (error) {
         console.log(error);
         res.json({success:false,message:"Error"})

     }
}



export { placeOrder, userOrders,verifyOrder,listOrders,updateStatus };
