var channels = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];

var online = document.querySelector(".online");
var offline = document.querySelector(".offline");

var control = document.querySelector(".control");

control.onclick = function(event){

  var elem = event.target;

  if (elem != '[object HTMLButtonElement]') return;

  if (elem.dataset.category == 'online'){

    offline.classList.add("hidden");
    online.classList.remove("hidden");
  }

  else if (elem.dataset.category == 'offline'){

    online.classList.add("hidden");
    offline.classList.remove("hidden");  
  }

  else{
    online.classList.remove("hidden");
    offline.classList.remove("hidden");
  }
}

getChannelsInfo();

function makeURL(type, item){
  return `https://api.twitch.tv/kraken/${type}/${item}?client_id=?`;
}

function getChannelsInfo(){

  channels.forEach(function(item){

    var game,status;

    var req = new XMLHttpRequest();

    req.open('GET', makeURL("streams", item), false);

    req.onload = function(){

      if (req.status >= 200 && req.status < 400){

        var data = JSON.parse(req.responseText);

        if (data.stream == null){
          game = 'offline';
          status = 'offline';
        }

        else if (data.stream == undefined){
          game = 'Account Closed';
          status = 'offline';
        }

        else{
          game = data.stream.game;
          status = 'online';
        }
      }
    }

    req.send();

    req.open('GET', makeURL("channels", item), true)

      req.onload = function(){

        if (req.status >= 200 && req.status < 400){

          var data = JSON.parse(req.responseText);

          if (status === 'online'){
            var elem = document.createElement("div");
            elem.classList.add("online__card");
            elem.innerHTML = `<div class="img-container"><img src="${data.logo}" alt="logo" class="img"></div><a href="${data.url}" class="link">${item}</a><p class="status">${game}</p>`;
            online.appendChild(elem);
          }

          else if (status == 'offline'){
            var elem = document.createElement("div");
            elem.classList.add("offline__card");
            elem.innerHTML = `<div class="img-container"><img src="${data.logo}" alt="logo" class="img"></div><a href="${data.url}" class="link">${item}</a><p class="status">${game}</p>`;
            offline.appendChild(elem);         
          }
        }
      }

    req.send();      
  })
}