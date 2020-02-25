//skripta koja autorunna na svakoj stranici i gleda jesmo li vec dodali cijenu na njoj
var price = {};


//funkcija gleda za dobiveni parametar postoji li on u databazi(slanjem poruke u backend) i na temelju odgovora mijenja boju cijene i ispisuje tekst
function checkPrices(priceblock) {
  if (document.getElementById(priceblock) != null) {
      var myElement = document.getElementById(priceblock).innerHTML;
      chrome.runtime.sendMessage({data : myElement, kljuc : "seePrice"}, function(response){
        if (response == "=") {
          console.log("jednako je")
          document.getElementById(priceblock).classList.remove("a-color-price");
          document.getElementById(priceblock).style.color = "#d6d027";
        }
        else if (response == "veca") {
          console.log("cijena je veca nego prije");
          document.getElementById(priceblock).classList.remove("a-color-price");
          document.getElementById(priceblock).style.color = "#e60e27";
        }
        else if (response == "manja") {
          console.log("cijena je manja nego prije");
          document.getElementById(priceblock).classList.remove("a-color-price");
          document.getElementById(priceblock).style.color = "#09e811";
        }
      });
    }
}

//razliciti elementi na kojima se moze nalaziti cijena na amazonu
checkPrices("priceblock_ourprice")
checkPrices("priceblock_saleprice")
checkPrices("priceblock_dealprice")
