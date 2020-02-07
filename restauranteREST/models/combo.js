const mongoose = require('mongoose')
const Schema = mongoose.Schema

const comboSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    tags: [String],
    pratos: {
        type: [String],
        required: true
    },
    discount: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

const Combo = mongoose.model('Combo', comboSchema)

module.exports = Combo