if (!localStorage.getItem("menuItems")) {
  const defaultMenu = [
    {
      id: 1,
      name: "Classic Beef Burger",
      price: 1200,
      category: "burger",
      img: "Classic_Beef_Burger.png",
    },
    {
      id: 2,
      name: "Chicken Crispy Burger",
      price: 1100,
      category: "burger",
      img: "Chicken_Crispy_Burger.png",
    },
    {
      id: 3,
      name: "French Fries",
      price: 450,
      category: "fries",
      img: "Classic_French_Fries.png",
    },
  ];

  localStorage.setItem("menuItems", JSON.stringify(defaultMenu));
}
