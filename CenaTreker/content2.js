//skripta koja autorunna na svakoj stranici
var price = {};


//moze li se fetchat kao na amazonu? ako da, posalji na compare
if (document.getElementById("priceblock_ourprice") != null) {
    console.log("bili smo na ovoj stranici")
    var myElement = document.getElementById("priceblock_ourprice").innerHTML;
    chrome.runtime.sendMessage({data : myElement, kljuc : "seePrice"}, function(response){
      if (response == "=") {
        console.log("jednako je")
        document.getElementById("priceblock_ourprice").classList.remove("a-color-price");
        document.getElementById("priceblock_ourprice").style.color = "#d6d027";
      }
      else if (response == "veca") {
        console.log("cijena je veca nego prije");
        document.getElementById("priceblock_ourprice").classList.remove("a-color-price");
        document.getElementById("priceblock_ourprice").style.color = "#e60e27";
      }
      else if (response == "manja") {
        console.log("cijena je manja nego prije");
        document.getElementById("priceblock_ourprice").classList.remove("a-color-price");
        document.getElementById("priceblock_ourprice").style.color = "#09e811";
      }
    });
  }
