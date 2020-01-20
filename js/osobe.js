window.onload = function () {
  Pozivi.dajLokacijeOsoblja(function(data) {
    var json = data;
    //console.log(json);
    var sadrzaj = document.getElementsByClassName("sadrzaj");
    tbl = document.createElement("table");
    tbl.setAttribute("id", "tabela");
    tbl.setAttribute("class", "table table-bordered");
    row = document.createElement("tr");
    cell = document.createElement("th");
    cellText = document.createTextNode("Naziv osobe");
    cell.appendChild(cellText);
    row.appendChild(cell);

    cell2 = document.createElement("th");
    cellText2 = document.createTextNode("Sala");
    cell2.appendChild(cellText2);
    row.appendChild(cell2);

    cell3 = document.createElement("th");
    cellText3 = document.createTextNode("Pocetak");
    cell3.appendChild(cellText3);
    row.appendChild(cell3);

    cell4 = document.createElement("th");
    cellText4 = document.createTextNode("Kraj");
    cell4.appendChild(cellText4);
    row.appendChild(cell4);
    tbl.appendChild(row);


    for (let i = 0; i < json.length; ++i) {
      row = document.createElement("tr");

      cell = document.createElement("td");
      let str = json[i].uloga + " " + json[i].ime + " " +json[i].prezime;
      cellText = document.createTextNode(str);
      cell.appendChild(cellText);
      row.appendChild(cell);

      cell2 = document.createElement("td");
      cellText2 = document.createTextNode(json[i].naziv);
      cell2.appendChild(cellText2);
      row.appendChild(cell2);


      cell3 = document.createElement("td");
      cellText3 = document.createTextNode(json[i].pocetak.substr(0, 5) + "h");
      cell3.appendChild(cellText3);
      row.appendChild(cell3);

      cell4 = document.createElement("td");
      cellText4 = document.createTextNode(json[i].kraj.substr(0, 5) + "h");
      cell4.appendChild(cellText4);
      row.appendChild(cell4);
      tbl.appendChild(row);
    }
    sadrzaj[0].appendChild(tbl);
  });
}

