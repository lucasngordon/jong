var carta = {
    front: document.querySelector("img.front"),
    verse: document.querySelector("img.verso"),
}

function createCard(frontImageURL, verseImageURL) {
    return {
        carta: {
            frente: document.querySelector(frontImageURL),
            verso: document.querySelector(verseImageURL),
        }
    };
}

var imagens = ["ProjetoJong/imagensJong/jong_cabeca.png", "ProjetoJong/imagensJong/amongus.png", "ProjetoJong/imagensJong/jong_bigode.jpg", "ProjetoJong/imagensJong/jong_bolsonaro.png",
    "ProjetoJong/imagensJong/jong_careca.png", "ProjetoJong/imagensJong/jong_militar_1.jpg", "ProjetoJong/imagensJong/jong_militar_2.jpg", "ProjetoJong/imagensJong/jong_mineiro.png",
    "ProjetoJong/imagensJong/jong_negro.jpg", "ProjetoJong/imagensJong/jong_oculos.jpg", "ProjetoJong/imagensJong/jong_safado.png", "ProjetoJong/imagensJong/jong_sorrindo.png", "ProjetoJong/imagensJong/JONG.jpg" 
]

export function createDeck(imagens) {
    for(i in imagens.length){
        deck[i] = createCard(imagens[i], "ProjetoJong/imagensJong/backcard.jpg")
    }
    return deck
}

carta.addEventListener('click', virar)

function virar() {
    window.alert('jong.')
}
