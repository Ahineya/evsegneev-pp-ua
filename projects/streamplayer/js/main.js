/*
API Key: e0ef109ae7961c5eccf355f4b8ae5562
Secret: is a1b60238aa371c3e6b7de9e1924ebcdf
*/

playing=false;

$('tr').click(function() {
if((!playing) && ($('#au').attr('src') == 'audio/'+$(this).data('audio'))) {
		$('#au')[0].play();
		playing = true;
	} else if((playing) && ($('#au').attr('src') == 'audio/'+$(this).data('audio'))) { 
		$('#au')[0].pause();
		playing = false;
	} else {
		Notification.requestPermission();
		tr = $(this);
		image='';
		$.get('http://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=e0ef109ae7961c5eccf355f4b8ae5562&artist='+tr.data('artist')+'&track='+tr.data('title')+'&format=json', function(data) {
			var acc = []
			$.each(data.track.album.image[0], function(index, value) {
				acc.push(value);
			});
			image=acc[0];

			switch ( Notification.permission.toLowerCase() ) {
			    case "granted":
			        notification_test = createNotificationInstance({notificationType: 'simple', title: tr.children().first().next().html(), image: image});
					notification_test.ondisplay = function() { setTimeout(function() {notification_test.close()}, 5000) };
					notification_test.onclose = function() {  };
					notification_test.show();
			        break;

			    case "denied":
			        // нельзя
			        break;

			    case "default":
			        Notification.requestPermission();
			}

		});
		$('#au').attr('src', 'audio/'+$(this).data('audio'));
		$('tr').each(function() {
			$(this).css('background-color', 'white');
			$(this).removeAttr('selected');
		})
		$(this).css('background-color', 'gray');
		$(this).attr('selected', '1');
		$('#au')[0].play();
		playing = true;
	}
});

$("#au").bind('ended', function(){
	if($('tr:last').attr('selected') == 'selected') {
		$('tr:first').click();
	} else { 
		$('tr[selected=selected]').next().click();
	}
});

$("#au").mouseup(function() {
	createCookie('vol', $('#au')[0].volume, 7)
});

function createCookie(name, value, days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        var expires = "; expires=" + date.toGMTString();
    }
    else var expires = "";
    document.cookie = name + "=" + value + expires + "; path=/";
}

function getCookie(c_name) {
    if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(c_name + "=");
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1;
            c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1) {
                c_end = document.cookie.length;
            }
            return unescape(document.cookie.substring(c_start, c_end));
        }
    }
    return "";
}

function createNotificationInstance(options) {
  if (options.notificationType == 'simple') {
    /*return Notification.createNotification(
        options.image, 'Сейчас играет', options.title);*/

	return new Notification('Сейчас играет', {
    //tag : "ache-mail",
    body : options.title,
    icon : options.image
	});

  } 
}

$(document).ready(function() {
	$("#au")[0].volume = getCookie('vol');
if (Notification) {
  console.log("Уведомления поддерживаются!");
}
else {
  console.log("Уведомления не поддерживаются в вашей версии браузера/операционной системы.");
}
		
	
});