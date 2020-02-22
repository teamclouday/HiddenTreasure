// Functions for signup.html
function agreeClickEvent()
{
    var btnDis = document.getElementById("signupBtn").disabled;
    var check = document.getElementById("signupAgree").checked;
    if(btnDis && check)
    {
        document.getElementById("signupBtn").disabled = false;
    }
    else if(!check && !btnDis)
    {
        document.getElementById("signupBtn").disabled = true;
    }
}