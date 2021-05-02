import express from "express";

import {
  getAllUsers,
  createUserCart,
  getCartByUserId,
  getUserById,
  addP,
  cartDelete
} from "./UsersControllers.js";

const router = express.Router();

router.route("/").get(getAllUsers);
router.route("/:id").post(createUserCart);
router.route("/:id").get(getUserById);
router.route("/:id/cart").get(getCartByUserId);
router.route("/:id/cart/:pid").put(addP);
router.route("/:id/cart/:pid").delete(cartDelete);

export default router;
//The POST method is generally used to send data inside the entity-body section. Authentication, File Uploads, etc. are all done via POST method requests.
//GET method is used to establish connections and receive info from the server. It is used while making API calls, where no modification of data is involved.
