console.log("manageorder js loaded!");

////////////////////////////////////////////////////////////////////////////////////

let menuItems = JSON.parse(localStorage.getItem("menuItems")) || [];

////////////////////////////////////////////////////////////////////////////////////

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

let tempItemName;
let editItemContainer;

function editItem(ItemName, btn) {
  tempItemName = ItemName;

  let container = document.getElementById("editItemPopup");
  container.innerHTML = "";
  editItemContainer = container;

  let div = document.createElement("div");
  div.className =
    "bg-[#112117] border border-white/10 rounded-xl w-[90%] max-w-md p-6";

  div.innerHTML = `
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-xl font-bold text-white">Add a New Item</h2>
      <button class="" onclick="closeEditItem">
        <img
          src="assets/svg/x.svg"
          alt="x_icon"
          class="invert brightness-0 filter w-6 h-6"
        />
      </button>
    </div>

    <div class="space-y-4">
      <div>
        <label class="block text-sm text-white/70 mb-1">Item Name</label>
        <input
          id="itemName"
          type="text"
          placeholder="e.g. Cheese Burger"
          class="w-full bg-transparent border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#36E27B]"
        />
      </div>
      <div>
        <label class="block text-sm text-white/70 mb-1">Price (LKR)</label>
        <input
          id="itemPrice"
          type="number"
          placeholder="e.g. 1200"
          class="w-full bg-transparent border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#36E27B]"
        />
      </div>
    `;

  container.appendChild(div);
  container.style.display = "flex";

  let itemName = document.getElementById("itemName");
  let itemPrice = document.getElementById("itemPrice");

  menuItems.forEach((menuItem) => {
    if (menuItem.name === ItemName) {
      itemName.value = ItemName;
      itemPrice.value = menuItem.price;
    }
  });

  container.addEventListener("click", (e) => {
    if (e.target === container) {
      container.style.display = "none";
    }
  });
}

function closeEditItem() {
  editItemContainer.style.display = "none";
}

function editBtn() {
  let itemName = document.getElementById("itemName");
  let itemPrice = document.getElementById("itemPrice");

  let name = itemName.value;
  let price = itemPrice.value;

  if (!name || !price) {
    alert("Item Name or Item Price field is empty");
    return;
  } else if (/\d/.test(name)) {
    alert("Item Name could not contain a number");
  } else if (/[a-zA-Z]/.test(price) || /[^0-9.+-]/.test(price)) {
    alert("Item Price should contain only numbers");
  } else {
    menuItems.forEach((menuItem) => {
      if (menuItem.name === tempItemName) {
        menuItem.name = itemName.value;
        menuItem.price = parseInt(itemPrice.value);
      }
    });

    localStorage.setItem("menuItems", JSON.stringify(menuItems));
    loadAllItems();

    document.getElementById("editItemPopup").style.display = "none";

    alert("Item has been successfully edited");
  }
}

////////////////////////////////////////////////////////////////////////////////////

let addNewItemContainer;
let addNewItemCategory;

