import fs from "fs/promises";
const PRODUCTS_FILE = "./data/Products.json";

/**
 * Wait to read the file first, then parse its content and return it.
 * @returns empty array or products.
 */
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

function findProduct(productArray, Id) {
  return productArray.findIndex((currproduct) => currproduct.productId === Id);
}

/**
 *
 * @param {*} productId giving it an id from the parameters that we parse to an integer first.
 * @returns the product if it exists, otherwise throws error
 */
export async function getByID(productId) {
  let productArray = await getAllProds();
  let index = findProduct(productArray, productId);
  console.log(index);
  if (index === -1)
    throw new Error(`Product with ID:${productId} doesn't exist`);
  else return productArray[index];
}

/**
 * Set doesn't allow us to have duplicate values. So I create a new set and add the categories of the products in a new set. To retrieve: 3 values
 * @returns a new set with the names of the categories.
 */
export async function getCategoryNames() {
  let productArray = await getAllProds();
  let setOfCategories = new Set();
  for (let i = 0; i < productArray.length; i++) {
    setOfCategories.add(productArray[i].category);
  }
  // console.log(setOfCategories);
  return setOfCategories;
}

/**
 * Retrieve all products, create an array and for each product in the old array push the values in a new array. Might need it when I dont need details to be displayed.
 * @returns new array
 */
export async function getImportantInfo() {
  let productArray = await getAllProds();
  let newArray = [];
  //map
  productArray.forEach((product) => {
    let prod = product;
    // console.log(prod);
    // console.log(product.productName);
    newArray.push({
      productId: prod.productId,
      productName: prod.productName,
      price: prod.price,
      category: prod.category,
    });
  });
  // console.log(newArray);
  return newArray;
}

export async function addProduct(newProduct){
  let productArray = await getAllProds();
  let index = findProduct(productArray, newProduct.productId);
  if (index !== -1) {
    throw new Error(`Product with product Id ${newProduct.productId} already exists!`)
  } else {
    productArray.push(newProduct);
    let productArrayString = JSON.stringify(productArray);
    fs.writeFile(PRODUCTS_FILE, productArrayString);
  }
}

export async function deleteProduct(productId){
  let productArray = await getAllProds();
  let index = findProduct(productArray, productId);
  if(index === -1){
    throw new Error (`Product with ID:${productId} doesn't exist.`)
  }
  //starting from the index remove 1 product only.
  productArray.splice(index, 1);
  let productArrayString = JSON.stringify(productArray);
  fs.writeFile(PRODUCTS_FILE, productArrayString);
}