// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.


window.data = {};   //backend struktura podataka, njoj se pristupa sa bg (varijablom background)
                    //const bg = chrome.extension.getBackgroundPage();
                    //i onda bg.data za pristupit strukturi podataka

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
      window.data[sender.url] = request.data;  //upisuje podatak u backend ekstenzije
      console.log("upisano u backend")
      console.log(sender.url);
      console.log(request.data);
      chrome.storage.sync.set({["data"] : window.data}, function(){ console.log("sejvano u storage"); });
});

function getPrices(){
  chrome.storage.sync.get(["data"], function(data) {
    console.log(data);
    console.log(data.data);
    // check if data exists.
    if (1){
        console.log("ima cijena")
        //window.data = data;
        Object.keys(data.data).forEach(function (url) {

            console.log(url);
            console.log(data.data[url]);
            window.data[url] = data.data[url];
        });
    } else{
        chrome.storage.sync.set({"data" : window.data}, function(){ console.log("sejvano u storage"); });
    } });
}

getPrices();
console.log("Getam Prices");
