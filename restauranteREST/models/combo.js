const mongoose = require('mongoose')
const Schema = mongoose.Schema

const comboSchema = new Schema({
    name: {
        type: String,
        require: true,
        unique: true
    },
    tags: [String],
    pratos: {
        type: [String],
        require: true
    },
    discount: {
        type: Number,
        require: true
    },
    description: {
        type: String,
        require: true
    }
}, {
    timestamps: true
})

const Combo = mongoose.model('Combo', comboSchema)

module.exports = Combo