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

function hexagonPoints(x, y, size) {
  let points = [];
  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI / 3) * i;
    const px = x + size * Math.cos(angle);
    const py = y + size * Math.sin(angle);
    points.push(`${px},${py}`);
  }
  return points.join(" ");
}

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function drawHexagons(num) {
  const svg = document.getElementById("olympicHexagons");
  svg.innerHTML = "";
  const hexSize = 40;
  const xOffset = 100;
  const yOffset = 100;
  const rowHeight = hexSize * 2.5;
  const colSpacing = hexSize * 2.5;

  for (let i = 0; i < num; i++) {
    const row = i < Math.ceil(num / 2) ? 0 : 1;
    const col = i % Math.ceil(num / 2);

    const x = xOffset + col * colSpacing + (row === 1 ? colSpacing / 2 : 0);
    const y = yOffset + row * rowHeight;

    const color = i < 5 ? baseColors[i] : getRandomColor();
    const sportName = sports[Math.floor(Math.random() * sports.length)];

    const hex = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "polygon"
    );
    hex.setAttribute("points", hexagonPoints(x, y, hexSize));
    hex.setAttribute("stroke", color);
    hex.setAttribute("fill", "none");
    hex.setAttribute("stroke-width", "3");
    svg.appendChild(hex);

    const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    text.setAttribute("x", x);
    text.setAttribute("y", y + hexSize / 2 + 10);
    text.setAttribute("class", "text");
    text.textContent = sportName;
    svg.appendChild(text);
  }
}

window.addEventListener("load", () => drawHexagons(5));

document
  .getElementById("hexagonForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const numHex = parseInt(document.getElementById("numHex").value);
    if (numHex % 2 === 1 && numHex >= 5 && numHex <= 35) {
      drawHexagons(numHex);
    } else {
      alert("Vă rugăm să alegeți un număr impar între 5 și 35.");
    }
  });
