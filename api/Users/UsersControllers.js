import { getAll, addCart, getCartUser, findUser, addProductToCart, deleteProductFromBasket } from "./Users.model.js";

export async function getAllUsers(req, res) {
  try {
    let allUsers = await getAll();
    res.json({ allUsers });
  } catch (error) {
    // res.statusMessage=
    res.status(400).send(error.message);
  }
}

export async function createUserCart(req, res) {
  const user = parseInt(req.params.id);
  try {
    await addCart(user);
    res.json({ success: "created" });
  } catch (error) {
    // res.statusMessage=
    res.status(400).send(error.message);
  }
}

export async function getCartByUserId(req, res) {
  const user = parseInt(req.params.id);
  try {
    const cart = await getCartUser(user);
    console.log(cart);
    res.json(cart);
  } catch (error) {
    res.status(400).send(error.message);
  }
}

export async function getUserById(req, res) {
  const userId = parseInt(req.params.id);
  try {
    const user = await findUser(userId);
    res.json(user);
  } catch (error) {
    res.status(400).send(error.message);
  }
}

export async function addP(req,res){
  try{
    const userId =parseInt(req.params.id);
    const productId = parseInt(req.params.pid);
    await addProductToCart(userId, productId);
    const user = await findUser(userId);
    res.json({user});
  } catch(error){
    res.status(400).send(error.message);
  }
}

export async function cartDelete(req, res){
  try {
    const userId =parseInt(req.params.id);
    const productId = parseInt(req.params.pid);
    await deleteProductFromBasket(userId, productId);
    res.json({Product: "deleted successfully!"})
  } catch (error) {
    res.status(400).send(error.message);
  }
}