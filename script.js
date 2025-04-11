// Store for cart items
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Toggle mobile menu
function toggleMenu() {
  const nav = document.getElementById("navbar");
  nav.classList.toggle("show");
}

// Toggle floating message box
function toggleMessageBox() {
  const box = document.getElementById("messageBox");
  box.classList.toggle("show");
}

// Add to cart
function addToCart(id) {
  const products = [
    { id: 1, name: "Classic Sneakers", price: 2900, image: "images/sneakers.jpg", desc: "Comfortable everyday sneakers perfect for both casual and sporty looks." },
    { id: 2, name: "Durable Backpack", price: 1500, image: "images/backpack.jpg", desc: "Spacious and sturdy backpack ideal for school, travel, and outdoor activities." },
    { id: 3, name: "Plain T-Shirt", price: 800, image: "images/tshirt.jpg", desc: "Soft and breathable cotton t-shirt suitable for everyday wear and layering." },
    { id: 4, name: "Stylish Hat", price: 600, image: "images/hat.jpg", desc: "Trendy sun hat that adds flair to your outfit while keeping you cool." },
    { id: 5, name: "Winter Jacket", price: 4000, image: "images/jacket.jpg", desc: "Thick, warm jacket made from premium fabric to beat the cold season." },
    { id: 6, name: "Analog Watch", price: 1200, image: "images/watch.jpg", desc: "Elegant wristwatch with a leather strap perfect for official and casual use." },
    { id: 7, name: "Denim Jeans", price: 1800, image: "images/jeans.jpg", desc: "Comfortable denim jeans that offer a perfect fit and trendy style." },
    { id: 8, name: "Zip Hoodie", price: 1400, image: "images/hoodie.jpg", desc: "Cozy zip-up hoodie made from fleece material with pockets and a hood." },
    { id: 9, name: "Sunglasses", price: 500, image: "images/shades.jpg", desc: "UV-protected stylish sunglasses perfect for beach days and sunny walks." },
    { id: 10, name: "Shoulder Bag", price: 1000, image: "images/bag.jpg", desc: "Minimalist shoulder bag with enough space to carry your essentials in style." },
    { id: 11, name: "Luxury Watch", price: 3500, image: "images/watch2.jpg", desc: "High-end wristwatch with stainless steel body and water resistance features." },
    { id: 12, name: "Leather Boots", price: 3200, image: "images/boots.jpg", desc: "Rugged yet classy leather boots that match your bold outdoor outfits." }
  ];

  const item = products.find(p => p.id === id);
  if (item) {
    cart.push(item);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${item.name} added to cart.`);
  }
}

// Load cart on cart.html
if (document.getElementById("cart-items")) {
  const cartItemsDiv = document.getElementById("cart-items");
  const cartTotalDiv = document.getElementById("cart-total");
  cartItemsDiv.innerHTML = "";

  if (cart.length === 0) {
    cartItemsDiv.innerHTML = "<p>Your cart is empty.</p>";
  } else {
    let total = 0;
    cart.forEach((item, index) => {
      total += item.price;
      cartItemsDiv.innerHTML += `
        <div class="cart-item">
          <img src="${item.image}" alt="${item.name}" />
          <h3>${item.name}</h3>
          <p>${item.desc}</p>
          <p><strong>KES ${item.price}</strong></p>
          <button onclick="removeFromCart(${index})">Remove</button>
        </div>
      `;
    });
    cartTotalDiv.innerHTML = `<h3>Total: KES ${total}</h3>`;
  }
}

// Remove from cart
function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  location.reload();
}

// Update order summary for checkout page
function updateOrderSummary(cartItems) {
  let summary = '';
  let imageHtml = '';

  cartItems.forEach(item => {
    summary += `${item.name} - ${item.price} KES\n${item.desc}\n\n`;
    imageHtml += `<p><strong>${item.name}</strong><br>${item.desc}<br><img src="${item.image}" width="150"/></p>`;
  });

  document.getElementById('order-summary').value = summary;
  const imageInput = document.getElementById('productImages');
  if (imageInput) {
    imageInput.value = imageHtml;
  }
}

// Autofill checkout form with order summary
if (document.getElementById("order-summary")) {
  updateOrderSummary(cart);
}
