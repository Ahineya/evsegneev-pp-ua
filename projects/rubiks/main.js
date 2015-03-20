var color = '';
var elem = '';
var log = false;

$('td').click(function() {
    if (color == '') {
        color = $(this).attr('class');
        elem = $(this);
        $(this).css('opacity', '0.5');
        //$(this).css('background-color', '#aaaaaa');
    } else {
        elem.attr('class', $(this).attr('class'));
        elem.css('opacity', '1');
        $(this).attr('class', color);
        if(log) {
            $('.log').val($('.log').val()+'\n'+elem.data('index')+':'+$(this).data('index'));
        }
        //alert(elem.data('index')+' => '+$(this).data('index'));
        color = '';
        elem = '';
    }
});

$('.execute').click(function() {
    var commands = $('.command').val().split('\n');
    execute(commands);

})

function execute(commands) {
    for (var i=0; i<commands.length; i++) {
        //alert(commands[i])
        var swappers = commands[i].split(':');
        var col1 = $('td[data-index="'+swappers[0]+'"]').attr('class');
        var col2 = $('td[data-index="'+swappers[1]+'"]').attr('class');
        //alert(col1);
        $('td[data-index="'+swappers[0]+'"]').attr('class', col2);
        $('td[data-index="'+swappers[1]+'"]').attr('class', col1);
        if(log) {
            $('.log').val($('.log').val() + commands[i] + "\n");
        }
    }
    //console.log(testColor);
}

function executeN(commands) {
    for (var i=0; i<commands.length; i++) {
        //alert(commands[i])
        switch(commands[i].toLowerCase()) {
            case 'r':
            case 'r1':
                r()
                break
            case "r'":
            case "r3":
                nr()
                break
            case 'l':
            case 'l1':
                l()
                break
            case "l'":
            case "l3":
                nl()
                break
            case 'u':
            case 'u1':
                u()
                break
            case "u'":
            case "u3":
                nu()
                break
            case 'd':
            case 'd1':
                d()
                break
            case "d'":
            case "d3":
                nd()
                break
            case 'f':
            case 'f1':
                f()
                break
            case "f'":
            case "f3":
                nf()
                break
            case 'b':
            case 'b1':
                b()
                break
            case "b'":
            case "b3":
                nb()
                break
            case 'y':
            case 'y1':
                y()
                break
            case "y'":
            case "y3":
                ny()
                break
            case 'r2':
                r()
                r()
                break
            case 'l2':
                l()
                l()
                break
            case 'u2':
                u()
                u()
                break
            case 'd2':
                d()
                d()
                break
            case 'f2':
                f()
                f()
                break
            case 'b2':
                b()
                b()
                break
        }

    }

    return check();

}

$('.stringify').click(function() {
    var commands = $('.command').val().split('\n');
    for (var i=0; i<commands.length; i++) {
        $('.stringified').val($('.stringified').val()+commands[i]+'\\n');
    }
})

$('.check').click(function() {
    alert(check());
})

function check() {
    var test = true;

    if(!testSide('top', '1')) test = false;
    if(!testSide('left', '10')) test = false;
    if(!testSide('front', '19')) test = false;
    if(!testSide('right', '28')) test = false;
    if(!testSide('down', '37')) test = false;
    if(!testSide('back', '46')) test = false;

    return test;
}

function testSide(side, first) {
    var side = $('.'+side+' td');
    //console.log(side);
    var testColor = $('td[data-index="'+first+'"]').attr('class');

    var test = true;

    side.each(function() {
        //console.log($(this));
        if($(this).attr('class') != testColor) {
            test = false;
        }
        if(!test) {
            //console.log('error!');
            return false;
        }
    })

    //console.log( test ? 'Solved!' : 'Nope(' );
    return test;
}

$('.loop').click(function() {
    var times = $('.loopc').val();
    for(var i = 0; i<times; i++) {
        executeN($('.executenc').val().trim().split(' '));
    }
})

$('.loop-to-solve').click(function() {

    var times = $('.loopc').val();

    var i = 0;

    while (true) {
        i++;
        if( executeN($('.executenc').val().trim().split(' '))) {
            alert('Собран за '+ i.toString() + " ходов")
            break;
        }
    }

})

