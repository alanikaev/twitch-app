var link = 'https://api.twitch.tv/kraken/streams/csruhub2?client_id=?';
var channels = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];

var onlinebtn = document.querySelector('.online-btn');
var allbtn = document.querySelector('.all-btn');

var online = document.getElementById("online");
var all = document.getElementById("all");
var game, channel;

onlinebtn.onclick = function(e){
  e.preventDefault();
  getOnlineChannels(channels);  
}

function makeUrl(item){
  return `https://api.twitch.tv/kraken/streams/${item}?client_id=lidc475jqml0yp0gdrg41zv7g2hj4g`;
}

function getOnlineChannels(channels){

  channels.forEach(function(item){

    var request = new XMLHttpRequest();

    request.open('GET',makeUrl(item), true);

    request.onload = function(){
      if (request.status >= 200 && request.status < 400){
        var res = JSON.parse(request.responseText);

        if (res.stream != null){
          document.write(item + " is playing "+res.stream.game+"<br>");
        }
      }

      else{
        alert("Error");
      }
    }

    request.send();
  })
}
