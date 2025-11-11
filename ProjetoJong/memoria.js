const cartas = document.querySelectorAll('.carta');

const sons = {
    erro: new Audio('audiosJong/erro.mp3'),
    derrota: new Audio('audiosJong/derrota.mp3')
};

let cartaVirada = false;
let bloquearClique = false;
let primeiraCarta, segundaCarta;
const vidas_max = 5;
let vidas = vidas_max;
atualizarVidas();

function virarCarta() {
    if (bloquearClique) return;
    if (this === primeiraCarta) return;
    this.classList.toggle('virada');

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

function virarTodasCartas() {
    cartas.forEach(carta => {
        if (!carta.classList.contains('virada')) {
            carta.classList.add('virada');
            carta.removeEventListener('click', virarCarta);
        }
    });
}

function verificar() {
    if (primeiraCarta.dataset.framework === segundaCarta.dataset.framework) {
        primeiraCarta.removeEventListener('click', virarCarta);
        segundaCarta.removeEventListener('click', virarCarta);

        const todasViradas = Array.from(cartas).every(carta => carta.classList.contains('virada'));
        if (todasViradas) {
            mostrarVitoria();
        }
    } else {
        sons.erro.currentTime = 0;
        sons.erro.play().catch(e => console.log("Erro", e));

        bloquearClique = true;
        setTimeout(() => {
        primeiraCarta.classList.remove('virada');
        segundaCarta.classList.remove('virada');
        bloquearClique = false;
        perderVida();
    }, 1000);
}
}

function embaralhar() {
    const jogo = document.querySelector('.jogo');
    const cartasArray = Array.from(cartas);

    cartasArray.sort(() => Math.random() - 0.5);
    cartasArray.forEach(carta => jogo.appendChild(carta));
}

function resetTabuleiro() {
    cartas.forEach(carta => {
        carta.classList.remove('virada');
        carta.removeEventListener('click', virarCarta);
        carta.addEventListener('click', virarCarta);

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

function atualizarVidas() {
    const vidasContainer = document.getElementById('vidas_interface');
    vidasContainer.innerHTML = '';

    const span = document.createElement('span');
    span.textContent = 'Vidas:';
    vidasContainer.appendChild(span);

    const imgContainer = document.createElement('div');
    imgContainer.classList.add('vidas-img-container');

    for (let i = 0; i < vidas; i++) {
        const img = document.createElement('img');
        img.src = 'imagensJong/jong_cabeca.png';
        img.alt = 'Vida';
        img.classList.add('icone-vida');
        imgContainer.appendChild(img);
    }

    vidasContainer.appendChild(imgContainer);
}

function perderVida() {
    vidas--;
    atualizarVidas();

    if (vidas <= 0) {
        bloquearClique = true;
        sons.derrota.currentTime = 0;
        sons.derrota.play().catch(e => console.log("Erro ao tocar derrota", e));

        virarTodasCartas();

        const caixa = document.querySelector('.caixa');
        if (!document.querySelector('.fim-jogo-overlay')) {
            const overlay = document.createElement('div');
            overlay.classList.add('fim-jogo-overlay');
            overlay.textContent = '💀 Fim de jogo! Clique para reiniciar.';
            caixa.appendChild(overlay);

            overlay.addEventListener('click', () => {
                overlay.remove();
                resetJogo();
            });
        }
    }
}

function mostrarVitoria() {
    bloquearClique = true;

    const caixa = document.querySelector('.caixa');

    if (!document.querySelector('.vitoria-overlay')) {
        const overlay = document.createElement('div');
        overlay.classList.add('vitoria-overlay');
        overlay.textContent = 'Você ganhou!';
        caixa.appendChild(overlay);

        overlay.addEventListener('click', () => {
            overlay.remove();
        });
    }
}

function resetJogo() {
    vidas = vidas_max;
    atualizarVidas();
    resetTabuleiro();
}

cartas.forEach(carta => carta.addEventListener('click', virarCarta));
document.getElementById('reset').addEventListener('click', resetJogo);

embaralhar();