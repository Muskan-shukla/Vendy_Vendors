
const express=require("express");
const { upload } = require("../multer");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Shop=require("../model/shop");
const router=express.Router();
const Event=require("../model/event");


router.post("/create-event",
     upload.array("images"), 
     catchAsyncErrors(async (req, res, next) => {
    const shopId = req.body.shopId;
    const shop = await Shop.findById(shopId);
  
    if (!shop) {
      return next(new ErrorHandler("Shop Id is invalid!", 400));
    }
  
    const files = req.files;
    const imageUrls = files.map((file) => `${file.filename}`); // Assuming filename is the correct property
  
    const eventData = req.body;
    eventData.images = imageUrls;
    eventData.shop = shop._id; // Store the shop ID, not the entire shop object
  
    const product = await Event.create(eventData);
  
    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product,
    });
  }));

  module.exports=router;