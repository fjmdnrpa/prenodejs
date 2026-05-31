const products = [
    { id:1, name: "Heladera", price: 5000},
    { id:2, name: "Televisor", price: 4000},
    { id:3, name: "Lavarropas", price: 4500},
    { id:4, name: "Termotanque", price: 5500},
];

export const getProducts = (req,res) => {
    res.json(products);
};

export const getProductById = (req,res) => {
    
    const id = Number(req.params.id);
    const product = products.find((product) => product.id === id);
    if (!product) {
        return res.status(404).json({
            message: "Electrodomestico no encontrado",
        });
    } 
    res.json(product);
};

export const createProduct = (req,res) => {
    
    const { name, price} = req.body;
    if (!name || !price) {
        return res.status(400).json ({
            message: "Faltan datos obligatorios", 
        })
    }
    const newProduct = {
        id: products.length +1,
        name,
        price,
    };
    products.push(newProduct);
    res.status(201).json(newProduct);
};

export const deleteProduct = (req,res) => {
    
    const id = Number(req.params.id);
    const productIndex = products.findIndex((product) => product.id === id)
    if (productIndex === -1) {
        return res.status(404).json ({
            message: "Electrodomestico no encontrado",
        });
    }
    const deletedProduct = products.splice(productIndex,1);
    res.json({
        message: "Electrodomestico eliminado",
        product: deletedProduct[0],
    });
};
