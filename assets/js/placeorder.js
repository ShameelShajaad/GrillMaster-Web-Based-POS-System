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
    updateCart(btn);
    updateCartCount();

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

////////////////////////////////////////////////////////////////////////////////////

cartItems = document.getElementById("cartItems");

function renderCart() {
  cartItems.innerHTML = "";
  cart.forEach((item, index) => {
    let cartItem = document.createElement("div");
    cartItem.className =
      "p-2 border-b border-gray-700 flex justify-between items-center";

    cartItem.innerHTML = `
      <span class="flex-1 font-semibold truncate text-[12px] md:text-[18px] lg:text-xl">${
        item.name
      }</span>
        <div class="flex items-center gap-2 w-20 justify-center">
          <button class="w-4 h-4 md:w-6 md:h-6 lg:w-6 lg:h-6 items-center justify-center" data-id="${
            item.id
          }" data-action="decrease">
            <img src="assets/svg/dash-circle.svg" alt="minus" class="w-full h-full filter brightness-0 invert text-[12px] md:text-xl lg:text-xl"/>
          </button>
          <span class="text-center">${item.quantity}</span>
            <button class="w-4 h-4 md:w-6 md:h-6 lg:w-6 lg:h-6  items-center justify-center" data-id="${
              item.id
            }" data-action="increase">
              <img src="assets/svg/plus-circle.svg" alt="plus" class="w-full h-full filter brightness-0 invert"/>
            </button>
        </div>
      <span class="font-semibold w-24 text-right pr-2 text-[15px] md:text-[16px] lg:text-[16px]">LKR ${(
        item.price * item.quantity
      ).toLocaleString()}</span>
      <button class="w-4 h-4 md:w-6 md:h-6 lg:w-6 lg:h-6" data-id="${
        item.id
      }" data-action="delete">
        <img src="assets/svg/trash.svg" alt="minus" class="w-full h-full filter brightness-0 invert" style="filter: invert(65%) sepia(62%) saturate(7475%) hue-rotate(336deg) brightness(97%) contrast(93%); "/>
      </button>
      `;
    cartItems.appendChild(cartItem);
  });

  cartPanel.querySelectorAll("button[data-action]").forEach((btn) => {
    btn.addEventListener("click", () => {
      let id = btn.dataset.id;
      let action = btn.dataset.action;
      let itemIndex = cart.findIndex((i) => i.id === id);

      if (action === "increase") {
        cart[itemIndex].quantity++;
      } else if (action === "decrease") {
        if (cart[itemIndex].quantity > 1) {
          cart[itemIndex].quantity--;
        } else {
          cart.splice(itemIndex, 1);
        }
      } else if (action === "delete") {
        cart.splice(itemIndex, 1);
      }

      renderCart();
      updateCartCount();
    });
  });
}

function updateCartCount() {
  let totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  document
    .querySelectorAll(".cartCount")
    .forEach((no) => (no.textContent = totalCount));
}

document.addEventListener("click", (e) => {
  if (cartPanel.contains(e.target) || e.target.closest(".cartBtn")) {
    return;
  }

  cartPanel.classList.add("hidden");
});

cartPanel.addEventListener("click", (e) => {
  e.stopPropagation();
});

////////////////////////////////////////////////////////////////////////////////////

// let downloadPdfBtn = document.getElementById("downloadPdfBtn");
let completeOrderBtn = document.getElementById("completeOrderBtn");

// downloadPdfBtn.addEventListener("click", () => {
//   if (cart.length === 0) {
//     alert("Cart is empty");
//   }
// });

completeOrderBtn.addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Cart is empty");
  } else {
    orderCompleted();
    renderCart();
    updateCartCount();
    alert("Order Completed");
    cartPanel.classList.add("hidden");
  }
});

////////////////////////////////////////////////////////////////////////////////////

let cusName;
let cusPhone;
let popup;

document.addEventListener("DOMContentLoaded", () => {
  popup = document.getElementById("customerPopup");
  let saveBtn = document.getElementById("saveCustomer");

  popup.style.display = "flex";

  saveBtn.onclick = () => {
    cusName = document.getElementById("custName").value;
    cusPhone = document.getElementById("custPhone").value;

    if (!cusName || !cusPhone) {
      alert("Please enter customer details!");
      return;
    }
    popup.style.display = "none";
  };
});

////////////////////////////////////////////////////////////////////////////////////

let completedOrders = JSON.parse(localStorage.getItem("completedOrders")) || [];

function orderCompleted() {
  let order = {
    customerName: cusName,
    customerPhone: cusPhone,
    items: [...cart],
    date: new Date().toLocaleDateString(),
  };
  console.log(order);

  completedOrders.push(order);

  localStorage.setItem("completedOrders", JSON.stringify(completedOrders));

  cart.length = 0;
  cusName = "";
  cusPhone = "";
  popup.style.display = "flex";
  document.getElementById("custName").value = "";
  document.getElementById("custPhone").value = "";
}
