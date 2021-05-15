const express = require('express');
const Todo = require('../models/Todo');
const router = express.Router();

router.get('/getTodo', async (req, res) => {
    try{
    const todos = await Todo.find();
    res.json(todos)
    }
    catch(err){
        res.json({message: err})
    }
})

router.post('/addTodo', async (req, res) => {
    const {name, category_id, completed } = req.body;

    const todo = new Todo({
        name: name,
        category_id: category_id,
        completed: completed
    });

    try{
        const savedTodo = await todo.save();
        if(savedTodo){
            const todos = await Todo.find();
            res.json(todos)
        }
    }
    catch(err){
        res.json({message: err})
    }
})

router.get('/:todoId', async(req, res) => {
    try{
        const findTodo = await Todo.findById(req.params.todoId);
        res.json(findTodo)
        }
    catch(err){
        res.json({message: err})
    }
})


router.delete('/deleteTodo/:todoId', async(req, res) => {
    try{
        const deleteTodo = await Todo.deleteOne({ _id: req.params.todoId});
        if(deleteTodo){
            const todos = await Todo.find();
            res.json(todos)
        }
    }
    catch(err){
        res.json({message: err})
    }
})

router.patch('/updateTodo/:todoId', async(req, res) => {
    const {name, category_id, completed } = req.body;
    try{
        const updateTodo = await Todo.updateOne({ _id: req.params.todoId}, { $set : {name: name, category_id: category_id, completed: completed}});
        if(updateTodo){
            const todos = await Todo.find();
            res.json(todos)
        }
    }
    catch(err){
        res.json({message: err})
    }
})

module.exports = router;