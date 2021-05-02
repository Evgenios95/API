import * as fs from "fs/promises";
const USERS_FILE = "./data/Users.json";
const PRODUCTS_FILE = "./data/Products.json";

export async function getAllProds() {
  try {
    let productsTxt = await fs.readFile(PRODUCTS_FILE);
    let products = JSON.parse(productsTxt);
    return products;
  } catch (err) {
    if (err.code === "ENOENT") {
      // file does not exits
      return []; // return empty array
    }
    // cannot handle this exception, so rethrow
    else throw err;
  }
}

export async function getAll() {
  try {
    let usersTxt = await fs.readFile(USERS_FILE);
    let users = JSON.parse(usersTxt);
    return users;
  } catch (err) {
    if (err.code === "ENOENT") {
      // file does not exits
      await save([]); // create a new file with empty array
      return []; // return empty array
    } // cannot handle this exception, so rethrow
    else throw err;
  }
}

export async function findUser(id) {
  let users = await getAll();

  // console.log(users);
  if (users) {
    let specificUser = users.find((user) => user.UserId === id);
    // console.log(specificUser);
    return specificUser;
  } else {
    throw new Error(
      `Unfortunately, the user with the id of ${id} doesn't exist.`
    );
  }
}

/**
 *
 * @param {*} id
 */
export async function addCart(id) {
  let users = await getAll();
  if (users) {
    const filteredUsers = users.filter((user) => user.UserId === id);
    let cart = { products: [], totalPrice: 0 };
    let filteredUser = filteredUsers[0];
    filteredUser["cart"] = cart;
    //if the array includes the user
    if (users.includes(filteredUser)) {
      const usersJson = JSON.stringify(users);
      await fs.writeFile(USERS_FILE, usersJson);
    } 
    console.log(filteredUser);
  }
}

export async function getCartUser(id) {
  let users = await getAll();
  if (users) {
    const filteredUsers = users.filter((user) => user.UserId === id);
    const userCart = filteredUsers[0].cart;
    if (!userCart) {
      throw new Error("This user has no cart");
    }
    return userCart;
  }
}

function findProduct(productArray, Id) {
  return productArray.findIndex((currproduct) => currproduct.productId === Id);
}

export async function getByID(productId) {
  let productArray = await getAllProds();
  let index = findProduct(productArray, productId);
  console.log(index);
  if (index === -1)
    throw new Error(`product with ID:${productId} doesn't exist 😫!`);
  else return productArray[index];
}

export async function addProductToCart(userId, productId) {
  let users = await getAll();
  if (users) {
    //retrieve product + filtered user by ids
    let index = await getByID(productId);
    const filteredUsers = users.filter((user) => user.UserId === userId);

    
    if (filteredUsers[0] === undefined) {
      throw new Error(`This user doesn't exist currently 😒!`)
    }

    //individual product values
    let productIdFinder = index.productId;
    let productPrice = index.price;

    //push the product id to my product array inside the users cart.
    let userCart = filteredUsers[0].cart.products;
    userCart.push(productIdFinder);

    //why can't it be changed if I assign it to a variable?
    filteredUsers[0].cart.totalPrice =
      filteredUsers[0].cart.totalPrice + +productPrice;

    let userString = JSON.stringify(users);
    fs.writeFile(USERS_FILE, userString);
  }
}

export async function deleteProductFromBasket(userId, productCartId) {
  let users = await getAll();
  let indexP = await getByID(productCartId);

  const filteredUsers = users.filter((user) => user.UserId === userId);
  let userProducts = filteredUsers[0].cart.products;
  // console.log(userProducts);
  let index = userProducts.findIndex((product) => product === productCartId);
  console.log(index);

  if (index !== -1) {
    let productPrice = indexP.price;
    // console.log(productPrice);
    userProducts.splice(index, 1);
    filteredUsers[0].cart.totalPrice =
      filteredUsers[0].cart.totalPrice - productPrice;
  } else {
    throw new Error(`Can't remove the item with the id: ${productCartId}, as it's not in the cart 😀!`);
  }
  // console.log(userProducts);
  let userString = JSON.stringify(users);
  fs.writeFile(USERS_FILE, userString);
}
