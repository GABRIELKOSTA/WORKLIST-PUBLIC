import gerarDiaDaSemana from "./gerarDiaDaSemana.js";

const inputItem = document.getElementById("input-item");
const lista = document.getElementById("lista-de-compras"); // Corrigido o ID
const botaoAdicionar = document.getElementById("adicionar-item");
let contador = 0;

// Função para salvar a lista no LocalStorage
function salvarListaNoLocalStorage() {
    const itens = [];
    document.querySelectorAll(".lista-item").forEach(item => {
        itens.push({
            texto: item.querySelector("p").innerText,
            concluido: item.querySelector("input").checked,
            data: item.querySelector(".texto-data").innerText,
            info: item.querySelector(".texto-info") ? item.querySelector(".texto-info").innerText : ""
        });
    });
    localStorage.setItem("listaDeItens", JSON.stringify(itens));
}

// Função para criar um item da lista
export function criarItemDaLista(texto = inputItem.value, concluido = false, data = gerarDiaDaSemana(), info = "") {
    if (texto.trim() === "") {
        alert("Por favor, insira um item!");
        return;
    }

    const itemDaLista = document.createElement("li");
    itemDaLista.classList.add("lista-item");

    const containerItemDaLista = document.createElement("div");
    containerItemDaLista.classList.add("lista-item-container");

    const inputCheckbox = document.createElement("input");
    inputCheckbox.type = "checkbox";
    inputCheckbox.id = "checkbox-" + contador++;
    inputCheckbox.checked = concluido;

    const nomeItem = document.createElement("p");
    nomeItem.innerText = texto;
    if (concluido) nomeItem.style.textDecoration = "line-through";

    // Evento para riscar o texto ao marcar/desmarcar
    inputCheckbox.addEventListener("click", function() {
        nomeItem.style.textDecoration = inputCheckbox.checked ? "line-through" : "none";
        salvarListaNoLocalStorage();
    });

    // Criar botão de exclusão
    const botaoExcluir = document.createElement("button");
    botaoExcluir.classList.add("botao-excluir");

    const imgLixeira = document.createElement("img");
    imgLixeira.src = "./img/delete.svg"; // Certifique-se de ter essa imagem no projeto
    imgLixeira.alt = "Excluir";
    imgLixeira.classList.add("icone-lixeira");

    botaoExcluir.appendChild(imgLixeira);

    // Criar ícone de informação
    const imgInfo = document.createElement("img");
    imgInfo.src = "./img/Information.svg"; // Certifique-se de ter essa imagem no projeto
    imgInfo.alt = "Informações";
    imgInfo.classList.add("icone-info");

    // Modal com área de texto editável
    const modal = document.createElement("div");
    modal.classList.add("modal");
    modal.style.display = "none";  // Inicialmente escondido

    const modalContent = document.createElement("div");
    modalContent.classList.add("modal-content");

    const textoInfo = document.createElement("textarea");
    textoInfo.classList.add("modal-texto");
    textoInfo.value = info;  // Preenche com o conteúdo armazenado
    modalContent.appendChild(textoInfo);

    const botaoSalvar = document.createElement("button");
    botaoSalvar.innerText = "Salvar";
    modalContent.appendChild(botaoSalvar);

    const closeModal = document.createElement("span");
    closeModal.classList.add("close-modal");
    closeModal.innerText = "×";
    modalContent.appendChild(closeModal);

    modal.appendChild(modalContent);
    document.body.appendChild(modal);

    // Evento para mostrar o modal ao clicar no ícone de informação
    imgInfo.addEventListener("click", function() {
        modal.style.display = "flex";
    });

    // Evento para salvar as alterações no texto
    botaoSalvar.addEventListener("click", function() {
        const novoTextoInfo = textoInfo.value;
        // Salva a informação editada no LocalStorage
        info = novoTextoInfo;
        itemDaLista.querySelector(".texto-info").innerText = info;
        salvarListaNoLocalStorage();
        modal.style.display = "none";  // Fecha o modal
    });

    // Evento para fechar o modal
    closeModal.addEventListener("click", function() {
        modal.style.display = "none";  // Fecha o modal
    });

    // Criar a área de texto com as informações (caso haja)
    const textoInfoElemento = document.createElement("p");
    textoInfoElemento.classList.add("texto-info");
    textoInfoElemento.innerText = info;

    // Evento para editar o conteúdo de informações ao clicar
    textoInfoElemento.addEventListener("click", function() {
        modal.style.display = "flex";  // Mostrar modal
    });

    // Evento para excluir item
    botaoExcluir.addEventListener("click", function() {
        itemDaLista.remove();
        salvarListaNoLocalStorage();
    });

    // Adicionando elementos ao container
    containerItemDaLista.appendChild(inputCheckbox);
    containerItemDaLista.appendChild(nomeItem);
    containerItemDaLista.appendChild(botaoExcluir);
    containerItemDaLista.appendChild(imgInfo);

    itemDaLista.appendChild(containerItemDaLista);

    // Adicionando o texto informativo
    itemDaLista.appendChild(textoInfoElemento);

    // Criando data do item
    const itemData = document.createElement("p");
    itemData.innerText = data;
    itemData.classList.add("texto-data");
    itemDaLista.appendChild(itemData);

    lista.appendChild(itemDaLista);

    // Salvar no LocalStorage
    salvarListaNoLocalStorage();
}

// Função para carregar os itens salvos
function carregarListaDoLocalStorage() {
    const itensSalvos = JSON.parse(localStorage.getItem("listaDeItens")) || [];
    itensSalvos.forEach(item => criarItemDaLista(item.texto, item.concluido, item.data, item.info));
}

// Adicionando evento para o botão adicionar
botaoAdicionar.addEventListener("click", function() {
    criarItemDaLista();
    inputItem.value = ""; // Limpa o campo de entrada após adicionar o item
});

// Carregar a lista ao iniciar
carregarListaDoLocalStorage();
