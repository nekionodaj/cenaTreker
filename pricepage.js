function printPrice(tab) {  
  var bg = chrome.extension.getBackgroundPage();
  bg.getPrices();
  Object.keys(bg.data).forEach(function (url) {
   //  const div = document.createElement('div');
    // //div.textContent = url + " : " + bg.data[url];
   //  div.textContent = url + " : ";
  //   div.className += "alert alert-primary";
  //   console.log("printam");
 //    console.log(url);
 //    document.body.appendChild(div);
 var h = document.getElementById("popis");
 h.insertAdjacentHTML("afterbegin", `
 <div class="input-group artikli">
  <div class="input-group-append">
       <span id="valuta" class="input-group-text">$</span>
       <span id="cijena" class="input-group-text"></span>
     </div>
   <span id="artikl" type="text" class="form-control"></span>
     <div class="input-group-append">
       <a href="www.amazon.com"><button class="btn btn-outline-warning" type="button">Visit</button></a>
       <button class="btn btn-outline-danger" type="button">Remove</button>
     </div></div>`);

 
     document.getElementById('artikl').textContent = url;
      document.getElementById('cijena').textContent = bg.data[url];  
  })
}
document.getElementById('printPrice').addEventListener('click', printPrice);

