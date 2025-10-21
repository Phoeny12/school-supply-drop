const itemBoxes = document.querySelectorAll(".item-box");
const checkoutPriceBox = document.getElementById("checkout-price");
const checkoutBtn = document.getElementById("checkout-btn");

let checkoutCost = 0;
let orderNumber = 1;

const prices = {
  mechanicalPencils: 1,
  pencils: 1,
  pencilSharpener: 1,
  eraser: 1,
  pens: 1,
  sharpie: 1,
  highlighters: 2,
  postItNotes: 1,
  gum: 1,
  notebook: 2,
};

// Add click listeners
itemBoxes.forEach(box => box.addEventListener("click", () => toggleBox(box)));

// Toggle a box selection
function toggleBox(box) {
  const unchecked = box.querySelector(".checkbox-unchecked");
  const checked = box.querySelector(".checkbox-checked");
  const img = document.getElementById(box.id + "BoxImg");
  const price = prices[box.id] || 0;

  const isActive = box.classList.toggle("active");

  // Update checkbox visuals
  if (unchecked) unchecked.style.display = isActive ? "none" : "inline";
  if (checked) checked.style.display = isActive ? "inline" : "none";

  // Update border
  box.style.border = isActive ? "3px solid #e04145" : "2px solid #4d4d4d";

  // Update box image
  if (img) img.style.display = isActive ? "inline" : "none";

  // Update checkout cost
  checkoutCost += isActive ? price : -price;
  checkoutPriceBox.innerHTML = `$${checkoutCost.toFixed(2)}`;
}

// Place order
checkoutBtn.addEventListener("click", () => {
  const selectedItems = Array.from(document.querySelectorAll(".item-box.active"))
    .map(box => box.querySelector(".item-name").textContent);
  if (checkoutCost > 0) {
    console.log(`Order ${orderNumber}:`);
    selectedItems.forEach(item => console.log(item));
    console.log("Total cost: $" + checkoutCost.toFixed(2));
    console.log("--------------------");
    orderNumber++;
  };

  resetOrder();
});

// Reset all selections for next customer
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