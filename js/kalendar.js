var Kalendar = (function(){
    var periodicnaZauzeca, vanrednaZauzeca;
    let ucitani = false;
    function Semestar(month) {
        if ((month >= 9 && month <= 11) || month == 0) return "zimski";
        if(month >= 1 && month <= 5) return "ljetni";
        return "raspust";
    }
    function poklapajuSeDatumi(date1Pocetak, date1Kraj, date2Pocetak, date2Kraj) {
        if(date1Pocetak > date2Pocetak && date1Pocetak < date2Kraj) return true;
        if(date1Kraj > date2Pocetak && date1Kraj < date2Kraj) return true;
        if(date2Pocetak > date1Pocetak && date2Pocetak < date1Kraj) return true;
        if(date2Kraj > date1Pocetak && date2Kraj < date1Kraj) return true;
        if(date1Pocetak == date2Pocetak) return true;
        if(date1Kraj == date2Kraj) return true;
        return false;
    }
    function obojiZauzecaImpl(kalendarRef, mjesec, sala, pocetak, kraj){
        let pozadine = document.getElementsByClassName("pozadina");
        for (let j = 0; j < pozadine.length; j++) {
            pozadine[j].classList.remove("zauzeta");
            pozadine[j].classList.add("slobodna");
        }

        if (ucitani) {
            let dugmad = document.getElementsByClassName("dugmad");
            for (var i = dugmad.length - 1; i >= 0; i--) {
                //dugmad[i].disabled = false;
            }
            for (let i = 0; i < periodicnaZauzeca.length; i++) {
                if(sala.toLowerCase()  == periodicnaZauzeca[i].naziv.toLowerCase()) {
                    if(Semestar(mjesec) === periodicnaZauzeca[i].semestar.toLowerCase()) {
                        let trenutniDan = document.getElementsByClassName("fake").length;

                        let pocetniDatum = Date.parse('01/01/2011 ' + pocetak + ':00');
                        let krajniDatum = Date.parse('01/01/2011 ' + kraj + ':00');
                        let pocetniZauzetiDatum = Date.parse('01/01/2011 ' + periodicnaZauzeca[i].pocetak + ':00');
                        let krajniZauzetiDatum = Date.parse('01/01/2011 ' + periodicnaZauzeca[i].kraj + ':00');
                        pozadine = document.getElementsByClassName("pozadina");
                        for (let j = 0; j < pozadine.length; j++) {
                            if(trenutniDan == periodicnaZauzeca[i].dan && 
                                poklapajuSeDatumi(pocetniDatum, krajniDatum, pocetniZauzetiDatum, krajniZauzetiDatum)) {
                                pozadine[j].classList.remove("slobodna");
                                pozadine[j].classList.add("zauzeta");
                                //dugmad[j].disabled = true;
                            }
                            trenutniDan = (trenutniDan + 1)% 7;
                        }
                    }
                }
            }

            for (let i = 0; i < vanrednaZauzeca.length; i++) {
                if(sala.toLowerCase() == vanrednaZauzeca[i].naziv.toLowerCase()) {
                    let datumVanredna = vanrednaZauzeca[i].datum.split(".");
                    if(mjesec == (datumVanredna[1] - 1)) {
                        let trenutniDan = 1;
                        let pocetniDatum = Date.parse('01/01/2011 ' + pocetak + ':00');
                        let krajniDatum = Date.parse('01/01/2011 ' + kraj + ':00');
                        let pocetniZauzetiDatum = Date.parse('01/01/2011 ' + vanrednaZauzeca[i].pocetak + ':00');
                        let krajniZauzetiDatum = Date.parse('01/01/2011 ' + vanrednaZauzeca[i].kraj + ':00');
                        pozadine = document.getElementsByClassName("pozadina");
                        for (let j = 0; j < pozadine.length; j++) {
                            if(trenutniDan == datumVanredna[0] &&
                                poklapajuSeDatumi(pocetniDatum, krajniDatum, pocetniZauzetiDatum, krajniZauzetiDatum)) {
                                pozadine[j].classList.remove("slobodna");
                                pozadine[j].classList.add("zauzeta");
                                //dugmad[j].disabled = true;
                            }
                            trenutniDan++;
                        }
                    }
                }
            }
        }
    }
    function ucitajPodatkeImpl(periodicna, vanredna){
        periodicnaZauzeca = periodicna;
        vanrednaZauzeca = vanredna;
        ucitani = true;
    }
    function iscrtajKalendarImpl(kalendarRef, month){
        currentMonth = month;
        let timeWrapper = document.createElement("time");
        timeWrapper.innerHTML = months[currentMonth];
        document.querySelector(".monthIndicator").innerHTML = "";
        document.querySelector(".monthIndicator").appendChild(timeWrapper);
    	kalendarRef.innerHTML = "";

        let firstDay = ((new Date(currentYear, month)).getDay() + 6) % 7; //shiftaj dane za 6 jer je nedjelja prvi dan
        let daysInMonth = 32 - new Date(currentYear, month, 32).getDate();
        let date = 1;
        for (let i = 0; i < 6; i++) {
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
                        dugmeTemp.disabled = false;
                        dugmeTemp.classList.add("dugmad");
						dugmeTemp.innerHTML = date;
                        //dugmeTemp.appendChild(timeTemp);
                        buttonDiv.appendChild(dugmeTemp);

    					let statusDiv = document.createElement("div");            	
    					statusDiv.classList.add("slobodna");
                        statusDiv.classList.add("pozadina");
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
        obojiZauzeca: obojiZauzecaImpl,
        ucitajPodatke: ucitajPodatkeImpl,
        iscrtajKalendar : iscrtajKalendarImpl,
        Semestar : Semestar,
        poklapajuSeDatumi : poklapajuSeDatumi
    }
}());




