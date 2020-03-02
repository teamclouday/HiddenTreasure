<?php 

include 'httpresponse.php';

// check if form is submitted
if(isset($_REQUEST['submit']))
{
    // setup database
    $db_host = '127.0.0.1';
    $db_username = 'root';
    $db_password = 'zhusida';
    $db_name = 'CIS454';

    // make connection
    $conn = mysqli_connect($db_host, $db_username, $db_password, $db_name);
    if(mysqli_connect_error())
    {
        die('Connect Error (' . mysqli_connect_errno() . ') ' . mysqli_connect_errno());
        create_alert("Failed to connect local database");
    }

    // fetch form data
    $uname      = mysqli_escape_string($conn, $_POST['uname']);
    $psw        = mysqli_escape_string($conn, $_POST['psw']);
    $sec        = mysqli_escape_string($conn, $_POST['sec']) ?: '';
    $sec_option = mysqli_escape_string($conn, $_POST['sec_option']);

    // validate data
    if(empty($uname) or empty($psw) or empty($sec_option))
    {
        mysqli_close($conn);
        create_alert("Error: Username and Password should be defined");
        create_http_response(400); // 400 for bad request
    }

    // setup insert string and send query
    $sql = "INSERT INTO user_identity (uname, psw, sec, sec_option) VALUES ('$uname', '$psw', '$sec', '$sec_option')";
    if(!$conn->query($sql))
    {
        create_alert("Error: " . $sql . " " . mysqli_error($conn));
    }

    // close connection
    mysqli_close($conn);
}

?>