//TESTOVI SE NAPRAVLJENI TAKO DA RADE SA DEFAULT PODACIMA DATIM U POSTAVCI SPIRALE
//async iskljucen jer pojedini testovi zavise od prethodnih
let assert = chai.assert;
describe('Testovi se trabaju izvrsiti nad bazom sa default podacima', function() {

  describe('GET Osoblje', function() {

    it('Broj osoba test', function() {
      $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/osoblje',
        async : false,
        success: function(data, status, xhr){
          if(xhr.status == 200)  {
            let osobe = data;
            assert.equal(osobe.length, 3, 'Postoje tri osobe');
          }
        },
        error: function(data, status, xhr){
          assert.equal(true, false, 'Greska');
          console.log(data.responseText);
        }
      });
    });

    it('Imena osoba test', function() {
      $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/osoblje',
        async : false,
        success: function(data, status, xhr){
          if(xhr.status == 200)  {
            let osobe = data;
            let ime1 = "Neko" == JSON.stringify(osobe[0].ime).replace(/"/g,"");
            let ime2 = "Drugi" == JSON.stringify(osobe[1].ime).replace(/"/g,"");
            let ime3 = "Test" == JSON.stringify(osobe[2].ime).replace(/"/g,"");
            let eq = ime1 && ime2 && ime3;
            assert.equal(eq, true, 'Osobe se pravilno zovu');
          }
        },
        error: function(data, status, xhr){
          assert.equal(true, false, 'Greska');
          console.log(data.responseText);
        }
      });
    });

  });

  describe('GET sale', function() {
    it('Broj sala test', function() {
      $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/sale',
        async : false,
        success: function(data, status, xhr){
          if(xhr.status == 200)  {
            let sale = data;
            assert.equal(sale.length, 2, 'Postoje tri sale');
          }
        },
        error: function(data, status, xhr){
            assert.equal(true, false, 'Greska');
            console.log(data.responseText);
        }
      });
    });

    it('Imena sala test', function() {
      
      $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/sale',
        async : false,
        success: function(data, status, xhr){
          if(xhr.status == 200)  {
            let sale = data;
            let ime1 = "1-11" == JSON.stringify(sale[0].naziv).replace(/"/g,"");
            let ime2 = "1-15" == JSON.stringify(sale[1].naziv).replace(/"/g,"");
            let eq = ime1 && ime2;
            assert.equal(eq, true, 'Sale se pravilno zovu');
          }
        },
        error: function(data, status, xhr){
          assert.equal(true, false, 'Greska');
          console.log(data.responseText);
        }
      });
    });

  });

  describe('GET Zauzeca()', function() {
    it('Broj zauzeca test', function() {
      $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/zauzeca.json',
        async : false,
        success: function(data, status, xhr){
          if(xhr.status == 200)  {
            let zauzeca = data;
            let red = zauzeca['redovna'].length == 1;
            let van = zauzeca['vanredna'].length == 1;
            let eq = van && red;
            assert.equal(eq, true, 'Postoji po jedno zauzece');
          }
        },
        error: function(data, status, xhr){
          assert.equal(true, false, 'Greska');
          console.log(data.responseText);
        }
      });
    });

    it('Dodavanje redovnog zauzeca', function() {
      let redovno = {
        "dan" : 0, 
        "datum" : "02.12.2019",
        "semestar" : "zimski",
        "pocetak" : "15:30", 
        "kraj" : "15:50", 
        "naziv" : "1-11", 
        "ime" : "Test",
        "prezime" : "Test",
        "uloga" : "asistent",
        "redovni" : true
      };
      $.ajax({
        contentType: 'application/json',
        //data: JSON.stringify(jsonObj),
        data: JSON.stringify(redovno),
        dataType: 'json',
        async : false,
        success: function(data, status, xhr){
          if(xhr.status == 200)  {
            let tempObj = data;
            let redovna = tempObj['redovna'];
            assert.equal(redovna.length, 2, 'Dodano redovno zauzece');
          }
        },
        error: function(data, status, xhr){
          assert.equal(true, false, 'Greska');
          console.log(data.responseText);
        },
        processData: false,
        type: 'POST',
        url: 'http://localhost:8080/json'
      });
    });

    it('Dodavanje vanrednog zauzeca', function() {
      let vanredno = {
        "dan" : null, 
        "datum" : "29.02.2020", 
        "semestar" : null,
        "pocetak" : "15:30", 
        "kraj" : "15:50", 
        "naziv" : "1-15", 
        "ime" : "Test",
        "prezime" : "Test",
        "uloga" : "asistent",
        "redovni" : false
      };
      $.ajax({
        contentType: 'application/json',
        //data: JSON.stringify(jsonObj),
        data: JSON.stringify(vanredno),
        dataType: 'json',
        async : false,
        success: function(data, status, xhr){
          if(xhr.status == 200)  {
            let tempObj = data;
            let redovna = tempObj['vanredna'];
            assert.equal(redovna.length, 2, 'Dodano vanredno zauzece');
            console.log('dodano');
          }
        },
        error: function(data, status, xhr){
          assert.equal(true, false, 'Greska');
          console.log(data.responseText);
        },
        processData: false,
        type: 'POST',
        url: 'http://localhost:8080/json'
      });
    });

    it('Provjera da li su zapisana prethodno dodana zauzeca', function() {
      $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/zauzeca.json',
        async : false,
        success: function(data, status, xhr){
          if(xhr.status == 200)  {
            let zauzeca = data;
            let red = zauzeca['redovna'].length == 2;
            console.log('dohvaceno');
            console.log(zauzeca['redovna'].length);
            console.log(zauzeca['vanredna'].length);
            let van = zauzeca['vanredna'].length == 2;
            let eq = van && red;
            assert.equal(eq, true, 'Zapisana su u bazu');
          }
        },
        error: function(data, status, xhr){
          assert.equal(true, false, 'Greska');
          console.log(data.responseText);
        }
      });
    });
  

    it('Dodavanje zauzeca u nepostojecu salu', function() {
      let nepostojecaSala = {
        "dan" : null, 
        "datum" : "21.05.2020", 
        "semestar" : null,
        "pocetak" : "15:15", 
        "kraj" : "15:30", 
        "naziv" : "VA", //nepostjeca sala
        "ime" : "Test",
        "prezime" : "Test",
        "uloga" : "asistent",
        "redovni" : false
      };
      $.ajax({
        contentType: 'application/json',
        //data: JSON.stringify(jsonObj),
        data: JSON.stringify(nepostojecaSala),
        dataType: 'json',
        async : false,
        success: function(data, status, xhr){
          assert.equal(true, false, 'Greska');
        },
        error: function(data, status, xhr){
          assert.equal("Osoba ili sala nije pronadjena", data.responseText, 'Zauzece nije dodano');
        },
        processData: false,
        type: 'POST',
        url: 'http://localhost:8080/json'
      });
    });

    it('Salu zauzima nepostojeca osoba', function() {
      let nepostojecaOsoba = {
        "dan" : null, 
        "datum" : "21.05.2020", 
        "semestar" : null,
        "pocetak" : "15:15", 
        "kraj" : "15:30", 
        "naziv" : "1-11", 
        "ime" : "Dostojevski petnaesti", //nepostejece ime
        "prezime" : "Dragujevic Mirko",
        "uloga" : "asistent",
        "redovni" : false
      };
      $.ajax({
        contentType: 'application/json',
        //data: JSON.stringify(jsonObj),
        data: JSON.stringify(nepostojecaOsoba),
        dataType: 'json',
        async : false,
        success: function(data, status, xhr){
          assert.equal(true, false, 'Greska');
        },
        error: function(data, status, xhr){
          assert.equal("Osoba ili sala nije pronadjena", data.responseText, 'Zauzece nije dodano');
        },
        processData: false,
        type: 'POST',
        url: 'http://localhost:8080/json'
      });
    });

    it('Osoba ima nepostejcu ulogu', function() {
      let nepostojecaUloga = {
        "dan" : null, 
        "datum" : "21.05.2020", 
        "semestar" : null,
        "pocetak" : "15:15", 
        "kraj" : "15:30", 
        "naziv" : "1-11", 
        "ime" : "Test",
        "prezime" : "Test",
        "uloga" : "demon",//nepostojeca uloga
        "redovni" : false
      };
      $.ajax({
        contentType: 'application/json',
        //data: JSON.stringify(jsonObj),
        data: JSON.stringify(nepostojecaUloga),
        dataType: 'json',
        async : false,
        success: function(data, status, xhr){
          assert.equal("a", "b", 'Greska');
        },
        error: function(data, status, xhr){
          assert.equal("Osoba ili sala nije pronadjena", data.responseText, 'Zauzece nije dodano');
        },
        processData: false,
        type: 'POST',
        url: 'http://localhost:8080/json'
      });
    });
  });

  describe('Preklapanje zauzeca', function() {
    it('Vanredno na isti dan kao drugo vanredno', function() {
      let text = "Nije moguće rezervisati salu 1-15 za navedeni datum " +
      "29/2/2020 i termin od 15:40 do 16:00! Salu je zauzeo asistent Test Test.";
      let vanredno = {
        "dan" : null, 
        "datum" : "29.02.2020", 
        "semestar" : null,
        "pocetak" : "15:40", 
        "kraj" : "16:00", 
        "naziv" : "1-15", 
        "ime" : "Neko",
        "prezime" : "Nekic",
        "uloga" : "profesor",
        "redovni" : false
      };
      $.ajax({
        contentType: 'application/json',
        //data: JSON.stringify(jsonObj),
        data: JSON.stringify(vanredno),
        dataType: 'json',
        async : false,
        success: function(data, status, xhr){
          assert.equal("a", "b", 'Greska');
        },
        error: function(data, status, xhr){
          assert.equal(data.responseText, text, 'Zauzece nije dodano');
        },
        processData: false,
        type: 'POST',
        url: 'http://localhost:8080/json'
      });
    });

    it('Redovno na isti dan kao drugo redovno', function() {
      let text = "Nije moguće rezervisati salu 1-11 za navedeni datum " +
      "2/12/2019 i termin od 15:00 do 15:40! Salu je zauzeo asistent Test Test.";
      let redovno = {
        "dan" : 0, 
        "datum" : "02.12.2019",
        "semestar" : "zimski",
        "pocetak" : "15:00", 
        "kraj" : "15:40", 
        "naziv" : "1-11", 
        "ime" : "Neko",
        "prezime" : "Nekic",
        "uloga" : "profesor",
        "redovni" : true
      };
      $.ajax({
        contentType: 'application/json',
        //data: JSON.stringify(jsonObj),
        data: JSON.stringify(redovno),
        dataType: 'json',
        async : false,
        success: function(data, status, xhr){
          assert.equal("a", "b", 'Greska');
        },
        error: function(data, status, xhr){
          assert.equal(data.responseText, text, 'Zauzece nije dodano');
        },
        processData: false,
        type: 'POST',
        url: 'http://localhost:8080/json'
      });
    });

    it('Redovno se preklapa sa vanrednim', function() {
      let text = "Nije moguće rezervisati salu 1-15 za navedeni datum " +
      "29/2/2020 i termin od 14:00 do 18:00! Salu je zauzeo asistent Test Test.";
      let redovno = {
        "dan" : 5, 
        "datum" : "29.02.2020",
        "semestar" : "ljetni",
        "pocetak" : "14:00", 
        "kraj" : "18:00", 
        "naziv" : "1-15", 
        "ime" : "Neko",
        "prezime" : "Nekic",
        "uloga" : "profesor",
        "redovni" : true
      };
      $.ajax({
        contentType: 'application/json',
        //data: JSON.stringify(jsonObj),
        data: JSON.stringify(redovno),
        dataType: 'json',
        async : false,
        success: function(data, status, xhr){
          assert.equal("a", "b", 'Greska');
        },
        error: function(data, status, xhr){
          assert.equal(data.responseText, text, 'Zauzece nije dodano');
        },
        processData: false,
        type: 'POST',
        url: 'http://localhost:8080/json'
      });
    });

    it('Vanredno se preklapa sa redovnim', function() {
      let text = "Nije moguće rezervisati salu 1-11 za navedeni datum " +
      "11/11/2019 i termin od 13:35 do 13:45! Salu je zauzeo asistent Test Test.";
      let vanredno = {
        "dan" : 0, 
        "datum" : "11.11.2019", 
        "semestar" : null,
        "pocetak" : "13:35", 
        "kraj" : "13:45", 
        "naziv" : "1-11", 
        "ime" : "Neko",
        "prezime" : "Nekic",
        "uloga" : "profesor",
        "redovni" : false
      };
      $.ajax({
        contentType: 'application/json',
        //data: JSON.stringify(jsonObj),
        data: JSON.stringify(vanredno),
        dataType: 'json',
        async : false,
        success: function(data, status, xhr){
          assert.equal("a", "b", 'Greska');
        },
        error: function(data, status, xhr){
          console.log(data.responseText);
          assert.equal(data.responseText, text, 'Zauzece nije dodano');
        },
        processData: false,
        type: 'POST',
        url: 'http://localhost:8080/json'
      });
    });
  }); 
});
