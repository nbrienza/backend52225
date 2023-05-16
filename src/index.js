//clase producto ----------------------------------------

class Producto {
    constructor(nombre, precio, stock) {
      this.nombre = nombre;
      this.precio = precio;
      this.stock = stock;
    }
  
    calcularSubtotal(cantidad) {
      return this.precio * cantidad;
    }
  }
  

 //clase carrito ----------------------------------------

 class Carrito {
    constructor() {
      this.productos = [];
    }
  
    agregarProducto(producto, cantidad) {
      this.productos.push({ producto, cantidad });
    }
  
    eliminarProducto(nombreProducto) {
      this.productos = this.productos.filter(item => item.producto.nombre !== nombreProducto);
    }
  
    calcularTotal() {
      let total = 0;
      for (const item of this.productos) {
        total += item.producto.precio * item.cantidad;
      }
      return total;
    }
  
    vaciarCarrito() {
      this.productos = [];
    }
  }

  //clase usuario ----------------------------------------


  class Usuario {
    constructor(nombre, email, contraseña) {
      this.nombre = nombre;
      this.email = email;
      this.contraseña = contraseña;
    }
  
    realizarPago(total) {
      // Lógica para procesar el pago del usuario
      console.log(`Se realizó un pago de $${total} para el usuario ${this.nombre}.`);
    }
  }

  
  //clase orden ----------------------------------------

  class Orden {
    constructor(usuario, carrito) {
      this.usuario = usuario;
      this.carrito = carrito;
      this.fecha = new Date();
      this.estado = 'Pendiente';
    }
  
    finalizarOrden() {
      const total = this.carrito.calcularTotal();
      this.usuario.realizarPago(total);
      this.estado = 'Completada';
      // Lógica adicional para gestionar la orden (actualizar inventario, generar factura, etc.)
    }
  }

  
  //clase ecomerce ----------------------------------------

  class Ecommerce {
    constructor() {
      this.productos = [];
      this.usuarios = [];
    }
  
    agregarProducto(producto) {
      this.productos.push(producto);
    }
  
    registrarUsuario(usuario) {
      this.usuarios.push(usuario);
    }
  
    buscarProducto(nombreProducto) {
      return this.productos.find(producto => producto.nombre === nombreProducto);
    }
  }