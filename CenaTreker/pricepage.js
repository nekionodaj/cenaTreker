
var bg; // stvori varijablu u koju cemo pohraniti data iz backgrounda
chrome.runtime.getBackgroundPage(function(bekgraund){bekgraund.getPrices(); bg = bekgraund.data}); //prvo getamo prices u backgroundu i onda ih pohranjujemo u bg
document.getElementById('printPrice').addEventListener('click', printPrice);

function printPrice(tab) {
  //bg.getPrices();
  Object.keys(bg).forEach(function (url) {
    if (document.getElementById(url)) document.getElementById(url).remove();
  });
  Object.keys(bg).forEach(function (url) { //za svaki kljuc u bg(u biti je to window.data) vrsimo istu funkciju koju smo prije za bg.data
    var h = document.getElementById("popis");
    h.insertAdjacentHTML("afterbegin", `
    <div id=` + url +  ` class="input-group artikli">
   <div class="input-group-append">
       <span id="valuta" class="input-group-text" style="background-color : #DBDBDB"></span>
       <span id="cijena" class="input-group-text" style="background-color : #DBDBDB"></span>
     </div>
   <span id="artikl" type="text" class="form-control"></span>
     <div class="input-group-append">
       <a href='#' target="_blank" id="gumbLink"><button id='zutiGumb' class="btn btn-info"  type="button">Visit</button></a>
       <button id="makni" class="btn btn-outline-danger" type="button">Remove</button>
     </div></div>`);
    document.getElementById('gumbLink').href = url;
    document.getElementById('valuta').textContent = Currency(bg[url][0]);
    document.getElementById('cijena').textContent = bg[url][0];
    document.getElementById('artikl').textContent = bg[url][1];
    document.getElementById('makni').onclick = makni.bind(null, url);
  })
}

function makni(url) {
  console.log("makni");
  var link = url
  console.log(link)
  document.getElementById(url).remove();
  chrome.runtime.sendMessage({data : link, kljuc : "brisanje"}, function(response){console.log("obrisano")}); //salje poruku backgroundu
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
