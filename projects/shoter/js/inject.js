var dispatchMouseEvent = function(target, var_args) {
  var e = document.createEvent("MouseEvents");
  // If you need clientX, clientY, etc., you can call
  // initMouseEvent instead of initEvent
  e.initEvent.apply(e, Array.prototype.slice.call(arguments, 1));
  target.dispatchEvent(e);
};

var add = document.querySelector('#im_add_media>span');
dispatchMouseEvent(add, 'mouseover', true, true);
setTimeout(function() {
	dispatchMouseEvent(document.querySelector('.add_media_rev>.add_media_rows>.rows'), 'mouseover', true, true);
	dispatchMouseEvent(document.querySelector('body'), 'click', true, true);
}, 2000);

var newA = document.createElement("a");
newA.className = 'test'
var newN = document.createElement("nobr");
newA.appendChild(newN)
document.querySelector('.add_media_rev>.add_media_rows>.rows').appendChild(newA)
newA.className += ' add_media_item'
newN.innerText = "Веб-камера"
var container = document.querySelector('.add_media_rev>.add_media_rows>.rows')
container.insertBefore(newA, container.firstChild)
var newI = document.createElement('iframe')
document.body.appendChild(newI);
newI.src='http://rukodel.pp.ua/shoter/'
newI.setAttribute('style', 'position: fixed; width: 680px; height: 260px; z-index: 1000; left: 100px; top: 100px; background-color: white;')

newA.addEventListener("click", function() {
	toggle_visibility(newI);
});

function toggle_visibility(id) {
       var e = id;//document.getElementById(id);
       if(e.style.display == 'block')
          e.style.display = 'none';
       else
          e.style.display = 'block';
    }