// script.js - DêGusto Lanchonete Premium 2026
// Última atualização significativa: Janeiro 2026

let cart = JSON.parse(localStorage.getItem('degusto_cart')) || [];
let caldosQuantities = {};

const phoneNumber = "5534999537698";
const pixKey = "10738419605";
const logoUrl = "https://i.ibb.co/DPDZb4W1/Gemini-Generated-Image-40opkn40opkn40op-Photoroom.png";
const siteUrl = "www.degusto.store";

// CONFIGURAÇÃO DELIVERY
const FREE_DELIVERY_MIN = 25.00;
const DELIVERY_FEE = 5.00;

// =============================================
// CARDÁPIO 2026 - ORGANIZADO
// =============================================
const menuData = {
    combos: {
        title: "🔥 Combos",
        items: [
            { name: "COMBO ARTESANAL 1", price: 35.00, img: "https://i.ibb.co/KzLhFRrj/combo-1.png", desc: "Artesanal Clássico + Batata P + Refri 200ml" },
            { name: "COMBO ARTESANAL 2", price: 38.00, img: "https://i.ibb.co/d4txStn2/combo-5.png", desc: "Artesanal Duplo + Batata P + Refri 200ml" },
            { name: "COMBO ARTESANAL 3", price: 36.00, img: "https://iili.io/fjgg5Pf.jpg", desc: "Artesanal com Doritos + Batata P + Refri 200ml" },
            { name: "COMBO FAMÍLIA 3 X-TUDO", price: 60.00, img: "https://iili.io/fjgSYWG.jpg", desc: "3× X-Tudo" },
            { name: "SUPER COMBO FAMÍLIA", price: 70.00, img: "https://i.ibb.co/GvY9F6kP/combo-2.png", desc: "2× X-Tudo + 2 Refri 200ml + 2 Batatas" },
            { name: "COMBO GIGANTE NA CAIXA", price: 70.00, img: "https://iili.io/fjg8NSI.jpg", desc: "2× X-Tudo + Anel Cebola + Batata Cheddar Bacon + Steak + Molhos" }
        ]
    },

    hamburgueres_tradicionais: {
        title: "🍔 X-Tradicionais",
        items: [
            { name: "X-TUDO",          price: 24.00, img: "https://i.ibb.co/Z1d5Q46K/x-tudo.png" },
            { name: "X-BACON",         price: 23.00, img: "https://i.ibb.co/Pv8DLymw/IMG-20251004-WA0057.jpg" },
            { name: "X-CHEDDAR",       price: 23.00, img: "https://i.ibb.co/TMWKbdX5/IMG-20251004-WA0056.jpg" },
            { name: "X-CALABRESA",     price: 22.00, img: "https://i.ibb.co/4wFq4fLJ/IMG-20251004-WA0058.jpg" },
            { name: "X-SALADA",        price: 16.00, img: "https://iili.io/fjgOiTG.jpg" },
            { name: "X-EGG",           price: 23.00 }
        ]
    },

    hamburgueres_premium: {
        title: "🍔 X-Premium",
        items: [
            { name: "X-DÊ-GUSTO",      price: 28.00, img: "https://iili.io/fOXbiFI.png" },
            { name: "X-DOBRO",         price: 35.00, img: "https://i.ibb.co/JR70qRfW/20251004-235417.jpg" },
            { name: "X-BAGUNÇA",       price: 36.00, img: "https://i.ibb.co/23rd6PGY/20251004-235801.jpg" },
            { name: "X-BOLO GIGANTE",  price: 42.00, img: "https://i.ibb.co/23rd6PGY/20251004-235801.jpg" },
            { name: "X-STEAK",         price: 26.00, img: "https://i.ibb.co/MxtW5hX2/IMG-20250928-WA0026.jpg" }
        ]
    },

    artesanais: {
        title: "🍔 Artesanais",
        items: [
            { name: "ARTESANAL CLÁSSICO",     price: 27.00, img: "https://i.ibb.co/0pRMs7CM/20251004-235952.jpg" },
            { name: "ARTESANAL DUPLO",        price: 35.00, img: "https://i.ibb.co/JR70qRfW/20251004-235417.jpg" },
            { name: "ARTESANAL COM DORITOS",  price: 28.00, img: "https://i.ibb.co/ZpvH013t/20251004-235135.jpg" },
            { name: "ARTESANAL COM ANÉIS DE CEBOLA", price: 30.00, img: "https://i.ibb.co/LDYypj6Q/20251031-205800.jpg" }
        ]
    },

    hotdogs: {
        title: "🌭 Hot Dogs",
        items: [
            { name: "Hot Dog Simples", price: 10.00, img: "https://i.ibb.co/wFt4J1r5/dog1.png" },
            { name: "Hot Dog Completo", price: 14.00, img: "https://i.ibb.co/hJph2sSL/dog-2-2.png" },
            { name: "Hot Dog Especial DêGusto", price: 18.00, img: "https://i.ibb.co/Z6TSQVKx/dog-especial-degusto.png" }
        ]
    },

    batatas: {
        title: "🍟 Batatas",
        items: [
            { name: "BATATA P", price: 15.00, img: "https://iili.io/fjgIomv.jpg" },
            { name: "BATATA M", price: 20.00, img: "https://iili.io/fjg5qOu.jpg" },
            { name: "BATATA G", price: 30.00, img: "https://iili.io/fjg5X5X.jpg" }
        ]
    },

    bebidas: {
        title: "🥤 Bebidas",
        items: [
            { name: "COCA-COLA 2L",    price: 14.00 },
            { name: "COCA-COLA 1L",    price: 10.00 },
            { name: "COCA-COLA LATA",  price: 5.00  },
            { name: "FANTA 2L",        price: 12.00 },
            { name: "FANTA 1L",        price: 10.00 },
            { name: "KUAT 2L",         price: 10.00 },
            { name: "MINEIRO 2L",      price: 12.00 },
            { name: "PITHULÁ",         price: 3.00  }
        ]
    },

    molhos: {
        title: "🍯 Molhos",
        items: [
            { name: "Molho de Alho", price: 0.50, img: "https://iili.io/fOWUha2.png" }
        ]
    }
};

