class ProductManager {
    constructor() {
    this.products = [];
}

static id = 0;

    addProduct(title, description, price, thumbnail, code, stock) {
        let codeExists = false;
        
        for (let i = 0; i < this.products.length; i++) {
            if(this.products[i].code === code){
                codeExists = true;
                console.log(`El código ${code} está repetido`);
                break; 
            }
        }
    if (codeExists){
        return;
    }
    const newProduct = {
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
    }
    
    if(!Object.values(newProduct).includes(undefined)){
        ProductManager.id++;
        this.products.push({
            ...newProduct,
            id: ProductManager.id,
        });
    }else {
        console.log("Por favor completar todos los campos");
    }
}
    getProduct() {
    return this.products;
    }
    existeId(id) {
        return this.products.find((producto) => producto.id === id)
    }

    getProductById(id) {
        if (!this.existeId(id)) {
        console.log("Not Found");
        } else {
        console.log(this.existeId(id));
        }
    }
} 

/* Comienzo del testing */

const productos = new ProductManager();
/* 1er llamado = array vacío */
console.log(productos.getProduct());

/* Se agregan 2 producto */
productos.addProduct("Fernet Branca", "Fernet", 2300, "imagen1", "fernet1", 100);
productos.addProduct("Fernet 1882", "Fernet", 1300, "imagen2", "fernet2", 50);

/* 2do llamado = array c/producto */
console.log(productos.getProduct());

/* Validacion de code repetido */
productos.addProduct("Fernet 1882", "Fernet", 1300, "imagen2", "fernet2", 50);

/* Búsqueda de productos por ID */
productos.getProductById(2);

/* Producto Not Found */
productos.getProductById(3);
