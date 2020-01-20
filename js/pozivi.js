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
/*
            for (var i = redovna.length - 1; i >= 0; i--) {
                let semestar = Semestar(currentMonth);
                let t1 = redniDan == redovna[i]['dan'];
                let t2 = trenutnaSala == redovna[i]['naziv'];
                let t3 = semestar == redovna[i]['semestar'].toLowerCase();
                let t4 = poklapanjeVremenaImpl(vrijemePocetak, vrijemeKraj, redovna[i]['pocetak'], redovna[i]['kraj']);
                if(t1 && t2 && t3 && t4) {
                    return "Nije moguće rezervisati salu " + trenutnaSala + 
                            " za navedeni datum " + dan + '/' + (currentMonth+1) + '/' + currentYear + " i termin od " +
                             vrijemePocetak + " do "+ vrijemeKraj +"!";
                }
            }

            for (var i = vanredna.length - 1; i >= 0; i--) {
                let t1 = poklapanjeVremenaImpl(vrijemePocetak, vrijemeKraj, vanredna[i]['pocetak'], vanredna[i]['kraj']);
                let parametri = vanredna[i]['datum'].split(".");
                let dat = new Date(+parametri[2], parametri[1] - 1, +parametri[0]);
                let dan3 = ((dat.getDay() + 6) % 7);
                if(checked) {
                    var t2 = redniDan == dan3;
                } else {
                    var t2 = dan == dat.getDate();
                }
                
                
                let t3 = trenutnaSala == vanredna[i]['naziv'];
                if(t1 && t2  && t3) {
                    return "Nije moguće rezervisati salu " + trenutnaSala + " za navedeni datum " 
                            + dan + '/' + (currentMonth+1) + '/' + currentYear + " i termin od " +
                             vrijemePocetak + " do "+ vrijemeKraj +"!";
                }
            }*/
            var e = document.getElementById("osoblje")
            var osoba = e.options[e.selectedIndex].text;
            let string = osoba.split(" ");
            let ime = string[0];
            let prezime = string[1];
            let uloga = string[3];
            if(checked) {
                var tempVanredno = {
                    dan : redniDan,
                    datum : dan + '.' + (currentMonth+1) + '.' + currentYear, //
                    semestar: Semestar(currentMonth).toLowerCase(), 
                    pocetak : vrijemePocetak, 
                    kraj : vrijemeKraj, 
                    naziv : trenutnaSala, 
                    ime : ime,
                    prezime : prezime,
                    uloga : uloga, 
                    redovni : true
                }
                //jsonObj['redovna'].push(tempVanredno);
            } else {
                var tempVanredno = {
                    dan : redniDan, //
                    datum : dan + '.' + (currentMonth + 1) + '.' + currentYear, 
                    pocetak : vrijemePocetak, 
                    kraj : vrijemeKraj, 
                    naziv : trenutnaSala, 
                    ime : ime,
                    prezime : prezime,
                    uloga : uloga,
                    redovni : false
                }
                //jsonObj['vanredna'].push(tempVanredno);
            }
            


            $.ajax({
                contentType: 'application/json',
                //data: JSON.stringify(jsonObj),
                data: JSON.stringify(tempVanredno),
                dataType: 'json',
                success: function(data, status, xhr){
                    if(xhr.status == 200)  {
                        //console.log(data);
                        let tempObj = data;
                        redovna = tempObj['redovna'];
                        vanredna = tempObj['vanredna'];
                        Kalendar.ucitajPodatke(redovna, vanredna);
                        obojiPrviPut();
                    }
                },
                error: function(data, status, xhr){
                    //alert(JSON.stringify(data));
                    if (data.status == 409) {
                        alert(data.responseText);
                    } else if (data.status == 400) {
                        alert(data.responseText);
                    }
                },
                processData: false,
                type: 'POST',
                url: 'http://localhost:8080/json'
            });
    }

    function gibePicImpl(imgName, imgTag, dataUcitanih) {
        //console.log(imgName);
        $.ajax({
          type: "GET",
          url: "http://localhost:8080/" + imgName,
          beforeSend: function (xhr) {
            xhr.overrideMimeType('text/plain; charset=x-user-defined');
          },
          success: function (result, textStatus, jqXHR) {       
            if(result.length < 1){
                alert("The thumbnail doesn't exist");
                imgTag.src = "data:image/png;base64,";
                return
            }

            var binary = "";
            var responseText = jqXHR.responseText;
            var responseTextLen = responseText.length;

            for ( i = 0; i < responseTextLen; i++ ) {
                binary += String.fromCharCode(responseText.charCodeAt(i) & 255)
            }
            imgTag.src = "data:image/png;base64,"+btoa(binary);
            dataUcitanih.push(imgTag.src);
          },
          error: function(xhr, textStatus, errorThrown){
            alert("Error in getting document "+textStatus);
          } 
        });
    }

    function dajOsobljeJSONImpl() {
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
        xhttp.open("GET", "http://localhost:8080/osoblje", false);
        xhttp.send();
        return podaci;
    }

    return {
        dajZauzecaJSON : dajZauzecaJSONImpl,
        dodajZauzece : dodajZauzeceImpl,
        gibePic : gibePicImpl,
        dajOsobljeJSON : dajOsobljeJSONImpl
    }
}());