const mongoose = require("mongoose");

const countrySchema = new mongoose.Schema({
   name: {
       type: String,
       required: true,
       unique: true
   },
   continent: {
      type: String,
      required: true,
      
   },
   rank: {
       type: Number,
       required: true,
       unique: true
   }

})

const Country = mongoose.model('Country', countrySchema)
module.exports = Country

