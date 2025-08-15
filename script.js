const animais = [
  '🐶', '🐱', '🐭', '🐹', '🐰', '🦊',
  '🐻', '🐼', '🐨', '🐯', '🦁', '🐸'
];

let cartas = [];
let primeiraCarta = null;
let segundaCarta = null;
let bloqueado = false;
let paresEncontrados = 0;

const jogoContainer = document.getElementById('jogo');
const mensagem = document.getElementById('mensagem');
const reiniciarBtn = document.getElementById('reiniciar');
const nomeInput = document.getElementById('nome');

function shuffle(array) {
  for (let i = array.length -1; i >0; i--) {
    const j = Math.floor(Math.random() * (i+1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function inicializarJogo() {
  paresEncontrados = 0;
  mensagem.textContent = '';
  primeiraCarta = null;
  segundaCarta = null;
  bloqueado = false;

  // Preparar as cartas: duplicar e embaralhar
  const cartasAnimais = [...animais, ...animais];
  shuffle(cartasAnimais);

  // Limpar o container
  jogoContainer.innerHTML = '';

  // Criar as cartas
  cartasAnimais.forEach((animal, index) => {
    const carta = document.createElement('div');
    carta.className = 'carta';
    carta.dataset.animals = animal;
    carta.dataset.index = index;
    carta.textContent = '';
    carta.addEventListener('click', viradaCarta);
    jogoContainer.appendChild(carta);
  });
}

function viradaCarta(e) {
  if (bloqueado) return;

  const carta = e.currentTarget;

  // Se já estiver virada ou combinada, ignore
  if (carta.textContent !== '') return;

  // Mostrar o animal
  carta.textContent = carta.dataset.animals;

  if (!primeiraCarta) {
    primeiraCarta = carta;
  } else if (primeiraCarta && !segundaCarta && carta !== primeiraCarta) {
    segundaCarta = carta;
    verificarPar();
  }
}

function verificarPar() {
  if (primeiraCarta.dataset.animals === segundaCarta.dataset.animals) {
    // Encontrou um par
    paresEncontrados++;
    mensagem.textContent = `Par encontrado! Total: ${paresEncontrados}`;
    primeiraCarta = null;
    segundaCarta = null;

    if (paresEncontrados === 6) {
      mensagem.textContent = `Parabéns, ${nomeInput.value || 'Jogador'}! Você ganhou!`;
    }
  } else {
    // Não é par, esconder após um delay
    bloqueado = true;
    setTimeout(() => {
      primeiraCarta.textContent = '';
      segundaCarta.textContent = '';
      primeiraCarta = null;
      segundaCarta = null;
      bloqueado = false;
    }, 1000);
  }
}

document.getElementById('reiniciar').addEventListener('click', inicializarJogo);

// Iniciar o jogo ao carregar a página
window.onload = () => {
  inicializarJogo();
};
