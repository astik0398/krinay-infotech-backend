const express = require('express')
const {todoModel} = require('../models/todo.model')

const todoRouter = express.Router()

todoRouter.post('/addtodo', async(req, res)=> {
    try {
        const todo = new todoModel({
            ...req.body
        })
        await todo.save()
        res.status(201).send({"message": "todo has been added"})
    } catch (error) {
        res.send({"error": error})
    }
})

todoRouter.get('/', async(req, res)=> {
    try {
        const todos = await todoModel.find()
        res.status(200).send(todos)
    } catch (error) {
        res.send({"error": error})
    }
})

todoRouter.delete('/:_id', async(req, res)=> {
    const {_id} = req.params
    try {
        await todoModel.findByIdAndDelete({_id})
        res.status(201).send({"message": "todo deleted successfully"})
    } catch (error) {
        res.send({"error": error})
    }
})

todoRouter.patch('/:_id', async(req, res)=> {
    const {_id} = req.params
    try {
        await todoModel.findByIdAndUpdate({_id}, req.body)
        res.status(201).send({"message": "todo updated successfully"})
    } catch (error) {
        res.send({"error": error})
    }
})

module.exports = {
    todoRouter
}