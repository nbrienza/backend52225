class ProductManager{
    constructor() {
        this.products = [];
        this.nuevoID = 1
    }

    addProduct(title,description,price,thumbnail,code,stock){

        const productoExiste =this.products.find((producto) => producto.code === code)
        if (productoExistente){
            console.log(`"El producto ${title} tine un error, el codigo ${code} es el mismo del otro producto existente ${productoExistente.title}"`);
            return;
        }

     if(!title || !descripcion ||!price || !thumbnail || !code || !stock){
        console.log(`Todos los campos son obligatorios en el producto ${title} que estas intentando ingresar`
        );
     }else{
        const producto = {
            id: this.nuevoID++,
            title,
            description,
            price,
            thumbnail,
            Code,
            stock,
        };
        this.products.push(producto);
        (
            console.log(`el producto ${producto.title} fue agregado correctamente`)
        )
    }
}
    getProduct() {
        return this.products;
    } 
    getProductbyid(id) {
        const productoid = this.products.find(product => producto.id === id); {
            if (!productoid) {
                console.log(`"Not Found" el Id nº ${id}de producto no existe`);
            }else {
                console.log(`El producto con el id ${id} fue encontrado`)
                return productoid;
            }
            
        }
    }
}

const producto = new ProductManager()
product.addProduct('titulo1', 'descripcion1', 200, 'imagen1', 'code1', 2);
product.addProduct('titulo2', 'descripcion1', 200, 'imagen1', 'code2', 2);
product.addProduct('titulo3', 'descripcion1', 200, 'imagen1', 'code3', 2);

console.log(producto.getProduct())
producut.getProductbyid(2);
//prueba no existe
//producut.getProductbyid(10);
