const players = [
  {
    name: "Kevin Sandborg",
    ab: 5,
    h: 3,
    doubles: 1,
    triples: 0,
    hr: 1
  },
  {
    name: "Austin Smith",
    ab: 8,
    h: 6,
    doubles: 1,
    triples: 0,
    hr: 2
  },
  {
    name: "Null",
    ab: 0,
    h: 0,
    doubles: 0,
    triples: 0,
    hr: 0
  }
];



function calculateStats(player) {

  const singles =
    player.h -
    player.doubles -
    player.triples -
    player.hr;

  const totalBases =
    singles +
    (player.doubles * 2) +
    (player.triples * 3) +
    (player.hr * 4);

  const avg = player.h / player.ab;
  const slg = totalBases / player.ab;
  const ops = avg + slg;

  return {
    avg,
    slg,
    ops
  };
}



const tbody = document.querySelector("#statsTable tbody");



function renderTable() {

  tbody.innerHTML = "";

  players.forEach(player => {

    const stats = calculateStats(player);

    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${player.name}</td>
      <td>${player.ab}</td>
      <td>${player.h}</td>
      <td>${player.doubles}</td>
      <td>${player.triples}</td>
      <td>${player.hr}</td>
      <td>${stats.avg.toFixed(3)}</td>
      <td>${stats.slg.toFixed(3)}</td>
      <td>${stats.ops.toFixed(3)}</td>
    `;

    tbody.appendChild(row);
  });
}



let ascending = true;



function sortPlayers(stat) {

  players.sort((a, b) => {

    let valueA;
    let valueB;

    // Calculated stats
    if (["avg", "slg", "ops"].includes(stat)) {

      valueA = calculateStats(a)[stat];
      valueB = calculateStats(b)[stat];

    } else {

      valueA = a[stat];
      valueB = b[stat];
    }

    // String sorting
    if (typeof valueA === "string") {

      return ascending
        ? valueA.localeCompare(valueB)
        : valueB.localeCompare(valueA);
    }

    // Number sorting
    return ascending
      ? valueA - valueB
      : valueB - valueA;
  });

  ascending = !ascending;

  renderTable();
}



// CLICKABLE HEADERS

const headers = document.querySelectorAll("th");

headers.forEach(header => {

  header.addEventListener("click", () => {

    const stat = header.dataset.stat;

    sortPlayers(stat);
  });
});



renderTable();