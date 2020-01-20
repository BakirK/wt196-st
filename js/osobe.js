window.onload = function(){call()};
var intervalID = setInterval(function(){call();}, 30000);
var call = function(){
    Pozivi.dajLokacijeOsoblja(function(data) {
      var json = data;
      var tbl = document.getElementById("tabela");
      tbl.innerHTML= "";
      row = document.createElement("tr");
      cell = document.createElement("th");
      cellText = document.createTextNode("Naziv osobe");
      cell.appendChild(cellText);
      row.appendChild(cell);

      cell2 = document.createElement("th");
      cellText2 = document.createTextNode("Sala");
      cell2.appendChild(cellText2);
      row.appendChild(cell2);

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

        tbl.appendChild(row);
      }
  })};