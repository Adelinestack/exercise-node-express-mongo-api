const express = require('express');
const bodyParser = require('body-parser');
const {
  updateProduct,
  deleteProduct,
  insertProduct,
  listProducts,
  productsFilter,
} = require('./services/mongo');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//visualiser les produits
app.get('/', async (req, res) => {
  const products = await listProducts();
  res.json(products);
});

// - créer un produit
app.post('/', async (req, res) => {
  const newProduct = req.body;
  await insertProduct(newProduct);
  res.sendStatus(201);
});

// - modifier un produit
app.put('/:productId', async (req, res) => {
  const productId = req.params.productId;
  const dataToUpdate = req.body;
  await updateProduct(productId, dataToUpdate);
  res.sendStatus(204);
});

// - supprimer un produit
app.delete('/:productId', async (req, res) => {
  const productId = req.params.productId;
  await deleteProduct(productId);
  res.sendStatus(201);
});

app.get('/products', async (req, res) => {
  const { attr, order, page } = req.query;
  const products = await productsFilter(
    { [attr]: Number(order) },
    Number(page)
  );
  res.json(products);
});

app.listen(8080);
