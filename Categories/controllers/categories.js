const Category = require('../model/category')
const mongoose = require('mongoose')

//--->To get all categories
const categoryList = async(req,res) => {
    try{
        const categoryList = await Category.find()
        if(categoryList){
            res.status(200).json({
                data: categoryList
            })
        }
    } catch(error){
        res.status(400).send({success:false,msg:error.message})
    }
}

//------->get category by id
const getbyId = async(req,res) => {
    try{
        const categoryId = await Category.findById(req.params.id)
        if(categoryId){
            res.status(200).json({
                data: categoryId
            })
        }
    } catch(error){
        res.status(400).send({success:false,msg:error.message})
    }
}

//----> new category
const addCategory = async(req,res) => {
    try{
        let category = new Category({
            name: req.body.name,
            color: req.body.color
        })
        await category.save()
        return res.status(200).json({
            message:'category added...',
            data:category
        })
    }catch(error){
        res.status(400).send({success:false,msg:error.message})
    }
}

//----->update category
 const update = async(req,res)=> {
    try{
        if(!mongoose.isValidObjectId(req.params.id)){
            res.status(400).json({error: 'invalid category id'})
        }
        let categoryID = req.params.id
        let updatedData = {
            name: req.body.name,
            color: req.body.color  
        }
        await Category.findByIdAndUpdate(categoryID,updatedData)
        return res.status(200).json({
            message:"category updated",
            data:updatedData
        })
        }catch(error){
            res.status(400).send({success:false,msg:error.message})
        }
}

//------>delete a category
const deletebyId = async(req,res) => {
    try{
        let id = req.params.id
       await Category.findByIdAndRemove({_id : id})
        return res.status(200).json({
            message: 'category Deleted...'
        })
    }catch(error){
        res.status(400).send({success:false,msg:error.message})
    }
}



module.exports = {categoryList,getbyId,addCategory,update,deletebyId}