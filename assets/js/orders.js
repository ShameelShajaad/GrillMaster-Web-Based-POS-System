console.log("orders js loaded!");

let completedOrders = JSON.parse(localStorage.getItem("completedOrders")) || [];

console.log(completedOrders);
