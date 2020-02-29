function printPrice(tab) {
  var bg = chrome.extension.getBackgroundPage();
  bg.getPrices();
  Object.keys(bg.data).forEach(function (url) {
    var h = document.getElementById("popis");
    h.insertAdjacentHTML("afterbegin", `
    <div class="input-group artikli">
   <div class="input-group-append">
       <span id="valuta" class="input-group-text"></span>
       <span id="cijena" class="input-group-text"></span>
     </div>
   <span id="artikl" type="text" class="form-control"></span>
     <div class="input-group-append">
       <a href="www.amazon.com"><button class="btn btn-outline-warning" type="button">Visit</button></a>
       <button class="btn btn-outline-danger" type="button">Remove</button>
     </div></div>`);

    document.getElementById('valuta').textContent = Currency(bg.data[url]);
    document.getElementById('cijena').textContent = bg.data[url];
    document.getElementById('artikl').textContent = URLtoName(url, bg.data[url]);
  })
}
document.getElementById('printPrice').addEventListener('click', printPrice);

function URLtoName(url, bgCijena) {
  if (bgCijena.charAt(0) == "\u0024") {
    //dolar
    var name = url.substr(19);
    var first = name.search("/");
    var last = name.search("/dp/");
    var formattedName = name.slice(first + 1, last);
    formattedName = formattedName.replace(/-/g, " ");
  } else if (bgCijena.charAt(0) == "\u00A3") {
    //funta
    var formattedName = url.substr(url.search("/dp/"));
    formattedName = formattedName.concat(" fali ime .co.uk");
  } else if (bgCijena.slice(-1) == "\u20ac") {
    //juro
    var formattedName = url.substr(url.search("/dp/"));
    formattedName = formattedName.concat(" fali ime .de");
  }
  return formattedName;
}

function Currency(bgCijena) {
  if (bgCijena.slice(-1) == "\u20ac") {
    //juro 
    var currency = bgCijena.slice(-1);
  } else
    //dolar i funta
    var currency = bgCijena.charAt(0);
  return currency;
}