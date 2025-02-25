const XLSX = require("xlsx");
const fs = require("fs");

function saveOrdersToExcel(orders) {
  const worksheet = XLSX.utils.json_to_sheet(orders);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Orders");
  XLSX.writeFile(workbook, "orders.xlsx");
}

function getOrdersFromLocalStorage() {
  const orders = JSON.parse(localStorage.getItem("orders")) || [];
  return orders;
}

function saveLocalStorageToExcel() {
  const orders = getOrdersFromLocalStorage();
  saveOrdersToExcel(orders);
}

// Llama a esta función cada vez que quieras guardar las órdenes en un archivo Excel
saveLocalStorageToExcel();


