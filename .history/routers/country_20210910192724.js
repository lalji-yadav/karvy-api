const express = require('express')
const Country = require('../models/countrys')
const multer = require('multer')
const router = new express.Router()
// var cors = require('cors')


var storage = multer.diskStorage({
destination: function (req, file, cb) {
    cb(null, 'images/')
},
filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + new Date().toISOString().replace(/:/g, '-') + '-' + 
    file.originalname)
}
})

var upload = multer({
    storage: storage,
    limits: {
    fileSize: 100000000
    },
})
  

router.post('/country', upload.array('myfile', 10), async (req,res,next)=> {

    const file = req.files
    if(!file) {
        return next('File not Found')
    }
    const fileData = new Country(req.body, {
    flag: file
    })
    await fileData.save()
    console.log(req.files)
// console.log(req.file)
    res.send(fileData)
}, (error) => {
    res.status(400).send({ error: error.message })
})
      

// router.post('/country', async (req, res) => {
//     const country = new Country(req.body)

//     try {
//         await country.save()
//         res.status(201).send(country)
//     } catch (e) {
//       res.status(400).send(e)  
//     }
// })

router.get('/countries', async (req, res) => {
    
    try {
        const country = await Country.find({}).select('name');
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
