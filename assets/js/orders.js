console.log("orders js loaded!");

let completedOrders = JSON.parse(localStorage.getItem("completedOrders")) || [];

console.log(completedOrders);

////////////////////////////////////////////////////////////////////////////////////

document.addEventListener("DOMContentLoaded", () => {
  loadAllOrders();
});

////////////////////////////////////////////////////////////////////////////////////

function loadAllOrders() {
  let container = document.getElementById("order_section");
  container.innerHTML = "";

  completedOrders.forEach((order) => {

    let itemHtml
    order.forEach((item)=>{
        itemHtml+=`<p class="text-white/80 text-sm">${item.name} x${item.quantity} - LKR ${(item.price*item.quantity).toLocaleString()}</p>`
    })

    let toa

    let div = document.createElement("div");
    div.className =
      "bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col gap-3 hover:border-white/20 hover:bg-white/10 transition-all";

    div.innerHTML = `
    <div class="flex justify-between items-center">
        <h2 class="font-bold text-lg">Order #</h2>
        <span class="text-sm text-white/60">Completed</span>
    </div>

    <div class="flex flex-col gap-1">
        <p class="text-white/80 text-sm">Classic Beef Burger x2 - LKR 2400</p>
        <p class="text-white/80 text-sm">Curly Fries x1 - LKR 500</p>
        <p class="text-white/80 text-sm">Cola Drink x2 - LKR 600</p>
    </div>

    <div class="flex justify-between items-center mt-2">
      <span class="font-semibold text-white">Total:</span>
      <span class="font-bold text-[#FFCC00]">LKR 3500</span>
    </div>

    <button
      class="bg-[#f1222d] text-white font-bold py-2 rounded-lg hover:scale-105 active:scale-95 transition-transform mt-2"
    >
        View Details
    </button>
    `;
  });

  container.appendChild(div);
}

////////////////////////////////////////////////////////////////////////////////////
