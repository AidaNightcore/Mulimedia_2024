const canvas = document.getElementById("olympicCanvas");
const ctx = canvas.getContext("2d");

// Culorile olimpice de bază
const baseColors = ["blue", "black", "red", "yellow", "green"];

const sports = [
  "Aquatics",
  "Archery",
  "Athletics",
  "Badminton",
  "Baseball/softball",
  "Basketball",
  "Canoeing",
  "Cricket",
  "Cycling",
  "Equestrian",
  "Fencing",
  "Field hockey",
  "Flag football",
  "Football",
  "Golf",
  "Gymnastics",
  "Handball",
  "Judo",
  "Lacrosse",
  "Modern pentathlon",
  "Rowing",
  "Rugby sevens",
  "Sailing",
  "Shooting",
  "Skateboarding",
  "Sport climbing",
  "Squash",
  "Surfing",
  "Table tennis",
  "Taekwondo",
  "Tennis",
  "Triathlon",
  "Volleyball",
  "Weightlifting",
  "Wrestling",
];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight * 0.5;
}
resizeCanvas();

function drawOlympicRings() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const radius = Math.min(canvas.width, canvas.height) * 0.15;
  const startX = canvas.width * 0.1;
  const startY = canvas.height * 0.3;
  const gap = radius * 2.5;

  for (let i = 0; i < 5; i++) {
    const x = startX + (i % 3) * gap + (i > 2 ? gap / 2 : 0);
    const y = startY + (i > 2 ? radius * 1.5 : 0);
    drawCircle(x, y, radius, baseColors[i]);
  }
}

function drawCircle(x, y, radius, color) {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.lineWidth = radius * 0.1;
  ctx.strokeStyle = color;
  ctx.stroke();
  ctx.closePath();
}

function drawCustomOlympicRings(numCircles) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const radius = Math.min(canvas.width, canvas.height) * 0.08;
  const gap = radius * 2.5;
  const maxCirclesInRow = numCircles / 2;

  for (let i = 0; i < numCircles; i++) {
    const color = i < baseColors.length ? baseColors[i] : getRandomColor();

    const row = Math.floor(i / maxCirclesInRow);
    const x = canvas.width * 0.1 + (i % maxCirclesInRow) * gap;
    const y = canvas.height * 0.1 + row * (radius * 2.5);

    drawCircle(x, y, radius, color);
  }
  displaySports(numCircles);
}

function displaySports(numCircles) {
  const chosenSports = [];
  while (chosenSports.length < numCircles) {
    const randomSport = sports[Math.floor(Math.random() * sports.length)];
    if (!chosenSports.includes(randomSport)) {
      chosenSports.push(randomSport);
    }
  }

  ctx.font = "18px Poppins";
  ctx.fillStyle = "#f1e6fd";

  let y = 300;
  chosenSports.forEach((sport, index) => {
    const x = 100 + (index % 5) * 200;
    ctx.fillText(sport, x, y);
    if ((index + 1) % 5 === 0) y += 20;
  });
}

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

drawOlympicRings();

document
  .getElementById("circleForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    let numCircles = parseInt(document.getElementById("numCircles").value);
    if (numCircles % 2 !== 1 || numCircles < 5 || numCircles > 35) {
      alert("Numărul trebuie să fie impar și între 5 și 35.");
      return;
    }

    drawCustomOlympicRings(numCircles);
  });
