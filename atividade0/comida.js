module.exports = class Comida {
    constructor(p, n, d) {
        this.preco = p
        this.nome = n
        this.descricao = d
    }

    descrever() {
        console.log(`R$${this.preco} ${this.nome} - ${this.descricao}`)
    }
}