//ovo se dogodi kada se klikne gumb Add Price

var price = {};

var myElement = document.getElementById("priceblock_ourprice").innerHTML;
console.log(myElement);
price[document.url] = myElement;
console.log(price[document.url]);
console.log(window.location.href);
chrome.runtime.sendMessage({data : price[document.url]}, function(response){});
