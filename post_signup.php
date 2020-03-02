<?php
if(isset($_POST['submit']))
{
    $username = $_POST['uname'];
    $password = $_POST['psw'];
    $security_op = $_POST['sec_option'];
    $security = $_POST['sec'];
    echo 'Username: ' . $username . ' Password: ' . $password . ' Security: ' . $security . ' Option: ' . $security_op;
}
?>