import express from "express"
const app = express()
const PORT = 8080
const srteverRoutes = require("./routes");
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}));
app.listen(PORT, ()=>{console.log(`App listening on port http://localhost:${PORT}`);})
app.use(express.urlencoded({
    extended: true
}));
app.get ("/kepio", (req, res)=>{
    return res.json({kepio:"awper"})
})


// Cargar los productos desde el archivo
const productsData = JSON.parse(fs.readFileSync('./routes/productsRouter.json'));

// Ruta para obtener todos los productos o un número limitado de ellos
app.get('/products', (req, res) => {
  const { limit } = req.query;
  
  if (limit) {
    const limitedProducts = productsData.slice(0, limit);
    res.json(limitedProducts);
  } else {
    res.json(productsData);
  }
});

// Ruta para obtener un producto por su ID
app.get('./routes/productsRouters.js/:id', (req, res) => {
  const { id } = req.params;
  const product = productsData.find(p => p.id === parseInt(id));

  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: 'El producto no existe' });
  }
});