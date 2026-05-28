const STORE_KEY = "queenCrackersStore";
const CART_KEY = "queenCrackersCart";

const defaultCategories = ["Sparklers", "Fountains", "Rockets", "Ground Chakkars", "Gift Boxes"];

const defaultProducts = [
    {
        id: "royal-sparkler-10cm",
        name: "Royal Sparkler 10cm",
        category: "Sparklers",
        price: 120,
        stock: 80,
        description: "Low-smoke golden sparklers for family celebrations and kids under adult supervision.",
        image: "✨"
    },
    {
        id: "queen-flower-pot-deluxe",
        name: "Queen Flower Pot Deluxe",
        category: "Fountains",
        price: 420,
        stock: 35,
        description: "Tall fountain effect with colorful crackling stars and a steady ground-safe base.",
        image: "⛲"
    },
    {
        id: "sky-queen-rocket-pack",
        name: "Sky Queen Rocket Pack",
        category: "Rockets",
        price: 650,
        stock: 24,
        description: "Assorted aerial rockets with bright sky bursts for open outdoor festival spaces.",
        image: "🚀"
    },
    {
        id: "golden-chakkar-wheel",
        name: "Golden Chakkar Wheel",
        category: "Ground Chakkars",
        price: 280,
        stock: 48,
        description: "Fast-spinning ground wheel with gold and green sparkle trails.",
        image: "🎆"
    },
    {
        id: "queen-family-gift-box",
        name: "Queen Family Gift Box",
        category: "Gift Boxes",
        price: 1899,
        stock: 18,
        description: "Complete family celebration kit with sparklers, fountains, chakkars, and novelty items.",
        image: "🎁"
    },
    {
        id: "mega-celebration-combo",
        name: "Mega Celebration Combo",
        category: "Gift Boxes",
        price: 2999,
        stock: 10,
        description: "Premium combo for large events with mixed fireworks and a ready billing SKU.",
        image: "👑"
    }
];

let store = loadStore();
let cart = loadCart();

const elements = {
    navToggle: document.getElementById("navToggle"),
    navLinks: document.getElementById("navLinks"),
    productGrid: document.getElementById("productGrid"),
    categoryFilter: document.getElementById("categoryFilter"),
    searchBox: document.getElementById("searchBox"),
    cartList: document.getElementById("cartList"),
    cartTotals: document.getElementById("cartTotals"),
    customerForm: document.getElementById("customerForm"),
    invoiceSection: document.getElementById("invoiceSection"),
    invoice: document.getElementById("invoice"),
    categoryForm: document.getElementById("categoryForm"),
    productForm: document.getElementById("productForm"),
    productCategory: document.getElementById("productCategory"),
    clearCartBtn: document.getElementById("clearCartBtn"),
    resetDemoBtn: document.getElementById("resetDemoBtn"),
    printBillBtn: document.getElementById("printBillBtn"),
    productCount: document.getElementById("productCount"),
    categoryCount: document.getElementById("categoryCount")
};

function loadStore() {
    const savedStore = localStorage.getItem(STORE_KEY);
    if (savedStore) {
        return JSON.parse(savedStore);
    }

    return {
        categories: defaultCategories,
        products: defaultProducts
    };
}

function saveStore() {
    localStorage.setItem(STORE_KEY, JSON.stringify(store));
}

function loadCart() {
    const savedCart = localStorage.getItem(CART_KEY);
    return savedCart ? JSON.parse(savedCart) : [];
}

function saveCart() {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function escapeHtml(value) {
    const div = document.createElement("div");
    div.textContent = value ?? "";
    return div.innerHTML;
}

function formatCurrency(amount) {
    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0
    }).format(amount);
}

function renderCategoryControls() {
    const currentFilter = elements.categoryFilter.value || "All";
    const categoryOptions = ["All", ...store.categories]
        .map(category => `<option value="${escapeHtml(category)}">${escapeHtml(category)}</option>`)
        .join("");

    elements.categoryFilter.innerHTML = categoryOptions;
    elements.categoryFilter.value = store.categories.includes(currentFilter) ? currentFilter : "All";

    elements.productCategory.innerHTML = store.categories
        .map(category => `<option value="${escapeHtml(category)}">${escapeHtml(category)}</option>`)
        .join("");

    elements.categoryCount.textContent = store.categories.length;
}

