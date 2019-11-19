document.addEventListener('DOMContentLoaded', function () {
    document.querySelector(".prev").addEventListener( "click", function( ev ) {
   		previous();
		}, false);
    

    document.querySelector(".next").addEventListener( "click", function( ev ) {
   		next();
		}, false);
});
	
var today = new Date();
var currentMonth = today.getMonth();
let months = ["Januar", "Februar", "Mart", "April", "Maj", "Juni", "Juli", "August", "Septembar", "Oktobar", "Novembar", "Decembar"];

function next() {
    //currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear;
    currentMonth = (currentMonth + 1) % 12;
    if(currentMonth == 11) { //decembar
    	document.querySelector(".next").disabled = true;
    } else if(currentMonth == 1) { //februar
    	document.querySelector(".prev").disabled = false;
	}
	document.querySelector(".monthIndicator time").innerHTML = months[currentMonth];
	Kalendar.iscrtajKalendar();
    //showCalendar(currentMonth);
}

function previous() {
    ///currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
    currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
    if(currentMonth == 0) {
    	document.querySelector(".prev").disabled = true;
    } else if(currentMonth == 10) {//novembar
    	document.querySelector(".next").disabled = false;
    }
    document.querySelector(".monthIndicator time").innerHTML = months[currentMonth];
    //showCalendar(currentMonth);
    Kalendar.iscrtajKalendar();
}



let Kalendar = (function(){
//
//ovdje idu privatni atributi
//
function obojiZauzecaImpl(kalendarRef, mjesec, sala, pocetak, kraj){
//implementacija ide ovdje
}
function ucitajPodatkeImpl(periodicna, vanredna){
//implementacija ide ovdje
}
//function iscrtajKalendar(kalendarRef, mjesec){
	function iscrtajKalendar(){
	let kalendarWrapper = document.querySelector(".dateGrid");
	kalendarWrapper.innerHTML = "";

    let firstDay = (new Date(year, month)).getDay();
    let daysInMonth = 32 - new Date(year, month, 32).getDate();

    let date = 1;
    for (let i = 0; i < 6; i++) {
        // creates a table row
        //let row = document.createElement("tr");

        //creating individual cells, filing them up with data.
        for (let j = 0; j < 7; j++) {
            if (i === 0 && j < firstDay) {
            	let tempDiv = document.createElement("div");
            	tempDiv.classList.add("fake");
            	kalendarWrapper.appendChild(tempDiv);
/*
                let cell = document.createElement("td");
                let cellText = document.createTextNode("");
                cell.appendChild(cellText);
                row.appendChild(cell);*/
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

					let statusDiv = document.createElement("div");            	
					statusDiv.classList.add(i%2 == 0 ? "slobodna" : "zauzeta");
					statusDiv.innerHTML= "&nbsp;"
				dayWrapper.appendChild(statusDiv);
				dayWrapper.appendChild(buttonDiv);

/*
                let cell = document.createElement("td");
                let cellText = document.createTextNode(date);
                if (date === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
                    cell.classList.add("bg-info");
                } // color today's date
                cell.appendChild(cellText);
                row.appendChild(cell);*/
                date++;
            }


        }

       // tbl.appendChild(row); // appending each row into calendar body.
    }
}
return {
//obojiZauzeca: obojiZauzecaImpl,
//ucitajPodatke: ucitajPodatkeImpl,
iscrtajKalendar: iscrtajKalendarImpl
}
}());
//primjer korištenja modula
//Kalendar.obojiZauzeca(document.getElementById(“kalendar”),1,”1-15”,”12:00”,”13:30”);