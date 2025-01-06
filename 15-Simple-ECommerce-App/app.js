let cart = [];

const addToCartBtns = document.querySelectorAll(".add-to-cart");
const cartButton = document.getElementById("view-cart");
const cartPopup = document.getElementById("cart-popup");
const checkoutButton = document.getElementById("checkout-btn");
const cartItemsContainer = document.querySelector(".cart-items");

addToCartBtns.forEach((button) => {
  button.addEventListener("click", (e) => {
    const productElement = e.target.closest(".product");
    const productId = productElement.dataset.id;
    const productName = productElement.querySelector("h3").innerText;
    const productPrice = parseFloat(
      productElement.querySelector("p").innerText.replace("$", "")
    );

    const existingProduct = cart.find((item) => item.id === productId);
    if (existingProduct) {
      existingProduct.quantity++;
    } else {
      cart.push({
        id: productId,
        name: productName,
        price: productPrice,
        quantity: 1,
      });
    }

    updateCart();
  });
});

cartButton.addEventListener("click", () => {
  cartPopup.style.display = "block";
  displayCartItems();
});

checkoutButton.addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  let totalAmount = 0;
  cart.forEach((item) => {
    totalAmount += item.price * item.quantity;
  });

  alert(
    `Your total amount is $${totalAmount.toFixed(2)}. Proceeding to checkout.`
  );
  cart = []; // Clear cart after checkout
  updateCart();
  cartPopup.style.display = "none";
});

function displayCartItems() {
  cartItemsContainer.innerHTML = "";
  cart.forEach((item) => {
    const itemElement = document.createElement("div");
    itemElement.classList.add("cart-item");
    itemElement.innerHTML = `
            <p>${item.name} - $${item.price} x ${item.quantity}</p>
            <button class="remove-from-cart" data-id="${item.id}">Remove</button>
        `;
    cartItemsContainer.appendChild(itemElement);
  });

  const removeFromCartBtns = document.querySelectorAll(".remove-from-cart");
  removeFromCartBtns.forEach((button) => {
    button.addEventListener("click", (e) => {
      const productId = e.target.dataset.id;
      cart = cart.filter((item) => item.id !== productId);
      updateCart();
      displayCartItems();
    });
  });
}

function updateCart() {
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  cartButton.innerText = `View Cart (${cartCount})`;
}
