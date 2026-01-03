// script.js - DêGusto Lanchonete Premium 2026 - COMPLETO com Delivery Grátis > R$50
// Data: 03/01/2026 - Versão Mobile Otimizada (iOS + Android)

let cart = JSON.parse(localStorage.getItem('degusto_cart')) || [];
const phoneNumber = "5534999537698";
const pixKey = "10738419605";
const logoUrl = "https://i.ibb.co/DPDZb4W1/Gemini-Generated-Image-40opkn40opkn40op-Photoroom.png";
const siteUrl = "www.degusto.store";

// CONFIGURAÇÃO DELIVERY GRÁTIS
const FREE_DELIVERY_MIN = 50.00;
const DELIVERY_FEE = 5.00;

// =============================================
// MENU DATA (adicione seus itens aqui)
// =============================================
const menuData = {
    hamburgueres: {
        title: "🍔 Hambúrgueres",
        items: [
            { name: "X-DÊ-GUSTO", price: 28.00, img: "https://i.ibb.co/NgtBB7Nb/20251004-234747.jpg", desc: "Destaque 1ª" },
            { name: "X-Cheddar com Anéis", price: 26.00, img: "https://i.ibb.co/LDYypj6Q/20251031-205800.jpg" },
            { name: "X-Bacon Goiabada", price: 26.00, img: "https://i.ibb.co/4n86G96b/20251031-205913.jpg" },
            { name: "ESPECIAL TILÁPIA", price: 30.00, img: "https://i.ibb.co/7cYcLrD/IMG-20250924-WA0010.jpg" },
            { name: "ARTESANAL GOIABADA", price: 30.00, img: "https://i.ibb.co/4nfgvWGn/IMG-20250924-WA0009.jpg" },
            { name: "ESPECIAL STEAK", price: 30.00, img: "https://i.ibb.co/MxtW5hX2/IMG-20250928-WA0026.jpg" },
            { name: "ARTESANAL CLÁSSICO", price: 28.00, img: "https://i.ibb.co/0pRMs7CM/20251004-235952.jpg" },
            { name: "ARTESANAL DORITOS", price: 30.00, img: "https://i.ibb.co/ZpvH013t/20251004-235135.jpg" },
            { name: "ARTESANAL DUPLO", price: 35.00, img: "https://i.ibb.co/JR70qRfW/20251004-235417.jpg" },
            { name: "X-BOLO GIGANTE", price: 42.00, img: "https://i.ibb.co/23rd6PGY/20251004-235801.jpg" },
            { name: "X-TUDO", price: 24.00, img: "https://i.ibb.co/Z1d5Q46K/x-tudo.png" },
            { name: "X-BACON", price: 22.00, img: "https://i.ibb.co/Pv8DLymw/IMG-20251004-WA0057.jpg" },
            { name: "X-CALABRESA", price: 22.00, img: "https://i.ibb.co/4wFq4fLJ/IMG-20251004-WA0058.jpg" },
            { name: "X-CHEDDAR", price: 22.00, img: "https://i.ibb.co/TMWKbdX5/IMG-20251004-WA0056.jpg" }
        ]
    },
    combo: {
        title: "🔥 Combos",
        items: [
            { name: "COMBO FAMÍLIA", price: 50.00, img: "https://i.ibb.co/Tq79qZsF/unnamed.png", desc: "2 X-Tudo + 2 refri 200ml" },
            { name: "Combo: 2 X-Saladas", price: 32.00, img: "https://iili.io/fjgXGZN.jpg", desc: "-" },
            { name: "Combo: Artesanal Duplo + Batata + Refri", price: 38.00, img: "https://iili.io/fjgjX7s.jpg", desc: "-" },
            { name: "Combo: 2 X-Duplo", price: 46.00, img: "https://iili.io/fjgwEwx.jpg", desc: "-" },
            { name: "Combo: 2 X-Tudo + 2 Refrigerantes + 2 Batatas Fritas", price: 70.00, img: "https://iili.io/fjgNMRs.jpg", desc: "-" },
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
    chocolates: {
        title: "🍫 Chocolates",
        items: [
            { name: "Sonho de Valsa", price: 3.00, img: "https://i.ibb.co/8D5KSnxs/Sonho-de-Valsa.jpg" },
            { name: "Ouro Branco", price: 3.00, img: "https://i.ibb.co/2GPfKvj/Ouro-branco.jpg" },
            { name: "Caribe", price: 4.00, img: "https://i.ibb.co/XfYhYL0w/Caribe.jpg" },
            { name: "Trento Banoffee", price: 4.00, img: "https://i.ibb.co/VW8TpqpB/Trento-Massimo-Banofrree.jpg" },
            { name: "Hershey's Tubes", price: 4.00, img: "https://i.ibb.co/RkYmhv92/Hershey-s-Choco-Tubes.jpg" },
            { name: "Twix", price: 6.00, img: "https://i.ibb.co/5CX2tKs/Twix.jpg" },
            { name: "5Star", price: 6.00, img: "https://i.ibb.co/2Y3kXMzK/5Star.jpg" },
            { name: "Charge", price: 6.00, img: "https://i.ibb.co/zhmbQVSP/Charge.jpg" },
            { name: "Diamante Negro", price: 6.00, img: "https://i.ibb.co/sppd4VXm/Lacta-Diamante-Negro.jpg" }
        ]
    },
    bebidas: {
        title: "🥤 Bebidas",
        items: [
            { name: "COCA-COLA 2L", price: 14.00 },
            { name: "COCA-COLA 1L", price: 10.00 },
            { name: "COCA-COLA LATA", price: 6.00 },
            { name: "FANTA 2L", price: 12.00 },
            { name: "FANTA 1L", price: 10.00 },
            { name: "KUAT 2L", price: 10.00 },
            { name: "MINEIRO 2L", price: 12.00 },
            { name: "PITHULÁ", price: 3.00 }
        ]
    },
    jantinha: {
        title: "🍲 Jantinhas",
        items: [
            { name: "Jantinha", price: 12.00, img: "https://iili.io/fjUDoDQ.png", desc: "Marmita 500g completa" }
        ]
    }
};

// =============================================
// FUNÇÕES DO CARRINHO COM DELIVERY
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

    // Notificação entrega grátis
    const subtotal = getCartSubtotal();
    const wasNotified = localStorage.getItem('degusto_free_delivery_notified') === 'true';
    if (subtotal >= FREE_DELIVERY_MIN && !wasNotified) {
        showNotification('🎉 ENTREGA GRÁTIS! Você atingiu R$50,00!');
        localStorage.setItem('degusto_free_delivery_notified', 'true');
    } else if (subtotal < FREE_DELIVERY_MIN && wasNotified) {
        localStorage.removeItem('degusto_free_delivery_notified');
    }
}

function updateCartCount() { 
    const count = cart.reduce((s,i)=>s+i.quantity,0) || 0;
    document.getElementById('cartCount').textContent = count;
}

function renderCart() {
    const el = document.getElementById('cartItems');
    if (cart.length === 0) {
        el.innerHTML = '<p class="text-center text-muted fs-4 my-5">Seu carrinho está vazio 😔<br><small>Adicione itens no cardápio!</small></p>';
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
        ${delivery > 0 ? `<div class="text-center mt-3 p-3 bg-info bg-opacity-10 border rounded">
            <small class="text-info fw-bold">🚀 Faltam apenas R$ ${(FREE_DELIVERY_MIN - subtotal).toFixed(2)} para ENTREGA GRÁTIS!</small>
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

function changeQuantity(i,d){
    cart[i].quantity += d;
    if(cart[i].quantity <= 0) cart.splice(i,1);
    saveCart();
}

function removeFromCart(i){ cart.splice(i,1); saveCart(); }
function clearCart(){ if(confirm("Limpar todo o carrinho?")){ cart=[]; saveCart(); } }

function addToCart(n,p,q=1){ 
    const ex = cart.find(i=>i.name===n); 
    if(ex) ex.quantity += q; 
    else cart.push({name:n, price:parseFloat(p), quantity:q}); 
    saveCart(); 
    showNotification(`✅ ${q}× ${n} adicionado ao carrinho!`);
}

// =============================================
// MODAIS E NOTIFICAÇÕES
// =============================================
function openModal(id){ 
    const modal = document.getElementById(id);
    modal.style.display = 'flex'; 
    modal.scrollTop = 0; // melhora experiência mobile
    if(id === 'cartModal') renderCart(); 
}

function closeModal(id){ 
    document.getElementById(id).style.display = 'none'; 
}

function openCheckout(){
    if(cart.length === 0) return showNotification("Carrinho vazio!");
    closeModal('cartModal');
    const total = getCartTotal();
    const delivery = getDeliveryFee();
    let text = `TOTAL: R$ ${total.toFixed(2)}`;
    if (delivery === 0) text += " (ENTREGA GRÁTIS!)";
    document.getElementById('checkout-total').textContent = text;
    openModal('checkout-modal');
}

function showNotification(msg){
    const n = document.getElementById('notification');
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
function renderTabs(){
    const btns = document.getElementById('tab-buttons');
    const panels = document.getElementById('tab-panels');
    btns.innerHTML = '';
    panels.innerHTML = '';
    
    Object.keys(menuData).forEach((k, idx) => {
        // Botão da aba
        const btn = document.createElement('button');
        btn.className = `tab-btn btn btn-lg btn-outline-danger px-4 py-2 ${idx === 0 ? 'active' : ''}`;
        btn.dataset.tab = k;
        btn.textContent = menuData[k].title.replace(/^[^\s]+ /, '');
        btns.appendChild(btn);

        // Painel da aba
        const panel = document.createElement('div');
        panel.id = k;
        panel.className = `tab-panel ${idx === 0 ? 'active' : ''}`;
        panel.innerHTML = `<h3 class="text-center mb-5 fs-2 fw-bold text-danger">${menuData[k].title}</h3><div class="menu-grid"></div>`;
        const grid = panel.querySelector('.menu-grid');

        menuData[k].items.forEach(it => {
            const div = document.createElement('div');
            div.className = 'item';
            div.dataset.name = it.name;
            div.dataset.price = it.price;

            if(it.img) {
                const img = document.createElement('img');
                img.src = it.img;
                img.alt = it.name;
                img.loading = 'lazy';
                img.onclick = () => { 
                    document.getElementById('fullImage').src = it.img; 
                    openModal('imageModal'); 
                };
                div.appendChild(img);
            }

            div.innerHTML += `
                <h3 class="mt-2">${it.name}</h3>
                ${it.desc ? `<p class="text-muted">${it.desc}</p>` : ''}
                <span class="fs-2 fw-bold text-danger">R$ ${it.price.toFixed(2)}</span>
                <button class="add-to-cart btn btn-danger w-100 mt-3 py-3 fs-5 fw-bold shadow">➕ Adicionar</button>
            `;
            grid.appendChild(div);
        });

        panels.appendChild(panel);
    });
}

// =============================================
// EVENTOS GERAIS
// =============================================
document.addEventListener('click', e => {
    if(e.target.closest('.add-to-cart')) {
        const it = e.target.closest('.item');
        addToCart(it.dataset.name, it.dataset.price);
    }
    else if(e.target.closest('.tab-btn')) {
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
        const btn = e.target.closest('.tab-btn');
        btn.classList.add('active');
        const p = document.getElementById(btn.dataset.tab);
        if(p) p.classList.add('active');
    }
});

// Botões flutuantes
document.getElementById('cart-button').onclick = () => openModal('cartModal');

document.getElementById('share-button').onclick = () => {
    if(navigator.share) {
        navigator.share({title: 'DêGusto Lanchonete', text: 'Melhores lanches de Monte Carmelo! Delivery 19h+', url: location.href});
    } else {
        navigator.clipboard.writeText(`${siteUrl} - WhatsApp: (34)99953-7698`);
        showNotification('🔗 Link copiado!');
    }
};

document.getElementById('help-button').onclick = () => {
    alert('🕖 Delivery a partir das 19h\n📱 WhatsApp: (34) 99953-7698\n💰 Delivery GRÁTIS acima de R$50!\n\n👉 1. Escolha no cardápio\n👉 2. Adicione no carrinho\n👉 3. Finalize no WhatsApp');
};

document.getElementById('copy-pix-cart').onclick = () => {
    navigator.clipboard.writeText(pixKey);
    showNotification('💳 Chave PIX copiada: 10738419605');
};

document.getElementById('support-button').onclick = () => {
    document.getElementById('chat-container').style.display = 'flex';
};

document.getElementById('top-button').onclick = () => window.scrollTo({top: 0, behavior: 'smooth'});

// Busca
let searchTimeout;
document.getElementById('searchInput').oninput = function() {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
        const term = this.value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        const hasTerm = term.length > 0;
        
        document.querySelectorAll('.tab-panel').forEach(p => p.style.display = hasTerm ? 'block' : 'none');
        if(!hasTerm) document.querySelector('.tab-panel.active').style.display = 'block';
        
        document.querySelectorAll('.item').forEach(it => {
            const txt = it.textContent.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            it.style.display = txt.includes(term) ? 'block' : 'none';
        });
    }, 300);
};

// =============================================
// CHECKOUT WHATSAPP COM DELIVERY
// =============================================
document.getElementById('checkout-form').onsubmit = function(e) {
    e.preventDefault();
    if(cart.length === 0) return showNotification('Carrinho vazio!');

    const nome = document.getElementById('nome-cliente').value.trim();
    const rua = document.getElementById('rua').value.trim();
    const num = document.getElementById('numero').value.trim();
    const bairro = document.getElementById('bairro').value.trim();
    const ref = document.getElementById('referencia').value.trim();
    const pag = document.querySelector('input[name="pagamento"]:checked')?.value;
    const troco = document.getElementById('troco').value;
    const obs = document.getElementById('observacoes').value.trim();

    if(!nome || !rua || !num || !bairro || !pag) {
        return showNotification('❌ Preencha todos os campos obrigatórios!');
    }

    const subtotal = getCartSubtotal();
    const delivery = getDeliveryFee();
    const total = subtotal + delivery;

    let msg = `*🍔 PEDIDO DÊGUSTO - MONTE CARMELO*%0A%0A`;
    msg += `*👤 Cliente:* ${nome}%0A`;
    msg += `*📍 Endereço:* ${rua}, ${num} - ${bairro}${ref ? ` (${ref})` : ''}%0A`;
    msg += `*⏰ Horário:* Delivery após 19h%0A%0A`;
    msg += `*🛒 ITENS DO PEDIDO:*%0A`;
    
    cart.forEach(it => { 
        const sub = it.price * it.quantity; 
        msg += `• ${it.quantity}x ${it.name} .... R$ ${sub.toFixed(2)}%0A`; 
    });
    
    msg += `%0A💰 *RESUMO*%0A`;
    msg += `*Subtotal:* R$ ${subtotal.toFixed(2)}%0A`;
    msg += `*Entrega:* ${delivery === 0 ? 'GRÁTIS 🎉' : 'R$ ' + delivery.toFixed(2)}%0A`;
    msg += `*TOTAL:* R$ ${total.toFixed(2)}%0A%0A`;
    msg += `*💳 Pagamento:* ${pag}`;
    if(pag === 'Dinheiro' && troco) msg += ` (troco para R$ ${troco})`;
    if(obs) msg += `%0A*📝 Observações:* ${obs}`;
    
    msg += `%0A%0A👨‍💻 *PIX 10738419605* (mais rápido!)`;

    window.open(`https://wa.me/${phoneNumber}?text=${msg}`, '_blank');
    cart = [];
    saveCart();
    closeModal('checkout-modal');
    showNotification('✅ Pedido enviado pro WhatsApp!');
};

// Pagamento troco
document.querySelectorAll('input[name="pagamento"]').forEach(r => {
    r.onchange = () => {
        document.getElementById('troco-div').style.display = r.value === 'Dinheiro' ? 'block' : 'none';
    };
});

// =============================================
// TEMA DARK/LIGHT
// =============================================
document.getElementById('theme-button').onclick = () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    const icon = document.querySelector('#theme-button i');
    icon.classList.toggle('bi-moon-stars-fill', !isDark);
    icon.classList.toggle('bi-sun-fill', isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
};

// =============================================
// CHAT IA
// =============================================
const chatCont = document.getElementById('chat-container');
const chatBody = document.getElementById('chat-body');
const chatInp = document.getElementById('chat-input');
const sendBtn = document.getElementById('send-chat');
const closeChat = document.getElementById('close-chat');

function addMsg(text, isUser = false) { 
    const m = document.createElement('div'); 
    m.className = `message ${isUser ? 'user' : 'bot'}`; 
    m.innerHTML = text.replace(/\n/g, '<br>'); 
    chatBody.appendChild(m); 
    chatBody.scrollTop = chatBody.scrollHeight; 
}

function showSugg() {
    if (chatBody.querySelector('.quick-suggestions')) return;
    const suggestions = ["Jantinha", "X-Tudo", "Ver carrinho", "Delivery grátis", "Finalizar pedido"];
    const div = document.createElement('div');
    div.className = 'quick-suggestions mt-3';
    suggestions.forEach(txt => {
        const btn = document.createElement('button');
        btn.className = 'quick-btn me-2 mb-2';
        btn.textContent = txt;
        btn.onclick = () => { chatInp.value = txt; sendMsg(); };
        div.appendChild(btn);
    });
    chatBody.appendChild(div);
    chatBody.scrollTop = chatBody.scrollHeight;
}

function botResp(msg) {
    const lowerMsg = msg.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    let quantity = 1;
    const qMatch = lowerMsg.match(/(\d+)/);
    if (qMatch) quantity = parseInt(qMatch[1]);

    if(lowerMsg.match(/oi|ola|bom dia|boa tarde|boa noite|e ai|ei/)) {
        return "👋 Olá! Bem-vindo ao *DêGusto Lanchonete*! 😋<br>Delivery a partir das 19h em Monte Carmelo!<br><br>💡 *Delivery GRÁTIS acima de R$50!*<br>O que deseja hoje?";
    }

    if(lowerMsg.includes('horario') || lowerMsg.includes('horário')) {
        return "🕖 *Delivery a partir das 19h* todos os dias!<br>WhatsApp: (34) 99953-7698";
    }

    if(lowerMsg.includes('delivery') || lowerMsg.includes('entrega')) {
        return `🚚 *Delivery GRÁTIS acima de R$50!*<br>Taxa normal: R$5,00<br>📍 Monte Carmelo/MG`;
    }

    let foundItem = null;
    for(const cat in menuData) {
        for(const item of menuData[cat].items) {
            const normItem = item.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            if(lowerMsg.includes(normItem)) {
                foundItem = item;
                break;
            }
        }
        if(foundItem) break;
    }

    if(foundItem) {
        if(lowerMsg.includes('quanto') || lowerMsg.includes('preço') || lowerMsg.includes('preco') || lowerMsg.includes('valor')) {
            return `${foundItem.name}: *R$ ${foundItem.price.toFixed(2)}*<br>Quer adicionar ao carrinho?`;
        }
        addToCart(foundItem.name, foundItem.price, quantity);
        return `✅ ${quantity > 1 ? quantity + '× ' : ''}${foundItem.name} adicionado${quantity > 1 ? 's' : ''} ao carrinho! 🎉`;
    }

    if(lowerMsg.includes('carrinho') || lowerMsg.includes('ver carrinho')) {
        openModal('cartModal');
        return "🛒 Abrindo seu carrinho agora!";
    }

    if(lowerMsg.includes('finalizar') || lowerMsg.includes('pedido') || lowerMsg.includes('comprar')) {
        openCheckout();
        return "✅ Abrindo checkout para finalizar seu pedido!";
    }

    return "🍔 Digite o nome do lanche (ex: Jantinha, X-Tudo, Coca...) ou use os botões abaixo!<br>💡 *Delivery GRÁTIS acima de R$50* 😊";
}

function sendMsg() {
    const text = chatInp.value.trim();
    if(!text) return;
    addMsg(text, true);
    chatInp.value = '';
    setTimeout(() => {
        addMsg(botResp(text));
        showSugg();
    }, 800);
}

sendBtn.onclick = sendMsg;
chatInp.addEventListener('keypress', e => { if(e.key === 'Enter') sendMsg(); });
closeChat.onclick = () => chatCont.style.display = 'none';

// =============================================
// RÁDIO
// =============================================
const radio = document.getElementById('radioPlayer');
const playBtn = document.getElementById('playPauseBtn');
const muteBtn = document.getElementById('muteBtn');
let isPlaying = false;

if(radio && playBtn && muteBtn) {
    playBtn.onclick = () => {
        if(isPlaying) {
            radio.pause();
            playBtn.innerHTML = '<i class="bi bi-play-fill"></i> Play';
        } else {
            radio.play().catch(err => {
                showNotification("Não foi possível tocar a rádio agora");
                console.log(err);
            });
            playBtn.innerHTML = '<i class="bi bi-pause-fill"></i> Pause';
        }
        isPlaying = !isPlaying;
    };
    
    muteBtn.onclick = () => {
        radio.muted = !radio.muted;
        muteBtn.innerHTML = radio.muted ? '<i class="bi bi-volume-mute-fill"></i> Som' : '<i class="bi bi-volume-up-fill"></i> Som';
    };
}

// =============================================
// INICIALIZAÇÃO
// =============================================
window.onload = () => {
    // Tema
    if(localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
        const icon = document.querySelector('#theme-button i');
        if(icon) icon.classList.replace('bi-moon-stars-fill', 'bi-sun-fill');
    }
    
    // Carrinho e cardápio
    updateCartCount();
    renderTabs();

    // Chat boas-vindas (após 3s)
    setTimeout(() => {
        chatCont.style.display = 'flex';
        addMsg("👋 *Olá! DêGusto Atendimento Online 24h* 😄<br>Estou aqui pra te ajudar com seu pedido!<br><br>💡 *Delivery GRÁTIS acima de R$50!*<br>Delivery a partir das 19h 📱 (34)99953-7698");
        showSugg();
    }, 3000);
};
