function ucitajDefaultPodatke() {

    var jsonObj = JSON.parse(Pozivi.dajZauzecaJSON());
    var redovna = jsonObj['redovna'];
    var vanredna = jsonObj['vanredna'];
    Kalendar.ucitajPodatke(redovna, vanredna);
}