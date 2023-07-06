class ProductManager {
  constructor() {
    this.productos = [];
    this.id = 1;
  }

  addProduct(producto) {
    if (!this.validarDatos(producto)) {
      console.log("Error: Todos los campos del producto son obligatorios.");
      return;
    }

    if (this.codigoDuplicado(producto.code)) {
      console.log("Error: El código del producto ya existe.");
      return;
    }

    producto.id = this.id;
    this.id++;
    this.productos.push(producto);
  }

  validarDatos(producto) {
    return (
      producto.nombre &&
      producto.descripcion &&
      producto.precio &&
      producto.img &&
      producto.code &&
      producto.stock
    );
  }

  codigoDuplicado(code) {
    return this.productos.some((producto) => producto.code === code);
  }

  getProducts() {
    return this.productos;
  }

  getProductById(id) {
    const producto = this.productos.find((producto) => producto.id === id);
    if (producto) {
      return producto;
    } else {
      console.log("Error: Producto no encontrado.");
      return ("Error: Producto no encontrado.")
    }
  }
}

const manager = new ProductManager()

const producto1 = {
    nombre: "Mortal Kombat X",
    descripcion: "Juego de pelea, multijugador",
    precio: 5500,
    img: "Por ahora nada.jpg",
    code: "JP101",
    stock: 10
}

manager.addProduct(producto1)
console.log(manager.getProducts())
console.log(manager.getProductById(1))
console.log(manager.getProductById(2))

