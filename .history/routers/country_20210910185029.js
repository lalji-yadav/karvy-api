const express = require('express')
const Country = require('../models/countrys')
const router = new express.Router()
// var cors = require('cors')


router.post('/country', async (req, res) => {
    const country = new Country(req.body)

    try {
        await country.save()
        res.status(201).send(country)
    } catch (e) {
      res.status(400).send(e)  
    }
})

router.get('/countries', async (req, res) => {
    
    try {
        const country = await Country.find({}).select("name": 1, "_id": 0);
        res.status(200).send(country)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.get('/country/:id', async (req, res) => {
    const _id = req.params.id
    console.log(_id)

    try {
        const country = await Country.findOne({ _id })

        if(!country) {
          res.status(404).send('Not found')
        }
        res.status(200).send(country)
    } catch (error) {
        res.status(500).send(error)
    }
})



module.exports = router
