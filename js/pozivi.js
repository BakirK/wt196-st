var Pozivi = (function(){
    function dajZauzecaJSONImpl() {
        var podaci;
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
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
        var v1param = v1.split(":");
        var date1Pocetak = new Date(2020,0,1,+v1param[0],+v1param[1]).valueOf();

        var v2param = v2.split(":");
        var date1Kraj = new Date(2020,0,1,+v2param[0],+v2param[1]).valueOf();

        var v3param = v3.split(":");
        var date2Pocetak = new Date(2020,0,1,+v3param[0],+v3param[1]).valueOf();

        var v4param = v4.split(":");
        var date2Kraj = new Date(2020,0,1,+v4param[0],+v4param[1]).valueOf();
        /*let date1Pocetak = parseInt(v1);
        let date1Kraj = parseInt(v2);
        let date2Pocetak = parseInt(v3);
        let date2Kraj = parseInt(v4);*/
        if(date1Pocetak > date2Pocetak && date1Pocetak < date2Kraj) return true;
        if(date1Kraj > date2Pocetak && date1Kraj < date2Kraj) return true;
        if(date2Pocetak > date1Pocetak && date2Pocetak < date1Kraj) return true;
        if(date2Kraj > date1Pocetak && date2Kraj < date1Kraj) return true;
        if(date1Pocetak == date2Pocetak) return true;
        if(date1Kraj == date2Kraj) return true;
        return false;
    }
    function dodajZauzeceImpl(vrijemePocetak, vrijemeKraj, checked, dan, redniDan) {
            let date = new Date(currentYear, currentMonth, dan);
            var e = document.getElementById("osoblje")
            var osoba = e.options[e.selectedIndex].text;
            let string = osoba.split(" ");
            let ime = string[0];
            let prezime = string[1];
            let uloga = string[3];
            if(checked) {
                var tempVanredno = {
                    dan : redniDan,
                    datum : date.toDMY(), //
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
                    datum : date.toDMY(), 
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
    function dajLokacijeOsobljaImpl(callback) {
        $.ajax({
            type: 'GET',
            url: 'http://localhost:8080/mjestoOsoblja',
            success: function(data, status, xhr){
                if(xhr.status == 200)  {
                    callback(data);
                }
            },
            error: function(data, status, xhr){
                alert(data.responseText);
            },
        });
    }

    //custom metode za date
    (function() {
        Date.prototype.toDMY = Date_toDMY;
        function Date_toDMY() {
            var year, month, day;
            year = String(this.getFullYear());
            month = String(this.getMonth() + 1);
            if (month.length == 1) {
                month = "0" + month;
            }
            day = String(this.getDate());
            if (day.length == 1) {
                day = "0" + day;
            }
            return day + "." + month + "." + year;
        }
        Date.prototype.toTime = Date_toTime;
        function Date_toTime() {
            var h, m, s;
            h = String(this.getHours());
            if (h.length == 1) {
                h = "0" + h;
            }
            m = String(this.getMinutes());
            if (m.length == 1) {
                m = "0" + m;
            }
            s= String(this.getSeconds());
            if (s.length == 1) {
                s = "0" + s;
            }
            return h + ":" + m + ":" + s;
        }
    })();

    return {
        dajZauzecaJSON : dajZauzecaJSONImpl,
        dodajZauzece : dodajZauzeceImpl,
        gibePic : gibePicImpl,
        dajOsobljeJSON : dajOsobljeJSONImpl,
        dajLokacijeOsoblja : dajLokacijeOsobljaImpl
    }
}());