const cartas = document.querySelectorAll('.carta');

const sons = {
    erro: new Audio('audiosJong/erro.mp3')
};

let cartaVirada = false;
let bloquearClique = false;
let primeiraCarta, segundaCarta;

function virarCarta() {
    if (bloquearClique) return;
    if (this === primeiraCarta) return;
    this.classList.toggle('virada');

    // Verifica se a carta é a primeira ou a segunda a ser clicada
    if (!cartaVirada) {
        cartaVirada = true;
        primeiraCarta = this;
        return;
    } else {
        cartaVirada = false;
        segundaCarta = this;
        
        verificar()
    }
}

    // Verifica se as cartas são iguais ou não
function verificar() {
    if (primeiraCarta.dataset.framework === segundaCarta.dataset.framework) {
        primeiraCarta.removeEventListener('click', virarCarta);
        segundaCarta.removeEventListener('click', virarCarta);
    } else {
        sons.erro.currentTime = 0;
        sons.erro.play().catch(e => console.log("Erro", e));

        bloquearClique = true;
        setTimeout(() => {
        primeiraCarta.classList.remove('virada');
        segundaCarta.classList.remove('virada');
        bloquearClique = false;
    }, 1000);
}
}

// Função que transforma as cartas em arrays e manipula a ordem
function embaralhar() {
    const jogo = document.querySelector('.jogo');
    const cartasArray = Array.from(cartas);

    // Embaralha o array
    cartasArray.sort(() => Math.random() - 0.5);
    cartasArray.forEach(carta => jogo.appendChild(carta));
}

function resetTabuleiro() {
    cartas.forEach(carta => {
        carta.classList.remove('virada');
        carta.removeEventListener('click', virarCarta);
        carta.addEventListener('click', virarCarta);

        //Parte para embaralhar mesmo quando o tabuleiro não for resolvido
        carta.style.display = 'none';
        carta.offsetHeight;
        carta.style.display = ''
    });

    cartaVirada = false;
    primeiraCarta = null;
    segundaCarta = null;
    bloquearClique = false;

    embaralhar();
}

cartas.forEach(carta => carta.addEventListener('click', virarCarta));
document.getElementById('reset').addEventListener('click', resetTabuleiro);

embaralhar();