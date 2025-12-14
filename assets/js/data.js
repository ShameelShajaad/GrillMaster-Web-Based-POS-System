console.log("data js loaded!");

if (!localStorage.getItem("menuItems")) {
  const defaultMenu = [
    {
      id: 1,
      name: "Classic Beef Burger",
      price: 1200,
      category: "burgers",
      img: "Classic_Beef_Burger.png",
    },
    {
      id: 2,
      name: "Double Cheese Burger",
      price: 1350,
      category: "burgers",
      img: "Double_Cheese_Burger.png",
    },
    {
      id: 3,
      name: "Chicken Crispy Burger",
      price: 1100,
      category: "burgers",
      img: "Chicken_Crispy_Burger.png",
    },
    {
      id: 4,
      name: "French Fries",
      price: 450,
      category: "fries",
      img: "Classic_French_Fries.png",
    },
    {
      id: 5,
      name: "Curly Fries",
      price: 500,
      category: "fries",
      img: "Curly_Fries.png",
    },
    {
      id: 6,
      name: "Cheese Fries",
      price: 600,
      category: "fries",
      img: "Cheese_Fries.png",
    },
    {
      id: 7,
      name: "Cola Drink",
      price: 600,
      category: "drinks",
      img: "Cola_Drink.png",
    },
    {
      id: 8,
      name: "Orange Juice",
      price: 300,
      category: "drinks",
      img: "Orange_Juice.png",
    },
    {
      id: 9,
      name: "Chocolate Milkshake",
      price: 500,
      category: "drinks",
      img: "Chocolate_Milkshake.png",
    },
  ];

  localStorage.setItem("menuItems", JSON.stringify(defaultMenu));
}
