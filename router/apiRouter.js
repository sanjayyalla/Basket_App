const express = require('express');
const router = express();
const Product = require('../model/Product');

/*
    USAGE : Get all the products
    URL : http://127.0.0.1:5000/api/products
    Method : GET
    Fields : no-fields
 */
router.get('/products', async (request , response) => {
    try {
        let products = await Product.find();
        response.status(200).json(products);
    }
    catch (err) {
        console.error(err);
        response.status(500).json({
            msg : err.message
        });
    }
});

/*
    USAGE : Get a Single Product
    URL : http://127.0.0.1:5000/api/products/:id
    Method : GET
    Fields : no-fields
 */
router.get('/products/:id', async (request , response) => {
    try {
        let productId = request.params.id;
        let product = await Product.findById(productId);
        response.status(200).json(product);
    }
    catch (err) {
        console.error(err);
        response.status(500).json({
            msg : err.message
        });
    }
});

/*
    USAGE : Create a Product
    URL :   
    Method : POST
    Fields : name , image , price , qty , info
 */
router.post('/products', async (request , response) => {
    try {
        let newProduct = {
            company : request.body.company,
            image : request.body.image,
            price : request.body.price,
            model : request.body.model,
            specification : request.body.specification
        };
        // product is Exists or not
        // let product = await Product.findOne({company : newProduct.company});
        // if(product){
        //     return response.status(401).json({
        //         msg : 'Product is Already Exists'
        //     })
        // }
        product = new Product(newProduct);
        product = await product.save(); // insert the product to database
        response.status(200).json({
            result : 'Product is Created',
            product : product
        });
    }
    catch (err) {
        console.error(err);
        response.status(500).json({
            msg : err.message
        });
    }
});

/*
    USAGE : Update a Product
    URL : http://127.0.0.1:5000/api/products/:id
    Method : PUT
    Fields : name , image , price , qty , info
 */
router.put('/products/:id', async (request , response) => {
    let productId = request.params.id;
    try {
        let updatedProduct = {
            company : request.body.company,
            image : request.body.image,
            price : request.body.price,
            model : request.body.model,
            specification : request.body.specification
        };
        // product is exists or not
        let product = await Product.findById(productId);
        if(!product){
            return response.status(401).json({
                msg : 'No Product Found'
            });
        }
        // update
        product = await Product.findByIdAndUpdate(productId , {
            $set : updatedProduct
        }, { new : true});
        response.status(200).json({
            result : 'Product is Updated',
            product : product
        });
    }
    catch (err) {
        console.error(err);
        response.status(500).json({
            msg : err.message
        });
    }
});

/*
    USAGE : Delete a Product
    URL : http://127.0.0.1:5000/api/products/:id
    Method : DELETE
    Fields : no-fields
 */
router.delete('/products/:id', async (request, response) => {
    try{
        let productId = request.params.id;
        // product is exists or not
        let product = await Product.findById(productId);
        if(!product){
            return response.status(401).json({
                msg : 'No Product Found'
            });
        }
        //delete
        product = await Product.findByIdAndDelete(productId);
        response.status(200).json({
            result : 'Product is Deleted',
            product : product
        });
    }
    catch (err) {
        console.error(err);
        response.status(500).json({
            msg : err.message
        });
    }
});

module.exports = router;