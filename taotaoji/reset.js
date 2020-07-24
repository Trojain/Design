function reset(){
   var w = document.body.clientWidth/750;
    document.documentElement.style.fontSize = w*100+'px';
}

window.onresize = function(){
    reset();
};
document.documentElement.addEventListener('touchstart', function () {  });

