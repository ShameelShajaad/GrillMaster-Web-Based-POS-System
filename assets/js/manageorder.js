console.log("manageorder js loaded!");

let menuItems = JSON.parse(localStorage.getItem("menuItems")) || [];

document.addEventListener("DOMContentLoaded", () => {
  loadAllItems();
});

////////////////////////////////////////////////////////////////////////////////////

function loadAllItems() {
  let container = document.getElementById("burgers");

  container.innerHTML = "";

  let items = menuItems.filter((item) => item.category);

  items.forEach((item) => {
    let div = document.createElement("div");
    div.className =
      "bg-[#1A2C22] rounded-xl p-4 flex flex-col items-center gap-3 hover:scale-105 transition-transform duration-300";

    div.innerHTML = `
        <div
            class="relative w-full h-70 md:h-80 lg:h-80 rounded-lg overflow-hidden"
          >
            <img
              src="assets/images/${item.img}"
              alt="${item.name}"
              class="w-full h-full object-cover"
            />
          </div>

          <p class="text-white font-semibold text-lg text-center">
            ${item.name}
          </p>
          <p class="text-gray-400 text-sm text-center">LKR ${item.price.toLocaleString()}</p>
          <div class="flex gap-3">
            <button 
              class="edit_btn flex items-center border bg-[#25362D] hover:bg-black transition-all rounded-full border-none px-20 py-2 flex gap-2"
              onclick="editItem('${item.name}', this)"
            >
              <img
                src="assets/svg/pencil-fill.svg"
                alt="pencil_icon"
                class="invert brightness-0 filter w-6 h-6"
              />
              <p class="text-lg">Edit</p>
            </button>
            <button
              class="delete_btn border bg-[#2F2E25] hover:bg-black transition-all rounded-full py-2 px-4 border-none"
              onclick="deleteItem('${item.name}', this)"
            >
              <img
                src="assets/svg/trash.svg"
                alt="trash_icon"
                class="w-6 h-6"
                style="
                  filter: invert(65%) sepia(62%) saturate(7475%)
                    hue-rotate(336deg) brightness(97%) contrast(93%);
                "
              />
            </button>
          </div>
        `;

    container.appendChild(div);
  });
}

////////////////////////////////////////////////////////////////////////////////////

let tabs = document.querySelectorAll(".category-tab");
let contents = document.querySelectorAll(".menu-content");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((tab) => {
      tab.classList.remove("bg-white");
      tab.classList.add("bg-[#36E27B]");
    });

    tab.classList.remove("bg-[#36E27B]");
    tab.classList.add("bg-white");

    if (tab.dataset.tab === "all") {
      loadAllItems();
    } else {
      displayItems(tab.dataset.tab);
    }
  });
});

////////////////////////////////////////////////////////////////////////////////////

function displayItems(category) {
  let burgers = document.getElementById("burgers");
  let fries = document.getElementById("fries");
  let drinks = document.getElementById("drinks");

  burgers.innerHTML = "";
  fries.innerHTML = "";
  drinks.innerHTML = "";

  let container = document.getElementById(category);

  let items = menuItems.filter((item) => item.category === category);

  items.forEach((item) => {
    let div = document.createElement("div");
    div.className =
      "bg-[#1A2C22] rounded-xl p-4 flex flex-col items-center gap-3 hover:scale-105 transition-transform duration-300";

    div.innerHTML = `
        <div
            class="relative w-full h-70 md:h-80 lg:h-80 rounded-lg overflow-hidden"
          >
            <img
              src="assets/images/${item.img}"
              alt="${item.name}"
              class="w-full h-full object-cover"
            />
          </div>

          <p class="text-white font-semibold text-lg text-center">
            ${item.name}
          </p>
          <p class="text-gray-400 text-sm text-center">LKR ${item.price.toLocaleString()}</p>
          <div class="flex gap-3">
            <button 
              class="edit_btn flex items-center border bg-[#25362D] hover:bg-black transition-all rounded-full border-none px-20 py-2 flex gap-2"
              onclick="editItem('${item.name}', this)"
            >
              <img
                src="assets/svg/pencil-fill.svg"
                alt="pencil_icon"
                class="invert brightness-0 filter w-6 h-6"
              />
              <p class="text-lg">Edit</p>
            </button>
            <button
              class="delete_btn border bg-[#2F2E25] hover:bg-black transition-all rounded-full py-2 px-4 border-none"
              onclick="deleteItem('${item.name}', this)"
            >
              <img
                src="assets/svg/trash.svg"
                alt="trash_icon"
                class="w-6 h-6"
                style="
                  filter: invert(65%) sepia(62%) saturate(7475%)
                    hue-rotate(336deg) brightness(97%) contrast(93%);
                "
              />
            </button>
          </div>
        `;

    container.appendChild(div);
  });
}

////////////////////////////////////////////////////////////////////////////////////

function deleteItem(itemName, btn) {
  if (confirm("Are you sure you want to delete " + itemName + " ?")) {
    menuItems = menuItems.filter((item) => item.name !== itemName);

    localStorage.setItem("menuItems", JSON.stringify(menuItems));

    console.log("Deleted " + itemName);

    loadAllItems();
  }
}

////////////////////////////////////////////////////////////////////////////////////

function editItem(itemName, btn) {
  let container = document.getElementById("editItemPopup");
  container.innerHTML = "";

  let div = document.createElement("div");
  div.className = "bg-black text-black p-6 rounded-lg w-100 text-white";

  div.innerHTML = `
    <h2 class="text-xl font-bold mb-4 text-center">Edit Item</h2>

    <input
      id="itemName"
      type="text"
      placeholder="Item Name"
      class="w-full border p-2 mb-2 border-white focus:outline-none"
    />
    <input
      id="itemPrice"
      type="text"
      placeholder="Item Price"
      class="w-full border p-2 mb-4 border-white focus:outline-none"
    />

    <button
      id="saveCustomer"
      class="bg-[#36E27B] text-black font-semibold w-full py-2 rounded"
    >
      Edit
    </button>
    `;

  container.appendChild(div);
  container.style.display = "flex";

  
}

////////////////////////////////////////////////////////////////////////////////////
