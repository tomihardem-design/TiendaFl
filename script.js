// ========================================
// CARRITO
// ========================================

let cart = [];

const addButtons = document.querySelectorAll(".add-button");

const cartCount = document.getElementById("cart-count");
const floatingCount = document.getElementById("floating-count");

const floatingCart = document.getElementById("floating-cart");
const cartPanel = document.getElementById("cart-panel");
const cartOverlay = document.getElementById("cart-overlay");
const closeCart = document.getElementById("close-cart");

const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");


// ========================================
// AGREGAR PRODUCTO
// ========================================

addButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const productCard = button.closest(".product-card");

        const name = productCard.querySelector("h3").textContent;

        const priceText = productCard.querySelector(".price").textContent;

        const price = Number(
            priceText
                .replace("$", "")
                .replace(".", "")
                .trim()
        );

        cart.push({
            name: name,
            price: price
        });

        updateCart();

        button.textContent = "✓ Agregado";

        setTimeout(() => {
            button.textContent = "Agregar al carrito";
        }, 1000);

    });

});


// ========================================
// ACTUALIZAR CARRITO
// ========================================

function updateCart() {

    const totalItems = cart.length;

    cartCount.textContent = totalItems;
    floatingCount.textContent = totalItems;


    if (cart.length === 0) {

        cartItems.innerHTML = `
            <p class="empty-cart">
                Tu carrito está vacío.
            </p>
        `;

        cartTotal.textContent = "$0";

        return;
    }


    cartItems.innerHTML = "";


    let total = 0;


    cart.forEach((product, index) => {

        total += product.price;


        const item = document.createElement("div");

        item.className = "cart-item";

        item.innerHTML = `
            <div class="cart-item-info">
                <h3>${product.name}</h3>
                <p>$${product.price.toLocaleString("es-AR")}</p>
            </div>

            <button class="remove-item" data-index="${index}">
                Eliminar
            </button>
        `;


        cartItems.appendChild(item);

    });


    cartTotal.textContent =
        "$" + total.toLocaleString("es-AR");


    document.querySelectorAll(".remove-item").forEach((button) => {

        button.addEventListener("click", () => {

            const index = Number(button.dataset.index);

            cart.splice(index, 1);

            updateCart();

        });

    });

}


// ========================================
// ABRIR CARRITO
// ========================================

floatingCart.addEventListener("click", () => {

    cartPanel.classList.add("active");
    cartOverlay.classList.add("active");

});


// ========================================
// CERRAR CARRITO
// ========================================

function closeCartPanel() {

    cartPanel.classList.remove("active");
    cartOverlay.classList.remove("active");

}


closeCart.addEventListener("click", closeCartPanel);

cartOverlay.addEventListener("click", closeCartPanel);
// ========================================
// ENVIAR PEDIDO POR WHATSAPP
// ========================================

const checkoutButton = document.getElementById("checkout-button");

checkoutButton.addEventListener("click", () => {

    if (cart.length === 0) {
        alert("Tu carrito está vacío.");
        return;
    }

    let message = "Hola Valentín! 👋 Quiero realizar el siguiente pedido:%0A%0A";

    let total = 0;

    cart.forEach((product) => {

        message += `• ${product.name} — $${product.price.toLocaleString("es-AR")}%0A`;

        total += product.price;

    });

    message += `%0A💰 Total: $${total.toLocaleString("es-AR")}`;

    message += `%0A%0A¿Cómo puedo coordinar la compra?`;

    const whatsappURL =
        `https://wa.me/5493512782140?text=${message}`;

    window.open(whatsappURL, "_blank");

});// ========================================
// FILTROS DE CATEGORÍAS
// ========================================

const categoryButtons = document.querySelectorAll(".category-list button");
const productCards = document.querySelectorAll(".product-card");

categoryButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const selectedCategory = button.dataset.category;
        categoryButtons.forEach((btn) => {
            btn.classList.remove("active");
        });

        button.classList.add("active");
        productCards.forEach((card) => {

            const productCategory =
                card.querySelector(".product-category").textContent
                    .toLowerCase();

            if (
                selectedCategory === "todos" ||
                productCategory === selectedCategory
            ) {
                card.style.display = "";
            } else {
                card.style.display = "none";
            }

        });

    });

});