<!DOCTYPE html>
<html class="no-js">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <title></title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width">

        <link rel="stylesheet" href="css/bootstrap.min.css">
        <style>
            body {
                padding-top: 60px;
                padding-bottom: 40px;
            }
        </style>
        <link rel="stylesheet" href="css/bootstrap-responsive.min.css">
        <link rel="stylesheet" href="css/main.css">

        <script src="js/vendor/modernizr-2.6.2-respond-1.1.0.min.js"></script>
    </head>
    <body>

        <!-- This code is taken from http://twitter.github.com/bootstrap/examples/hero.html -->

        <div class="navbar navbar-inverse navbar-fixed-top">
            <div class="navbar-inner">
                <div class="container">
                    <a class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse">
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </a>
                    <a class="brand" href="#">Project name</a>
                    <div class="nav-collapse collapse">
                        <ul class="nav">
                            <li class="active"><a href="#">Home</a></li>
                            <li><a id="show_button" href="#about">About</a></li>
                            <li><a href="#contact">Contact</a></li>
                            <li class="dropdown">
                                <a href="#" class="dropdown-toggle" data-toggle="dropdown">Dropdown <b class="caret"></b></a>
                                <ul class="dropdown-menu">
                                    <li><a href="#">Action</a></li>
                                    <li><a href="#">Another action</a></li>
                                    <li><a href="#">Something else here</a></li>
                                    <li class="divider"></li>
                                    <li class="nav-header">Nav header</li>
                                    <li><a href="#">Separated link</a></li>
                                    <li><a href="#">One more separated link</a></li>
                                </ul>
                            </li>
                        </ul>
                        <form class="navbar-form pull-right">
                            <input class="span2" type="text" placeholder="Email">
                            <input class="span2" type="password" placeholder="Password">
                            <button type="submit" class="btn">Sign in</button>
                        </form>
                    </div><!--/.nav-collapse -->
                </div>
            </div>
        </div>

        <div class="container">

            <!-- Main hero unit for a primary marketing message or call to action -->
            
            <div class="row">
                <div class="span12">
                    <h2>StreamPlayer test</h2>
                    <p>
					<audio id='au' src="audio/01.Vetnam.mp3" controls>
						Тег audio не поддерживается вашим браузером. <a href="audio/01.Vetnam.mp3">Скачайте музыку</a>.
				    </audio>
					</p>

					<p>
					
					<?php
					require_once('classes/getid3.php');

$getID3 = new getID3;
$getid3->encoding = 'UTF-8'; 

					?>
					
						<table class = 'table'>
							<tbody>
							<?php
						
								$dir    = 'audio';
								$files = scandir($dir);
								for($i=2;$i<count($files); $i++) {
									$ThisFileInfo = $getID3->analyze('audio/'.$files[$i]);
									getid3_lib::CopyTagsToComments($ThisFileInfo); 
									$artist = mb_convert_encoding($ThisFileInfo['comments_html']['artist'][0], 'cp1251', 'cp1252');
									$artist = mb_convert_encoding($artist, 'utf-8', 'cp1251');
									//$artist = iconv('windows-1251', 'utf-8', $artist);
							?> 
							<tr data-artist='<?php echo $artist;?>' data-title='<?php echo $ThisFileInfo['comments_html']['title'][0];?>' data-audio="<?php echo $files[$i];?>" <?php if($i==2) echo 'selected="selected"';?>><td width='10'><?php echo $i-1,'.'?></td><td><?php echo implode('<br>', $ThisFileInfo['comments_html']['artist']) , ' - ', implode('<br>', $ThisFileInfo['comments_html']['title'])  ?></td></tr>
							<?php }?>
							</tbody>
						</table>
					</p>
                </div>

            </div>

            <hr>

            <footer>
                <p>&copy; Company 2012</p>
            </footer>

        </div> <!-- /container -->

        <script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
        <script>window.jQuery || document.write('<script src="js/vendor/jquery-1.9.1.min.js"><\/script>')</script>

        <script src="js/vendor/bootstrap.min.js"></script>

        <script src="js/main.js"></script>
    </body>
</html>
