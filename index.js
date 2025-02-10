import { criarItemDaLista } from "./scripts/criarItemDaLista.js";
import verificarListaVazia from "./scripts/verificarListaVazia.js";
const listaDeCompras = document.getElementById("lista-de-compras");
const botaoAdicionar = document.getElementById("adicionar-item");


botaoAdicionar.addEventListener("click", function() {
    let texto = inputItem.value.trim(); // Remover espaços extras
    if (texto === "") {
        alert("Por favor, insira um item!");
        return;
    }
    criarItemDaLista(texto); // Passando o texto corretamente
    inputItem.value = ""; // Limpa o campo de entrada após adicionar o item

});

verificarListaVazia(listaDeCompras);