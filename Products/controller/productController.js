const productData = require('../model/productModel')

const createProduct = async (req, res) => {
    try {
        let product = new productData({
            productID: req.body.productID,
            productName: req.body.productName,
            brand: req.body.brand,
            model: req.body.model,
            category: req.body.category,
            price: req.body.price,
            date: req.body.date,
            color: req.body.color,
            qty: req.body.qty
        })
        const products = await product.save();
        return res.status(200).send({ status: 200, message: "product created successfully", data: products })
    }
    catch (err) {
        if (err.code && err.code == 11000) {
            return res.status(400).json({ status: 400, message: "Already exists product!" });
        }
        res.status(400).json({ status: 400, message: err.message || err });
    }
}

const getproudctlist = async (req, res) => {
    try {
        let products = await productData.find().sort({ createdAt: -1 }).select(['-createdAt', '-updatedAt', '-__v'])
        res.status(200).send({ status: 200, message: "products listed", data: products })
    } catch (err) {
        return res.status(400).send({ status: 400, message: err.message || err })
    }
}

//==========================>
const getbyid = async (req, res) => {
    try {
        let getproduct = await productData.findById(req.params.id)
        if (!req.params.id) {
            return res.status(400).json({ error: "no id found" })
        }
        res.status(200).send({ status: 200, message: "get product by id succesfully", data: getproduct })
    } catch (err) {
        res.status(400).send({ status: 400, message: err.message || err })
    }
}

const updateProduct = async (req, res) => {
    try {
        const editProduct = await productData.findOneAndUpdate({ _id: req.params.id },
            {
                $set: {
                    productID: req.body.productID,
                    productName: req.body.productName,
                    brand: req.body.brand,
                    model: req.body.model,
                    category: req.body.category,
                    price: req.body.price,
                    date: req.body.date,
                    color: req.body.color,
                    qty: req.body.qty
                }
            }, { new: true });

        return res.status(400).json({ status: 200, message: "product updated succesfully", data: editProduct })
    } catch (err) {
        res.status(400).send({ status: 400, message: err.message || err })
    }
}

const deleteproduct = async (req, res) => {
    try {
        let delproduct = await productData.findByIdAndDelete(req.params.id)
        if (!req.params.id) { return res.status(400).json({ error: "no id found" }) }
        res.status(200).send({ status: 200, message: "Product deleted successfully!!!" })
    } catch (err) {
        res.status(400).send({ status: 400, message: err.message || err })
    }
}
module.exports = { createProduct, getproudctlist, updateProduct, getbyid, deleteproduct }