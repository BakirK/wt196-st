var jsonObj;
var redovna;
var vanredna;
function ucitajJSONPodatke() {
    jsonObj = JSON.parse(Pozivi.dajZauzecaJSON());
    redovna = jsonObj['redovna'];
    vanredna = jsonObj['vanredna'];
    Kalendar.ucitajPodatke(redovna, vanredna);
}

function dodajListener() {
    let dugmad = document.getElementsByClassName("dugmad");
    for (let i = dugmad.length - 1; i >= 0; i--) {
        dugmad[i].addEventListener( "click", function( ev ) {
            let temp = confirm('Dodati zauzece?');
            if(temp) {
                let redniDan = (document.getElementsByClassName("fake").length + parseInt(this.innerHTML))%7;
                if(!redniDan) redniDan = 7;
                let dan = parseInt(this.innerHTML);
                pocetakVrijeme = document.getElementById("pocetakVrijeme");
                krajVrijeme = document.getElementById("krajVrijeme");
                let vrijemePocetak = pocetakVrijeme.value.toString();
                let vrijemeKraj = krajVrijeme.value.toString();
                let checked = document.getElementById("tick").value;
                let temp = Pozivi.dodajZauzece(vrijemePocetak, vrijemeKraj, checked, dan, redniDan-1);
                if(temp) alert(temp);
                else {
                    ucitajJSONPodatke();
                    obojiPrviPut();
                }
            }
        }, false);
    }
}