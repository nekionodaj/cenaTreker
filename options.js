

function printPrice(tab) {
    chrome.tabs.executeScript({
            file: 'content2.js'
    });
    console.log("printam");
  }


//Object.keys(data).forEach(function (url) {
//  const div = document.createElement('div')
//  div.textContent = '${url}: ${data[url]}'
//})


document.getElementById('printPrice').addEventListener('click', printPrice);
