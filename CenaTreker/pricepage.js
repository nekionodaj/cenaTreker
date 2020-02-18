
const bg = chrome.extension.getBackgroundPage();

function printPrice(tab) {
  Object.keys(bg.data).forEach(function (url) {
    const div = document.createElement('div')
    div.textContent = '${url}: ${data[url]}';
    console.log(url);
    console.log(bg.data[url]);
     console.log("printam");
  })

  }

document.getElementById('printPrice').addEventListener('click', printPrice);
