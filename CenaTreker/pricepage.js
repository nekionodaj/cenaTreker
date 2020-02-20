
const bg = chrome.extension.getBackgroundPage();

function printPrice(tab) {
  bg.getPrices();
  Object.keys(bg.data).forEach(function (url) {
    const div = document.createElement('div')
    div.textContent = url.slice(25, 70) + " : " + bg.data[url];
    console.log("printam");
    console.log(url);
    document.body.appendChild(div);
  })

  }

document.getElementById('printPrice').addEventListener('click', printPrice);
