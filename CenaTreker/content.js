//ovo se dogodi kada se klikne gumb Add Price

//pregledava elemente u kojima se moze nalaziti cijena i ako se nalazi tamo, salje ju u backend da se upise
if (document.getElementById("priceblock_ourprice") != null) {
 var myElement = document.getElementById("priceblock_ourprice").innerHTML; //uzme cijenu na amazonu
 saljiDalje(myElement)
}
else if (document.getElementById("priceblock_saleprice") != null) {
  var myElement = document.getElementById("priceblock_saleprice").innerHTML; //uzme cijenu na amazonu
  saljiDalje(myElement)
}
else if (document.getElementById("priceblock_dealprice") != null) {
  var myElement = document.getElementById("priceblock_dealprice").innerHTML; //uzme cijenu na amazonu
  saljiDalje(myElement)
}

//funkcija za slanje cijene u backend
function saljiDalje(cijena) {
  console.log(cijena);
  console.log(window.location.href);
  chrome.runtime.sendMessage({data : cijena, kljuc : "addPrice"}, function(response){}); //salje poruku backgroundu
}
