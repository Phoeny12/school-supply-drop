// ELEMENT REFERENCES
const itemBoxes = document.querySelectorAll(".item-box");
const checkoutPriceBox = document.getElementById("checkout-price");
const checkoutBtn = document.getElementById("checkout-btn");

// GLOBAL VARIABLES
let checkoutCost = 0;
let orderNumber = 1;
let profit = 0;

// ITEM PRICES
const prices = {
  mechanicalPencils: 1,
  pencils: 1,
  pencilSharpener: 1,
  eraser: 1,
  pens: 1,
  sharpie: 1,
  highlighters: 1,
  postItNotes: 1,
  gum: 2,
  notebook: 2,
};

// ITEM COUNT
const itemAmount = {
  mechanicalPencils: 2,
  pencils: 4,
  pencilSharpener: 1,
  eraser: 2,
  pens: 2,
  sharpie: 2,
  highlighters: 2,
  postItNotes: 1,
  gum: 1,
  notebook: 1,
};

// TOTAL BOUGHT TRACKER
let totalBoughtItems = {
  mechanicalPencils: 0,
  pencils: 0,
  pencilSharpener: 0,
  eraser: 0,
  pens: 0,
  sharpie: 0,
  highlighters: 0,
  postItNotes: 0,
  gum: 0,
  notebook: 0,
};

// EVENT LISTENERS
itemBoxes.forEach(box => box.addEventListener("click", () => toggleBox(box)));
checkoutBtn.addEventListener("click", placeOrder);

// TOGGLE ITEM BOX SELECTION
function toggleBox(box) {
  const unchecked = box.querySelector(".checkbox-unchecked");
  const checked = box.querySelector(".checkbox-checked");
  const img = document.getElementById(box.id + "BoxImg");
  const price = prices[box.id] || 0;

  const isActive = box.classList.toggle("active");

  // Checkbox visuals
  if (unchecked) unchecked.style.display = isActive ? "none" : "inline";
  if (checked) checked.style.display = isActive ? "inline" : "none";

  // Border color
  box.style.border = isActive ? "3px solid #e04145" : "2px solid #4d4d4d";

  // Box image
  if (img) img.style.display = isActive ? "inline" : "none";

  // Update total cost and profit
  checkoutCost += isActive ? price : -price;
  profit += isActive ? price : -price;
  checkoutPriceBox.innerHTML = `$${checkoutCost.toFixed(2)}`;
}

// PLACE ORDER FUNCTION
function placeOrder() {
  const selectedItems = Array.from(document.querySelectorAll(".item-box.active"))
    .map(box => box.querySelector(".item-name").textContent);

  if (checkoutCost > 0) {
    console.log(`Order ${orderNumber}:`);
    console.log("--------------------");
    selectedItems.forEach(item => {
      const key = item.replace(/\s+/g, '');
      const formattedKey = key.charAt(0).toLowerCase() + key.slice(1);
      
      const amount = itemAmount[formattedKey] || 0; // fallback in case key not found
      console.log(`${amount} ${item}`);
    });
    console.log("--------------------");
    console.log("Total cost: $" + checkoutCost.toFixed(2));
    console.log("====================");

    // Update total bought count
    selectedItems.forEach(item => {
      const key = item.replace(/\s+/g, '');
      const formattedKey = key.charAt(0).toLowerCase() + key.slice(1);
      if (totalBoughtItems.hasOwnProperty(formattedKey)) {
        totalBoughtItems[formattedKey] += 1;
      }
    });
    alert("Order Place Successfully!\nYour total is: $" + checkoutCost.toFixed(2))
    orderNumber++;
  }

  // Reset for next customer
  resetOrder();
}

// RESET AFTER EACH CUSTOMER
function resetOrder() {
  checkoutCost = 0;
  checkoutPriceBox.innerHTML = "$0.00";

  itemBoxes.forEach(box => {
    box.classList.remove("active");
    box.style.border = "2px solid #4d4d4d";

    const unchecked = box.querySelector(".checkbox-unchecked");
    const checked = box.querySelector(".checkbox-checked");
    if (unchecked) unchecked.style.display = "inline";
    if (checked) checked.style.display = "none";
  });

  document.querySelectorAll(".order-image").forEach(img => {
    img.style.display = "none";
  });
}

// DAILY METRICS FUNCTION
function getMetrics() {
  console.log("----- DAILY METRICS -----");
  for (const item in totalBoughtItems) {
    console.log(`${item}: ${totalBoughtItems[item]}`);
  }
  console.log("--------------------");
  console.log(`Total Orders Today: ${orderNumber - 1}`);
  console.log(`Total Revenue: $${profit.toFixed(2)}`);
  console.log("====================");
}

window.getMetrics = getMetrics;