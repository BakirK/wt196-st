var Pozivi = (function(){
    function dajZauzecaJSONImpl() {
        var podaci;
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                //alert(this.responseText);
                podaci = this.responseText;
            }
        };
        //callback iskljucen jer treba da proslijedi podatke od servera
        //nazad ka klijentu sto nije moguce sa callbackom
        xhttp.open("GET", "http://localhost:8080/zauzeca.json", false);
        xhttp.send();
        return podaci;
    }
    function poklapanjeVremenaImpl(v1, v2, v3, v4) {
        let date1Pocetak = parseInt(v1);
        let date1Kraj = parseInt(v2);
        let date2Pocetak = parseInt(v3);
        let date2Kraj = parseInt(v4);
        if(date1Pocetak > date2Pocetak && date1Pocetak < date2Kraj) return true;
        if(date1Kraj > date2Pocetak && date1Kraj < date2Kraj) return true;
        if(date2Pocetak > date1Pocetak && date2Pocetak < date1Kraj) return true;
        if(date2Kraj > date1Pocetak && date2Kraj < date1Kraj) return true;
        if(date1Pocetak == date2Pocetak) return true;
        if(date1Kraj == date2Kraj) return true;
        return false;
    }
    function dodajZauzeceImpl(vrijemePocetak, vrijemeKraj, checked, dan, redniDan) {
            let date = Date.parse(dan + '/' + currentMonth + '/' + currentYear);
        
            //let datumStart = Date.parse(dan + '/' + currentMonth + '/' + currentYear +' ' + vrijemePocetak + ':00');
            //let pocetniZauzetiDatum = Date.parse('01/01/2011 ' + periodicnaZauzeca[i].pocetak + ':00');
            //let krajniZauzetiDatum = Date.parse('01/01/2011 ' + periodicnaZauzeca[i].kraj + ':00');

            for (var i = redovna.length - 1; i >= 0; i--) {
                let semestar = Semestar(currentMonth);
                let t1 = redniDan == redovna[i]['dan'];
                let t2 = trenutnaSala == redovna[i]['naziv'] ;
                let t3 = semestar == redovna[i]['semestar'].toLowerCase();
                let t4 =  poklapanjeVremenaImpl(vrijemePocetak, vrijemeKraj, redovna[i]['pocetak'], redovna[i]['kraj']);
                if(t1 && t2 && t3 && t4) {
                    return "Nije moguće rezervisati salu " + trenutnaSala + 
                            " za navedeni datum " + dan + '/' + currentMonth + '/' + currentYear + " i termin od " +
                             vrijemePocetak + " do "+ vrijemeKraj +"!";
                }
            }

            for (var i = vanredna.length - 1; i >= 0; i--) {
                let t1 = poklapanjeVremenaImpl(vrijemePocetak, vrijemeKraj, vanredna[i]['pocetak'], vanredna[i]['kraj']);
                let t2 = (date == Date.parse(vanredna[i]['datum']));
                let t3 = trenutnaSala == vanredna[i]['naziv'];
                if(t1 && t2  && t3) {
                    return "Nije moguće rezervisati salu " + trenutnaSala + " za navedeni datum " 
                            + dan + '/' + currentMonth + '/' + currentYear + " i termin od " +
                             vrijemePocetak + " do "+ vrijemeKraj +"!";
                }
            }
            if(checked) {
                let tempVanredno = {
                    dan : redniDan, semestar: Semestar(currentMonth).toLowerCase(), pocetak : vrijemePocetak, kraj : vrijemeKraj, naziv : trenutnaSala, predavac : ""
                    }
                jsonObj['redovna'].push(tempVanredno);
            } else {
                let tempVanredno = {
                datum : dan + '.' + (currentMonth+1) + '.' + currentYear, pocetak : vrijemePocetak, kraj : vrijemeKraj, naziv : trenutnaSala, predavac : ""
                }
                jsonObj['vanredna'].push(tempVanredno);
            }
            


            $.ajax({
                contentType: 'application/json',
                data: JSON.stringify(jsonObj),
                dataType: 'json',
                success: function(data){
                    ucitajJSONPodatke();
                    obojiPrviPut();
                },
                error: function(){
                    alert("Server ugasen!?");
                },
                processData: false,
                type: 'POST',
                url: 'http://localhost:8080/json'
            });
    }

    return {
        dajZauzecaJSON : dajZauzecaJSONImpl,
        dodajZauzece : dodajZauzeceImpl
    }
}());