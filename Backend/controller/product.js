const express = require("express");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const router = express.Router();
const Product = require("../model/product");
const Shop = require("../model/shop"); // Import Shop model
const ErrorHandler = require("../utils/ErrorHandler");
const { upload } = require("../multer");
const { isSeller} = require("../middleware/auth");
// Create product
router.post("/create-product", upload.array("images"), catchAsyncErrors(async (req, res, next) => {
  const shopId = req.body.shopId;
  const shop = await Shop.findById(shopId);

  if (!shop) {
    return next(new ErrorHandler("Shop Id is invalid!", 400));
  }

  const files = req.files;
  const imageUrls = files.map((file) => `${file.filename}`); // Assuming filename is the correct property

  const productData = req.body;
  productData.images = imageUrls;
  productData.shop = shop._id; // Store the shop ID, not the entire shop object

  const product = await Product.create(productData);

  res.status(201).json({
    success: true,
    message: "Product created successfully",
    product,
  });
}));

// get all products of a shop

router.get(
  "/get-all-products-shop/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const products = await Product.find({ shopId: req.params.id });

      res.status(201).json({
        success: true,
        products,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

//delete produc of  a shop
router.delete(
  "/delete-shop-product/:id",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const productId = req.params.id;

      const product = await Product.findByIdAndDelete(productId);

      if (!product) {
        return next(new ErrorHandler("Product is not found with this id", 500));
      }

      // for (let i = 0; 1 < product.images.length; i++) {
      //   const result = await cloudinary.v2.uploader.destroy(
      //     product.images[i].public_id
      //   );
      // }

      // await product.remove();

      res.status(201).json({
        success: true,
        message: "Product Deleted successfully!",
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);


module.exports = router;
