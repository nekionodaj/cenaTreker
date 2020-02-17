//chrome.runtime.onMessage.addListener(function (request) {
//alert(request)
//})
var price = {};

var myElement = document.getElementById("priceblock_ourprice").innerHTML;
console.log(myElement);
 price[document.url] = myElement;
console.log(price[document.url]);
console.log(window.location.href)
