// script.js - DêGusto Lanchonete Premium 2026 - VERSÃO FINAL ATUALIZADA
// Funcionalidades: header GIF, cardápio, busca, carrinho, checkout, rádio melhorado, chat inteligente, iOS compatível

let cart = JSON.parse(localStorage.getItem('degusto_cart')) || [];
const phoneNumber = "5534999537698";
const pixKey = "10738419605";
const logoUrl = "https://i.ibb.co/DPDZb4W1/Gemini-Generated-Image-40opkn40opkn40op-Photoroom.png";

// CONFIGURAÇÃO DELIVERY GRÁTIS
const FREE_DELIVERY_MIN = 25.00;
const DELIVERY_FEE = 5.00;

// =============================================
// DETECÇÃO DE iOS
// =============================================
function isIOS() {
    return /iPad|iPhone|iPod/.test(navigator.platform) ||
        (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
}

// =============================================
// MENU DATA
// =============================================
const menuData = {
    hamburgueres: {
        title: "🍔 Hambúrgueres",
        items: [
            { name: "X-DÊ-GUSTO", price: 28.00, img: "https://iili.io/fOXbiFI.png", desc: "Destaque 1ª" },
            { name: "X-Cheddar com Anéis", price: 26.00, img: "https://i.ibb.co/LDYypj6Q/20251031-205800.jpg" },
            { name: "X-Bacon Goiabada", price: 26.00, img: "https://i.ibb.co/4n86G96b/20251031-205913.jpg" },
            { name: "ESPECIAL TILÁPIA", price: 30.00, img: "https://i.ibb.co/7cYcLrD/IMG-20250924-WA0010.jpg" },
            { name: "ARTESANAL GOIABADA", price: 30.00, img: "https://i.ibb.co/4nfgvWGn/IMG-20250924-WA0009.jpg" },
            { name: "ESPECIAL STEAK", price: 30.00, img: "https://i.ibb.co/MxtW5hX2/IMG-20250928-WA0026.jpg" },
            { name: "ARTESANAL CLÁSSICO", price: 28.00, img: "https://i.ibb.co/0pRMs7CM/20251004-235952.jpg" },
            { name: "ARTESANAL DORITOS", price: 30.00, img: "https://i.ibb.co/ZpvH013t/20251004-235135.jpg" },
            { name: "ARTESANAL DUPLO", price: 35.00, img: "https://i.ibb.co/JR70qRfW/20251004-235417.jpg" },
            { name: "X-BOLO GIGANTE", price: 42.00, img: "https://i.ibb.co/23rd6PGY/20251004-235801.jpg" },
            { name: "X-TUDO", price: 22.00, img: "https://i.ibb.co/Z1d5Q46K/x-tudo.png" },
            { name: "X-BACON", price: 22.00, img: "https://i.ibb.co/Pv8DLymw/IMG-20251004-WA0057.jpg" },
            { name: "X-CALABRESA", price: 22.00, img: "https://i.ibb.co/4wFq4fLJ/IMG-20251004-WA0058.jpg" },
            { name: "X-CHEDDAR", price: 22.00, img: "https://i.ibb.co/TMWKbdX5/IMG-20251004-WA0056.jpg" }
        ]
    },
    combo: {
        title: "🔥 Combos",
        items: [
            { name: "COMBO FAMÍLIA", price: 50.00, img: "https://i.ibb.co/d4txStn2/combo-5.png", desc: "2 X-Tudo + 2 refri 200ml" },
            { name: "Combo: X-Saladas + 1 Batata P", price: 32.00, img: "https://i.ibb.co/dJW3mXxR/combo-3.png", desc: "-" },
            { name: "Combo: Artesanal + Batata + Refri 200ml", price: 38.00, img: "https://i.ibb.co/KzLhFRrj/combo-1.png", desc: "-" },
            { name: "Combo: 2 X-Duplo", price: 46.00, img: "https://iili.io/fjgwEwx.jpg", desc: "-" },
            { name: "Combo: 2 X-Tudo + 2 Refrigerantes + 2 Batatas Fritas", price: 70.00, img: "https://i.ibb.co/GvY9F6kP/combo-2.png", desc: "-" },
            { name: "Combo: X-Salada + Batata Frita", price: 20.00, img: "https://iili.io/fjgOiTG.jpg", desc: "-" },
            { name: "Combo: X-Tudo + Batata Frita", price: 24.00, img: "https://iili.io/fjgk7xj.jpg", desc: "-" },
            { name: "Combo na Caixa: 2 X-tudo + Anel de Cebola + Batata Frita com Cheddar e Bacon + Steak de Frango + Molhos", price: 70.00, img: "https://iili.io/fjg8NSI.jpg", desc: "-" },
            { name: "Combo Familia: 3 X-Tudos", price: 60.00, img: "https://iili.io/fjgSYWG.jpg", desc: "-" },
            { name: "Super Combo: X-Tudo + Batata + Refri", price: 25.00, img: "https://iili.io/fjgU7kP.jpg", desc: "-" },
            { name: "Combo: 3 X-Tudos + 3 Refri 200ml", price: 65.00, img: "https://iili.io/fjgrasa.jpg", desc: "-" },
            { name: "Combo: Artesanal + Batata Frita e Crocantes", price: 20.00, img: "https://iili.io/fjgg5Pf.jpg", desc: "-" }
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
    hotdogs: {
        title: "🌭 Hot Dogs",
        items: [
            { name: "Hot Dog 1", price: 10.00, img: "https://i.ibb.co/wFt4J1r5/dog1.png" },
            { name: "Hot Dog 2", price: 14.00, img: "https://i.ibb.co/hJph2sSL/dog-2-2.png" },
            { name: "Hot Dog Especial", price: 18.00, img: "https://i.ibb.co/Z6TSQVKx/dog-especial-degusto.png" }
        ]
    },
    bebidas: {
        title: "🥤 Bebidas",
        items: [
            { name: "COCA-COLA 2L", price: 14.00 },
            { name: "COCA-COLA 1L", price: 10.00 },
            { name: "COCA-COLA LATA", price: 5.00 },
            { name: "FANTA 2L", price: 12.00 },
            { name: "FANTA 1L", price: 10.00 },
            { name: "KUAT 2L", price: 10.00 },
            { name: "MINEIRO 2L", price: 12.00 },
            { name: "PITHULÁ", price: 3.00 }
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
// RENDERIZAÇÃO DO CARDÁPIO
// =============================================
function renderTabs() {
    const tabButtons = document.getElementById('tab-buttons');
    const tabPanels = document.getElementById('tab-panels');
    tabButtons.innerHTML = '';
    tabPanels.innerHTML = '';

    Object.keys(menuData).forEach((key, index) => {
        const cat = menuData[key];

        const btn = document.createElement('button');
        btn.className = 'btn btn-outline-danger me-2 mb-2 px-4';
        btn.textContent = cat.title;
        btn.onclick = () => showCategory(key);
        tabButtons.appendChild(btn);

        const panel = document.createElement('div');
        panel.id = `panel-${key}`;
        panel.className = 'tab-panel row g-4';
        panel.style.display = index === 0 ? 'flex' : 'none';
        tabPanels.appendChild(panel);
    });

    showCategory(Object.keys(menuData)[0]);
}

function showCategory(key) {
    document.querySelectorAll('.tab-panel').forEach(p => p.style.display = 'none');
    const panel = document.getElementById(`panel-${key}`);
    if (panel) {
        panel.style.display = 'flex';
        renderItems(key);
    }
}

function renderItems(catKey) {
    const panel = document.getElementById(`panel-${catKey}`);
    if (!panel) return;
    panel.innerHTML = '';

    menuData[catKey].items.forEach(item => {
        const col = document.createElement('div');
        col.className = 'col-6 col-md-4 col-lg-3';

        const imgHtml = item.img ?
            `<img src="${item.img}" class="card-img-top" alt="${item.name}" loading="lazy" onclick="openImageModal('${item.img}')">` :
            `<div class="card-img-top bg-secondary d-flex align-items-center justify-content-center text-white fs-3" style="height: 220px;">🍔</div>`;

        col.innerHTML = `
            <div class="card h-100 shadow-sm border-0">
                ${imgHtml}
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title text-danger fw-bold">${item.name}</h5>
                    ${item.desc ? `<p class="card-text text-muted small">${item.desc}</p>` : ''}
                    <div class="mt-auto text-center">
                        <p class="text-danger fw-bold fs-3 mb-3">R$ ${item.price.toFixed(2)}</p>
                        <button class="btn btn-danger w-100 shadow-sm" onclick="addToCart('${item.name.replace(/'/g, "\\'")}', ${item.price})">
                            Adicionar 🛒
                        </button>
                    </div>
                </div>
            </div>
        `;
        panel.appendChild(col);
    });
}

function setupSearch() {
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        document.querySelectorAll('.card').forEach(card => {
            const title = card.querySelector('.card-title').textContent.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            const parentCol = card.closest('.col-6');
            if (parentCol) {
                parentCol.style.display = title.includes(query) || query === '' ? 'block' : 'none';
            }
        });
    });
}

// =============================================
// CARRINHO
// =============================================
function getCartSubtotal() {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

function getDeliveryFee() {
    const subtotal = getCartSubtotal();
    return subtotal >= FREE_DELIVERY_MIN ? 0 : DELIVERY_FEE;
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
        showNotification('🎉 ENTREGA GRÁTIS alcançada!');
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
    if (cart.length === 0) {
        el.innerHTML = '<p class="text-center text-muted fs-4 my-5">Seu carrinho está vazio 😔<br><small>Adicione itens!</small></p>';
        return;
    }

    let html = '';
    let subtotal = 0;

    cart.forEach((item, i) => {
        const found = findItemByName(item.name);
        const img = found?.img ? `<img src="${found.img}" class="cart-item-img" alt="${item.name}" loading="lazy">` :
            '<div class="bg-secondary cart-item-img d-flex align-items-center justify-content-center text-white fs-4">🍔</div>';
        const subItem = item.price * item.quantity;
        subtotal += subItem;

        html += `<div class="cart-item">
            ${img}
            <div class="cart-item-info">
                <strong>${item.quantity}× ${item.name}</strong><br>
                <small class="text-success">R$ ${item.price.toFixed(2)} cada</small>
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
        <div class="d-flex justify-content-between mb-3 p-2 rounded ${delivery === 0 ? 'bg-success bg-opacity-10 border-success' : 'bg-warning bg-opacity-10 border-warning'}">
            <strong class="fs-5">🛵 Entrega:</strong> 
            <span class="fs-5 fw-bold ${delivery === 0 ? 'text-success' : 'text-warning'}">
                ${delivery === 0 ? 'GRÁTIS 🎉' : 'R$ ' + delivery.toFixed(2)}
            </span>
        </div>
        <div class="d-flex justify-content-between align-items-center">
            <h3 class="text-danger fw-bold mb-0">TOTAL:</h3>
            <h2 class="text-danger fw-bold mb-0">R$ ${total.toFixed(2)}</h2>
        </div>
        ${delivery > 0 ? `<div class="text-center mt-3 p-3 bg-info bg-opacity-10 rounded">
            <small class="text-info fw-bold">🚀 Faltam R$ ${(FREE_DELIVERY_MIN - subtotal).toFixed(2)} para entrega grátis!</small>
        </div>` : ''}
    </div>`;

    el.innerHTML = html;
}

function findItemByName(name) {
    const normName = name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    for (const cat in menuData) {
        for (const item of menuData[cat].items) {
            const normItem = item.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
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

function removeFromCart(i) { cart.splice(i, 1); saveCart(); }

function clearCart() {
    if (confirm("Limpar todo o carrinho?")) {
        cart = [];
        saveCart();
    }
}

function addToCart(n, p, q = 1) {
    const ex = cart.find(i => i.name === n);
    if (ex) ex.quantity += q;
    else cart.push({ name: n, price: parseFloat(p), quantity: q });
    saveCart();
    showNotification(`✅ ${q > 1 ? q + '× ' : ''}${n} adicionado!`);
}

function openCheckout() {
    if (cart.length === 0) {
        showNotification('⚠️ Carrinho vazio!');
        return;
    }
    renderCart();
    document.getElementById('checkout-total').textContent = `R$ ${getCartTotal().toFixed(2)}`;
    closeModal('cartModal');
    openModal('checkout-modal');
}

// =============================================
// MODAIS E NOTIFICAÇÕES
// =============================================
function openModal(id) {
    document.getElementById(id).style.display = 'block';
}

function closeModal(id) {
    document.getElementById(id).style.display = 'none';
}

function openImageModal(src) {
    document.getElementById('fullImage').src = src;
    openModal('imageModal');
}

function showNotification(msg) {
    const notif = document.getElementById('notification');
    notif.innerHTML = msg;
    notif.classList.add('show');
    setTimeout(() => notif.classList.remove('show'), 3500);
}

// Fechar modal ao clicar fora
document.querySelectorAll('.modal').forEach(m => {
    m.addEventListener('click', (e) => {
        if (e.target === m) closeModal(m.id);
    });
});

// =============================================
// CHECKOUT
// =============================================
document.getElementById('checkout-form').onsubmit = (e) => {
    e.preventDefault();

    const nome = document.getElementById('nome-cliente').value.trim();
    const rua = document.getElementById('rua').value.trim();
    const numero = document.getElementById('numero').value.trim();
    const bairro = document.getElementById('bairro').value.trim();
    const referencia = document.getElementById('referencia').value.trim();
    const pagamento = document.querySelector('input[name="pagamento"]:checked').value;
    const troco = document.getElementById('troco').value.trim();
    const observacoes = document.getElementById('observacoes').value.trim();

    const subtotal = getCartSubtotal();
    const delivery = getDeliveryFee();
    const total = getCartTotal();

    let msg = `*🍔 PEDIDO DÊGUSTO*%0A%0A`;
    msg += `*👤 Cliente:* ${nome}%0A`;
    msg += `*📍 Endereço:* ${rua}, ${numero} - ${bairro}${referencia ? ` (${referencia})` : ''}%0A%0A`;
    msg += `*🛒 ITENS:*%0A`;
    cart.forEach(it => {
        const sub = it.price * it.quantity;
        msg += `• ${it.quantity}x ${it.name} .... R$ ${sub.toFixed(2)}%0A`;
    });
    msg += `%0A💰 *RESUMO*%0A`;
    msg += `*Subtotal:* R$ ${subtotal.toFixed(2)}%0A`;
    msg += `*Entrega:* ${delivery === 0 ? 'GRÁTIS 🎉' : 'R$ ' + delivery.toFixed(2)}%0A`;
    msg += `*TOTAL:* R$ ${total.toFixed(2)}%0A%0A`;
    msg += `*💳 Pagamento:* ${pagamento}`;
    if (pagamento === 'Dinheiro' && troco) msg += ` (troco para R$ ${troco})`;
    if (observacoes) msg += `%0A*📝 Obs:* ${observacoes}`;
    msg += `%0A%0A⚡ *PIX:* ${pixKey} (entrega mais rápida!)`;

    window.open(`https://wa.me/${phoneNumber}?text=${msg}`, '_blank');

    cart = [];
    saveCart();
    closeModal('checkout-modal');
    showNotification('✅ Pedido enviado!');
};

// Troco só para Dinheiro
document.querySelectorAll('input[name="pagamento"]').forEach(r => {
    r.onchange = () => {
        document.getElementById('troco-div').style.display = r.value === 'Dinheiro' ? 'block' : 'none';
    };
});

// =============================================
// BOTÕES FLUTUANTES
// =============================================
document.getElementById('cart-button').onclick = () => openModal('cartModal');
document.getElementById('support-button').onclick = () => document.getElementById('chat-container').style.display = 'flex';

document.getElementById('share-button').onclick = () => {
    if (navigator.share) {
        navigator.share({ title: 'DêGusto', url: location.href });
    } else {
        navigator.clipboard.writeText(location.href);
        showNotification('🔗 Link copiado!');
    }
};

document.getElementById('help-button').onclick = () => document.getElementById('chat-container').style.display = 'flex';

document.getElementById('theme-button').onclick = () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    const icon = document.querySelector('#theme-button i');
    icon.classList.toggle('bi-moon-stars-fill', !isDark);
    icon.classList.toggle('bi-sun-fill', isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
};

window.addEventListener('scroll', () => {
    document.getElementById('top-button').style.display = window.scrollY > 400 ? 'block' : 'none';
});
document.getElementById('top-button').onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });

// Copiar PIX
document.getElementById('copy-pix-cart')?.addEventListener('click', () => {
    navigator.clipboard.writeText(pixKey);
    showNotification('📋 PIX copiado!');
});

// =============================================
// CHAT BOT INTELIGENTE
// =============================================
const chatBody = document.getElementById('chat-body');
const chatInput = document.getElementById('chat-input');
const sendBtn = document.getElementById('send-chat');
const closeChat = document.getElementById('close-chat');
const chatContainer = document.getElementById('chat-container');

function addChatMsg(text, isUser = false) {
    const div = document.createElement('div');
    div.className = `message ${isUser ? 'user' : 'bot'}`;
    div.innerHTML = text.replace(/\n/g, '<br>');
    chatBody.appendChild(div);
    chatBody.scrollTop = chatBody.scrollHeight;
}

function showSuggestions() {
    if (chatBody.querySelector('.quick-suggestions')) return;
    const suggestions = ["X-DÊ-GUSTO", "X-TUDO", "COMBO FAMÍLIA", "Ver carrinho", "Finalizar pedido"];
    const div = document.createElement('div');
    div.className = 'quick-suggestions mt-3';
    suggestions.forEach(txt => {
        const btn = document.createElement('button');
        btn.className = 'quick-btn me-2 mb-2';
        btn.textContent = txt;
        btn.onclick = () => {
            chatInput.value = txt;
            sendMessage();
        };
        div.appendChild(btn);
    });
    chatBody.appendChild(div);
    chatBody.scrollTop = chatBody.scrollHeight;
}

function botResponse(msg) {
    const lowerMsg = msg.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    if (lowerMsg.match(/oi|ola|bom dia|boa tarde|boa noite|e ai|olá/)) {
        return "👋 Olá! Bem-vindo à <strong>DêGusto</strong> 😋<br><br>Delivery a partir das 19h!<br>💡 <strong>cima de R$25</strong><br><br>O que deseja hoje?";
    }

    if (lowerMsg.includes('horario') || lowerMsg.includes('horário')) {
        return "🕖 Delivery <strong>todos os dias a partir das 19h até 23h</strong><br>WhatsApp: (34) 99953-7698";
    }

    if (lowerMsg.includes('delivery') || lowerMsg.includes('entrega')) {
        return "🛵 <strong>Delivey GRÁTIS acima de R$25,00</strong>!<br>Taxa normal: R$5,00<br>📍 Monte Carmelo/MG";
    }

    if (lowerMsg.includes('carrinho')) {
        openModal('cartModal');
        return "🛒 Abrindo seu carrinho!";
    }

    if (lowerMsg.includes('finalizar') || lowerMsg.includes('pedido')) {
        openCheckout();
        return "✅ Abrindo checkout!";
    }

    let quantity = 1;
    const qtyMatch = lowerMsg.match(/(\d+)\s*(x|unidade|unidades|vezes)?\s*/i);
    if (qtyMatch) quantity = parseInt(qtyMatch[1]);

    let searchTerm = lowerMsg.replace(/(\d+)\s*(x|unidade|unidades|vezes)?\s*/i, '').trim();
    searchTerm = searchTerm.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[\s\-]/g, "");

    let foundItem = null;
    for (const cat in menuData) {
        for (const item of menuData[cat].items) {
            let normItem = item.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[\s\-]/g, "");
            if (normItem.includes(searchTerm) || searchTerm.includes(normItem)) {
                foundItem = item;
                break;
            }
        }
        if (foundItem) break;
    }

    if (foundItem) {
        if (lowerMsg.includes('quanto') || lowerMsg.includes('preco') || lowerMsg.includes('preço')) {
            return `<strong>${foundItem.name}</strong>: R$ ${foundItem.price.toFixed(2)}<br><br>Quer adicionar?`;
        }
        addToCart(foundItem.name, foundItem.price, quantity);
        return `✅ ${quantity > 1 ? quantity + '× ' : ''}<strong>${foundItem.name}</strong> adicionado${quantity > 1 ? 's' : ''}! 🎉`;
    }

    return "🍔 Não entendi... 😅<br>Digite o nome do lanche ou use as sugestões!<br>💡 cima de R$25!";
}

function sendMessage() {
    const text = chatInput.value.trim();
    if (!text) return;
    addChatMsg(text, true);
    chatInput.value = '';
    setTimeout(() => {
        addChatMsg(botResponse(text));
        showSuggestions();
    }, 600);
}

sendBtn.onclick = sendMessage;
chatInput.addEventListener('keypress', e => { if (e.key === 'Enter') sendMessage(); });
closeChat.onclick = () => chatContainer.style.display = 'none';

document.getElementById('support-button').onclick = () => {
    chatContainer.style.display = 'flex';
    if (chatBody.children.length === 0) {
        addChatMsg("👋 Olá! Sou o atendente da <strong>DêGusto</strong> 😊<br>Como posso ajudar?");
        showSuggestions();
    }
};

// =============================================
// RÁDIO PLAYER MELHORADO
// =============================================
const radio = document.getElementById('radioPlayer');
const playBtn = document.getElementById('playPauseBtn');
const muteBtn = document.getElementById('muteBtn');
const volumeSlider = document.getElementById('volumeSlider');
const loadingIndicator = document.getElementById('loadingIndicator');
const copyRadioLink = document.getElementById('copyRadioLink');

let isPlaying = false;

if (radio) {
    // Persistência de volume
    const savedVolume = localStorage.getItem('degusto_radio_volume');
    if (savedVolume !== null) {
        radio.volume = parseFloat(savedVolume);
        volumeSlider.value = savedVolume;
    } else {
        radio.volume = 0.5;
        volumeSlider.value = 0.5;
    }

    // Reconexão automática em caso de erro
    radio.addEventListener('error', () => {
        showNotification('📻 Erro na rádio. Tentando reconectar...');
        setTimeout(() => {
            radio.load();
            if (isPlaying) radio.play().catch(() => {});
        }, 5000);
    });

    playBtn.onclick = () => {
        if (isPlaying) {
            radio.pause();
            playBtn.innerHTML = '<i class="bi bi-play-fill fs-1"></i>';
        } else {
            loadingIndicator.style.display = 'block';
            radio.play().catch(() => {
                showNotification('📻 Erro ao tocar rádio');
                loadingIndicator.style.display = 'none';
            });
            playBtn.innerHTML = '<i class="bi bi-pause-fill fs-1"></i>';
        }
        isPlaying = !isPlaying;
    };

    muteBtn.onclick = () => {
        radio.muted = !radio.muted;
        muteBtn.innerHTML = radio.muted ? '<i class="bi bi-volume-mute-fill fs-4"></i>' : '<i class="bi bi-volume-up-fill fs-4"></i>';
    };

    volumeSlider.oninput = () => {
        radio.volume = volumeSlider.value;
        localStorage.setItem('degusto_radio_volume', volumeSlider.value);
        muteBtn.innerHTML = volumeSlider.value == 0 ? '<i class="bi bi-volume-mute-fill fs-4"></i>' : '<i class="bi bi-volume-up-fill fs-4"></i>';
    };

    radio.onwaiting = () => loadingIndicator.style.display = 'block';
    radio.onplaying = () => loadingIndicator.style.display = 'none';

    copyRadioLink.onclick = () => {
        navigator.clipboard.writeText('https://www.degusto.store');
        showNotification('🔗 Link copiado!');
    };
}

// =============================================
// HEADER MODERNO
// =============================================
function createModernHeader() {
    const header = document.createElement('header');
    header.className = 'js-modern-header';
    header.innerHTML = `
        <div class="js-header-overlay"></div>
        <div class="js-header-content">
            <div class="js-logo-container">
                <img src="${logoUrl}" alt="DêGusto" class="js-logo-img" />
            </div>
            <p class="js-location-text">Monte Carmelo • MG</p>
            <p class="js-delivery-text">
                <i class="bi bi-clock"></i> Delivery das 19h às 23h • Todos os dias
            </p>
            <div class="js-free-delivery-badge">
                <i class="bi bi-bag"></i> Delivery GRÁTIS acima de R$25,00
            </div>
            <div class="js-scroll-down">
                <a href="#tab-buttons" class="js-scroll-link">
                    Ver Cardápio <i class="bi bi-chevron-down"></i>
                </a>
            </div>
        </div>
    `;

    document.body.insertBefore(header, document.body.firstChild);

    const attachment = isIOS() ? 'scroll' : 'fixed';

    const style = document.createElement('style');
    style.textContent = `
        .js-modern-header { background: url('https://i.imgur.com/MVTOZN2.gif') no-repeat center center / cover; background-attachment: ${attachment}; }
        /* Todos os estilos do header premium */
    `;
    document.head.appendChild(style);
}

// =============================================
// INICIALIZAÇÃO
// =============================================
window.onload = () => {
    function updateVH() {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    updateVH();
    window.addEventListener('resize', updateVH);
    window.addEventListener('orientationchange', () => setTimeout(updateVH, 100));

    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
        document.querySelector('#theme-button i')?.classList.replace('bi-moon-stars-fill', 'bi-sun-fill');
    }

    updateCartCount();
    renderTabs();
    setupSearch();
    createModernHeader();
};
