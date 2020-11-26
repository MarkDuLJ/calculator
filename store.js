if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

function ready() {
  let rmBtns = document.querySelectorAll(".btn-danger");

  for (let i = 0; i < rmBtns.length; i++) {
    let rmBtn = rmBtns[i];
    rmBtn.addEventListener("click", removeCardItem);
  }

  let quantityInputs = document.querySelectorAll(".cart-quantity-input");

  for (let i = 0; i < quantityInputs.length; i++) {
    let quantity = quantityInputs[i];
    quantity.addEventListener("change", quantityChanged);
  }

  let addToCartBtns = document.querySelectorAll(".shop-item-button");
  for (let i = 0; i < addToCartBtns.length; i++) {
    let addToCartBtn = addToCartBtns[i];
    addToCartBtn.addEventListener("click", addToCart);
  }

  let purchaseBtn = document.querySelector(".btn-purchase");
  purchaseBtn.addEventListener("click", purchaseClicked);
}

const purchaseClicked = () => {
  console.log("thanks for your purchase");

  // let cartItems= document.getElementsByClassName("cart-items")[0]
  let cartItems = document.querySelectorAll(".cart-items");
  cartItems.forEach((n) => n.remove());
  document.querySelector(".cart-total-price").innerText = "$0";
};

const quantityChanged = (e) => {
  let input = e.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updateCardTotal();
};

const removeCardItem = (e) => {
  e.preventDefault();
  e.target.closest(".cart-row").remove();
  updateCardTotal();
};

const addToCart = (e) => {
  let btn = e.target;
  let shopItem = btn.closest(".shop-item");
  let title = shopItem.querySelector(".shop-item-title").innerText;
  let price = shopItem.querySelector(".shop-item-price").innerText;
  let imgSrc = shopItem.querySelector(".shop-item-image").src;
  addItemToCart(title, price, imgSrc);
  updateCardTotal();
};

const addItemToCart = (title, price, imgSrc) => {
  let cartRow = document.createElement("div");
  cartRow.classList = "cart-row";
  let cartItems = document.getElementsByClassName("cart-items")[0];
  let cartItemNames = cartItems.querySelectorAll(".cart-item-title");
  for (let i = 0; i < cartItemNames.length; i++) {
    if (cartItemNames[i].innerText === title) {
      alert("this item is already added to the cart");
      return;
    }
  }
  let cartRowContents = `
      <div class="cart-item cart-column">
        <img
        class="cart-item-image"
        src=${imgSrc}
        width="100"
        height="100"
        />
      <span class="cart-item-title">${title}</span>
      </div>
      <span class="cart-price cart-column">${price}</span>
      <div class="cart-quantity cart-column">
        <input class="cart-quantity-input" type="number" value="1" />
        <button class="btn btn-danger" type="button">REMOVE</button>
      </div>
  `;
  cartRow.innerHTML = cartRowContents;
  cartItems.append(cartRow);
  cartRow
    .getElementsByClassName("btn-danger")[0]
    .addEventListener("click", removeCardItem);
  cartRow
    .getElementsByClassName("cart-quantity-input")[0]
    .addEventListener("change", quantityChanged);
};

const updateCardTotal = () => {
  let container = document.getElementsByClassName("cart-items")[0];
  let cartRows = container.getElementsByClassName("cart-row");
  let totalPrice = document.querySelector(".cart-total-price");

  let total = 0;
  for (let i = 0; i < cartRows.length; i++) {
    let cartRow = cartRows[i];
    let priceElement = cartRow.getElementsByClassName("cart-price")[0];
    let quantityElement = cartRow.getElementsByClassName(
      "cart-quantity-input"
    )[0];

    let price = parseFloat(priceElement.innerHTML.replace("$", ""));
    let quantity = quantityElement.value;

    total += price * quantity;
  }

  totalPrice.innerText = "$" + Math.round(total * 100) / 100;
};
