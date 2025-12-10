console.log("placeorder js loaded!");

let tabs = document.querySelectorAll(".category-tab");
let contents = document.querySelectorAll(".menu-content");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((t) => {
      t.classList.remove("text-yellow-400", "border-yellow-400");
      t.classList.add("text-white", "border-transparent");
    });

    tab.classList.add("text-yellow-400", "border-yellow-400");
    tab.classList.remove("text-white", "border-transparent");

    contents.forEach((c) => c.classList.add("hidden"));
    document.getElementById(tab.dataset.tab).classList.remove("hidden");
  });
});

////////////////////////////////////////////////////////////////////////////////////

// CART COUNT

let cartCount = 0;

let cartCountNo = document.querySelectorAll(".cartCount");
let addToCartButtons = document.querySelectorAll(
  ".menu-content button[data-id]"
);

// ADD TO CART CLICK
addToCartButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    cartCount++;
    updateCart(btn);

    // update ALL cart counters (mobile + desktop)
    cartCountNo.forEach((no) => {
      no.textContent = cartCount;
    });

    // ANIMATION
    btn.classList.add("scale-110");
    setTimeout(() => btn.classList.remove("scale-110"), 150);
  });
});

////////////////////////////////////////////////////////////////////////////////////

let cartIcon = document.querySelectorAll(".cartBtn");
let cartPanel = document.getElementById("cartPanel");

cartIcon.forEach((icon) => {
  icon.addEventListener("click", () => {
    cartPanel.classList.toggle("hidden");
  });
});

////////////////////////////////////////////////////////////////////////////////////

let cart = [];

function updateCart(btn) {
  let id = btn.dataset.id;
  let name = btn.dataset.name;
  let price = parseInt(btn.dataset.price);

  console.log(id + " " + name + " " + price);

  let item = {
    id: id,
    name: name,
    price: price,
    quantity: 1,
  };

  let existingItem = cart.find((i) => i.id === item.id);
  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push(item);
  }

  console.log(cart);

  renderCart();
}

function renderCart() {
  cartPanel.innerHTML = `<h2 class="text-xl font-bold mb-4 text-center text-yellow-400">Your Cart</h2>`;

  cart.forEach((item) => {
    let div = document.createElement("div");
    div.className =
      "p-2 border-b border-gray-700 flex justify-between text-white";
    div.innerHTML = `
    <span class="flex items-center font-semibold">${item.name} ('') ${item.quantity}</span>
    <span class="font-bold">LKR ${item.price * item.quantity}</span>
    `;
    cartPanel.appendChild(div);
  });
}
