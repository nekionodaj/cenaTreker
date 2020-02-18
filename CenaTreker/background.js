// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// Called when the user clicks on the browser action.


window.data = {};

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
      window.data[sender.url] = request.data;  //upisuje podatak u backend ekstenzije
      console.log("upisano u backend")
      console.log(sender.url);
      console.log(request.data);
});
