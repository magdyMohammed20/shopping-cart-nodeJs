const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    imagePath: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    // Product Info Type Is Object
    productInfo: {
        type: {
            storageCapacity: Number,
            numberOfSim: String,
            cameraResolution: Number,
            displaySize: Number
        },
        required: true
    }

})

module.exports = mongoose.model('ProductSchema', productSchema)