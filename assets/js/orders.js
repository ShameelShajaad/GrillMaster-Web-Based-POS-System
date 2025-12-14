console.log("orders js loaded!");

let completedOrders = JSON.parse(localStorage.getItem("completedOrders")) || [];

console.log(completedOrders);

////////////////////////////////////////////////////////////////////////////////////

document.addEventListener("DOMContentLoaded", () => {
  loadAllOrders();
});

////////////////////////////////////////////////////////////////////////////////////

let orderID = 0;

function loadAllOrders() {
  let totalSales = document.getElementById("totalSales");
  let totalOrders = document.getElementById("totalOrders");

  let sales = 0;
  let orders = 0;

  completedOrders.forEach((order) => {
    orders++;
    sales += order.total;
  });

  totalSales.innerHTML = "LKR " + sales.toLocaleString();
  totalOrders.innerHTML = orders;

  ////////////////////////////////////////////////////////////////////////////////////
  let container = document.getElementById("order_section");
  container.innerHTML = "";

  completedOrders.forEach((order, index) => {
    orderID = orderID + 1;

    let itemHtml = "";
    maxItemsToShow = 2;

    order.items.slice(0, maxItemsToShow).forEach((item) => {
      itemHtml += `<p class="text-white/80 text-sm">${item.name} x${
        item.quantity
      } - LKR ${(item.price * item.quantity).toLocaleString()}</p>`;
    });

    if (order.items.length < maxItemsToShow) {
      let placeholdersNeeded = maxItemsToShow - order.items.length;
      for (let i = 0; i < placeholdersNeeded; i++) {
        itemHtml += `<p class="text-white/80 text-sm invisible">Placeholder</p>`;
      }
    }

    let remainingCount = order.items.length - maxItemsToShow;
    if (remainingCount > 0) {
      itemHtml += `<p class="text-white/80 text-sm">+${remainingCount} more items</p>`;
    }

    let div = document.createElement("div");
    div.className =
      "bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col gap-3 hover:border-white/20 hover:bg-white/10 transition-all";

    div.innerHTML = `
    <div class="flex justify-between items-center">
        <h2 class="font-bold text-lg">Order #${orderID}</h2>
        <span class="text-sm text-white/60">Completed</span>
    </div>

    <div class="flex flex-col gap-1">
        ${itemHtml}
    </div>

    <div class="flex justify-between items-center mt-2">
      <span class="font-semibold text-white">Total:</span>
      <span class="font-bold text-[#FFCC00]">LKR ${order.total.toLocaleString()}</span>
    </div>

    <button
      class="bg-[#f1222d] text-white font-bold py-2 rounded-lg hover:scale-105 active:scale-95 transition-transform mt-2"
        data-index="${index}"
        onclick="viewOrderDetails(this)"
    >
        View Details
    </button>
    `;

    container.appendChild(div);
  });
}

////////////////////////////////////////////////////////////////////////////////////

let popup = document.getElementById("orderPopup");
let closePopupBtn = document.getElementById("closeOrderPopup");

let popupOrderTitle = document.getElementById("popupOrderTitle");
let popupCustomer = document.getElementById("popupCustomer");
let popupDate = document.getElementById("popupDate");
let popupItems = document.getElementById("popupItems");
let popupTotal = document.getElementById("popupTotal");

function viewOrderDetails(button) {
  let orderIndex = button.dataset.index;
  let order = completedOrders[orderIndex];

  orderIndex++;
  popup.style.display = "flex";

  popupOrderTitle.innerHTML = "#" + orderIndex;
  popupCustomer.innerHTML = order.customerName;
  popupDate.innerHTML = order.date;
  popupTotal.innerHTML = "LKR " + order.total.toLocaleString();

  popupItems.innerHTML = "";

  order.items.forEach((item) => {
    let p = document.createElement("p");
    p.className = "text-white/80 text-sm";
    p.innerHTML = `${item.name} x ${item.quantity} - LKR ${(
      item.price * item.quantity
    ).toLocaleString()}`;

    popupItems.appendChild(p);
  });
}

popup.addEventListener("click", (e) => {
  if (e.target === popup) {
    popup.style.display = "none";
  }
});

closePopupBtn.addEventListener("click", () => {
  popup.style.display = "none";
});

////////////////////////////////////////////////////////////////////////////////////

let serachBar = document.getElementById("serachBar");

serachBar.addEventListener("input", () => {
  let serachResult = serachBar.value.trim();
  filterOrderDetails(serachResult);
});

function filterOrderDetails(serachResult) {
  let container = document.getElementById("order_section");
  container.innerHTML = "";

  let filteredOrders = completedOrders.filter((order) =>
    order.customerName.toLowerCase().includes(serachResult.toLowerCase())
  );

  filteredOrders.forEach((order, index) => {
    let itemHtml = "";
    let maxItemsToShow = 2;

    order.items.slice(0, maxItemsToShow).forEach((item) => {
      itemHtml += `<p class="text-white/80 text-sm">${item.name} x${
        item.quantity
      } - LKR ${(item.price * item.quantity).toLocaleString()}</p>`;
    });

    if (order.items.length < maxItemsToShow) {
      let placeholdersNeeded = maxItemsToShow - order.items.length;
      for (let i = 0; i < placeholdersNeeded; i++) {
        itemHtml += `<p class="text-white/80 text-sm invisible">Placeholder</p>`;
      }
    }

    let remainingCount = order.items.length - maxItemsToShow;
    if (remainingCount > 0) {
      itemHtml += `<p class="text-white/80 text-sm">+${remainingCount} more items</p>`;
    }

    let div = document.createElement("div");
    div.className =
      "bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col gap-3 hover:border-white/20 hover:bg-white/10 transition-all";

    div.innerHTML = `
    <div class="flex justify-between items-center">
        <h2 class="font-bold text-lg">Order #${order.orderID}</h2>
        <span class="text-sm text-white/60">Completed</span>
    </div>

    <div class="flex flex-col gap-1">
        ${itemHtml}
    </div>

    <div class="flex justify-between items-center mt-2">
      <span class="font-semibold text-white">Total:</span>
      <span class="font-bold text-[#FFCC00]">LKR ${order.total.toLocaleString()}</span>
    </div>

    <button
      class="bg-[#f1222d] text-white font-bold py-2 rounded-lg hover:scale-105 active:scale-95 transition-transform mt-2"
        data-index="${index}"
        onclick="viewOrderDetails(this)"
    >
        View Details
    </button>
    `;

    container.appendChild(div);
  });
}