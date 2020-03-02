<?php

function create_alert($message)
{
    echo "<script type='text/javascript'>alert('$message');</script>";
}

function create_http_response($newcode = NULL)
{
    static $code = 200;
    if($newcode !== NULL)
    {
        header('X-PHP-Response-Code: '.$newcode, true, $newcode);
        if(!headers_sent())
            $code = $newcode;
    }
    return $code;
}

?>