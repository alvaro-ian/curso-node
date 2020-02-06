const mongoose = require('mongoose')
const Schema = mongoose.Schema

const promoSchema = new Schema({
    name: {
        type: String,
        require: true,
        unique: true
    },
    image: {
        type: String,
        require: true
    },
    tags: [String],
    price: {
        type: Number,
        require: true,
        min: 0
    },
    description: {
        type: String,
        require: true
    }
}, {
    timestamps: true
})

const Promo = mongoose.model('Promo', promoSchema)

module.exports = Promo