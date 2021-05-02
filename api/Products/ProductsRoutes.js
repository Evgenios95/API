import express from "express";

import {
  getAllProducts,
  getProduct,
  getCategories,
  getImportante,
  postProduct,
  deleteProductById
} from "./ProductsControllers.js";

const router = express.Router();

router.route("/").get(getAllProducts);
router.route("/categories").get(getCategories);
router.route("/info").get(getImportante);
router.route("/product").post(postProduct);
router.route("/:id").get(getProduct);
router.route("/:id").delete(deleteProductById);

export default router;