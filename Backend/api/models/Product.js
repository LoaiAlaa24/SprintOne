var mongoose = require('mongoose');

var productSchema = mongoose.Schema({
   id:{
       type: Number


   }
    ,
    name: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: Date,
    sellerName:{type:String  }
});

mongoose.model('Product', productSchema);
