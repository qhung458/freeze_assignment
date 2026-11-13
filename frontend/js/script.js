/*
1. Chúng ta có thể kiểm tra phím vừa được nhán thông qua e.key hoặc e.code
2. ta thường gắn onclick cho nút, và gắn onsubmit cho form(khi form được gắn onsubmit thì có thể enter hoặc nhấn vào nút gì đó có type submit là được)


 */

function searchProductByKeyPress(e){
    if(e.key === "Enter"){
        let text= document.getElementById("search")
        if( text.value.trim().length === 0){
            alert("Nội dung tìm kiếm không hợp lệ!");
            text.focus();
            return false;
        }
    }
    return true;
}

function searchProductByClick() {
    let text = document.getElementById("search")
    if (text.value.trim().length === 0) {
        alert("Nội dung tìm kiếm không hợp lệ!");
        text.focus();
        return false;
    }
    return true;
}


const regex_email= /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const regex_password = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;


function validateLogin(){
    let email= document.getElementById("email");
    let pass= document.getElementById("pass");

    if (!regex_email.test(email.value)){
        alert("Nhập sai email rồi bé ơi!!");
        return false;
    }

    if(!regex_password.test(pass.value)){
        alert("Nhập sai password rồi bé ơi!!");
        return false;
    }
    console.log(email.value,pass.value)
    return true;
}


// ================================== Tìm kiếm
const search_form= document.getElementById("search-form")
if(search_form){
    document.getElementById("search-form").onkeydown=searchProductByKeyPress;
    document.getElementById("search-form").onsubmit=searchProductByClick;
}


// ================================== Dang nhap
const form_login= document.getElementById("form-login")
if(form_login){
    document.getElementById("form-login").onsubmit=validateLogin;
}

// ================================== Dang ky


