let trenutnaSlika = 0;
let ucitaneSlike = [];
let dataUcitanih = [];
document.addEventListener('DOMContentLoaded', function () {
  document.querySelector(".prev").addEventListener( "click", function( ev ) {
    previous();
  }, false);
  

  document.querySelector(".next").addEventListener( "click", function( ev ) {
    next();
  }, false);
  next();
  $(".prev").attr("disabled", true);
});


function previous() {
  $(".next").attr("disabled", false);
  

  if(trenutnaSlika<=3) {
    $(".prev").attr("disabled", true);
    return;
  }
  if(trenutnaSlika == 10) {
    trenutnaSlika = 6;
  } else trenutnaSlika -= 6;
  
  prikaziTriSlike();
  if(trenutnaSlika<=3) {
    $(".prev").attr("disabled", true);
    return;
  }
}

function next() {
  $(".prev").attr("disabled", false);
  prikaziTriSlike();
}

function prikaziTriSlike() {
  let pics = document.getElementsByClassName('slika');
  for (var i = 0; i < pics.length; i++) {
    pics[i].style.display = "inline-block";
    trenutnaSlika++;
    if(ucitaneSlike.includes(trenutnaSlika)) {
        pics[i].src = dataUcitanih[trenutnaSlika-1];
    } else {
      Pozivi.gibePic(trenutnaSlika+'.jpg', pics[i], dataUcitanih);
      ucitaneSlike.push(trenutnaSlika);
   }
   if(trenutnaSlika == 10) {
        $(".next").attr("disabled", true);
        //disable ostale slike ako nisu sve popunjene a prikazana je zadnja
        for (var j = i+1; j < pics.length; j++) {
          pics[j].style.display = "none";
        }
        return;
      }
  }
}



//$("#get_img").attr("src", "data:image/png;base64,"+btoa(binary));

/*
$.ajax({
  type: "GET",
  url: "http://localhost:8080/1.jpg",
  beforeSend: function (xhr) {
    xhr.overrideMimeType('text/plain; charset=x-user-defined');
  },
  success: function (result, textStatus, jqXHR) {       
    if(result.length < 1){
        alert("The thumbnail doesn't exist");
        $("#get_img").attr("src", "data:image/png;base64,");
        return
    }

    var binary = "";
    var responseText = jqXHR.responseText;
    var responseTextLen = responseText.length;

    for ( i = 0; i < responseTextLen; i++ ) {
        binary += String.fromCharCode(responseText.charCodeAt(i) & 255)
    }
    $("#get_img").attr("src", "data:image/png;base64,"+btoa(binary));
  },
  error: function(xhr, textStatus, errorThrown){
    alert("Error in getting document "+textStatus);
  } 
});*/