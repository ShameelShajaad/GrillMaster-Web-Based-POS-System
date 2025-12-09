let menuBtn = document.getElementById("menuBtn");
let menuNav = document.getElementById("mobileMenu");
let menuIcon = document.getElementById("menuIcon");

menuBtn.addEventListener("click", () => {
  let open = menuNav.classList.toggle("hidden") === false;
  menuBtn.setAttribute("aria-expanded", open);

  menuIcon.innerHTML = open
    ? `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
           d="M6 18L18 6M6 6l12 12" />`
    : `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
           d="M4 6h16M4 12h16M4 18h16" />`;
});
