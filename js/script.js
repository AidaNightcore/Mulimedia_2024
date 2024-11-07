document.addEventListener("DOMContentLoaded", function () {
  function transpuneTable() {
    const table = document.getElementById("table");
    const thead = table.querySelector("thead");
    const headerCells = thead ? Array.from(thead.querySelectorAll("th")) : [];

    if (thead) {
      thead.remove();
    }

    const newTbody = document.createElement("tbody");
    const rows = Array.from(table.querySelectorAll("tr"));

    for (let i = 0; i < rows[0].cells.length; i++) {
      const newRow = document.createElement("tr");
      const newCell = document.createElement("th");
      newCell.textContent = headerCells[i] ? headerCells[i].textContent : "";
      newRow.appendChild(newCell);

      for (let j = 1; j < rows.length; j++) {
        const cell = document.createElement("td");
        cell.textContent = rows[j].cells[i].textContent;
        newRow.appendChild(cell);
      }
      newTbody.appendChild(newRow);
    }

    table.replaceChild(newTbody, table.querySelector("tbody"));
  }

  transpuneTable();
});

function valueAverage() {
  const table = document.getElementById("table");
  const rows = Array.from(table.querySelectorAll("tbody tr"));
  const totalDates = rows[0].cells.length - 1;
  const averages = [];

  rows.slice(1).forEach((row) => {
    const values = Array.from(row.cells)
      .slice(1)
      .map((cell) => parseFloat(cell.textContent.replace(",", ".")));
    const sum = values.reduce((acc, val) => acc + val, 0);
    const average = sum / totalDates;
    averages.push(average);
  });

  let resultWindow =
    "<h2>Media ultimelor 10 zile</h2><table><tr><th>Valută</th><th>Medie</th></tr>";

  rows.slice(1).forEach((row, index) => {
    resultWindow += `<tr><td>${row.cells[0].textContent}</td><td>${averages[
      index
    ].toFixed(4)}</td></tr>`;
  });

  resultWindow += "</table>";

  const newWindow = window.open("", "MediaValute", "width=600,height=400");
  newWindow.document.write(resultWindow);
}
