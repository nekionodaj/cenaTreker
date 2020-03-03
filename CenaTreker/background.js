// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.


window.data = {};   //backend struktura podataka, njoj se pristupa sa bg (varijablom background)
                    //const bg = chrome.extension.getBackgroundPage();
                    //i onda bg.data za pristupit strukturi podataka


//slusa Add Price gumb u content, upise dobivene parametre u window.data i njega sprema u storage
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
      if (request.kljuc == "addPrice"){
        var formattedURL = formatAmazonURL(sender.url);
        if (!window.data[formattedURL]){
          var formattedData = request.data[0].replace("&nbsp;", ""); //formatira cijene u kojima se razmak hardcodea sa &nbsp;
          window.data[formattedURL] = [formattedData, request.data[1]];  //upisuje podatak u backend ekstenzije
          console.log("upisano u backend")

          console.log(sender.url); //prije formatiranja
          console.log(formattedURL); //nakon formatiranja
          console.log(request.data[0]); //prije formatiranja
          console.log(formattedData); //nakon formatiranja
          console.log(request.data[1]);
          chrome.storage.sync.set({["data"] : window.data}, function(){ console.log("sejvano u storage"); });
        } else console.log("podatak vec postoji")
      };
});

//ceka poziv iz content2, formatira ","" u "." (ovisi od stranice do stranice ali treba biti tocka za usporedivanje), usporeduje i salje odgovor
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
      if (request.kljuc == "seePrice"){
          var formattedURL = formatAmazonURL(sender.url);
          console.log(formattedURL)
          if (window.data[formattedURL]){
            var novaData = parseFloat(request.data.replace( /^\D+/g, '').replace(',', '.'));
            console.log(request.data)
            console.log(novaData)
            var staraData = parseFloat(window.data[formattedURL][0].replace( /^\D+/g, '').replace(',', '.'))
            console.log(window.data[formattedURL][0])
            console.log(staraData)
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
        console.log("Getam Prices");
        console.log(data);
        console.log(data.data);
        console.log("ima cijena")
        Object.keys(data.data).forEach(function (url) {
            console.log(url);
            console.log(data.data[url][0]);
            console.log(data.data[url][1]);
            window.data[url] = [data.data[url][0], data.data[url][1]];
          //  window.data[url][0] = data.data[url][0];
          //  window.data[url][1] = data.data[url][1];

        });
      }
    });
}

function formatAmazonURL(url) {
    var indexdp = url.search("/dp/") + 14
    var formattedURL = url.slice(0, indexdp);
    return formattedURL
}


//ovo se izvrsava paljenjem browsera
getPrices();
