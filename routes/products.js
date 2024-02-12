const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
/* GET ALL PRODUCTS */
router.get("/", (req, res, next) => {
  Product.find()
    .then((products) => res.json(products))
    .catch((error) => next(error));
});

/* GET SINGLE PRODUCT BY ID */
router.get("/:id", (req, res, next) => {
  const { id } = req.params;
  Product.findById(id)
    .then((product) => res.json(product))
    .catch((error) => next(error));
});

/* Post a new product */
router.post("/", (req, res, next) => {
  Product.create(req.body)
    .then((product) => res.json(product))
    .catch((error) => next(error));
});

/* Update a product */
router.put("/:id", (req, res, next) => {
  const { id } = req.params;
  Product.findByIdAndUpdate(id, req.body)
    .then((product) => res.json(product))
    .catch((error) => next(error));
});

/* Path a product */
router.patch("/:id", (req, res, next) => {
  const { id } = req.params;
  Product.findByIdAndUpdate(id, req.body)
    .then((product) => res.json(product))
    .catch((error) => next(error));
});

/* Delete a product */
router.delete("/:id", (req, res, next) => {
  const { id } = req.params;
  Product.findByIdAndDelete(id)
    .then(() => res.json({ message: "Product deleted" }))
    .catch((error) => next(error));
});

module.exports = router;
