let iconCart = document.querySelector(".icon-cart");
let closeCart = document.querySelector(".close");
let body = document.querySelector("body");
let listProductHTML = document.querySelector(".listproduct");
let listCartHTML = document.querySelector(".listCart");
let iconCartSpan = document.querySelector(".icon-cart span");
let searchInput = document.querySelector(".search-box");
let del = document.querySelector(".remove");
let listProducts = [];
let carts = [];

iconCart.addEventListener("click", () => {
  body.classList.toggle("showCart");
});
closeCart.addEventListener("click", () => {
  body.classList.toggle("showCart");
});

const addDataToHTML = () => {
  listProductHTML.innerHTML = "";
  if (listProducts.length > 0) {
    listProducts.map((product) => {
      let newProduct = document.createElement("div");
      newProduct.classList.add("item");
      newProduct.dataset.id = product.id;
      newProduct.innerHTML = `
        <img src="${product.image}" alt="">
        <h2>${product.name}</h2>
        <div class="price">₦${product.price}</div>    
        <div class="size">
          <label for="">Size</label>
          <select name="size">
            <option value="">choose...</option>
            <option value="S">S</option>
            <option value="L">L</option>
            <option value="xL">xL</option>
            <option value="xxL">xxL</option>
          </select>
        </div>
        <button class="addtocart">Add to Cart</button>
      `;
      listProductHTML.appendChild(newProduct);
    });
  }
};

listProductHTML.addEventListener("click", (event) => {
  if (event.target.classList.contains("addtocart")) {
    let product_id = event.target.closest(".item").dataset.id;
    addToCart(product_id);
  }
});

const addToCart = (product_id) => {
  let position = carts.findIndex((item) => item.product_id === product_id);

  if (position < 0) {
    carts.push({ product_id, quantity: 1 });
  } else {
    carts[position].quantity += 1;
  }

  saveCartToLocalStorage();
  saveCartToCookie(); // optional
  addCartToHTML();
};

const addCartToHTML = () => {
  listCartHTML.innerHTML = "";
  let totalQuantity = 0;

  carts.forEach((cart) => {
    let product = listProducts.find((p) => p.id == cart.product_id);
    if (product) {
      totalQuantity += cart.quantity;

      let newCart = document.createElement("div");
      newCart.classList.add("item");
      newCart.dataset.id = cart.product_id;
      newCart.innerHTML = `
        <div class="image">
          <img src="${product.image}" alt="">
        </div>
        <div class="name">${product.name}</div>
        <div class="totalPrice">₦${product.price}</div>
        <div class="quantity">
          <span class="minus">-</span>
          <span>${cart.quantity}</span>
          <span class="plus">+</span>
        </div>
        <div class="remove">X</div>
      `;
      listCartHTML.appendChild(newCart);
    }
  });

  iconCartSpan.innerText = totalQuantity;
};

listCartHTML.addEventListener("click", (event) => {
  let target = event.target;
  let itemElement = target.closest(".item");

  if (!itemElement) return;

  let product_id = itemElement.dataset.id;

  if (target.classList.contains("plus")) {
    changeQuantity(product_id, "plus");
  } else if (target.classList.contains("minus")) {
    changeQuantity(product_id, "minus");
  } else if (target.classList.contains("remove")) {
    removeFromCart(product_id);
  }
});

const changeQuantity = (product_id, type) => {
  let index = carts.findIndex((item) => item.product_id === product_id);
  if (index >= 0) {
    if (type === "plus") {
      carts[index].quantity += 1;
    } else {
      carts[index].quantity -= 1;
      if (carts[index].quantity <= 0) {
        carts.splice(index, 1);
      }
    }

    saveCartToLocalStorage();
    // saveCartToCookie(); // optional
    addCartToHTML();
  }
};

const removeFromCart = (product_id) => {
  carts = carts.filter((item) => item.product_id !== product_id);
  saveCartToLocalStorage();
  // saveCartToCookie(); // optional
  addCartToHTML();
};

const saveCartToLocalStorage = () => {
  localStorage.setItem("cart", JSON.stringify(carts));
};

// const saveCartToCookie = () => {
//   document.cookie = `addToCart=${encodeURIComponent(
//     JSON.stringify(carts)
//   )}; expires=Thu, 31 Dec 2025 23:59:59 UTC; path=/;`;
// };

const initApp = () => {
  fetch("products.json")
    .then((response) => response.json())
    .then((data) => {
      listProducts = data;
      addDataToHTML();

      if (localStorage.getItem("cart")) {
        carts = JSON.parse(localStorage.getItem("cart"));
        addCartToHTML();
      }
    });
};

initApp();
