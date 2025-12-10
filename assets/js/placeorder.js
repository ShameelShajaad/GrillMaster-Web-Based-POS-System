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

// CART COUNT

let cartCount = 0;

let cartCountNo = document.querySelectorAll("#cartCount");
let addToCartButtons = document.querySelectorAll(".menu-content button");

// ADD TO CART CLICK
addToCartButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    cartCount++;

    // update ALL cart counters (mobile + desktop)
    cartCountNo.forEach((no) => {
      no.textContent = cartCount;
    });

    // ANIMATION
    btn.classList.add("scale-110");
    setTimeout(() => btn.classList.remove("scale-110"), 150);
  });
});
