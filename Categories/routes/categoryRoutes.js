const express = require('express')
const router = express.Router()
const categories = require('../controllers/categories')

router.get('/', categories.categoryList)
router.get('/:id', categories.getbyId)
router.post('/addCategory',categories.addCategory)
router.put('/update/:id',categories.update)
router.delete('/delete/:id',categories.deletebyId)

module.exports = router
