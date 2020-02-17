

function SeePrice(tab){
  chrome.tabs.executeScript({
          file: 'content.js'


//  chrome.tabs.executeScript({
//    code: 'var myElement = document.getElementById("priceblock_ourprice").innerHTML; console.log(myElement); price[document.url] = myElement; console.log(price[document.url]);'
  });
}




// kada kliknemo neki od gumbova u popup.html, odradi funkciju koja je 2. parametar
document.getElementById('addPrice').addEventListener('click', SeePrice);
