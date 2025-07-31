// Variáveis globais
let listaAmigos = [];

// Função para adicionar um amigo à lista
function adicionarAmigo() {
    const inputAmigo = document.getElementById('amigo');
    const nomeAmigo = inputAmigo.value.trim();

    // Validação do nome
    if (nomeAmigo === '') {
        alert('Por favor, digite um nome válido.');
        return;
    }

    if (listaAmigos.includes(nomeAmigo)) {
        alert('Este nome já foi adicionado!');
        return;
    }

    // Adiciona à lista
    listaAmigos.push(nomeAmigo);
    inputAmigo.value = ''; // Limpa o campo de input
    atualizarListaAmigos();
}

// Função para atualizar a lista visual de amigos
function atualizarListaAmigos() {
    const listaAmigosElement = document.getElementById('listaAmigos');
    listaAmigosElement.innerHTML = '';

    listaAmigos.forEach((amigo, index) => {
        const itemLista = document.createElement('li');
        itemLista.textContent = `${index + 1}. ${amigo}`;
        listaAmigosElement.appendChild(itemLista);
    });
}

// Função para sortear os amigos secretos
function sortearAmigo() {
    if (listaAmigos.length < 2) {
        alert('Adicione pelo menos 2 amigos para realizar o sorteio!');
        return;
    }

    // Cria uma cópia da lista para manipulação
    let listaParaSortear = [...listaAmigos];
    const resultadoElement = document.getElementById('resultado');
    resultadoElement.innerHTML = '';

    // Verifica se é possível fazer o sorteio sem repetições
    if (listaAmigos.length % 2 !== 0) {
        alert('Número ímpar de participantes. Um amigo ficará sem par.');
    }

    // Embaralha a lista
    listaParaSortear = embaralharLista(listaParaSortear);

    // Cria os pares
    for (let i = 0; i < listaAmigos.length; i++) {
        const amigoAtual = listaAmigos[i];
        let amigoSorteado;
        
        // Encontra um amigo diferente do atual
        do {
            if (listaParaSortear.length === 0) break;
            amigoSorteado = listaParaSortear.pop();
        } while (amigoSorteado === amigoAtual && listaParaSortear.length > 0);

        // Se não encontrou um par válido (último elemento)
        if (amigoSorteado === amigoAtual) {
            // Troca com o primeiro par já feito
            const primeiroItem = resultadoElement.firstChild;
            if (primeiroItem) {
                const textoExistente = primeiroItem.textContent;
                const [original, sorteadoOriginal] = textoExistente.split(' → ');
                
                // Atualiza ambos os itens
                primeiroItem.textContent = `${original} → ${amigoAtual}`;
                amigoSorteado = sorteadoOriginal;
            }
        }

        // Adiciona ao resultado
        const itemResultado = document.createElement('li');
        itemResultado.textContent = `${amigoAtual} → ${amigoSorteado}`;
        resultadoElement.appendChild(itemResultado);
    }
}

// Função para embaralhar uma lista (algoritmo Fisher-Yates)
function embaralharLista(lista) {
    const novaLista = [...lista];
    for (let i = novaLista.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [novaLista[i], novaLista[j]] = [novaLista[j], novaLista[i]];
    }
    return novaLista;
}

// Event listeners para melhor usabilidade
document.addEventListener('DOMContentLoaded', () => {
    const inputAmigo = document.getElementById('amigo');
    
    // Permite adicionar com Enter
    inputAmigo.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            adicionarAmigo();
        }
    });
});