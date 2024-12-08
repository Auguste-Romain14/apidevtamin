const express = require("express");
const Product = require("../models/productModel");
const router = express.Router();
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

// liste des produits

// liste des produits
router.get("/", getAllProducts);

// liste des produits par id
router.get("/:id", getProductById);

// creation d'un produit
router.post("/", createProduct);

// modification d'un produit
router.put("/:id", updateProduct);

// suppression d'un produit
router.delete("/:id", deleteProduct);

module.exports = router;
