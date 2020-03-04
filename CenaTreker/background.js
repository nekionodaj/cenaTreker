window.data = {};   //backend struktura podataka, njoj se pristupa sa bg (varijablom background) u koju pohranimo window.data
                    //chrome.runtime.getBackgroundPage(function(bekgraund){bekgraund.getPrices(); bg = bekgraund.data});;
                    //i onda bg.data za pristupit strukturi podataka


//slusa Add Price gumb u content, upise dobivene parametre u window.data i njega sprema u storage
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
      if (request.kljuc == "addPrice"){
        var formattedURL = formatAmazonURL(sender.url);
        if (!window.data[formattedURL]){ //ako vec ne postoji podatak za taj url
          var formattedData = request.data[0].replace("&nbsp;", ""); //formatira cijene u kojima se razmak hardcodea sa &nbsp;
          window.data[formattedURL] = [formattedData, request.data[1]];  //upisuje podatak u backend ekstenzije
          chrome.storage.sync.set({["data"] : window.data}, function(){ console.log("sejvano u storage"); });
        } else console.log("podatak vec postoji")
      };
});

//ceka poziv iz content2, formatira ","" u "." (ovisi od stranice do stranice ali treba biti tocka za usporedivanje), usporeduje i salje odgovor
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
      if (request.kljuc == "seePrice"){
          var formattedURL = formatAmazonURL(sender.url);
          if (window.data[formattedURL]){ //ako postoji podatak za taj url
            var novaData = formatPrice(request.data); //formatiraj novu cijenu koju dobivamo iz content2
            var staraData = formatPrice(window.data[formattedURL][0]); //formatiraj staru cijenu iz window.data
            if (novaData == staraData) {
              console.log("cijena se nije promijenila");
              sendResponse("=");
            }
            else if(novaData > staraData) {
              console.log("cijena je veca nego prije");
              window.data[formattedURL][0] = request.data
              sendResponse("veca");
            }
            else if(novaData < staraData) {
              console.log("cijena je manja nego prije");
              window.data[formattedURL][0] = request.data
              sendResponse("manja");
            }
            else console.log("nema cijene")
          }
      };
});

//ceka poruku iz pricepage(kad se klikne gumb remove) i mice clan objekta od URLa na koji je kliknut remove
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
      if (request.kljuc == "brisanje"){
        console.log("brisanje " + request.data);
        delete window.data[request.data];
        chrome.storage.sync.set({["data"] : window.data}, function(){ console.log("promjene sejvane u storage"); });
        sendResponse();
      };
  });

//uzme objekt data i njegov kljuc data i iterira po svakom kljucu(url-u) unutar objekta i sprema ga u window.data
function getPrices(){
  chrome.storage.sync.get(["data"], function(data) {
      if (data.data){
        console.log("ima cijena i getam ih")
        Object.keys(data.data).forEach(function (url) {
            console.log(url);
            console.log(data.data[url][0]);
            console.log(data.data[url][1]);
            window.data[url] = [data.data[url][0], data.data[url][1]];
        });
      } else console.log("nema cijena");
    });
}

function formatAmazonURL(url) {
    var indexdp = url.search("/dp/") + 14
    var formattedURL = url.slice(0, indexdp);
    return formattedURL
}

function formatPrice(price) {
  return parseFloat(price.replace( /^\D+/g, '').replace(',', '.'));
}


//ovo se izvrsava paljenjem browsera
getPrices();
