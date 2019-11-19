let assert = chai.assert;
describe('Kalendar', function() {
 describe('iscrtajKalendar()', function() {
  
   it('Broj dana treba biti 30 za april', function() {
     Kalendar.iscrtajKalendar(document.querySelector(".dateGrid"), 3);
     let dani = document.getElementsByClassName("dayWrapper");
     let brojDana = dani.length;
     assert.equal(brojDana, 30,"Broj dana je 30");
   });

   it('Broj dana treba biti 31 za decembar', function() {
     Kalendar.iscrtajKalendar(document.querySelector(".dateGrid"), 11); 
     let dani = document.getElementsByClassName("dayWrapper");
     let brojDana = dani.length;
     assert.equal(brojDana, 31,"Broj dana je 31");
   });

   it('Prvi dan treba biti u petak za novembar', function() {
     Kalendar.iscrtajKalendar(document.querySelector(".dateGrid"), 10); 
     let grid = document.querySelector(".dateGrid").childNodes;
     let brojFakeDivs = 0;
     for (let i = 0; i < grid.length - 1; i++) {
       if(grid[i].className == "fake") {
        brojFakeDivs++;
       }
     }
     assert.equal(brojFakeDivs, 4,"Petak je prvi dan");
   });

   it('Zadnji dan treba biti u subotu za novembar', function() {
     Kalendar.iscrtajKalendar(document.querySelector(".dateGrid"), 10); 
     let grid = document.querySelector(".dateGrid").childNodes;
     //ukupni broj divs fake i datum  % 7 == index zadnjeg tj. subote
     assert.equal((grid.length)%7, 6,"Subota je zadnji dan"); 
   });

   it('Prvi dan treba biti u utorak za januar', function() {
     Kalendar.iscrtajKalendar(document.querySelector(".dateGrid"), 0); 
     let grid = document.querySelector(".dateGrid").childNodes;
     let brojFakeDivs = 0;
     for (let i = 0; i < grid.length - 1; i++) {
       if(grid[i].className == "fake") {
        brojFakeDivs++;
       }
     }
     assert.equal(brojFakeDivs, 1,"Utorak je prvi dan");
     //provjera jesu li dani od 1 do 31
     let brojevi = document.querySelectorAll('.buttonDiv button time');
     for (let i = 1; i <= 31; i++) {
        assert.equal(brojevi[i-1].innerHTML, i,"isti redni broj dana");
     }
     console.log(brojevi.length);
   });

   it('Nazivi mjeseca su od januara do decembra', function() {
    let months = ["Januar", "Februar", "Mart", "April", "Maj", "Juni", "Juli", "August", "Septembar", "Oktobar", "Novembar", "Decembar"];
     Kalendar.iscrtajKalendar(document.querySelector(".dateGrid"), 0); 
     for (let i = 0; i < 12; i++) {
      Kalendar.iscrtajKalendar(document.querySelector(".dateGrid"), i); 
      assert.equal(document.querySelector(".monthIndicator time").innerHTML, months[i],"Korektan naziv mjesec");
     }
   });

   it('Broj dana treba biti 28 za februar', function() {
     Kalendar.iscrtajKalendar(document.querySelector(".dateGrid"), 1);
     let dani = document.getElementsByClassName("dayWrapper");
     let brojDana = dani.length;
     assert.equal(brojDana, 28,"Broj dana je 28");
   });

 });
});
