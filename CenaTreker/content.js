//ovo se dogodi kada se klikne gumb Add Price

//pregledava elemente u kojima se moze nalaziti cijena i ako se nalazi tamo, salje ju u backend da se upise
if (document.getElementById("priceblock_ourprice") != null) {
 var myElement = document.getElementById("priceblock_ourprice").innerHTML; //uzme cijenu na amazonu
 var naslov = document.getElementById("productTitle").innerHTML.slice(161);
 naslov = naslov.slice(0, -128);
 saljiDalje(myElement, naslov)
}
else if (document.getElementById("priceblock_saleprice") != null) {
  var myElement = document.getElementById("priceblock_saleprice").innerHTML; //uzme cijenu na amazonu
  var naslov = document.getElementById("productTitle").innerHTML.slice(161);
  naslov = naslov.slice(0, -128);
  saljiDalje(myElement, naslov)
}
else if (document.getElementById("priceblock_dealprice") != null) {
  var myElement = document.getElementById("priceblock_dealprice").innerHTML; //uzme cijenu na amazonu
  var naslov = document.getElementById("productTitle").innerHTML.slice(161);
  naslov = naslov.slice(0, -128);
  saljiDalje(myElement, naslov)
}

//funkcija za slanje cijene u backend
function saljiDalje(cijena, naslov) {
  console.log(cijena);
  console.log(window.location.href);
  console.log(naslov);
  var podatci = [cijena , naslov];
  chrome.runtime.sendMessage({data : podatci, kljuc : "addPrice"}, function(response){}); //salje poruku backgroundu
}
