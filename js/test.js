let assert = chai.assert;
describe('Kalendar', function() {
 describe('iscrtajKalendar()', function() {
  
   it('Broj dana treba biti 30 za april', function() {
     Kalendar.iscrtajKalendar(document.querySelector('.dateGrid'), 3);
     let dani = document.getElementsByClassName('dayWrapper');
     let brojDana = dani.length;
     assert.equal(brojDana, 30,'Broj dana je 30');
   });

   it('Broj dana treba biti 31 za decembar', function() {
     Kalendar.iscrtajKalendar(document.querySelector('.dateGrid'), 11); 
     let dani = document.getElementsByClassName('dayWrapper');
     let brojDana = dani.length;
     assert.equal(brojDana, 31,'Broj dana je 31');
   });

   it('Prvi dan treba biti u petak za novembar', function() {
     Kalendar.iscrtajKalendar(document.querySelector('.dateGrid'), 10); 
     let grid = document.querySelector('.dateGrid').childNodes;
     let brojFakeDivs = 0;
     for (let i = 0; i < grid.length - 1; i++) {
       if(grid[i].className == 'fake') {
        brojFakeDivs++;
       }
     }
     assert.equal(brojFakeDivs, 4,'Petak je prvi dan');
   });

   it('Zadnji dan treba biti u subotu za novembar', function() {
     Kalendar.iscrtajKalendar(document.querySelector('.dateGrid'), 10); 
     let grid = document.querySelector('.dateGrid').childNodes;
     //ukupni broj divs fake i datum  % 7 == index zadnjeg tj. subote
     assert.equal((grid.length)%7, 6,'Subota je zadnji dan'); 
   });

   it('Prvi dan treba biti u utorak za januar', function() {
     Kalendar.iscrtajKalendar(document.querySelector('.dateGrid'), 0); 
     let grid = document.querySelector('.dateGrid').childNodes;
     let brojFakeDivs = 0;
     for (let i = 0; i < grid.length - 1; i++) {
       if(grid[i].className == 'fake') {
        brojFakeDivs++;
       }
     }
     assert.equal(brojFakeDivs, 1,'Utorak je prvi dan');
     //provjera jesu li dani od 1 do 31
     let brojevi = document.querySelectorAll('.buttonDiv button time');
     for (let i = 1; i <= 31; i++) {
        assert.equal(brojevi[i-1].innerHTML, i,'isti redni broj dana');
     }
     console.log(brojevi.length);
   });

   it('Nazivi mjeseca su od januara do decembra', function() {
    let months = ['Januar', 'Februar', 'Mart', 'April', 'Maj', 'Juni', 'Juli', 'August', 'Septembar', 'Oktobar', 'Novembar', 'Decembar'];
     Kalendar.iscrtajKalendar(document.querySelector('.dateGrid'), 0); 
     for (let i = 0; i < 12; i++) {
      Kalendar.iscrtajKalendar(document.querySelector('.dateGrid'), i); 
      assert.equal(document.querySelector('.monthIndicator time').innerHTML, months[i],'Korektan naziv mjesec');
     }
   });

   it('Broj dana treba biti 28 za februar', function() {
     Kalendar.iscrtajKalendar(document.querySelector('.dateGrid'), 1);
     let dani = document.getElementsByClassName('dayWrapper');
     let brojDana = dani.length;
     assert.equal(brojDana, 28,'Broj dana je 28');
   });

 });

//oboji zauzeca tests
 describe('obojiZauzeca()', function() {
      it('Sale nisu obojene bez ucitavanja podataka', function() {
        Kalendar.iscrtajKalendar(document.querySelector('.dateGrid'), 10);
        let brojSlobodnih = document.getElementsByClassName('slobodna').length;
        assert.equal(brojSlobodnih, 30, 'Broj slobodnih dana za salu A1 je 30');
        Kalendar.obojiZauzeca(document.querySelector('.dateGrid'), 10, 'A1', '09:00', '12:00');
        brojSlobodnih = document.getElementsByClassName('slobodna').length;
        assert.equal(brojSlobodnih, 30, 'Broj slobodnih dana za salu A1 je 30'); //nije se nista promijenilo
      });

      it('Duple vrijednosti su obojene isto', function() {
        let redovna = [
          {dan: 2, semestar: 'Zimski', pocetak: '15:15', kraj: '16:15', naziv:'A1', predavac: 'Ban Kulin'},
          {dan: 2, semestar: 'Zimski', pocetak: '15:15', kraj: '16:15', naziv:'A1', predavac: 'Ban Kulin'},
          {dan: 2, semestar: 'Zimski', pocetak: '15:15', kraj: '16:15', naziv:'A1', predavac: 'Ban Kulin'},
          {dan: 1, semestar: 'Zimski', pocetak: '15:15', kraj: '16:15', naziv:'A1', predavac: 'Ban Kulin'},
          {dan: 1, semestar: 'Zimski', pocetak: '15:15', kraj: '16:15', naziv:'A1', predavac: 'Ban Kulin'}
        ];
        let vanredna = [
          {datum: '02.11.2019', pocetak: '15:15', kraj: '16:00', naziv:'A1', predavac: 'Ban Kulin'},
          {datum: '09.11.2019', pocetak: '15:15', kraj: '16:00', naziv:'A1', predavac: 'Ban Kulin'}
        ];

        Kalendar.iscrtajKalendar(document.querySelector('.dateGrid'), 10);

        let brojSlobodnih = document.getElementsByClassName('slobodna').length;
        assert.equal(brojSlobodnih, 30, 'Broj slobodnih dana za salu A1 je 30');

        Kalendar.ucitajPodatke(redovna, vanredna);
        Kalendar.obojiZauzeca(document.querySelector('.dateGrid'), 10, 'A1', '15:00', '16:00');
        brojSlobodnih = document.getElementsByClassName('slobodna').length;
        assert.equal(brojSlobodnih, 20, 'Broj slobodnih dana za salu A1 je 20');
      });

      //ljetni semestar
      it('Zauzeca za ljetni semestar nisu prikazana u zimskom semestru', function() {
        let redovna = [
          {dan: 2, semestar: 'Ljetni', pocetak: '15:15', kraj: '16:15', naziv:'A1', predavac: 'Ban Kulin'},
          {dan: 2, semestar: 'Ljetni', pocetak: '15:15', kraj: '16:15', naziv:'A1', predavac: 'Ban Kulin'},
          {dan: 2, semestar: 'Ljetni', pocetak: '15:15', kraj: '16:15', naziv:'A1', predavac: 'Ban Kulin'},
          {dan: 1, semestar: 'Ljetni', pocetak: '15:15', kraj: '16:15', naziv:'A1', predavac: 'Ban Kulin'},
          {dan: 1, semestar: 'Ljetni', pocetak: '15:15', kraj: '16:15', naziv:'A1', predavac: 'Ban Kulin'}
        ];
        let vanredna = [
          {datum: '02.04.2019', pocetak: '15:15', kraj: '16:00', naziv:'A1', predavac: 'Ban Kulin'},
          {datum: '09.04.2019', pocetak: '15:15', kraj: '16:00', naziv:'A1', predavac: 'Ban Kulin'}
        ];

        Kalendar.iscrtajKalendar(document.querySelector('.dateGrid'), 10);

        let brojSlobodnih = document.getElementsByClassName('slobodna').length;
        assert.equal(brojSlobodnih, 30, 'Broj slobodnih dana za salu A1 je 30');

        Kalendar.ucitajPodatke(redovna, vanredna);
        Kalendar.obojiZauzeca(document.querySelector('.dateGrid'), 10, 'A1', '15:00', '16:00');
        brojSlobodnih = document.getElementsByClassName('slobodna').length;
        assert.equal(brojSlobodnih, 30, 'Broj slobodnih dana za salu A1 je 30'); //nije se nista promijenilo
      });

      //zimski semestar
      it('Zauzeca za zimski semestar nisu prikazana u ljetnom semestru', function() {
        let redovna = [
          {dan: 2, semestar: 'zimski', pocetak: '15:15', kraj: '16:15', naziv:'A1', predavac: 'Ban Kulin'},
          {dan: 2, semestar: 'zimski', pocetak: '15:15', kraj: '16:15', naziv:'A1', predavac: 'Ban Kulin'},
          {dan: 2, semestar: 'zimski', pocetak: '15:15', kraj: '16:15', naziv:'A1', predavac: 'Ban Kulin'},
          {dan: 1, semestar: 'zimski', pocetak: '15:15', kraj: '16:15', naziv:'A1', predavac: 'Ban Kulin'},
          {dan: 1, semestar: 'zimski', pocetak: '15:15', kraj: '16:15', naziv:'A1', predavac: 'Ban Kulin'},
        ];
        let vanredna = [
          {datum: '02.04.2019', pocetak: '15:15', kraj: '16:00', naziv:'A1', predavac: 'Ban Kulin'},
          {datum: '09.04.2019', pocetak: '15:15', kraj: '16:00', naziv:'A1', predavac: 'Ban Kulin'}
        ];

        Kalendar.iscrtajKalendar(document.querySelector('.dateGrid'), 4);

        let brojSlobodnih = document.getElementsByClassName('slobodna').length;
        assert.equal(brojSlobodnih, 31, 'Broj slobodnih dana za salu A1 je 31');

        Kalendar.ucitajPodatke(redovna, vanredna);
        Kalendar.obojiZauzeca(document.querySelector('.dateGrid'), 4, 'A1', '15:00', '16:00');
        brojSlobodnih = document.getElementsByClassName('slobodna').length;
        assert.equal(brojSlobodnih, 31, 'Broj slobodnih dana za salu A1 je 31'); //nije se nista promijenilo
      });

      it('Zauzeca za druge mjesece nisu prikaza za trenutni mjesec', function() {
        let redovna = [];
        let vanredna = [
          {datum: '09.02.2019', pocetak: '15:15', kraj: '16:00', naziv:'A1', predavac: 'Ban Kulin'},
          {datum: '09.03.2019', pocetak: '15:15', kraj: '16:00', naziv:'A1', predavac: 'Ban Kulin'},
          {datum: '02.04.2019', pocetak: '15:15', kraj: '16:00', naziv:'A1', predavac: 'Ban Kulin'},
          {datum: '09.05.2019', pocetak: '15:15', kraj: '16:00', naziv:'A1', predavac: 'Ban Kulin'},
          {datum: '09.06.2019', pocetak: '15:15', kraj: '16:00', naziv:'A1', predavac: 'Ban Kulin'},
          {datum: '09.07.2019', pocetak: '15:15', kraj: '16:00', naziv:'A1', predavac: 'Ban Kulin'},
          {datum: '09.08.2019', pocetak: '15:15', kraj: '16:00', naziv:'A1', predavac: 'Ban Kulin'},
          {datum: '09.09.2019', pocetak: '15:15', kraj: '16:00', naziv:'A1', predavac: 'Ban Kulin'},
          {datum: '09.10.2019', pocetak: '15:15', kraj: '16:00', naziv:'A1', predavac: 'Ban Kulin'},
          {datum: '09.11.2019', pocetak: '15:15', kraj: '16:00', naziv:'A1', predavac: 'Ban Kulin'},
          {datum: '09.12.2019', pocetak: '15:15', kraj: '16:00', naziv:'A1', predavac: 'Ban Kulin'}
        ];

        Kalendar.iscrtajKalendar(document.querySelector('.dateGrid'), 0); //nema zauzeca u januaru

        let brojSlobodnih = document.getElementsByClassName('slobodna').length;
        assert.equal(brojSlobodnih, 31, 'Broj slobodnih dana za salu A1 je 31');

        Kalendar.ucitajPodatke(redovna, vanredna);
        Kalendar.obojiZauzeca(document.querySelector('.dateGrid'), 0, 'A1', '15:00', '16:00');
        brojSlobodnih = document.getElementsByClassName('slobodna').length;
        assert.equal(brojSlobodnih, 31, 'Broj slobodnih dana za salu A1 je 31'); //nije se nista promijenilo
      });


      it('Svi termini zauzeti - svi dani obojeni', function() {
        let redovna = [
          {dan: 0, semestar: 'Zimski', pocetak: '11:15', kraj: '12:00', naziv:'A1', predavac: 'Ban Kulin'},
          {dan: 1, semestar: 'Zimski', pocetak: '15:15', kraj: '16:15', naziv:'A1', predavac: 'Ban Kulin'},
          {dan: 2, semestar: 'Zimski', pocetak: '14:00', kraj: '15:00', naziv:'A1', predavac: 'Ban Kulin'},
          {dan: 3, semestar: 'Zimski', pocetak: '15:45', kraj: '16:45', naziv:'A1', predavac: 'Ban Kulin'},
          {dan: 4, semestar: 'Zimski', pocetak: '16:30', kraj: '18:00', naziv:'A1', predavac: 'Ban Kulin'},
          {dan: 5, semestar: 'Zimski', pocetak: '12:15', kraj: '13:15', naziv:'A1', predavac: 'Ban Kulin'},  
          {dan: 6, semestar: 'Zimski', pocetak: '12:15', kraj: '13:15', naziv:'A1', predavac: 'Ban Kulin'}
        ];
        let vanredna = [];

        Kalendar.iscrtajKalendar(document.querySelector('.dateGrid'), 10);

        let brojSlobodnih = document.getElementsByClassName('slobodna').length;
        assert.equal(brojSlobodnih, 30, 'Broj slobodnih dana za salu A1 je 0');

        Kalendar.ucitajPodatke(redovna, vanredna);
        Kalendar.obojiZauzeca(document.querySelector('.dateGrid'), 10, 'A1', '09:00', '18:00');
        brojSlobodnih = document.getElementsByClassName('slobodna').length;
        assert.equal(brojSlobodnih, 0, 'Broj slobodnih dana za salu A1 je 0');
      });



      it('Uzastopno bojenje - boja ostaje ista', function() {
        let redovna = [
          {dan: 0, semestar: 'Ljetni', pocetak: '09:15', kraj: '12:00', naziv:'A2', predavac: 'Ban Kulin'},
          {dan: 1, semestar: 'Ljetni', pocetak: '15:15', kraj: '16:15', naziv:'A2', predavac: 'Ban Kulin'},
          {dan: 2, semestar: 'Ljetni', pocetak: '14:00', kraj: '15:00', naziv:'A2', predavac: 'Ban Kulin'},
          {dan: 3, semestar: 'Ljetni', pocetak: '10:45', kraj: '13:45', naziv:'A2', predavac: 'Ban Kulin'}
        ];
        let vanredna = [
          {datum: '02.05.2019', pocetak: '15:15', kraj: '16:00', naziv:'A2', predavac: 'Ban Kulin'},
          {datum: '09.05.2019', pocetak: '15:15', kraj: '16:00', naziv:'A2', predavac: 'Ban Kulin'}
        ];

        Kalendar.iscrtajKalendar(document.querySelector('.dateGrid'), 4);

        let brojSlobodnih = document.getElementsByClassName('slobodna').length;
        let brojZauzetih = document.getElementsByClassName('zauzeta').length;
        assert.equal(brojZauzetih, 0, 'Broj zauzetih za salu A2 je 0');

        Kalendar.ucitajPodatke(redovna, vanredna);
        for (var i = 10; i > 0; i--) {
          Kalendar.obojiZauzeca(document.querySelector('.dateGrid'), 4, 'A2', '09:00', '16:00');
          brojZauzetih = document.getElementsByClassName('zauzeta').length; 
          assert.equal(brojZauzetih, 18, 'Broj zauzetih za salu A2 je 18');

          brojSlobodnih = document.getElementsByClassName('slobodna').length;
          assert.equal(brojSlobodnih, 13, 'Broj slobodnih dana za salu A2 je 13');
        }
      });

      it('Promjena ucitanih podataka', function() {
        let redovna = [
          {dan: 0, semestar: 'Zimski', pocetak: '11:15', kraj: '12:00', naziv:'A1', predavac: 'Ban Kulin'},
          {dan: 1, semestar: 'Zimski', pocetak: '15:15', kraj: '16:15', naziv:'A1', predavac: 'Ban Kulin'},
          {dan: 2, semestar: 'Zimski', pocetak: '14:00', kraj: '15:00', naziv:'A1', predavac: 'Ban Kulin'},
          {dan: 3, semestar: 'Zimski', pocetak: '15:45', kraj: '16:45', naziv:'A1', predavac: 'Ban Kulin'},
          {dan: 4, semestar: 'Zimski', pocetak: '16:30', kraj: '18:00', naziv:'A1', predavac: 'Ban Kulin'},
          {dan: 5, semestar: 'Zimski', pocetak: '12:15', kraj: '13:15', naziv:'A1', predavac: 'Ban Kulin'},  
          {dan: 6, semestar: 'Zimski', pocetak: '12:15', kraj: '13:15', naziv:'A1', predavac: 'Ban Kulin'}
        ];
        let vanredna = [];

        Kalendar.iscrtajKalendar(document.querySelector('.dateGrid'), 10);

        let brojSlobodnih = document.getElementsByClassName('slobodna').length;
        assert.equal(brojSlobodnih, 30, 'Broj slobodnih dana za salu A1 je 0');

        Kalendar.ucitajPodatke(redovna, vanredna);
        Kalendar.obojiZauzeca(document.querySelector('.dateGrid'), 10, 'A1', '09:00', '18:00');
        brojSlobodnih = document.getElementsByClassName('slobodna').length;
        assert.equal(brojSlobodnih, 0, 'Broj slobodnih dana za salu A1 je 0');


        redovna = [];
        vanredna = [
          {datum: '01.11.2019', pocetak: '15:15', kraj: '16:00', naziv:'A1', predavac: 'Ban Kulin'},
          {datum: '02.11.2019', pocetak: '15:15', kraj: '16:00', naziv:'A1', predavac: 'Ban Kulin'},
          {datum: '03.11.2019', pocetak: '15:15', kraj: '16:00', naziv:'A1', predavac: 'Ban Kulin'},
          {datum: '04.11.2019', pocetak: '15:15', kraj: '16:00', naziv:'A1', predavac: 'Ban Kulin'},
          {datum: '05.11.2019', pocetak: '15:15', kraj: '16:00', naziv:'A1', predavac: 'Ban Kulin'},
          {datum: '06.11.2019', pocetak: '15:15', kraj: '16:00', naziv:'A1', predavac: 'Ban Kulin'},
          {datum: '07.11.2019', pocetak: '15:15', kraj: '16:00', naziv:'A1', predavac: 'Ban Kulin'},
          {datum: '08.11.2019', pocetak: '15:15', kraj: '16:00', naziv:'A1', predavac: 'Ban Kulin'},
          {datum: '09.11.2019', pocetak: '15:15', kraj: '16:00', naziv:'A1', predavac: 'Ban Kulin'},
          {datum: '10.11.2019', pocetak: '15:15', kraj: '16:00', naziv:'A1', predavac: 'Ban Kulin'},
          {datum: '11.11.2019', pocetak: '15:15', kraj: '16:00', naziv:'A1', predavac: 'Ban Kulin'}
        ];
        Kalendar.ucitajPodatke(redovna, vanredna);
        Kalendar.obojiZauzeca(document.querySelector('.dateGrid'), 10, 'A1', '09:00', '18:00');
        brojSlobodnih = document.getElementsByClassName('slobodna').length;
        assert.equal(brojSlobodnih, 19, 'Broj slobodnih dana za salu A1 je 19');
      });


      it('Poklapanje redovnih i vanrednih su obojene isto', function() {
        let redovna = [
          {dan: 0, semestar: 'Zimski', pocetak: '11:15', kraj: '12:00', naziv:'A1', predavac: 'Ban Kulin'},
        ];
        let vanredna = [
          {datum: '04.11.2019', pocetak: '15:15', kraj: '16:00', naziv:'A1', predavac: 'Ban Kulin'},
          {datum: '11.11.2019', pocetak: '15:15', kraj: '16:00', naziv:'A1', predavac: 'Ban Kulin'},
          {datum: '18.11.2019', pocetak: '15:15', kraj: '16:00', naziv:'A1', predavac: 'Ban Kulin'},
          {datum: '25.11.2019', pocetak: '15:15', kraj: '16:00', naziv:'A1', predavac: 'Ban Kulin'}
        ];

        Kalendar.iscrtajKalendar(document.querySelector('.dateGrid'), 10);

        let brojSlobodnih = document.getElementsByClassName('slobodna').length;
        assert.equal(brojSlobodnih, 30, 'Broj slobodnih dana za salu A1 je 0');

        Kalendar.ucitajPodatke(redovna, vanredna);
        Kalendar.obojiZauzeca(document.querySelector('.dateGrid'), 10, 'A1', '09:00', '18:00');
        brojSlobodnih = document.getElementsByClassName('slobodna').length;
        assert.equal(brojSlobodnih, 26, 'Broj slobodnih dana za salu A1 je 26');
      });

      it('Poklapanje vanrednih su obojene isto', function() {
        let redovna = [];
        let vanredna = [
          {datum: '04.11.2019', pocetak: '15:15', kraj: '16:00', naziv:'A1', predavac: 'Ban Kulin'},
          {datum: '04.11.2019', pocetak: '15:15', kraj: '16:00', naziv:'A1', predavac: 'Ban Kulin'},
          {datum: '04.11.2019', pocetak: '15:15', kraj: '16:00', naziv:'A1', predavac: 'Ban Kulin'},
          {datum: '17.11.2019', pocetak: '15:15', kraj: '16:00', naziv:'A1', predavac: 'Ban Kulin'},
          {datum: '17.11.2019', pocetak: '15:15', kraj: '16:00', naziv:'A1', predavac: 'Ban Kulin'},
          {datum: '17.11.2019', pocetak: '15:15', kraj: '16:00', naziv:'A1', predavac: 'Ban Kulin'}
        ];

        Kalendar.iscrtajKalendar(document.querySelector('.dateGrid'), 10);

        let brojSlobodnih = document.getElementsByClassName('slobodna').length;
        assert.equal(brojSlobodnih, 30, 'Broj slobodnih dana za salu A1 je 0');

        Kalendar.ucitajPodatke(redovna, vanredna);
        Kalendar.obojiZauzeca(document.querySelector('.dateGrid'), 10, 'A1', '09:00', '18:00');
        brojSlobodnih = document.getElementsByClassName('slobodna').length;
        assert.equal(brojSlobodnih, 28, 'Broj slobodnih dana za salu A1 je 28');
      });
  });
});
