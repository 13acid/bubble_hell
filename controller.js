const controls = {
  start: function(){
  window.addEventListener('keydown', function (e) {
    controls.key = e.keyCode;
  })
  window.addEventListener('keyup', function (e) {
    controls.key = false;
  })
  }
}

function updatePlayer(){
    if(controls.key && controls.key == 37) {player.x = player.x - 1;} 
    if(controls.key && controls.key == 39) {player.x = player.x + 1;} 
    if(controls.key && controls.key == 38) {player.y = player.y - 1;} 
    if(controls.key && controls.key == 40) {player.y = player.y + 1;} 
}
