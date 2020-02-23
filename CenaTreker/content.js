//ovo se dogodi kada se klikne gumb Add Price

//var price = {};

var myElement = document.getElementById("priceblock_ourprice").innerHTML; //uzme cijenu na amazonu
//price[document.url] = myElement;
console.log(myElement);
console.log(window.location.href);
chrome.runtime.sendMessage({data : myElement, kljuc : "addPrice"}, function(response){}); //salje poruku backgroundu
