var today = new Date();
var currentMonth = today.getMonth();
var months = ["Januar", "Februar", "Mart", "April", "Maj", "Juni", "Juli", "August", "Septembar", "Oktobar", "Novembar", "Decembar"];

function next() {
    //currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear;
    currentMonth = (currentMonth + 1) % 12;
    if(currentMonth == 11) { //decembar
    	document.querySelector(".next").disabled = true;
    } else if(currentMonth == 1) { //februar
    	document.querySelector(".prev").disabled = false;
	}
	
	Kalendar.iscrtajKalendar(document.querySelector(".dateGrid"), currentMonth);
}

function previous() {
    ///currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
    currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
    if(currentMonth == 0) {
    	document.querySelector(".prev").disabled = true;
    } else if(currentMonth == 10) {//novembar
    	document.querySelector(".next").disabled = false;
    }
    Kalendar.iscrtajKalendar(document.querySelector(".dateGrid"), currentMonth);
}



var Kalendar = (function(){
//
//ovdje idu privatni atributi
//
/*function obojiZauzecaImpl(kalendarRef, mjesec, sala, pocetak, kraj){
//implementacija ide ovdje
}
function ucitajPodatkeImpl(periodicna, vanredna){
//implementacija ide ovdje
}*/
function iscrtajKalendarImpl(kalendarRef, month){
    currentMonth = month;
    let timeWrapper = document.createElement("time");
    timeWrapper.innerHTML = months[currentMonth];
    document.querySelector(".monthIndicator").innerHTML = "";
    document.querySelector(".monthIndicator").appendChild(timeWrapper);
	kalendarRef.innerHTML = "";

    let firstDay = ((new Date(2019, month)).getDay() + 6) % 7; //shiftaj dane za 6 jer je nedjelja prvi dan
    let daysInMonth = 32 - new Date(2019, month, 32).getDate();
    let date = 1;
    for (let i = 0; i < 6; i++) {

        //creating individual cells, filing them up with data.
        for (let j = 0; j < 7; j++) {
            if (i === 0 && j < firstDay) {
            	let tempDiv = document.createElement("div");
            	tempDiv.classList.add("fake");
            	kalendarRef.appendChild(tempDiv);
            }
            else if (date > daysInMonth) {
                break;
            }

            else {
            	let dayWrapper = document.createElement("div");
            	dayWrapper.classList.add("dayWrapper");

					let buttonDiv = document.createElement("div");
					buttonDiv.classList.add("buttonDiv");
						let dugmeTemp = document.createElement("button");
							let timeTemp = document.createElement("time");
							timeTemp.innerHTML = date;
                        dugmeTemp.appendChild(timeTemp);
                    buttonDiv.appendChild(dugmeTemp);

					let statusDiv = document.createElement("div");            	
					statusDiv.classList.add((j%3) == 0 ? "slobodna" : "zauzeta");
					statusDiv.innerHTML= "&nbsp;"
                dayWrapper.appendChild(buttonDiv);
				dayWrapper.appendChild(statusDiv);
                kalendarRef.appendChild(dayWrapper);
                date++;
            }
        }
    }
}
return {
    //obojiZauzeca: obojiZauzecaImpl,
    //ucitajPodatke: ucitajPodatkeImpl,
    iscrtajKalendar : iscrtajKalendarImpl
}
}());

document.addEventListener('DOMContentLoaded', function () {
    Kalendar.iscrtajKalendar(document.querySelector(".dateGrid"), currentMonth);
    document.querySelector(".prev").addEventListener( "click", function( ev ) {
        previous();
    }, false);
    

    document.querySelector(".next").addEventListener( "click", function( ev ) {
        next();
    }, false);
});