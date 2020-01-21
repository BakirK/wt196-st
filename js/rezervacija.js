var today = new Date();
var currentMonth = today.getMonth();
var currentYear = today.getYear() + 1900;
var months = ["Januar", "Februar", "Mart", "April", "Maj", "Juni", "Juli", "August", "Septembar", "Oktobar", "Novembar", "Decembar"];
var trenutnaSala;
var sala;
var pocetakVrijeme, krajVrijeme;
var jsonObj;
var redovna;
var vanredna;


if(currentMonth == 11) { //decembar
    document.querySelector(".next").disabled = true;
} else if(currentMonth == 0) {
    document.querySelector(".prev").disabled = true;
}
//dugme next
function next() {
    currentMonth = (currentMonth + 1) % 12;
    if(currentMonth == 11) { //decembar
        document.querySelector(".next").disabled = true;
    } else if(currentMonth == 1) { //februar
        document.querySelector(".prev").disabled = false;
    }
    
    Kalendar.iscrtajKalendar(document.querySelector(".dateGrid"), currentMonth);
}
//dugme prev
function previous() {
    currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
    if(currentMonth == 0) {
        document.querySelector(".prev").disabled = true;
    } else if(currentMonth == 10) {//novembar
        document.querySelector(".next").disabled = false;
    }
    Kalendar.iscrtajKalendar(document.querySelector(".dateGrid"), currentMonth);
}


function ucitajJSONPodatke() {  
    jsonObj = JSON.parse(Pozivi.dajZauzecaJSON());
    redovna = jsonObj['redovna'];
    vanredna = jsonObj['vanredna'];
    Kalendar.ucitajPodatke(redovna, vanredna);
}

function dodajListener() {
    
    sala = document.getElementById("sale");

    //dohvati osobe i sale
    napuniSelect();

    trenutnaSala = sala.options[sala.selectedIndex].innerHTML;
    //listener za promjenu odabira u listi sala
    sala.addEventListener('change', function() {
        trenutnaSala = sala.options[sala.selectedIndex].innerHTML;
        obojiPrviPut();
    }, false);

    

    ucitajJSONPodatke();
    let dugmad = document.getElementsByClassName("dugmad");
    pocetakVrijeme = document.getElementById("pocetakVrijeme");
    krajVrijeme = document.getElementById("krajVrijeme");

    for (let i = dugmad.length - 1; i >= 0; i--) {
        dugmad[i].addEventListener( "click", function( ev ) {
            let temp = confirm('Dodati zauzece?');
            if(temp) {
                let redniDan = (document.getElementsByClassName("fake").length + parseInt(this.innerHTML))%7;
                if(!redniDan) redniDan = 7;
                let dan = parseInt(this.innerHTML);
                
                let vrijemePocetak = pocetakVrijeme.value.toString();
                let vrijemeKraj = krajVrijeme.value.toString();
                let checked = $('#tick').is(':checked');
                let temp = Pozivi.dodajZauzece(vrijemePocetak, vrijemeKraj, checked, dan, redniDan-1);
                if(temp) alert(temp);
                ucitajJSONPodatke();
                obojiPrviPut();
            }
        }, false);
    }

    pocetakVrijeme.addEventListener('input', function() {
        obojiPrviPut();
    });
    krajVrijeme.addEventListener('input', function() {
        obojiPrviPut();
    });

    document.querySelector(".prev").addEventListener( "click", function( ev ) {
        previous();
        obojiPrviPut();
    }, false);

    document.querySelector(".next").addEventListener( "click", function( ev ) {
        next();
        obojiPrviPut();
    }, false);

}

function napuniSelect() {
    jsonObj = JSON.parse(Pozivi.dajOsobljeJSON());
    let selectField = document.getElementById('osoblje');
    let index = 0;
    for (var i = 0; i < jsonObj.length; i++) {
        let obj = jsonObj[i];
        var opt = document.createElement("option");
        opt.value= index;
        let value = JSON.stringify(obj.ime).replace(/"/g,"") + ' ' + JSON.stringify(obj.prezime).replace(/"/g,"")+ ' - ' + JSON.stringify(obj.uloga).replace(/"/g,"");
        opt.innerHTML = value;
        selectField.appendChild(opt);
        index++;
    }

    jsonObj = JSON.parse(Pozivi.dajSaleJSON());
    index = 0;
    for (var i = 0; i < jsonObj.length; i++) {
        let obj = jsonObj[i];
        var opt = document.createElement("option");
        opt.value= index;
        let value = JSON.stringify(obj.naziv).replace(/"/g,"");
        opt.innerHTML = value;
        sala.appendChild(opt);
        index++;
    }
}


function obojiPrviPut() {
    pocetakVrijeme = document.getElementById("pocetakVrijeme");
    krajVrijeme = document.getElementById("krajVrijeme");
    let vrijemePocetak = pocetakVrijeme.value.toString();
    let vrijemeKraj = krajVrijeme.value.toString();
    Kalendar.obojiZauzeca(document.querySelector('.dateGrid'), currentMonth, trenutnaSala, vrijemePocetak, vrijemeKraj);
}

document.addEventListener('DOMContentLoaded', function () {
    Kalendar.iscrtajKalendar(document.querySelector(".dateGrid"), currentMonth);
    dodajListener();
    obojiPrviPut();
});