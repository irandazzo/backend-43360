/* const fs = require ('fs'); */
import {promises as fs} from "fs"

class ProductManager {
    constructor (){
        this.path = "./productos.txt"
        this.products = [];
    }

    static id = 0;

    addProduct = async (title, description, price, thumbnail, code, stock) => {
        
        ProductManager.id++;
        let newProduct = {
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
            id: ProductManager.id
        };

        this.products.push(newProduct)
        console.log(newProduct);
        await fs.writeFile(this.path, JSON.stringify(this.products));
    };

    readProducts = async () => {
        let respuesta = await fs.readFile(this.path, "utf-8")
        return JSON.parse(respuesta)
    }
    getProducts = async () => {
        let respuesta2 = await this.readProducts()
        return console.log(respuesta2);
        
    }
    getProductById = async (id) => {
        let respuesta3 = await this.readProducts()
        if (!respuesta3.find ((product) => product.id === id)){
            console.log("El código del producto no existe");
        }else {
            console.log(respuesta3.find((product) => product.id === id));
        }
    }

    deleteProductById = async (id) => {
        let respuesta3 = await this.readProducts();
        let productFilter = respuesta3.filter(products => products.id != id);
        await fs.writeFile(this.path, JSON.stringify(productFilter));
        console.log("Producto Eliminado");
    };

    updateProducts = async({id, ...producto}) => {
        await this.deleteProductById(id);
        let productoAnterior = await this.readProducts();
        let modificacionProd = [{...producto, id}, ...productoAnterior];
        await fs.writeFile(this.path, JSON.stringify(modificacionProd));
        
    };
}

const productos = new ProductManager

/* productos.addProduct("Fernet Branca", "Fernet", 2300, "imagen1", "fernet1", 100);
productos.addProduct("Fernet 1882", "Fernet", 1300, "imagen2", "fernet2", 50);
productos.addProduct("Cerveza Stella Artois", "Cerveza", 450, "imagen3", "cerveza1", 200);
productos.addProduct("Cerveza Heineken", "Cerveza", 500, "imagen4", "cerveza2", 350); */

/* productos.getProducts() */

/* Buscar productos x ID */
/* productos.getProductById(5) */

/* Eliminar Producto */
/* productos.deleteProductById(2) */

/* Actualizar producto */
productos.updateProducts({
    title: 'Cerveza Heineken',
    description: 'Cerveza',
    price: 550,
    thumbnail: 'imagen4',
    code: 'cerveza2',
    stock: 600,
    id: 4
})