// Put event listeners into place
window.addEventListener("DOMContentLoaded", function() {
	// Grab elements, create settings, etc.
	 canvas = document.querySelector(".sh-canvas"),
		context = canvas.getContext("2d"),
		video = document.querySelector(".sh-video"),
		videoObj = { "video": true },
		errBack = function(error) {
			console.log("Video capture error: ", error.code); 
		};

	// Put video listeners into place
	if(navigator.getUserMedia) { // Standard
		navigator.getUserMedia(videoObj, function(stream) {
			video.src = stream;
			video.play();
		}, errBack);
	} else if(navigator.webkitGetUserMedia) { // WebKit-prefixed
		navigator.webkitGetUserMedia(videoObj, function(stream){
			video.src = window.webkitURL.createObjectURL(stream);
			video.play();
		}, errBack);
	}

document.querySelector(".sh-video").addEventListener("click", function() {
	context.drawImage(video, 0, 0, 640, 480);
	document.querySelector('.sh-shot').src = canvas.toDataURL('image/png');
	send();
});


// javascript-код голосования из примера
function send() {
	// (1) создать объект для запроса к серверу
	var req = getXmlHttp()  
       
        // (2)
	// span рядом с кнопкой
	// в нем будем отображать ход выполнения
	//var statusElem = document.getElementById('vote_status') 
	
	req.onreadystatechange = function() {  
        // onreadystatechange активируется при получении ответа сервера

		if (req.readyState == 4) { 
            // если запрос закончил выполняться

			console.log(req.statusText); // показать статус (Not Found, ОК..)

			if(req.status == 200) { 
                 // если статус 200 (ОК) - выдать ответ пользователю
				//alert("Ответ сервера: "+req.responseText);
				var answer = JSON.parse(req.responseText);
				if (answer.status) {
					copyToClipboard(answer.url);
				}
			}
			// тут можно добавить else с обработкой ошибок запроса
		}

	}

       // (3) задать адрес подключения
	req.open('POST', 'send.php', false);  

	req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");


	// объект запроса подготовлен: указан адрес и создана функция onreadystatechange
	// для обработки ответа сервера
	 
        // (4)
	req.send("data="+canvas.toDataURL('image/png'));  // отослать запрос
  
        // (5)
	//console.log('Ожидаю ответа сервера...');
}

function getXmlHttp(){
  var xmlhttp;
  try {
    xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
  } catch (e) {
    try {
      xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    } catch (E) {
      xmlhttp = false;
    }
  }
  if (!xmlhttp && typeof XMLHttpRequest!='undefined') {
    xmlhttp = new XMLHttpRequest();
  }
  return xmlhttp;
}

function copyToClipboard (text) {
  window.prompt ("Copy to clipboard: Ctrl+C, Enter", text);
}

}, false);



