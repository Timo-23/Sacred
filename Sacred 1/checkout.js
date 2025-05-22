"Use Strict";
console.log(1);
// let totalQuantityHTML = document.querySelector(".totalQuantity");
// let totalPriceHTML = document.querySelector(".totalPrice");
const myForm = document.querySelector("#forms");
const nameInput = document.querySelector(".name");
const emailInput = document.querySelector(".email");
const phoneNumInput = document.querySelector(".num");
const addressInput = document.querySelector(".home");
const cityInput = document.querySelector(".city");
const countryInput = document.querySelector(".country");
const msg = document.querySelector(".msg");

// const userList = document.querySelector("#users");

let listCart = [];

function checkCart() {
  var saveCartToLocalStorage = document.cookie
    .split(";  ")
    .find((row) => row.startsWith("listCart="));
  if (saveCartToLocalStorage) {
    listCart = JSON.parse(saveCartToLocalStorage.split("=")[1]);
    // console.log(document.cookie);
    // console.log(cookieValue);
    //

    //   if (cookieValue) {
    //     addToCart = JSON.parse(cookieValue.split("=")[1]);
    //   }
    // }
    // // checkCart();
    // if (saveCartToCookie) {
    //   try {
    //     addToCart = JSON.parse(
    //       decodeURIComponent(saveCartToCookie.split("=")[1])
    //     );
    //   } catch (err) {
    //     console.error("Invalid cart data in cookie", err);
    //     addToCart = [];
    //   }
    // }
  }
}
checkCart();
addCartToHTML();
function addCartToHTML() {
  //clear data from html
  let listCartHTML = document.querySelector(".returnCart,.list");
  listCartHTML.innerHTML = "";
  let totalQuantityHTML = document.querySelector(".totalQuantity");
  let totalPriceHTML = document.querySelector(".totalPrice");

  let totalQuantity = 0;
  let totalPrice = 0;
  console.log(listCart);
  // if the product is in the cart
  if (listCart.length > 0) {
    listCart.map(
      (product) => {
        //  if (product) {
        let newP = document.createElement("div");
        newP.classList.add("item");
        // newP.dataset.id = product.id;
        newP.innerHTML = ` <img src="${product.image}" alt=""/>
                          <div class="info">
                <div class="name">${product.name}</div>
                <div class="price">₦${product.price}</div>
              </div>
              <div class="quantity">${product.quantity}</div>
              <div class="returnPrice">₦${
                product.price * product.quantity
              }</div>
            `;
        listCartHTML.appendChild(newP);

        totalQuantity = totalQuantity + product.quantity;
        totalPrice = totalPrice + product.price * product.quantity;
      }
      //}
    );
  }
  totalQuantityHTML.innerText = totalQuantity;
  totalPriceHTML.innerText = "₦" + totalPrice.toLocaleString();
}

// myForm.addEventListener("submit", onSubmit);

function onSubmit(e) {
  e.preventDefault(); //remember we are preventing default because of the flashing effect of the  submit button )
  if (
    nameInput.value === "" ||
    emailInput.value === "" ||
    phoneNumInput.value === "" ||
    addressInput.value === "" ||
    cityInput.value === "" ||
    countryInput.value === ""
  ) {
    //we  also want an error message  if our input  field  are not filled  we want both of them to be filled )
    // alert("Please enter fields");
    msg.classList.add("error"); // adding a css style to msg
    msg.innerHTML = "🚨 Please enter  all fields";
  } else {
    msg.classList.remove("error");
    msg.classList.add("Sucess");
    msg.innerHTML = "Checkout Successful";
    //for it to disappear after 3 seconds (3secs=3000)
    setTimeout(() => msg.remove(), 3000);
    //   localStorage.removeItem("cart");
    //   document.cookie =
    //     "listCart=[]; expires=Thu, 31 Dec 2025 23:59:59 UTC; path/=;";
    //   addToCart = [];
    //   addCartToHTML();
    //
  }
}

//Initalise
checkCart();
addCartToHTML();
myForm.addEventListener("submit", onSubmit);