function renderProducts() {
    const selectedCategory = elements.categoryFilter.value;
    const searchTerm = elements.searchBox.value.trim().toLowerCase();

    const filteredProducts = store.products.filter(product => {
        const categoryMatch = selectedCategory === "All" || product.category === selectedCategory;
        const textMatch = [product.name, product.category, product.description]
            .join(" ")
            .toLowerCase()
            .includes(searchTerm);
        return categoryMatch && textMatch;
    });

    elements.productCount.textContent = store.products.length;

    if (!filteredProducts.length) {
        elements.productGrid.innerHTML = `<div class="empty-state">No products found. Add a new firework from the admin panel.</div>`;
        return;
    }

    elements.productGrid.innerHTML = filteredProducts.map(product => `
        <article class="product-card">
            <div class="product-image">${renderProductImage(product)}</div>
            <div class="product-body">
                <div class="product-top">
                    <div>
                        <span class="badge">${escapeHtml(product.category)}</span>
                        <h3>${escapeHtml(product.name)}</h3>
                    </div>
                    <span class="price">${formatCurrency(product.price)}</span>
                </div>
                <p class="product-description">${escapeHtml(product.description)}</p>
                <div class="product-actions">
                    <span class="stock">${product.stock} boxes in stock</span>
                    <button class="btn primary small" data-add-to-cart="${product.id}">Add to cart</button>
                </div>
            </div>
        </article>
    `).join("");
}

function renderProductImage(product) {
    if (product.image && product.image.startsWith("data:image")) {
        return `<img src="${product.image}" alt="${escapeHtml(product.name)}">`;
    }

    return `<span aria-hidden="true">${product.image || "🎇"}</span>`;
}

function getCartItems() {
    return cart
        .map(item => {
            const product = store.products.find(candidate => candidate.id === item.productId);
            return product ? { ...item, product } : null;
        })
        .filter(Boolean);
}

function calculateTotals() {
    const subtotal = getCartItems().reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    const gst = Math.round(subtotal * 0.18);
    const delivery = subtotal > 0 ? 75 : 0;
    const grandTotal = subtotal + gst + delivery;
    return { subtotal, gst, delivery, grandTotal };
}

function renderCart() {
    const items = getCartItems();

    if (!items.length) {
        elements.cartList.innerHTML = `<div class="empty-state">Your cart is empty. Add fireworks from the catalog.</div>`;
    } else {
        elements.cartList.innerHTML = items.map(item => `
            <article class="cart-item">
                <div>
                    <strong>${escapeHtml(item.product.name)}</strong>
                    <div class="cart-meta">${escapeHtml(item.product.category)} • ${formatCurrency(item.product.price)} each</div>
                </div>
                <div class="qty-controls" aria-label="Quantity controls for ${escapeHtml(item.product.name)}">
                    <button class="icon-btn" data-decrease="${item.product.id}">−</button>
                    <strong>${item.quantity}</strong>
                    <button class="icon-btn" data-increase="${item.product.id}">+</button>
                </div>
                <strong>${formatCurrency(item.product.price * item.quantity)}</strong>
            </article>
        `).join("");
    }

    renderTotals();
}

function renderTotals() {
    const totals = calculateTotals();
    elements.cartTotals.innerHTML = `
        <div class="total-row"><span>Subtotal</span><strong>${formatCurrency(totals.subtotal)}</strong></div>
        <div class="total-row"><span>GST (18%)</span><strong>${formatCurrency(totals.gst)}</strong></div>
        <div class="total-row"><span>Delivery</span><strong>${formatCurrency(totals.delivery)}</strong></div>
        <div class="total-row grand"><span>Grand total</span><strong>${formatCurrency(totals.grandTotal)}</strong></div>
    `;
}

function addToCart(productId) {
    const product = store.products.find(item => item.id === productId);
    if (!product) return;

    const cartItem = cart.find(item => item.productId === productId);
    if (cartItem) {
        if (cartItem.quantity < product.stock) {
            cartItem.quantity += 1;
        }
    } else {
        cart.push({ productId, quantity: 1 });
    }

    saveCart();
    renderCart();
}

function changeQuantity(productId, delta) {
    const cartItem = cart.find(item => item.productId === productId);
    if (!cartItem) return;

    const product = store.products.find(item => item.id === productId);
    cartItem.quantity += delta;

    if (cartItem.quantity <= 0) {
        cart = cart.filter(item => item.productId !== productId);
    } else if (product && cartItem.quantity > product.stock) {
        cartItem.quantity = product.stock;
    }

    saveCart();
    renderCart();
}

