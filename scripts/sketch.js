// Variáveis da Bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 12;
let raio = diametro / 2;

//Velocidade da Bolinha
let velocidadeXdaBolinha = 5;
let velocidadeYdaBolinha = 5;

//Variáveis da Raquete
let raqueteComprimento = 10;
let raqueteAltura = 90;

//Posicao da minha Raquete
let xRaquete = 5;
let yRaquete = 150;

//Variáveis da Raquete do Oponente
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let velocidadeYOponente;

let meusPontos = 0;
let pontosDoOponente = 0;

//Sons do jogo
let raquetada;
let ponto;
let trilha;

let chanceDeErrar = 0;

function preload() {
	trilha = loadSound("../assets/music/trilha.mp3");
	ponto = loadSound("../assets/music/ponto.mp3");
	raquetada = loadSound("../assets/music/raquetada.mp3");
}

function setup() {
	createCanvas(600, 400);
	trilha.play();
}

function draw() {
	background(0);
	mostraBolinha();
	movimentaBolinha();
	verificaColisaoBorda();
	mostraRaquete(xRaquete, yRaquete);
	mostraRaquete(xRaqueteOponente, yRaqueteOponente);
	movimentaMinhaRaquete();
	movimentaRaqueteOponente();
	colisaoRaqueteBiblioteca(xRaquete, yRaquete);
	colisaoRaqueteBiblioteca(xRaqueteOponente, yRaqueteOponente);
	incluiPlacar();
	marcaPonto();
}

function mostraBolinha() {
	circle(xBolinha, yBolinha, 20);
}

function movimentaBolinha() {
	xBolinha += velocidadeXdaBolinha;
	yBolinha += velocidadeYdaBolinha;
}

function mostraRaquete(x, y) {
	rect(x, y, raqueteComprimento, raqueteAltura);
}

function verificaColisaoBorda() {
	if (xBolinha > width - raio || xBolinha < raio) {
		velocidadeXdaBolinha *= -1;
	}

	if (yBolinha > height - raio || yBolinha < raio) {
		velocidadeYdaBolinha *= -1;
	}
}

function movimentaMinhaRaquete() {
	if (keyIsDown(UP_ARROW)) {
		yRaquete -= 10;
	}
	if (keyIsDown(DOWN_ARROW)) {
		yRaquete += 10;
	}
}

function movimentaRaqueteOponente() {
	velocidadeYOponente =
		yBolinha - yRaqueteOponente - raqueteComprimento / 2 - 10;
	yRaqueteOponente += velocidadeYOponente;
	calculaChanceDeErrar();
}

function calculaChanceDeErrar() {
	if (pontosDoOponente >= meusPontos) {
		chanceDeErrar += 1;
		if (chanceDeErrar >= 39) {
			chanceDeErrar = 40;
		}
	} else {
		chanceDeErrar -= 1;
		if (chanceDeErrar <= 35) {
			chanceDeErrar = 35;
		}
	}
}

function colisaoRaqueteBiblioteca(x, y) {
	let colidiu = collideRectCircle(
		x,
		y,
		raqueteComprimento,
		raqueteAltura,
		xBolinha,
		yBolinha,
		raio
	);
	if (colidiu) {
		velocidadeXdaBolinha *= -1;
		raquetada.play();
	}
}

function incluiPlacar() {
	stroke(255);
	textAlign(CENTER);
	textSize(16);
	fill(color(166, 131, 189));
	rect(150, 10, 40, 20);
	fill(255);
	text(meusPontos, 170, 26);
	fill(color(166, 131, 189));
	rect(450, 10, 40, 20);
	fill(255);
	text(pontosDoOponente, 470, 26);
}

function marcaPonto() {
	if (xBolinha > 590) {
		meusPontos += 1;
		ponto.play();
	}
	if (xBolinha < 10) {
		pontosDoOponente += 1;
		ponto.play();
	}
}
