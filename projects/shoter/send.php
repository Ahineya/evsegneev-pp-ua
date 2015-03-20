<?php

if (isset($_POST['data'])) {
	$img = $_POST['data'];
	$img = str_replace('data:image/png;base64,', '', $img);
	$img = str_replace(' ', '+', $img);
	$data = base64_decode($img);
	$filename = 'img/'.md5(microtime(true)).'.png';
	$actual_link = "http://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]" . $filename;
	$actual_link = str_replace('send.php', '', $actual_link);
	file_put_contents($filename, $data);
	//file_put_contents('data.txt', str_replace('data:image/png;base64,', '', $_POST['data']));
	echo json_encode(array('status'=>true, 'url'=>$actual_link));
}
