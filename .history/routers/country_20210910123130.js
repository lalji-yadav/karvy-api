const express = require('express')
const Task = require('../models/countrys')
const router = new express.Router()
// var cors = require('cors')


router.post('/tasks', async (req, res) => {
    const task = new Task(req.body)

    try {
        await task.save()
        res.status(201).send(task)
    } catch (e) {
      res.status(400).send(e)  
    }
})

module.exports = router