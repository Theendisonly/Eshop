const express = require("express");
const router = express.Router();
const { Category } = require("../models/category");
const { Product } = require("../models/product");
const mongoose = require('mongoose');

router.get(`/`, async (req, res) => {
  const productList = await Product.find();
  //   const productList = await Product.find().select('name image -_id');

  if (!productList) {
    res.status(500).json({ error: err, succes: false });
  }
  res.send(productList);
});

router.get(`/:id`, async (req, res) => {
  const product = await Category.findById(req.params.id).populate("category");

  if (!product) {
    res
      .status(500)
      .json({ message: "The product with the given ID was not found." });
  }
  res.status(200).send(product);
});

router.get(`/get/count`, async (req, res) => {
  const productCount = await Product.countDocuments((count) => count);

  if (!productCount) {
    res.status(500).json({ error: err, succes: false });
  }
  res.send({
    productCount: productCount
  });
});

// app.post(`${api}/products`,(req,res)=>{
//     const newProduct = req.body;
//     console.log(newProduct);
//     res.send(newProduct);
// })
router.post(`/`, async (req, res) => {
  const category = await Category.findById(req.body.category);
  if (!category) return res.status(400).send("Invalid Category");

  const product = new Product({
    name: req.body.name,
    description: req.body.description,
    richDescription: req.body.richDescription,
    image: req.body.image,
    brand: req.body.brand,
    price: req.body.price,
    category: req.body.category,
    countInStock: req.body.countInStock,
    rating: req.body.rating,
    numReviews: req.body.numReviews,
    isFeatured: req.body.isFeatured,
  });
  product
    .save()
    .then((createdProduct) => {
      res.status(201).json(createdProduct);
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
        success: false,
      });
    });
});

router.put("/:id", async (req, res) => {
    if(!mongoose.isValidObjectId(req.params.id)){
       return res.status(400).send("Invalid Product Id");
    }
  const category = await Category.findById(req.body.category);
  if (!category) return res.status(400).send("Invalid Category");

  const product = await product.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      description: req.body.description,
      richDescription: req.body.richDescription,
      image: req.body.image,
      brand: req.body.brand,
      price: req.body.price,
      category: req.body.category,
      countInStock: req.body.countInStock,
      rating: req.body.rating,
      numReviews: req.body.numReviews,
      isFeatured: req.body.isFeatured,
    },
    { new: true }
  );

  if (!product) return res.status(404).send("the product cannot be created!");

  res.send(product);
})

router.delete('/:id', (req, res)=>{
    Category.findByIdAndRemove(req.params.id)
    .then(product => {
        if(product){
            return res.status(200).json({success: true, message: 'the product was deleted'})
        } else {
            return res.status(404).json({success: false, message: 'product not found!'})
        }
    })
    .catch(err => {
        return resp.status(400).json({success: false, error: err})
    })
})

module.exports = router;