function addNewItem() {
  let container = document.getElementById("addItemPopup");
  container.innerHTML = "";
  addNewItemContainer = container;

  let div = document.createElement("div");
  div.className =
    "bg-[#112117] border border-white/10 rounded-xl w-[90%] max-w-md p-6";

  div.innerHTML = `
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-xl font-bold text-white">Add a New Item</h2>
      <button class="" onclick="closeAddNewItem()">
        <img
          src="assets/svg/x.svg"
          alt="x_icon"
          class="invert brightness-0 filter w-6 h-6"
        />
      </button>
      </div>

        <div class="space-y-4">
          <div>
            <label class="block text-sm text-white/70 mb-1">Item Name</label>
            <input
              id="itemName"
              type="text"
              placeholder="e.g. Cheese Burger"
              class="w-full bg-transparent border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#36E27B]"
            />
          </div>
          <div>
            <label class="block text-sm text-white/70 mb-1">Price (LKR)</label>
            <input
              id="itemPrice"
              type="number"
              placeholder="e.g. 1200"
              class="w-full bg-transparent border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#36E27B]"
            />
          </div>

          <div>
            <label class="block text-sm text-white/70 mb-1">Category</label>
            <div class="flex gap-2">
              <button
                class="category-btn flex-1 border border-white/20 rounded-lg py-2 hover:bg-[#36E27B] hover:text-black transition"
                data-cat="burgers"
              >
                Burgers
              </button>
              <button
                class="category-btn flex-1 border border-white/20 rounded-lg py-2 hover:bg-[#36E27B] hover:text-black transition"
                data-cat="fries"
              >
                Fries
              </button>
              <button
                class="category-btn flex-1 border border-white/20 rounded-lg py-2 hover:bg-[#36E27B] hover:text-black transition"
                data-cat="drinks"
              >
                Drinks
              </button>
            </div>
          </div>
        </div>

        <div class="flex gap-3 mt-6">
          <button
            onclick="closeAddNewItem()"
            class="flex-1 border border-white/20 text-white rounded-lg py-2 hover:bg-white/10 transition"
          >
            Cancel
          </button>
          <button
            onclick="addItemBtn()"
            class="flex-1 bg-[#36E27B] text-black font-bold rounded-lg py-2 hover:bg-white transition"
          >
            Add Item
          </button>
        </div>
        `;

  container.appendChild(div);
  container.style.display = "flex";

  container.addEventListener("click", (e) => {
    if (e.target === container) {
      container.style.display = "none";
    }
  });

  let categoryBtns = document.querySelectorAll(".category-btn");

  categoryBtns.forEach((categoryBtn) => {
    categoryBtn.addEventListener("click", () => {
      categoryBtns.forEach((btn) => {
        btn.classList.remove("bg-[#36E27B]", "text-black");
        btn.classList.add("text-white", "bg-transparent");
      });

      categoryBtn.classList.remove("text-white", "bg-transparent");
      categoryBtn.classList.add("bg-[#36E27B]", "text-black");

      addNewItemCategory = categoryBtn.dataset.cat;
    });
  });
}

function closeAddNewItem() {
  addNewItemContainer.style.display = "none";
}

function addItemBtn() {
  let itemName = document.getElementById("itemName").value.trim();
  let itemPrice = document.getElementById("itemPrice").value.trim();

  if (!itemName || !itemPrice || !addNewItemCategory) {
    alert("Please fill all teh details");
    return;
  }

  menuItems.forEach((menuItem) => {
    if (menuItem.name.toLowerCase() === itemName.toLowerCase()) {
      alert("Item Name already exist");
      return;
    }
  });

  if (isNaN(itemPrice) || itemPrice < 0) {
    alert("Price can't be a negative value");
    return;
  }

  if (/\d/.test(itemName)) {
    alert("Item Name cannot contain numbers");
    return;
  }

  let answer = confirm("Are you sure you want to add this item ?");

  if (answer) {
    let nextId = menuItems.length
      ? Math.max(...menuItems.map((item) => item.id)) + 1
      : 1;

    let item = {
      id: nextId,
      name: itemName,
      price: parseInt(itemPrice),
      category: addNewItemCategory,
      img:
        addNewItemCategory === "burgers"
          ? "Default_Burger.png"
          : addNewItemCategory === "fries"
          ? "Default_Fries.png"
          : "Default_Drink.png",
    };

    menuItems.push(item);

    localStorage.setItem("menuItems", JSON.stringify(menuItems));

    alert("Item added Successfully");
    loadAllItems();
  } else {
    alert("Item Cancelled");
  }

  addNewItemContainer.style.display = "none";
}

////////////////////////////////////////////////////////////////////////////////////

let serachBar = document.getElementById("serachBar");

serachBar.addEventListener("input", () => {
  let result = serachBar.value.toLowerCase();
  filterMenuItems(result);
});

function filterMenuItems(result) {
  let categories = ["burgers", "fries", "drinks"];

  categories.forEach((category) => {
    let container = document.getElementById(category);
    container.innerHTML = "";

    let items = menuItems.filter(
      (item) =>
        item.category === category && item.name.toLowerCase().includes(result)
    );

    items.forEach((item) => {
      let div = document.createElement("div");
      div.className =
        "bg-[#2C2C2C] rounded-xl p-4 flex flex-col items-center gap-3 hover:scale-105 transition-transform duration-300";

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
  });
}

////////////////////////////////////////////////////////////////////////////////////
