const express = require('express');
const Category = require('../models/Category');
const Post = require('../models/Todo');
const router = express.Router();

router.get('/getCategories', async (req, res) => {
    try{
    const Categories = await Category.find();
    res.json(Categories)
    }
    catch(err){
        res.json({message: err})
    }
})

router.get('/getOneCategory/:CategoryId', async(req, res) => {
    try{
        const findCategory = await Category.findById(req.params.CategoryId);
        res.json(findCategory)
        }
    catch(err){
        res.json({message: err})
    }
})

router.post('/addCategory', async (req, res) => {

    const category = new Category({
        name: req.body.name,
    });

    try{
        const savedCategory = await category.save();
        if(savedCategory){
            const Categories = await Category.find();
            res.json(Categories)
        }
    }
    catch(err){
        res.json({message: err})
    }
})


router.post('/deleteCategory', async(req, res) => {
    const {id} = req.body;
    try{
        const deleteCategory = await Category.deleteOne({ _id: id});
        const deleteTodos = await Post.deleteMany({ category_id: id});

        if(deleteCategory && deleteTodos){
            const Categories = await Category.find();
            res.json(Categories)
        }
    }
    catch(err){
        res.json({message: err})
    }
})

router.patch('/updateCategory/:CategoryId', async(req, res) => {
    try{
        const updateCategory = await Category.updateOne({ _id: req.params.CategoryId}, { $set : {name: req.body.name}});
        if(updateCategory){
            const Categories = await Category.find();
            res.json(Categories)
        }
    }
    catch(err){
        res.json({message: err})
    }
})

module.exports = router;