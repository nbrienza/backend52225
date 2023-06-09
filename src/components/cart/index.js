const Cart = require('./cartController');
const { Router } = require('express');
const bodyParser = require("body-parser");

const cartController = new Cart('../products/productManager.js')

module.exports = (app) => {
  let router = new Router();
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use('/../src/routes/productsRouters.js', router);
  router.get('/', cartController.getAllCarts.bind(cartController));
  router.post('/', cartController.createNewCart.bind(cartController));
  router.get('./:cid', cartController.getCartById.bind(cartController));
  router.post('/:cid/product/:pid', cartController.updateCartWithProduct.bind(cartController));
}