// =============================================
// MODAL CALDOS
// =============================================
function createCaldosModal() {
    const modal = document.createElement('div');
    modal.id = 'caldosModal';
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content bg-white rounded-4 shadow-lg p-4" style="width: 90%; max-width: 500px;">
            <div class="d-flex justify-content-between align-items-start mb-4">
                <h3 class="fw-bold text-danger">🍲 Escolha os 2 Sabores</h3>
                <span class="close fs-3" onclick="closeModal('caldosModal')" style="cursor:pointer;">×</span>
            </div>
            <p class="text-center mb-4 fs-5">Preço fixo: <strong>R$22,00</strong><br>
                <span class="text-success fw-bold">+ Brinde: Torradas crocantes!</span>
            </p>
            <div id="caldos-flavors" class="mb-4"></div>
            <div class="text-center fw-bold fs-4 mb-4">
                Selecionados: <span id="caldos-total" class="text-danger">0</span>/2
            </div>
            <button id="caldos-add-btn" class="btn btn-lg btn-success w-100 shadow" disabled>
                <strong>Adicionar ao Carrinho</strong>
            </button>
        </div>
    `;
    document.body.appendChild(modal);

    document.getElementById('caldos-add-btn').onclick = addCaldosToCart;
}

function openCaldosModal() {
    caldosQuantities = { "Frango": 0, "Feijão com Bacon": 0, "Calabresa": 0 };
    renderCaldosFlavors();
    openModal('caldosModal');
}

function renderCaldosFlavors() {
    const container = document.getElementById('caldos-flavors');
    container.innerHTML = '';
    const flavors = ["Frango", "Feijão com Bacon", "Calabresa"];

    flavors.forEach(flavor => {
        const key = flavor.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/ /g, '-').toLowerCase();
        const row = document.createElement('div');
        row.className = 'd-flex justify-content-between align-items-center mb-3 p-3 bg-light rounded shadow-sm';
        row.innerHTML = `
            <strong class="fs-5">${flavor}</strong>
            <div class="btn-group" role="group">
                <button class="btn btn-outline-danger" onclick="changeCaldosQty('${flavor}', -1)">−</button>
                <button class="btn btn-light px-4" disabled><span id="qty-${key}">${caldosQuantities[flavor]}</span></button>
                <button class="btn btn-outline-success" onclick="changeCaldosQty('${flavor}', 1)">+</button>
            </div>
        `;
        container.appendChild(row);
    });
    updateCaldosTotal();
}

function changeCaldosQty(flavor, delta) {
    const currentTotal = Object.values(caldosQuantities).reduce((a, b) => a + b, 0);
    if (currentTotal + delta > 2) {
        showNotification('❌ Máximo de 2 caldos neste combo!');
        return;
    }
    if (caldosQuantities[flavor] + delta < 0) return;

    caldosQuantities[flavor] += delta;
    const key = flavor.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/ /g, '-').toLowerCase();
    document.getElementById(`qty-${key}`).textContent = caldosQuantities[flavor];
    updateCaldosTotal();
}

function updateCaldosTotal() {
    const total = Object.values(caldosQuantities).reduce((a, b) => a + b, 0);
    document.getElementById('caldos-total').textContent = total;
    document.getElementById('caldos-add-btn').disabled = (total !== 2);
}

function addCaldosToCart() {
    const flavors = ["Frango", "Feijão com Bacon", "Calabresa"];
    let selected = [];
    flavors.forEach(f => {
        for (let i = 0; i < caldosQuantities[f]; i++) selected.push(f);
    });

    let flavorText = selected[0] === selected[1] ? `2× ${selected[0]}` : selected.sort().join(' + ');
    const itemName = `2 CALDOS (${flavorText}) + Torradas crocantes!`;
    
    addToCart(itemName, 22.00);
    showNotification(`✅ ${itemName} adicionado ao carrinho!`);
    closeModal('caldosModal');
}

// =============================================
// CARRINHO
// =============================================
function getCartSubtotal() {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

function getDeliveryFee() {
    return getCartSubtotal() >= FREE_DELIVERY_MIN ? 0 : DELIVERY_FEE;
}

function getCartTotal() {
    return getCartSubtotal() + getDeliveryFee();
}

function saveCart() {
    localStorage.setItem('degusto_cart', JSON.stringify(cart));
    updateCartCount();
    renderCart();

    const subtotal = getCartSubtotal();
    const wasNotified = localStorage.getItem('degusto_free_delivery_notified') === 'true';
    
    if (subtotal >= FREE_DELIVERY_MIN && !wasNotified) {
        showNotification('🎉 ENTREGA GRÁTIS atingida (R$25+)!');
        localStorage.setItem('degusto_free_delivery_notified', 'true');
    } else if (subtotal < FREE_DELIVERY_MIN && wasNotified) {
        localStorage.removeItem('degusto_free_delivery_notified');
    }
}

function updateCartCount() {
    const count = cart.reduce((s, i) => s + i.quantity, 0) || 0;
    document.getElementById('cartCount').textContent = count;
}

function renderCart() {
    const el = document.getElementById('cartItems');
    if (!el) return;

    if (cart.length === 0) {
        el.innerHTML = '<p class="text-center text-muted fs-4 my-5">Carrinho vazio 😔<br><small>Adicione itens do cardápio!</small></p>';
        return;
    }

    let html = '';
    let subtotal = 0;

    cart.forEach((item, i) => {
        const found = findItemByName(item.name);
        const img = found?.img 
            ? `<img src="${found.img}" class="cart-item-img" alt="${item.name}" loading="lazy">`
            : '<div class="bg-secondary cart-item-img d-flex align-items-center justify-content-center text-white fs-4">🍔</div>';

        const subItem = item.price * item.quantity;
        subtotal += subItem;

        html += `
        <div class="cart-item">
            ${img}
            <div class="cart-item-info">
                <strong>${item.quantity}× ${item.name}</strong><br>
                <small class="text-success">R$ ${item.price.toFixed(2)} un</small>
                <div class="text-danger fw-bold mt-1">R$ ${subItem.toFixed(2)}</div>
            </div>
            <div class="cart-item-controls">
                <button class="btn btn-sm btn-outline-secondary" onclick="changeQuantity(${i},-1)">−</button>
                <span class="fw-bold fs-5">${item.quantity}</span>
                <button class="btn btn-sm btn-outline-secondary" onclick="changeQuantity(${i},1)">+</button>
                <button class="btn btn-sm btn-danger" onclick="removeFromCart(${i})"><i class="bi bi-trash"></i></button>
            </div>
        </div>`;
    });

    const delivery = getDeliveryFee();
    const total = subtotal + delivery;

    html += `
    <div class="mt-4 pt-3 border-top">
        <div class="d-flex justify-content-between mb-2 fs-5"><strong>Subtotal:</strong> <span>R$ ${subtotal.toFixed(2)}</span></div>
        <div class="d-flex justify-content-between mb-3 p-2 bg-light rounded ${delivery === 0 ? 'border-success border-2 bg-success bg-opacity-10' : 'border-warning border-2 bg-warning bg-opacity-10'}">
            <strong class="fs-5">🛵 Entrega:</strong> 
            <span class="fs-5 fw-bold ${delivery === 0 ? 'text-success' : 'text-warning'}">
                ${delivery === 0 ? 'GRÁTIS 🎉' : 'R$ ' + delivery.toFixed(2)}
            </span>
        </div>
        <div class="d-flex justify-content-between align-items-center">
            <h3 class="text-danger fw-bold mb-0">TOTAL:</h3>
            <h2 class="text-danger fw-bold mb-0">R$ ${total.toFixed(2)}</h2>
        </div>
        ${delivery > 0 ? `
        <div class="text-center mt-3 p-3 bg-info bg-opacity-10 border rounded">
            <small class="text-info fw-bold">Faltam R$ ${(FREE_DELIVERY_MIN - subtotal).toFixed(2)} para entrega grátis!</small>
        </div>` : ''}
    </div>`;

    el.innerHTML = html;
}

function findItemByName(name) {
    const normName = name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"");
    for (const cat in menuData) {
        for (const item of menuData[cat].items) {
            const normItem = item.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"");
            if (normItem === normName) return item;
        }
    }
    return null;
}

function changeQuantity(i, d) {
    cart[i].quantity += d;
    if (cart[i].quantity <= 0) cart.splice(i, 1);
    saveCart();
}

function removeFromCart(i) {
    cart.splice(i, 1);
    saveCart();
}

function addToCart(name, price, quantity = 1) {
    const existing = cart.find(i => i.name === name);
    if (existing) {
        existing.quantity += quantity;
    } else {
        cart.push({ name, price: parseFloat(price), quantity });
    }
    saveCart();
    showNotification(`✅ ${quantity}× ${name} adicionado!`);
}

// =============================================
// MODAIS E NOTIFICAÇÕES
// =============================================
function openModal(id) {
    const modal = document.getElementById(id);
    if (modal) {
        modal.style.display = 'flex';
        modal.scrollTop = 0;
        if (id === 'cartModal') renderCart();
    }
}

function closeModal(id) {
    const modal = document.getElementById(id);
    if (modal) modal.style.display = 'none';
}

function openCheckout() {
    if (cart.length === 0) return showNotification("Carrinho vazio!");
    closeModal('cartModal');
    const total = getCartTotal();
    const delivery = getDeliveryFee();
    let text = `TOTAL: R$ ${total.toFixed(2)}`;
    if (delivery === 0) text += " (ENTREGA GRÁTIS!)";
    document.getElementById('checkout-total').textContent = text;
    openModal('checkout-modal');
}

function showNotification(msg) {
    const n = document.getElementById('notification');
    if (!n) return;
    n.textContent = msg;
    n.style.display = 'block';
    n.style.opacity = '1';
    setTimeout(() => {
        n.style.opacity = '0';
        setTimeout(() => n.style.display = 'none', 500);
    }, 4000);
}

// =============================================
// RENDERIZAÇÃO DO CARDÁPIO
// =============================================
function renderTabs() {
    const btns = document.getElementById('tab-buttons');
    const panels = document.getElementById('tab-panels');
    if (!btns || !panels) return;

    btns.innerHTML = '';
    panels.innerHTML = '';

    Object.keys(menuData).forEach((key, index) => {
        // Botão da aba
        const btn = document.createElement('button');
        btn.className = `tab-btn btn btn-lg btn-outline-danger px-4 py-2 ${index === 0 ? 'active' : ''}`;
        btn.dataset.tab = key;
        btn.textContent = menuData[key].title.replace(/^[^\s]+ /, '');
        btns.appendChild(btn);

        // Painel da aba
        const panel = document.createElement('div');
        panel.id = key;
        panel.className = `tab-panel ${index === 0 ? 'active' : ''}`;
        panel.innerHTML = `<h3 class="text-center mb-5 fs-2 fw-bold text-danger">${menuData[key].title}</h3><div class="menu-grid"></div>`;
        const grid = panel.querySelector('.menu-grid');

        menuData[key].items.forEach(item => {
            const div = document.createElement('div');
            div.className = 'item';
            div.dataset.name = item.name;
            div.dataset.price = item.price;

            if (item.img) {
                const img = document.createElement('img');
                img.src = item.img;
                img.alt = item.name;
                img.loading = 'lazy';
                img.onclick = () => {
                    const fullImg = document.getElementById('fullImage');
                    if (fullImg) {
                        fullImg.src = item.img;
                        openModal('imageModal');
                    }
                };
                div.appendChild(img);
            }

            const h3 = document.createElement('h3');
            h3.className = 'mt-2';
            h3.textContent = item.name;
            h3.dataset.original = item.name;
            div.appendChild(h3);

            if (item.desc) {
                const p = document.createElement('p');
                p.className = 'text-muted small mb-2';
                p.textContent = item.desc;
                div.appendChild(p);
            }

            const priceSpan = document.createElement('span');
            priceSpan.className = 'fs-2 fw-bold text-danger';
            priceSpan.textContent = `R$ ${item.price.toFixed(2)}`;
            div.appendChild(priceSpan);

            const addBtn = document.createElement('button');
            addBtn.className = 'add-to-cart btn btn-danger w-100 mt-3 py-3 fs-5 fw-bold shadow';
            addBtn.innerHTML = '➕ Adicionar';
            div.appendChild(addBtn);

            grid.appendChild(div);
        });

        panels.appendChild(panel);
    });
}

// =============================================
// EVENTOS
// =============================================
document.addEventListener('click', e => {
    const addBtn = e.target.closest('.add-to-cart');
    if (addBtn) {
        const itemEl = addBtn.closest('.item');
        if (itemEl) {
            addToCart(itemEl.dataset.name, itemEl.dataset.price);
        }
        return;
    }

    const tabBtn = e.target.closest('.tab-btn');
    if (tabBtn) {
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
        tabBtn.classList.add('active');
        const panel = document.getElementById(tabBtn.dataset.tab);
        if (panel) panel.classList.add('active');
    }
});

// =============================================
// Inicialização
// =============================================
window.onload = () => {
    // Tema dark/light
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
        const icon = document.querySelector('#theme-button i');
        if (icon) icon.classList.replace('bi-moon-stars-fill', 'bi-sun-fill');
    }

    updateCartCount();
    renderTabs();
    createCaldosModal();
    // createModernHeader();  ← descomente se ainda estiver usando o header com GIF
};
