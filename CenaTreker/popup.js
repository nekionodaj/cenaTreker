

function addPrice(tab){
  chrome.tabs.executeScript({
          file: 'content.js'
//  chrome.tabs.executeScript({
//    code: 'var myElement = document.getElementById("priceblock_ourprice").innerHTML; console.log(myElement); price[document.url] = myElement; console.log(price[document.url]);'
  });
}
function pricesPage(tab) {
  chrome.tabs.create({url: 'pricepage.html'});
}

function comparePrice(tab) {
  chrome.tabs.executeScript({
          file: 'content2.js'
  })
}




// kada kliknemo neki od gumbova u popup.html, odradi funkciju koja je 2. parametar
document.getElementById('addPrice').addEventListener('click', addPrice);

document.getElementById('comparePrice').addEventListener('click', comparePrice);

document.getElementById('pricePage').addEventListener('click', pricesPage);
