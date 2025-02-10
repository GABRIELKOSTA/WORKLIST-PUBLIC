const mensagemListaVazia = document.querySelector(".mensagem-lista-vazia");

function verificarListaVazia(listaDeCompras) {
    const mensagemListaVazia = document.querySelector(".mensagem-lista-vazia");
    if (!mensagemListaVazia) return; // Evita erro caso o elemento não exista

    const itensDaLista = listaDeCompras.querySelectorAll("li");
    mensagemListaVazia.style.display = itensDaLista.length === 0 ? "block" : "none";
}

export default verificarListaVazia;
