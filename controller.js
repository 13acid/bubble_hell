const controls = {
  start: function(){
    controls.keys = [];
    window.addEventListener('keydown', function (e) {
      controls.keys[e.keyCode] = true;
    })
    window.addEventListener('keyup', function (e) {
      controls.keys[e.keyCode] = false;
    })
  }
}

function updatePlayer(){
    if(controls.keys[37]) {player.x = player.x - 1;} 
    if(controls.keys[39]) {player.x = player.x + 1;} 
    if(controls.keys[38]) {player.y = player.y - 1;} 
    if(controls.keys[40]) {player.y = player.y + 1;} 
}
