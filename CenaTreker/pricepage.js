
var bg = chrome.extension.getBackgroundPage();
document.getElementById('printPrice').addEventListener('click', printPrice);

function printPrice(tab) {
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
       <a href='#' target="_blank" id="gumbLink"><button class="btn btn-outline-warning" type="button">Visit</button></a>
       <button id="makni" class="btn btn-outline-danger" type="button">Remove</button>
     </div></div>`);
    document.getElementById('gumbLink').href = url;
    document.getElementById('valuta').textContent = Currency(bg.data[url][0]);
    document.getElementById('cijena').textContent = bg.data[url][0];
    document.getElementById('artikl').textContent = bg.data[url][1];
    document.getElementById('makni').onclick = makni.bind(null, url);
  })
}

function makni(url) {
  console.log("makni");
  console.log(url)
  console.log(bg.data[url]);
  chrome.runtime.sendMessage({data : url, kljuc : "brisanje"}, function(response){console.log("obrisano")}); //salje poruku backgroundu
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
