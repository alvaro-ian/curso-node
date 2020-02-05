const mongodb = require('mongodb').MongoClient
const assert = require('assert')

// substitua pelo nome do seu banco de dados
const dbname = 'pizzaPlace'
const url = 'mongodb://localhost:27017'
mongodb.connect(url, (err, client) => {
    assert.equal(err, null)
    console.log('conectado ao banco')
    const db = client.db(dbname)
    const collection = db.collection('pizzas')
    collection.insertOne(
        { name: 'Chocolate', description: 'Pizza sobremesa' },
        (err, res) => {
            assert.equal(err, null)
            console.log('resultado inserção:\n', res.ops)
            collection.find({}).toArray((err, docs) => {
                assert.equal(err, null)
                console.log('documentos encontrados:\n', docs)
                db.dropCollection('pizzas', (err, res) => {
                    assert.equal(err, null)
                    client.close()
                })
            })
        }
    )
})