//---------- standart functions -----------
function r() {
    var commands = "21:3\n39:21\n48:39\n24:6\n42:24\n51:42\n27:9\n45:27\n54:45\n34:28\n36:34\n30:36\n29:33\n31:29\n35:31";
    execute(commands.split('\n'));
}
function nr() {
    var commands = "45:54\n27:45\n9:27\n42:51\n24:42\n6:24\n39:48\n21:39\n3:21\n28:34\n30:28\n36:30\n29:31\n33:29\n35:33";
    execute(commands.split('\n'));
}
function u() {
    var commands = "19:10\n28:19\n54:28\n20:11\n29:20\n53:29\n21:12\n30:21\n52:30\n1:3\n7:1\n9:7\n2:6\n4:2\n8:4";
    execute(commands.split('\n'));
}
function nu() {
    var commands = "21:30\n12:21\n52:12\n20:29\n11:20\n53:11\n19:28\n10:19\n54:10\n1:7\n3:1\n9:3\n6:2\n8:6\n4:8";
    execute(commands.split('\n'));
}
function f() {
    var commands = "7:28\n18:7\n39:18\n8:31\n15:8\n38:15\n9:34\n12:9\n37:12\n20:24\n22:20\n26:22\n19:21\n25:19\n27:25";
    execute(commands.split('\n'));
}
function nf() {
    var commands = "7:18\n28:7\n39:28\n8:15\n31:8\n38:31\n9:12\n34:9\n37:34\n21:19\n27:21\n25:27\n24:20\n26:24\n22:26";
    execute(commands.split('\n'));
}
function l() {
    var commands = "43:52\n25:43\n7:25\n40:49\n22:40\n4:22\n37:46\n19:37\n1:19\n12:18\n10:12\n16:10\n11:15\n13:11\n17:13";
    execute(commands.split('\n'));
}
function nl() {
    var commands = "19:1\n37:19\n46:37\n22:4\n40:22\n49:40\n25:7\n43:25\n52:43\n12:10\n18:12\n16:18\n15:11\n17:15\n13:17";
    execute(commands.split('\n'));
}
function d() {
    var commands = "27:36\n18:27\n46:18\n26:35\n17:26\n47:17\n25:34\n16:25\n48:16\n37:39\n43:37\n45:43\n38:42\n40:38\n44:40";
    execute(commands.split('\n'));
}
function nd() {
    var commands = "25:16\n34:25\n48:34\n26:17\n35:26\n47:35\n27:18\n36:27\n46:36\n39:37\n45:39\n43:45\n42:38\n44:42\n40:44";
    execute(commands.split('\n'));
}
function b() {
    var commands = "1:16\n30:1\n45:30\n2:13\n33:2\n44:33\n3:10\n36:3\n43:36\n46:48\n52:46\n54:52\n49:47\n53:49\n51:53";
    execute(commands.split('\n'));
}
function nb() {
    var commands = "43:10\n36:43\n3:36\n44:13\n33:44\n2:33\n45:16\n30:45\n1:30\n46:52\n48:46\n54:48\n47:49\n51:47\n53:51";
    execute(commands.split('\n'));
}
function ny() {
    y();
    y();
    y();
}
function y() {
    var commands = "19:10\n28:19\n54:28\n20:11\n29:20\n53:29\n21:12\n30:21\n52:30\n22:13\n31:22\n51:31\n23:14\n32:23\n50:32\n24:15\n33:24\n49:33\n25:16\n34:25\n48:34\n26:17\n35:26\n47:35\n27:18\n36:27\n46:36\n7:1\n9:7\n3:9\n4:2\n8:4\n6:8\n37:43\n39:37\n45:39\n38:40\n42:38\n44:42";
    execute(commands.split('\n'));
}
function z() {
    nz();
    nz();
    nz();
}
function nz() {
    var commands = "1:16\n30:1\n45:30\n13:44\n2:13\n33:2\n36:3\n43:36\n43:10\n4:17\n29:4\n42:29\n14:41\n5:14\n32:5\n11:40\n6:11\n35:6\n7:18\n28:7\n39:28\n8:15\n31:8\n38:31\n9:12\n34:9\n37:34\n19:25\n21:19\n27:21\n20:22\n24:20\n26:24\n46:48\n52:46\n54:52\n49:47\n53:49\n51:53";
    execute(commands.split('\n'));
}

$('.r').click(function() {
    r();
})
$('.nr').click(function() {
    nr();
})
$('.u').click(function() {
    u();
})
$('.nu').click(function() {
    nu();
})
$('.f').click(function() {
    f();
})
$('.nf').click(function() {
    nf();
})
$('.l').click(function() {
    l();
})
$('.nl').click(function() {
    nl();
})
$('.d').click(function() {
    d();
})
$('.nd').click(function() {
    nd();
})
$('.b').click(function() {
    b();
})
$('.nb').click(function() {
    nb();
})
$('.z').click(function() {
    z();
})
$('.nz').click(function() {
    nz();
})
$('.y').click(function() {
    y();
})
$('.ny').click(function() {
    ny();
})

$('.executen').click(function() {
    executeN($('.executenc').val().trim().split(' '))

})

$('.cube').draggable();
//$('.cube').resizable();

$('.zoom').change(function() {
    $('.cube').css('zoom', $(this).val());
})

$(window).on('mousemove', function(event) {
    var width = $(window).width();
    var mouseX = event.pageX - (width * 0.5);
    var height = $(window).height();
    var mouseY = event.pageY - (height * 0.5);
    var xAngle = (mouseY / height) * 70;
    var yAngle = (mouseX / width) * 70;

    $('.cube')[0].style.webkitTransform = "rotateX("+xAngle+"deg) rotateY("+yAngle+"deg)";
    $('.cube')[0].style.mozTransform = "rotateX("+xAngle+"deg) rotateY("+yAngle+"deg)";
    $('.cube')[0].style.transform = "rotateX("+xAngle+"deg) rotateY("+yAngle+"deg)";
});