const mongoose = require('mongoose')

const Pizza = require('./models/pizza')

const url = 'mongodb://localhost:27017/pizzaPlace'
const connect = mongoose.connect(url)

connect.then((db) => {
    console.log('conectado ao mongodb')
    Pizza.create({
        name: 'Havaiana',
        description: 'Teste'
    })
        .then((pizza) => {
            console.log(pizza)
            return Pizza.findByIdAndUpdate(pizza._id, {
                $set: { description: 'Pizza com abacaxi' }
            }, {
                new: true
            }).exec()
        })
        .then((pizza) => {
            console.log(pizza)
            pizza.comments.push({
                rating: 5,
                comment: 'Ôh louco meu!',
                author: 'Fausto Silva'
            })
            return pizza.save()
        })
        .then((pizza) => {
            console.log(pizza)
            return Pizza.collection.drop()
        })
        .then(() => {
            return db.connection.close()
        })
        .catch(console.log)
})