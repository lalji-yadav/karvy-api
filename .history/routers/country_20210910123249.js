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

module.exports = router