import foodModel from "../models/foodModel.js";
import  uploadImageToCloudinary  from "../utils/imageUploader.js";


//add food item

const addFood=async(req,res)=>{

     let food_image = req.files.filename;

     const FoodImage = await uploadImageToCloudinary(
      food_image,
      process.env.FOLDER_NAME
    )
    console.log(FoodImage)
     
     const food=new foodModel({
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        category:req.body.category,
        image:FoodImage.secure_url
     })
     try{
        await food.save();
        res.json({success:true,message:"Food Added"})
     }
     catch(error){
        console.log(error)
        res.json({success:false,message:"Error"})
     }
}

//all food list
const listFood=async(req,res)=>{
    try{
      const foods=await foodModel.find({});
      res.json({success:true,data:foods})

   }
   catch(error){
       console.log(error);
       res.json({success:false,message:"Error"})
    }
}

//remove food item
const removeFood=async(req,res)=>{
    try {
       //finding food to remove
       const food=await foodModel.findById(req.body.id);
       
      await foodModel.findByIdAndDelete(req.body.id);

       res.json({success:true,message:"food Removed"})

    } catch (error) {
         console.log(error);
         res.json({success:false,message:"Error"})
    }
}



export {addFood,listFood,removeFood}