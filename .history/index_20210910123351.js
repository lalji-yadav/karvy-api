const express = require('express')
require('./db/mongoose')
var cors = require('cors') 
const Country = require('./routers/country')
// const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT || 8080
app.use(cors())


app.use(express.json())
app.use(Country)
// app.use(taskRouter)


app.listen(port, () => {
    console.log('Server is up on port ' + port)
})
