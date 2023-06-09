const fs = require('fs');

class Product {
  static id = 0;

  constructor(path) {
    this.path = path;
    this.props = ['title', 'description', 'price', 'thumbnail', 'code', 'stock'];
    try {
      this.loadProductsFromFile();
    } catch (error) {
      console.log('Error reading file:', error);
      this.products = [];
    }
    Product.id = this.calculateMaxProductId();
  }

  loadProductsFromFile() {
    const fileData = fs.readFileSync(this.path, 'utf-8');
    this.products = JSON.parse(fileData);
  }

  calculateMaxProductId() {
    return this.products.reduce((prev, curr) => (
      curr.id >= prev ? curr.id : prev
    ), 0);
  }

  getAllProducts(req, res) {
    try {
      let { limit } = req.query;
      let productsToSend = this.products;

      if (limit) {
        productsToSend = productsToSend.slice(0, limit);
      }

      res.send(productsToSend);
    } catch (error) {
      res.status(500).send('Internal Server Error');
    }
  }

  getProductById(req, res) {
    try {
      let paramId = req.params.pid;
      let productFound = this.products.find(product => product.id == paramId);
      const response = productFound ? productFound : { error: `No se encontró ningún producto con el id ${paramId}` };
      res.send(response);
    } catch (error) {
      res.status(500).send('Internal Server Error');
    }
  }

  isCodeValid(product) {
    return this.products.some(item => item.code === product.code);
  }

  addToCart(req, res) {
    try {
      let newProduct = req.body;
      console.log(newProduct);

      for (let prop of this.props) {
        if (!newProduct.hasOwnProperty(prop) || this.isCodeValid(newProduct)) {
          res.status(400).send('Producto Inválido!');
          return; // Return early if product is invalid
        }
      }

      const newProductId = ++Product.id;
      const updatedProducts = [...this.products, { id: newProductId, ...newProduct }];
      fs.writeFileSync(this.path, JSON.stringify(updatedProducts, null, 2));
      this.products = updatedProducts;

      res.send(this.products);
    } catch (error) {
      res.status(500).send('Internal Server Error');
    }
  }

  updateProduct(req, res) {
    try {
      let param = parseInt(req.params.pid);
      let updatedFields = req.body;

      const updateProductIndex = this.products.findIndex(product => product.id === param);

      if (updateProductIndex !== -1) {
        Object.assign(this.products[updateProductIndex], updatedFields);
        fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2));
        res.send(this.products);
      } else {
        res.status(404).send('Product not found');
      }
    } catch (error) {
      res.status(500).send('Internal Server Error');
    }
  }

  deleteProduct(req, res) {
    try {
      const id = parseInt(req.params.pid);
      const filteredProducts = this.products.filter(product => product.id !== id);
      fs.writeFileSync(this.path, JSON.stringify(filteredProducts, null, 2));
      this.products = filteredProducts;

      res.send(filteredProducts);
    } catch (error) {
      res.status(500).send('Internal Server Error');
    }
  }
}

module.exports = Product;