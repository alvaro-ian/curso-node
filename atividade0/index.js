const comida = require('./comida')

var lista = [
    new comida(50, "Sushi", "Peixe cru"),
    new comida(30, "Arroz", "Arroz branco"),
    new comida(10, "Pastel", "Pastel de carne/queijo/frango"),
    new comida(100, "Caviar", "Ovo de peixe"),
    new comida(15, "Frango", "Frango assado"),
    new comida(20, "Peixe", "Tambaqui ao molho rose"),
    new comida(5, "Pudim", "Pudim de leite"),
    new comida(25, "Pizza", "Calabresa/frango/margarita"),
    new comida(35, "Churrasco", "Toscana e carne de sol"),
    new comida(1000, "Ovo", "Ovo de dez mil anos")
]

function listar(l) {
    for (i = 0; i < l.length; i++){
        l[i].descrever()
    }
}

listar(lista)