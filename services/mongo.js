const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
let db = null;

const initializeDatabase = async () => {
  try {
    const client = await MongoClient.connect('mongodb://localhost:27017', {
      auth: { user: 'adeline', password: 'mongo' },
      poolSize: 10,
      useNewUrlParser: true,
    });
    db = client.db('stackerine');
    const products = db.collection('products');
  } catch (e) {
    console.error(e);
  }
};

const insertProduct = async product => {
  try {
    await db.collection('products').insertOne(product);
  } catch (e) {
    console.error(e);
  }
};

const listProducts = async () => {
  try {
    const listProducts = await db
      .collection('products')
      .find()
      .toArray();
    return listProducts;
  } catch (e) {
    console.error(e);
  }
};

initializeDatabase().then(() => {
  insertProduct({ name: 'computer', description: 'A good computer.' });
  insertProduct({ name: 'screen', description: 'A good screen.' });
  insertProduct({ name: 'mouse', description: 'A good mouse.' });
  insertProduct({ name: 'keyboard', description: 'A good keyboard.' });
  insertProduct({ name: 'webcam', description: 'A good webcam.' });
  insertProduct({ name: 'USB port', description: 'A good USB port.' });
  insertProduct({ name: 'Touchpad', description: 'A good Touchpad.' });
  insertProduct({ name: 'Memory card', description: 'A good Memory card.' });
  insertProduct({ name: 'Hard drive', description: 'A good Hard drive.' });
  insertProduct({ name: 'Speaker', description: 'A good speaker.' });
});

const updateProduct = async (productId, dataToUpdate) => {
  try {
    await db
      .collection('products')
      .updateOne({ _id: ObjectId(productId) }, { $set: dataToUpdate });
  } catch (e) {
    console.error(e);
  }
};

const deleteProduct = async productId => {
  try {
    const { result } = await db
      .collection('products')
      .deleteOne({ _id: ObjectId(productId) });
    console.log(result);
  } catch (e) {
    console.error(e);
  }
};

const productsFilter = async (sortParams, page) => {
  try {
    return await db
      .collection('products')
      .find()
      .sort(sortParams)
      .skip(page * 5)
      .limit(5)
      .toArray();
  } catch (e) {
    console.error(e);
  }
};

module.exports = {
  updateProduct,
  deleteProduct,
  insertProduct,
  listProducts,
  productsFilter,
};
