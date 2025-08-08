
const cartasValores = [
 https://www.google.com/url?sa=i&url=https%3A%2F%2Fnaruto.fandom.com%2Fpt-br%2Fwiki%2FNaruto_Uzumaki&psig=AOvVaw2nAsilSempVOkPLu7U9gKT&ust=1754738778737000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCKi15r6N-44DFQAAAAAdAAAAABAE , // Par 1
  'https://www.google.com/url?sa=i&url=https%3A%2F%2Fnaruto.fandom.com%2Fpt-br%2Fwiki%2FNaruto_Uzumaki&psig=AOvVaw2nAsilSempVOkPLu7U9gKT&ust=1754738778737000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCKi15r6N-44DFQAAAAAdAAAAABAE, // Par 1
  'https://www.google.com/url?sa=i&url=https%3A%2F%2Ffotografia.folha.uol.com.br%2Fgalerias%2F1692044339649122-imagens-do-manga-naruto&psig=AOvVaw2nAsilSempVOkPLu7U9gKT&ust=1754738778737000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCKi15r6N-44DFQAAAAAdAAAAABAL, // Par 2
  'https://www.google.com/url?sa=i&url=https%3A%2F%2Ffotografia.folha.uol.com.br%2Fgalerias%2F1692044339649122-imagens-do-manga-naruto&psig=AOvVaw2nAsilSempVOkPLu7U9gKT&ust=1754738778737000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCKi15r6N-44DFQAAAAAdAAAAABAL, // Par 2
  'https://www.google.com/url?sa=i&url=https%3A%2F%2Fpop.proddigital.com.br%2Fanalises%2Fanalises-de-animacoes%2Fanalise-naruto&psig=AOvVaw2nAsilSempVOkPLu7U9gKT&ust=1754738778737000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCKi15r6N-44DFQAAAAAdAAAAABAX, // Par 3
  'https://www.google.com/url?sa=i&url=https%3A%2F%2Fpop.proddigital.com.br%2Fanalises%2Fanalises-de-animacoes%2Fanalise-naruto&psig=AOvVaw2nAsilSempVOkPLu7U9gKT&ust=1754738778737000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCKi15r6N-44DFQAAAAAdAAAAABAX '  // Par 3
];

let cartas = [];
let primeiroClique = null;
let bloqueado = false;
let paresEncontrados = 0;
const totalPares = cartasValores.length / 2;

const tabuleiro = document.getElementById('tabuleiro');
const resultado = document.getElementById('resultado');

function criarCartas() {
  cartas = [];
  // Duplicar as imagens para formar pares
  cartas = [...cartasValores];
  // Embaralhar
  for (let i = cartas.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cartas[i], cartas[j]] = [cartas[j], cartas[i]];
  }
}

function criarTabuleiro() {
  tabuleiro.innerHTML = '';
  criarCartas();
  paresEncontrados = 0;
  resultado.textContent = '';
  primeiroClique = null;
  bloqueado = false;

  // Cria as cartas no tabuleiro
  cartas.forEach((imagemURL, index) => {
    const carta = document.createElement('div');
    carta.className = 'carta';

    // Imagem do topo (verso da carta)
    const imgFrente = document.createElement('img');
    // Imagem do verso (parte de trás da carta)
    const imgVerso = document.createElement('img');

    // Configura os atributos
    imgFrente.src = 'https://images.unsplash.com/photo-1604918256618-4b2f4f6b2b3a?ixlib=rb-4.0.1&auto=format&fit=crop&w=120&q=80'; // fundo padrão
    imgFrente.className = 'frente';

    imgVerso.src = imagemURL; // a imagem da carta
    imgVerso.className = 'verso';

    // Adiciona as imagens ao div
    carta.appendChild(imgFrente);
    carta.appendChild(imgVerso);

    // Evento de clique
    carta.onclick = () => revelarCarta(index, carta);

    // Adiciona ao tabuleiro
    tabuleiro.appendChild(carta);
  });
}

function revelarCarta(index, cartaElemento) {
  if (bloqueado || cartaElemento.classList.contains('revelada')) return;

  cartaElemento.classList.add('revelada');

  if (!primeiroClique) {
    primeiroClique = { index, cartaElemento };
  } else {
    // Verifica se as imagens combinam
    if (cartas[index] === cartas[primeiroClique.index]) {
      // par encontrado
      paresEncontrados++;
      if (paresEncontrados === totalPares) {
        const nomeJogador = document.getElementById('nomeJogador').textContent;
        resultado.textContent = `Parabéns, ${nomeJogador}! Você ganhou!`;
      }
      primeiroClique = null;
    } else {
      // não combinam, esconder após delay
      bloqueado = true;
      setTimeout(() => {
        cartaElemento.classList.remove('revelada');
        primeiroClique.cartaElemento.classList.remove('revelada');
        primeiroClique = null;
        bloqueado = false;
      }, 1000);
    }
  }
}

function reiniciarJogo() {
  criarTabuleiro();
}

// Cria o tabuleiro ao carregar
criarTabuleiro();
