const Product = require('../models/product')
const mongoose = require('mongoose')

// First Connect To MongoDB
mongoose.set('useNewUrlParser', true)
mongoose.set('useUnifiedTopology', true)

mongoose.connect('mongodb://localhost/shopping-cart', err => {
    if (err) {
        console.log('Error In Connecting To MongoDB')
    } else {
        console.log('Connected Success To MongoDB')
    }
})

// Create Products As Array For Insert It Once
const products = [
    new Product({
        imagePath: '/public/images/1.png',
        name: 'Samsung Ipad',
        price: 1000,
        productInfo: {
            storageCapacity: 64,
            numberOfSim: 'Dual SIM',
            cameraResolution: 25,
            displaySize: 6.5
        }
    })
    ,
    new Product({
        imagePath: '/public/images/2.png',
        name: 'iPhone',
        price: 500,
        productInfo: {
            storageCapacity: 128,
            numberOfSim: 'Dual SIM',
            cameraResolution: 50,
            displaySize: 5
        }
    }),
    new Product({
        imagePath: '/public/images/3.png',
        name: 'Samsung Phone',
        price: 300,
        productInfo: {
            storageCapacity: 32,
            numberOfSim: 'Single SIM',
            cameraResolution: 15,
            displaySize: 3.5
        }
    }),
    new Product({
        imagePath: '/public/images/4.png',
        name: 'Sony Phone',
        price: 200,
        productInfo: {
            storageCapacity: 16,
            numberOfSim: 'Single SIM',
            cameraResolution: 10,
            displaySize: 4
        }
    }),
    new Product({
        imagePath: '/public/images/5.png',
        name: 'Oppo Phone',
        price: 250,
        productInfo: {
            storageCapacity: 32,
            numberOfSim: 'Dual SIM',
            cameraResolution: 20,
            displaySize: 5
        }
    }),
    new Product({
        imagePath: '/public/images/6.png',
        name: 'Alcatel Phone',
        price: 200,
        productInfo: {
            storageCapacity: 16,
            numberOfSim: 'Single SIM',
            cameraResolution: 15,
            displaySize: 4
        }
    })
]


let done = 0

// Loop On Products To Insert [1,2,3]
for (var x = 0; x < products.length; x++) {

    products[x].save((err, result) => {
        if (err) {
            console.log(err)
            return
        } else {
            console.log('Insert Data Success ' + result)
            done++
            if (done === products.length) {
                // Disconnect From Mongoose After Insert Last Product
                mongoose.disconnect()
            }
        }
    })
}


// Run This File Dependent 'node productInit'