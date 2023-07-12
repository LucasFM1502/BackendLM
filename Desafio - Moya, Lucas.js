const fs = require('fs');

class ProductManager {
  constructor(archivo) {
    this.path = archivo;
  }

  addProduct(producto) {
    const productos = this.getProductsFromFile();
    producto.id = this.generateNextId(productos);
    productos.push(producto);
    this.saveProductsToFile(productos);
  }

  getProducts() {
    return this.getProductsFromFile();
  }

  getProductById(id) {
    const productos = this.getProductsFromFile();
    return productos.find((producto) => producto.id === id);
  }

  updateProduct(id, updatedFields) {
    const productos = this.getProductsFromFile();
    const productoIndex = productos.findIndex((producto) => producto.id === id);
    if (productoIndex !== -1) {
      productos[productoIndex] = { ...productos[productoIndex], ...updatedFields };
      this.saveProductsToFile(productos);
    }
  }

  deleteProduct(id) {
    const productos = this.getProductsFromFile();
    const updatedProductos = productos.filter((producto) => producto.id !== id);
    this.saveProductsToFile(updatedProductos);
  }

  getProductsFromFile() {
    try {
      const data = fs.readFileSync(this.path, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }

  saveProductsToFile(productos) {
    fs.writeFileSync(this.path, JSON.stringify(productos, null, 2), 'utf-8');
  }

  generateNextId(productos) {
    const maxId = productos.reduce((max, producto) => (producto.id > max ? producto.id : max), 0);
    return maxId + 1;
  }
}

const manager = new ProductManager('./Productos.json')

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


