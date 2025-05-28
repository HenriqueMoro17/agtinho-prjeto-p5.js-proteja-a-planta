let stage = 0; // Estágio inicial: semente
let water = 100; // Nível de água
let light = 50; // Nível de luz
let health = 100; // Saúde da planta
let pests = []; // Array para armazenar as pragas

function setup() {
  createCanvas(600, 400); // Tamanho da tela
  textSize(100); // Aumenta o tamanho do texto para os emojis
  textAlign(CENTER, CENTER); // Centraliza o texto
  frameRate(2); // Lenta a execução para ver a evolução e as pragas
}

function draw() {
  background(220);

  // Desenha a planta de acordo com o estágio
  if (stage === 0) {
    drawSeed();
  } else if (stage === 1) {
    drawSprout();
  } else if (stage === 2) {
    drawYoungPlant();
  } else if (stage === 3) {
    drawFlower();
  } else if (stage === 4) {
    drawFruit();
  } else if (stage === 5) {
    drawAdultPlant();
  }

  // Mostra os níveis de água, luz e saúde
  textSize(20);
  text(`💧: ${water}`, 20, 40); // Emoji de água
  text(`☀️: ${light}`, 20, 70); // Emoji de luz
  text(`❤️: ${health}`, width - 100, 40); // Emoji de saúde

  // Proliferação de pragas conforme a saúde da planta diminui
  proliferatePests();

  // Mostra as pragas na tela
  for (let i = 0; i < pests.length; i++) {
    textSize(30);
    text("🐛", pests[i].x, pests[i].y); // Emoji de praga
  }

  // Se todos os estágios forem completados, mostrar uma mensagem
  if (stage > 5) {
    showEndMessage();
  }

  // Verifica se há pragas para atacar
  checkPests();
}

function drawSeed() {
  text("🌱", width / 2, height / 2); // Emoji de semente
}

function drawSprout() {
  text("🌿", width / 2, height / 2); // Emoji de broto
}

function drawYoungPlant() {
  text("🌻", width / 2, height / 2); // Emoji de planta jovem ou folha
}

function drawFlower() {
  text("🌸", width / 2, height / 2); // Emoji de flor
}

function drawFruit() {
  text("🍎", width / 2, height / 2); // Emoji de fruta (exemplo: maçã)
}

function drawAdultPlant() {
  text("🌳", width / 2, height / 2); // Emoji de planta adulta
}

function showEndMessage() {
  textSize(30);
  text("🌱🌿🌻🌸🍎🌳", width / 2, height / 2 - 100); // Emojis representando o ciclo completo
  text("FIM DOS ESTÁGIOS!", width / 2, height / 2 + 50); // Mensagem final
}

function keyPressed() {
  // Aumenta o nível de água ao pressionar a tecla "A"
  if (key === "a") {
    water += 10;
  }
  // Aumenta o nível de luz ao pressionar a tecla "L"
  if (key === "l") {
    light += 10;
  }

  // Avança para o próximo estágio se tiver água e luz suficientes
  if (water > 80 && light > 40) {
    stage++;
    water = 50;
    light = 20;
  }
}

function proliferatePests() {
  // As pragas se proliferam se a saúde da planta for baixa
  if (health < 100 && frameCount % 3 === 0) { // A cada 3 quadros
    let pest = {
      x: random(width),
      y: random(height / 2, height), // As pragas aparecem na parte inferior da tela
    };
    pests.push(pest);
  }
}

function checkPests() {
  // Verifica se a planta é forte o suficiente para matar as pragas
  if (stage >= 3) { // A planta precisa estar no estágio de flor para começar a matar as pragas
    for (let i = pests.length - 1; i >= 0; i--) {
      // Se a planta atingir a praga (simulado por estar em um estágio suficiente), elimina a praga
      pests.splice(i, 1); // Remove a praga
      health += 10; // Recupera saúde após eliminar a praga
    }
  } else if (stage < 3) {
    // A planta ainda não é forte o suficiente para matar as pragas
    health -= 5; // A saúde da planta diminui com a presença de pragas
  }

  // Se a saúde cair a 0, o jogo termina
  if (health <= 0) {
    health = 0;
    textSize(30);
    text("A planta morreu!", width / 2, height / 2 + 100);
    noLoop(); // Para o jogo
  }
}

// Função que chama `spawnPests` para gerar pragas aleatoriamente
function spawnPests() {
  if (random(1) < 0.1) { // Uma chance de 10% de uma praga aparecer por quadro
    let pest = {
      x: random(width),
      y: random(height / 2, height), // As pragas aparecem na parte inferior da tela
    };
    pests.push(pest);
  }
}

