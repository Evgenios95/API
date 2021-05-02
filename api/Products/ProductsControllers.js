import {
  getAllProds,
  getByID,
  getCategoryNames,
  getImportantInfo,
  addProduct,
  deleteProduct
} from "./products.model.js";

/**
 * Store the category parameter in a variable and use it in order to filter the products if their category matches the category parameter. Then create an array of the filteredProducts, otherwise just print all products if there is not specific category in the ?category=(nameofcategory).
 * @param {*} req request
 * @param {*} res response
 */
export async function getAllProducts(req, res) {
  const category = req.query.category;
  try {
    let allProducts = await getAllProds();
    if (category) {
      const filteredProducts = allProducts.filter(
        (product) => product.category === category
      );
      res.json({ filteredProducts: filteredProducts });
    } else {
      res.json({ allProducts });
    }
  } catch (error) {
    // res.statusMessage=
    res.status(400).send(error.message);
  }
}

export async function getProduct(req, res) {
  try {
    //since it's in string format, parse it.
    let id = parseInt(req.params.id);
    let product = await getByID(id);
    res.json(product);
  } catch (error) {
    // res.statusMessage=
    res.status(400).send(error.message);
  }
}

//just returns the names of the categories in an array.
export async function getCategories(req, res) {
  try {
    let categories = await getCategoryNames();
    let productCategories = Array.from(categories);
    res.json({ productCategories });
  } catch (error) {
    // res.statusMessage=
    res.status(400).send(error.message);
  }
}

//might need it in the front page or somewhere else, where I don't really need the product description.
export async function getImportante(req, res) {
  try {
    let info = await getImportantInfo();
    res.json({ informationWithoutDescription: info });
  } catch (error) {
    // res.statusMessage=
    res.status(400).send(error.message);
  }
}

export async function postProduct(req, res) {
  try {
    let newProduct = req.body;
    await addProduct(newProduct);
    let productArray = await getAllProds();
    await res.json({ productArray });
  } catch (error) {
    res.status(400).send(error.message);
  }
}

export async function deleteProductById(req, res) {
  try {
    let prodId = req.params.id;
    prodId = parseInt(prodId);
    await deleteProduct(prodId);
    res.json(`Product with ${prodId} successfully removed.`)
  } catch (error) {
    res.status(400).send(error.message);
  }
}
