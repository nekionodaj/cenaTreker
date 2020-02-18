var data = {};


chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
      data[sender.url] = request.data;
      console.log(request.data);

});


Object.keys(data).forEach(function (url) {
  const div = document.createElement('div')
 div.textContent = '${url}: ${data[url]}'
})