function generateInvoice(event) {
    event.preventDefault();

    const items = getCartItems();
    if (!items.length) {
        alert("Please add at least one product to the cart before generating a bill.");
        return;
    }

    const customer = {
        name: document.getElementById("customerName").value,
        phone: document.getElementById("customerPhone").value,
        address: document.getElementById("customerAddress").value
    };
    const totals = calculateTotals();
    const invoiceNumber = `QC-${Date.now().toString().slice(-6)}`;
    const invoiceDate = new Date().toLocaleDateString("en-IN", {
        year: "numeric",
        month: "short",
        day: "numeric"
    });

    elements.invoice.innerHTML = `
        <div class="invoice-header">
            <div>
                <h2>Queen Crackers</h2>
                <p>Premium fireworks store<br>Celebrate safely with adult supervision.</p>
            </div>
            <div>
                <strong>Invoice ${invoiceNumber}</strong><br>
                <span>${invoiceDate}</span>
            </div>
        </div>
        <div class="invoice-meta">
            <p><strong>Bill To:</strong><br>${escapeHtml(customer.name)}<br>${escapeHtml(customer.phone)}<br>${escapeHtml(customer.address)}</p>
            <p><strong>Payment:</strong><br>Cash / UPI on delivery<br><strong>Status:</strong> Estimate generated</p>
        </div>
        <table>
            <thead>
                <tr><th>Product</th><th>Qty</th><th>Rate</th><th>Total</th></tr>
            </thead>
            <tbody>
                ${items.map(item => `
                    <tr>
                        <td>${escapeHtml(item.product.name)}</td>
                        <td>${item.quantity}</td>
                        <td>${formatCurrency(item.product.price)}</td>
                        <td>${formatCurrency(item.product.price * item.quantity)}</td>
                    </tr>
                `).join("")}
            </tbody>
        </table>
        <div class="totals">
            <div class="total-row"><span>Subtotal</span><strong>${formatCurrency(totals.subtotal)}</strong></div>
            <div class="total-row"><span>GST (18%)</span><strong>${formatCurrency(totals.gst)}</strong></div>
            <div class="total-row"><span>Delivery</span><strong>${formatCurrency(totals.delivery)}</strong></div>
            <div class="total-row grand"><span>Grand total</span><strong>${formatCurrency(totals.grandTotal)}</strong></div>
        </div>
        <p><strong>Safety note:</strong> Use fireworks only in permitted areas, keep water nearby, and follow local rules.</p>
    `;

    elements.invoiceSection.hidden = false;
    elements.invoiceSection.scrollIntoView({ behavior: "smooth" });
}

function addCategory(event) {
    event.preventDefault();
    const input = document.getElementById("newCategory");
    const category = input.value.trim();

    if (!category) return;
    if (store.categories.some(existing => existing.toLowerCase() === category.toLowerCase())) {
        alert("This category already exists.");
        return;
    }

    store.categories.push(category);
    saveStore();
    renderCategoryControls();
    input.value = "";
}

function addProduct(event) {
    event.preventDefault();
    const imageInput = document.getElementById("productImage");
    const file = imageInput.files[0];

    const productData = {
        id: crypto.randomUUID(),
        name: document.getElementById("productName").value.trim(),
        category: elements.productCategory.value,
        price: Number(document.getElementById("productPrice").value),
        stock: Number(document.getElementById("productStock").value),
        description: document.getElementById("productDescription").value.trim(),
        image: "🎇"
    };

    if (file) {
        const reader = new FileReader();
        reader.onload = () => {
            productData.image = reader.result;
            saveProduct(productData);
        };
        reader.readAsDataURL(file);
    } else {
        saveProduct(productData);
    }
}

function saveProduct(productData) {
    store.products.unshift(productData);
    saveStore();
    elements.productForm.reset();
    renderCategoryControls();
    renderProducts();
    document.getElementById("products").scrollIntoView({ behavior: "smooth" });
}

function resetDemoData() {
    if (!confirm("Reset products, categories, and cart to the Queen Crackers demo data?")) return;
    localStorage.removeItem(STORE_KEY);
    localStorage.removeItem(CART_KEY);
    store = loadStore();
    cart = [];
    renderAll();
}

function renderAll() {
    renderCategoryControls();
    renderProducts();
    renderCart();
}

elements.navToggle.addEventListener("click", () => {
    const isOpen = elements.navLinks.classList.toggle("open");
    elements.navToggle.setAttribute("aria-expanded", isOpen.toString());
});

elements.navLinks.addEventListener("click", event => {
    if (event.target.tagName === "A") {
        elements.navLinks.classList.remove("open");
        elements.navToggle.setAttribute("aria-expanded", "false");
    }
});

elements.productGrid.addEventListener("click", event => {
    const productId = event.target.dataset.addToCart;
    if (productId) addToCart(productId);
});

elements.cartList.addEventListener("click", event => {
    if (event.target.dataset.increase) changeQuantity(event.target.dataset.increase, 1);
    if (event.target.dataset.decrease) changeQuantity(event.target.dataset.decrease, -1);
});

elements.categoryFilter.addEventListener("change", renderProducts);
elements.searchBox.addEventListener("input", renderProducts);
elements.customerForm.addEventListener("submit", generateInvoice);
elements.categoryForm.addEventListener("submit", addCategory);
elements.productForm.addEventListener("submit", addProduct);
elements.clearCartBtn.addEventListener("click", () => {
    cart = [];
    saveCart();
    renderCart();
});
elements.resetDemoBtn.addEventListener("click", resetDemoData);
elements.printBillBtn.addEventListener("click", () => window.print());

renderAll();
