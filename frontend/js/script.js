/*
1. Chúng ta có thể kiểm tra phím vừa được nhán thông qua e.key hoặc e.code
2. ta thường gắn onclick cho nút, và gắn onsubmit cho form(khi form được gắn onsubmit thì có thể enter hoặc nhấn vào nút gì đó có type submit là được)


 */

const regex_email= /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const regex_password = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const itemList={
    "sp001": {
        "name": "Sữa Chua Vị Kiwi",
        "price": 21000,
        "photo": "../../images/sanpham/kiwi.jpg"
    },
    "sp002": {
        "name": "Sữa Chua Vị Xoài",
        "price": 22000,
        "photo": "../../images/sanpham/mango.jpg"
    },
    "sp003": {
        "name": "Sữa Chua Vị Dưa lưới",
        "price": 23000,
        "photo": "../../images/sanpham/cantaloupe.jpg"
    },
    "sp004": {
        "name": "Sữa Chua Vị Mâm Xôi",
        "price": 24000,
        "photo": "../../images/sanpham/blackberry.jpg"
    },
    "sp005": {
        "name": "Sữa Chua Vị Dâu Tây",
        "price": 25000,
        "photo": "../../images/sanpham/strawberry.jpg"
    },
    "sp006": {
        "name": "Sữa Chua Vị Việt Quất",
        "price": 26000,
        "photo": "../../images/sanpham/blueberry.jpg"
    },
    "sp007": {
        "name": "Sữa Chua Vị Bưởi",
        "price": 27000,
        "photo": "../../images/sanpham/grapes.jpg"
    },
    "sp008": {
        "name": "Sữa Chua Vị Táo Xanh",
        "price": 28000,
        "photo": "../../images/sanpham/green-apple.jpg"
    },
    "sp009": {
        "name": "Sữa Chua Vị Dứa",
        "price": 29000,
        "photo": "../../images/sanpham/pineapple.jpg"
    }
};


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
function addCart(code){
    let number= parseInt(document.getElementById(code).value);
    if(typeof localStorage[code] === "undefined"){
        window.localStorage.setItem(code,number)
    }else{
        if(parseInt(localStorage.getItem(code)) + number>100){
            window.localStorage.setItem(code,100);
            alert("Overload 100!!")
        }else{
            let current= parseInt(localStorage.getItem(code))
            localStorage.setItem(code, current + number);

        }
    }

}

function setIdForProductItems(){
    let allInput= document.querySelectorAll('input[type="number"]')
    let productID= Object.keys(itemList)
    for(i=0;i< allInput.length;i++){
        allInput[i].setAttribute("id",productID[i])
        allInput[i].nextElementSibling.setAttribute("onclick", "addCart('" + productID[i] + "')")
    }
}

setIdForProductItems()

function removeCard(code){
    if(typeof localStorage[code]!=="undefined"){
        localStorage.removeItem(code)
        document.getElementById('bang-don-hang').getElementsByTagName("tbody")[0].innerHTML= "";
        showCart();
    }
}

function getDiscountRate()
{
    var d = new Date(); // lấy ngày hiện tại của máy tính
    var weekday = d.getDay(); // lấy ngày trong tuần
    var totalMins = d.getHours() * 60 + d.getMinutes(); // đổi thời gian hiện tại ra số phút tương đối trong ngày
    if (weekday >= 1 && weekday <= 3 && ((totalMins >= 420 && totalMins <= 660) || (totalMins >= 780 && totalMins <= 1020)))
        return 0.1;
    return 0;
}


function showCart(){
    let totalPretax=0.0;
    let body= document.querySelector("#bang-don-hang tbody")
    body.innerHTML= "";
    let money= new Intl.NumberFormat("vi-VN",{style:'currency', currency:'VND'})

    for (let key in localStorage){
        let item= itemList[key];
        if (!item) continue;
        let photo= item.photo;
        let name= item.name;

        let price= item.price;
        let count= Number(localStorage.getItem(key));
        let total= price * count;

        let tr= body.insertRow(-1)
        let img= document.createElement("img");
        img.src= photo
        img.title= name;
        img.width=100

        tr.insertCell(-1).appendChild(img)
        tr.insertCell(-1).textContent=name;
        tr.insertCell(-1).textContent = count;
        tr.insertCell(-1).textContent = money.format(price);
        tr.insertCell(-1).textContent = money.format(total);

        // tao nut remove

        let a= document.createElement("a");
        a.href="#"
        a.dataset.code=key;
        a.innerHTML = '<i class="fa-solid fa-trash icon-pink"></i>';
        a.onclick=function(){
            removeCard(this.dataset.code)
            return false;
        }
        tr.insertCell(-1).appendChild(a)
        totalPretax += total;


    }
    let discount = totalPretax * getDiscountRate();
    let tax = (totalPretax - discount) * 0.1;
    let totalOrder = totalPretax - discount + tax;

    document.getElementById("tong-a").textContent = money.format(totalPretax);
    document.getElementById("chiet-khau-b").textContent = money.format(discount);
    document.getElementById("thue-c").textContent = money.format(tax);
    document.getElementById("tong-don-hang").textContent = money.format(totalOrder);


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

if (document.getElementById("bang-don-hang")) {
    showCart();
    window.addEventListener("storage", showCart);
}

// ================================== Dang ky


