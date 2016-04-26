<?php
 echo 'hello world!';
 echo $_POST;
$url = 'https://script.google.com/macros/s/AKfycbwhCeqz6emwwAJNuiEkesZE85A1IVEnmjDtrxtA-EXRFlUDl7ls/exec';
$data = $_POST;
$options = array(
        'http' => array(
        'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
        'method'  => 'POST',
        'content' => http_build_query($data),
    )
);

$context  = stream_context_create($options);
$result = file_get_contents($url, false, $context);
var_dump($result);
 echo $result;
 ?>
