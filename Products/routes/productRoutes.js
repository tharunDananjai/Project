const express = require('express')
const validator = require('../validate/valid')
const productrouter = express.Router()
const productControl = require('../controller/productController')




productrouter.post('/createProduct', validator.productValid, productControl.createProduct)

productrouter.get('/getproductlist', productControl.getproudctlist)

productrouter.get('/getbyid/:id', productControl.getbyid)

productrouter.put('/editProducts/:id', productControl.updateProduct)

productrouter.delete('/deleteproduct/:id', productControl.deleteproduct)




module.exports = productrouter