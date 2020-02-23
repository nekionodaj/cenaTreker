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
        if (!window.data[sender.url]){
          window.data[sender.url] = request.data;  //upisuje podatak u backend ekstenzije
          console.log("upisano u backend")
          console.log(sender.url);
          console.log(request.data);
          chrome.storage.sync.set({["data"] : window.data}, function(){ console.log("sejvano u storage"); });
        }
      };
});

//ceka poziv iz content2, usporeduje i salje odgovor
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
      if (request.kljuc == "seePrice"){
          if (window.data[sender.url]){
            if (window.data[sender.url] == request.data) {
              console.log("cijena se nije promijenila");
              sendResponse("=");
            }
            else if(window.data[sender.url] < request.data) {
              console.log("cijena je veca nego prije");
              sendresponse("veca");
            }
            else if(window.data[sender.url] > request.data) {
              console.log("cijena je manja nego prije");
              sendresponse("manja");
            }

          }
      };
});

//uzme objekt data i njegov kljuc data i iterira po svakom kljucu(url-u) unutar objekta i sprema ga u window.data
function getPrices(){
  chrome.storage.sync.get(["data"], function(data) {
    console.log(data);
    console.log(data.data);
    console.log("ima cijena")
    Object.keys(data.data).forEach(function (url) {
          console.log(url);
          console.log(data.data[url]);
          window.data[url] = data.data[url];
          });
    });
}


//ovo se izvrsava paljenjem browsera
getPrices();
console.log("Getam Prices");
