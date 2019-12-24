var Pozivi = (function(){
    function dajZauzecaJSONImpl(){
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

        /*return $.ajax({
            url: "http://localhost:8080/zauzeca.json",
            type: "GET",
            dataType: 'JSON',
            success: function (data, status, settings) {
                alert(data);
                return "data";
            },
            error: function (ajaxrequest, ajaxOptions, thrownError) {
                alert("error");
            }
        });*/
    }
    return {
        dajZauzecaJSON: dajZauzecaJSONImpl
    }
}());