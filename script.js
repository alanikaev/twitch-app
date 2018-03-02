var channels = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];

var control = document.querySelector(".control");

var online = document.querySelector(".online");
var offline = document.querySelector(".offline");
var all = document.querySelector(".all");

getChannelInfo();

control.onclick = function(event){

  var elem = event.target;

  if (elem != '[object HTMLButtonElement]') return;

  if (elem.dataset.category == 'online'){

    online.classList.remove("hidden");
    offline.classList.add("hidden");
    all.classList.add("hidden");
  }

  else if (elem.dataset.category == 'offline'){

    online.classList.add("hidden");
    offline.classList.remove("hidden");
    all.classList.add("hidden");  
  }

  else{

    online.classList.add("hidden");
    offline.classList.add("hidden");
    all.classList.remove("hidden");
  }
}

function makeURL(type, item){
  return `https://api.twitch.tv/kraken/${type}/${item}?client_id=?`;
}

function getChannelInfo(){

  online.innerHTML = '';
  offline.innerHTML = '';
  all.innerHTML = '';

  channels.forEach(function(item){

    var request = new XMLHttpRequest();

    request.open('GET', makeURL('streams', item), true);

    request.onload = function(){
      if (request.status >= 200 && request.status < 400){

        var res = JSON.parse(request.responseText);

        if (res.stream != null && res.stream != undefined){

          var elem = document.createElement("div");
          elem.classList.add("online__card");
          elem.innerHTML = `<div class="img-container"><img src="${res.stream.channel.logo}" alt="logo" class="img"></div><a href="${res.stream.channel.url}" class="link">${item}</a><p class="status">${res.stream.game}</p>`;
          online.appendChild(elem);
        }

        else if (res.stream == null || res.stream == undefined){
          
          request.open('GET', makeURL('channels', item), true);

          request.onload = function(){
            if (request.status >= 200 && request.status < 400){
              var res = JSON.parse(request.responseText);
              
              var elem = document.createElement("div");
              elem.classList.add("offline__card");
              elem.innerHTML = `<div class="img-container"><img src="${res.logo}" alt="logo" class="img"></div><a href="${res.url}" class="link">${item}</a>`;
              offline.appendChild(elem);
            };
          }

          request.send();
        }
      }
    }

    request.send();

  });

}
