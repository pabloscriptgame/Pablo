// script.js
let cart = JSON.parse(localStorage.getItem('degusto_cart')) || [];
const phoneNumber = "5534999537698";
const pixKey = "10738419605";

// Dados do Cardápio (Movido para JS para aliviar HTML)
const menuData = {
    hamburgueres: {
        title: "Hambúrgueres Artesanais",
        items: [
            { name: "X-COSTELA", price: 30.00, img: "https://i.ibb.co/QjhNdtMh/20251009-134607.jpg", desc: "Pão artesanal, costela desfiada suculenta, queijo cheddar derretido, anéis de cebola crocantes, molho barbecue especial, cebola caramelizada, bacon crocante e milho doce." },
            { name: "X-Tudo com Creme de Milho", price: 30.00, img: "https://i.ibb.co/YFwNVZMd/20251031-205644.jpg", desc: "" },
            { name: "X-Cheddar Burguer com anél de cebola", price: 26.00, img: "https://i.ibb.co/LDYypj6Q/20251031-205800.jpg", desc: "" },
            { name: "X-Bacon com Goiabada", price: 26.00, img: "https://i.ibb.co/4n86G96b/20251031-205913.jpg", desc: "" },
            { name: "X-Abacaxi", price: 30.00, img: "https://i.ibb.co/QFLZqn5z/20251029-174738.jpg", desc: "Pão amanteigado, abacaxi grelhado, cebola caramelizada, bacon, milho, mussarela, molho grill, doce de leite e salada." },
            { name: "ESPECIAL TILÁPIA", price: 30.00, img: "https://i.ibb.co/7cYcLrD/IMG-20250924-WA0010.jpg", desc: "Hambúrguer de tilápia grelhada, anéis de cebola empanados, queijo muçarela, molho de picles caseiro, milho fresco e salada crocante." },
            { name: "ARTESANAL GOIABADA", price: 30.00, img: "https://i.ibb.co/4nfgvWGn/IMG-20250924-WA0009.jpg", desc: "Hambúrguer artesanal de carne bovina, molho de goiabada especial, cebola caramelizada, milho, bacon crocante, presunto, muçarela e salada fresca." },
            { name: "ESPECIAL STEAK", price: 30.00, img: "https://i.ibb.co/MxtW5hX2/IMG-20250928-WA0026.jpg", desc: "Steak de frango grelhado, anéis de cebola, molho barbecue, maionese de churrasco, presunto, muçarela, bacon, milho e salada." },
            { name: "X-DÊ-GUSTO", price: 28.00, img: "https://i.ibb.co/NgtBB7Nb/20251004-234747.jpg", desc: "Pão premium, 2 hambúrgueres de picanha, ovo frito, salsicha artesanal, presunto, muçarela, bacon, milho, cheddar, Catupiry e batata palha." },
            { name: "ARTESANAL CLÁSSICO", price: 28.00, img: "https://i.ibb.co/0pRMs7CM/20251004-235952.jpg", desc: "Pão artesanal, hambúrguer artesanal, bacon crocante, cheddar, cebola caramelizada, presunto, muçarela, milho, batata palha e salada." },
            { name: "ARTESANAL DORITOS", price: 30.00, img: "https://i.ibb.co/ZpvH013t/20251004-235135.jpg", desc: "Pão artesanal, hambúrguer artesanal, bacon, cheddar, cebola caramelizada, milho, presunto, muçarela, Doritos e salada." },
            { name: "ARTESANAL DUPLO", price: 35.00, img: "https://i.ibb.co/JR70qRfW/20251004-235417.jpg", desc: "Pão artesanal, 2 hambúrgueres artesanais, bacon, cheddar, cebola caramelizada, presunto, muçarela, milho e batata palha." },
            { name: "X-BOLO GIGANTE", price: 42.00, img: "https://i.ibb.co/23rd6PGY/20251004-235801.jpg", desc: "Pão, 2 hambúrgueres, 2 salsichas, 2 ovos, bacon, calabresa, muçarela. Finalizado com muito cheddar e batata frita." },
            { name: "X-TUDO", price: 24.00, img: "https://i.ibb.co/Z1d5Q46K/x-tudo.png", desc: "Pão artesanal, hambúrguer de picanha, ovo frito, presunto, muçarela, milho, bacon, Catupiry e salada crocante." },
            { name: "X-BACON", price: 22.00, img: "https://i.ibb.co/Pv8DLymw/IMG-20251004-WA0057.jpg", desc: "Pão, hambúrguer de picanha, ovo, presunto, muçarela, milho, bacon, Catupiry e salada." },
            { name: "X-CALABRESA", price: 22.00, img: "https://i.ibb.co/4wFq4fLJ/IMG-20251004-WA0058.jpg", desc: "Pão artesanal, hambúrguer de picanha, ovo, presunto, muçarela, milho, calabresa, cheddar e salada." },
            { name: "X-CHEDDAR", price: 22.00, img: "https://i.ibb.co/TMWKbdX5/IMG-20251004-WA0056.jpg", desc: "Pão, hambúrguer de picanha, presunto, muçarela, salsicha, milho, bacon, cheddar e salada." }
        ]
    },
    combo: {
        title: "Combos Imperdíveis",
        items: [
            { name: "COMBO FAMÍLIA", price: 50.00, img: "https://i.ibb.co/Tq79qZsF/unnamed.png", desc: "2 hambúrgueres X-Tudo + 2 refrigerantes..." },
            { name: "COMBO BATATA GIGANTE", price: 35.00, img: "https://i.ibb.co/0X0X0X0/combo-batata.png", desc: "Batata gigante com cheddar, bacon, muçarela e calabresa" }
        ]
    },
    batatas: {
        title: "Batatas Crocantes",
        items: [
            { name: "BATATA GIGANTE", price: 30.00, img: "https://i.ibb.co/0X0X0X0/batata-gigante.png", desc: "Batata frita gigante com cheddar, bacon, muçarela e calabresa" }
        ]
    },
    hotdogs: {
        title: "Hot Dogs Deliciosos",
        items: [
            { name: "Hot Dog 1", price: 10.00, img: "https://i.ibb.co/wFt4J1r5/dog1.png", desc: "Pão, salsicha, milho, farofa, cenoura e batata palha" },
            { name: "Hot Dog 2", price: 14.00, img: "https://i.ibb.co/hJph2sSL/dog-2-2.png", desc: "Pão, salsicha, milho farofa, cenoura, tomate, alface e batata palha" },
            { name: "Hot Dog Especial", price: 18.00, img: "https://i.ibb.co/Z6TSQVKx/dog-especial-degusto.png", desc: "Pão, salsicha, milho, farofa, hambúrguer, presunto, mussarela, bacon, alface, tomate e batata palha" }
        ]
    },
    chocolates: {
        title: "Chocolates & Doces",
        items: [
            { name: "Sonho de Valsa", price: 3.00, img: "https://i.ibb.co/8D5KSnxs/Sonho-de-Valsa.jpg", desc: "" },
            { name: "Ouro Branco", price: 3.00, img: "https://i.ibb.co/2GPfKvj/Ouro-branco.jpg", desc: "" },
            { name: "Caribe", price: 4.00, img: "https://i.ibb.co/XfYhYL0w/Caribe.jpg", desc: "" },
            { name: "Trento Massimo Banoffee", price: 4.00, img: "https://i.ibb.co/VW8TpqpB/Trento-Massimo-Banofrree.jpg", desc: "" },
            { name: "Hershey's + Choco Tubes", price: 4.00, img: "https://i.ibb.co/RkYmhv92/Hershey-s-Choco-Tubes.jpg", desc: "" },
            { name: "Twix", price: 6.00, img: "https://i.ibb.co/5CX2tKs/Twix.jpg", desc: "" },
            { name: "5Star", price: 6.00, img: "https://i.ibb.co/2Y3kXMzK/5Star.jpg", desc: "" },
            { name: "Charge", price: 6.00, img: "https://i.ibb.co/zhmbQVSP/Charge.jpg", desc: "" },
            { name: "Diamante Negro", price: 6.00, img: "https://i.ibb.co/sppd4VXm/Lacta-Diamante-Negro.jpg", desc: "" }
        ]
    },
    bebidas: {
        title: "Bebidas Geladas",
        items: [
            { name: "COCA-COLA 2L", price: 14.00, desc: "Coca-Cola 2L geladinha" },
            { name: "COCA-COLA 1L", price: 10.00, desc: "Coca-Cola 1L bem gelada" },
            { name: "COCA-COLA LATA", price: 6.00, desc: "350ml gelada" },
            { name: "FANTA LARANJA 2L", price: 12.00, desc: "" },
            { name: "FANTA LARANJA 1L", price: 10.00, desc: "" },
            { name: "KUAT 2L", price: 10.00, desc: "Guaraná Kuat 2L" },
            { name: "MINEIRO 2L", price: 12.00, desc: "Guaraná Mineiro 2L" },
            { name: "PITHULÁ", price: 3.00, desc: "200ml" }
        ]
    },
    jantinha: {
        title: "Jantinhas",
        items: [
            { name: "Jantinha", price: 12.00, img: "https://i.ibb.co/0wxzgcT/Design-sem-nome-2.png", desc: "(entrega Gratis acima de 2 Marmitas)" }
        ]
    }
};

// Funções do Carrinho (Melhoradas com Async para melhor performance)
async function saveCart() {
    localStorage.setItem('degusto_cart', JSON.stringify(cart));
    updateCartCount();
    renderCart();
}

function updateCartCount() {
    const total = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cartCount').textContent = total || 0;
}

function renderCart() {
    const el = document.getElementById('cartItems');
    if (!el) return;
    if (cart.length === 0) {
        el.innerHTML = '<p class="text-center text-muted fs-4">Carrinho vazio</p>';
        return;
    }

    let html = '';
    let total = 0;
    cart.forEach((item, i) => {
        const subtotal = item.price * item.quantity;
        total += subtotal;
        html += `
        <div class="d-flex justify-content-between align-items-center p-3 border-bottom">
            <div>
                <strong>${item.quantity}× ${item.name}</strong><br>
                <small class="text-success">R$ ${item.price.toFixed(2)} cada</small>
                <div class="text-danger fw-bold">Subtotal: R$ ${subtotal.toFixed(2)}</div>
            </div>
            <div class="d-flex align-items-center gap-2">
                <button class="btn btn-sm btn-outline-secondary" onclick="changeQuantity(${i}, -1)">−</button>
                <span class="fw-bold">${item.quantity}</span>
                <button class="btn btn-sm btn-outline-secondary" onclick="changeQuantity(${i}, 1)">+</button>
                <button class="btn btn-danger btn-sm" onclick="removeFromCart(${i})">Remover</button>
            </div>
        </div>`;
    });
    html += `<div class="text-end mt-3"><h4 class="text-danger fw-bold">Total: R$ ${total.toFixed(2)}</h4></div>`;
    el.innerHTML = html;
}

function changeQuantity(i, delta) {
    cart[i].quantity += delta;
    if (cart[i].quantity <= 0) cart.splice(i, 1);
    saveCart();
}

function removeFromCart(i) {
    cart.splice(i, 1);
    saveCart();
}

function clearCart() {
    if (confirm("Limpar todo o carrinho?")) {
        cart = [];
        saveCart();
    }
}

function addToCart(name, price, quantity = 1) {
    const existing = cart.find(item => item.name === name);
    if (existing) existing.quantity += quantity;
    else cart.push({ name, price: parseFloat(price), quantity });
    saveCart();
    showNotification(`Adicionado: ${quantity}× ${name}`);
}

function openModal(id) {
    document.getElementById(id).style.display = 'flex';
    if (id === 'cartModal') renderCart();
}

function closeModal(id) {
    document.getElementById(id).style.display = 'none';
}

function openCheckout() {
    if (cart.length === 0) {
        showNotification("Carrinho vazio!");
        return;
    }
    closeModal('cartModal');
    const total = cart.reduce((s, i) => s + i.price * i.quantity, 0);
    document.getElementById('checkout-total').textContent = `Total: R$ ${total.toFixed(2)}`;
    openModal('checkout-modal');
}

function showNotification(msg) {
    const n = document.getElementById('notification');
    n.textContent = msg;
    n.style.display = 'block';
    setTimeout(() => n.style.display = 'none', 2500);
}

// Renderizar Abas e Painéis Dinamicamente
function renderTabs() {
    const tabButtons = document.getElementById('tab-buttons');
    const tabPanels = document.getElementById('tab-panels');

    Object.keys(menuData).forEach((key, index) => {
        const btn = document.createElement('button');
        btn.className = `tab-btn btn btn-lg btn-outline-danger ${index === 0 ? 'active' : ''}`;
        btn.dataset.tab = key;
        btn.textContent = key.charAt(0).toUpperCase() + key.slice(1);
        tabButtons.appendChild(btn);

        const panel = document.createElement('div');
        panel.id = key;
        panel.className = `tab-panel ${index === 0 ? 'active' : ''}`;
        const h3 = document.createElement('h3');
        h3.className = 'text-center mb-4';
        h3.textContent = menuData[key].title;
        panel.appendChild(h3);

        const grid = document.createElement('div');
        grid.className = 'menu-grid';
        menuData[key].items.forEach(item => {
            const div = document.createElement('div');
            div.className = 'item';
            div.dataset.name = item.name;
            div.dataset.price = item.price;
            if (item.img) {
                const img = document.createElement('img');
                img.src = item.img;
                img.alt = item.name;
                img.className = 'item-image';
                img.loading = 'lazy';
                img.onclick = () => {
                    document.getElementById('fullImage').src = img.src;
                    openModal('imageModal');
                };
                div.appendChild(img);
            }
            const h3Item = document.createElement('h3');
            h3Item.textContent = item.name;
            div.appendChild(h3Item);
            if (item.desc) {
                const p = document.createElement('p');
                p.textContent = item.desc;
                div.appendChild(p);
            }
            const span = document.createElement('span');
            span.textContent = `R$ ${item.price.toFixed(2)}`;
            div.appendChild(span);
            const btnAdd = document.createElement('button');
            btnAdd.className = 'add-to-cart btn btn-danger w-100 mt-2';
            btnAdd.textContent = 'Adicionar ao Carrinho';
            div.appendChild(btnAdd);
            grid.appendChild(div);
        });
        panel.appendChild(grid);
        tabPanels.appendChild(panel);
    });
}

// Eventos Gerais (Melhorados com Delegation)
document.addEventListener('click', e => {
    if (e.target.closest('.add-to-cart')) {
        const item = e.target.closest('.item');
        addToCart(item.dataset.name, item.dataset.price);
    } else if (e.target.closest('.tab-btn')) {
        document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.tab-panel').forEach(panel => panel.classList.remove('active'));
        e.target.classList.add('active');
        const tabId = e.target.dataset.tab;
        const panel = document.getElementById(tabId);
        if (panel) panel.classList.add('active');
    }
});

document.getElementById('cart-button').onclick = () => openModal('cartModal');
document.getElementById('share-button').onclick = () => {
    if (navigator.share) navigator.share({ title: 'DêGusto', text: 'Melhores lanches!', url: location.href });
    else {
        navigator.clipboard.writeText(location.href);
        showNotification('Link copiado!');
    }
};

document.getElementById('help-button').onclick = () => alert('Horário: a partir das 19h\nWhatsApp: (34) 99953-7698');

document.getElementById('copy-pix-cart').onclick = () => {
    navigator.clipboard.writeText(pixKey);
    showNotification('Chave PIX copiada!');
};

// Busca Melhorada (Debounce para Performance)
let searchTimeout;
document.getElementById('searchInput').oninput = function() {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
        const termo = this.value.toLowerCase();
        const hasTerm = termo.length > 0;
        document.querySelectorAll('.tab-panel').forEach(p => p.style.display = hasTerm ? 'block' : 'none');
        if (!hasTerm) {
            document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
            document.querySelector('.tab-panel.active').style.display = 'block';
        }
        document.querySelectorAll('.item').forEach(item => {
            const matches = item.textContent.toLowerCase().includes(termo);
            item.style.display = matches ? 'block' : 'none';
        });
    }, 300);
};

// Checkout Form (Melhorado com Validation)
document.getElementById('checkout-form').onsubmit = function(e) {
    e.preventDefault();
    if (cart.length === 0) return showNotification('Carrinho vazio!');

    const nome = document.getElementById('nome-cliente').value.trim();
    const rua = document.getElementById('rua').value.trim();
    const numero = document.getElementById('numero').value.trim();
    const bairro = document.getElementById('bairro').value.trim();
    const ref = document.getElementById('referencia').value.trim();
    const pagamento = document.querySelector('input[name="pagamento"]:checked') ? .value;
    const troco = document.getElementById('troco').value;
    const obs = document.getElementById('observacoes').value.trim();

    if (!nome || !rua || !numero || !bairro || !pagamento) {
        showNotification('Preencha todos os campos obrigatórios!');
        return;
    }

    let msg = `*PEDIDO DÊGUSTO*%0A%0A*Nome:* ${nome}%0A*Endereço:* ${rua}, ${numero} - ${bairro}${ref ? ' ('+ref+')' : ''}%0A%0A*Itens:*%0A`;
    let total = 0;
    cart.forEach(item => {
        const sub = item.price * item.quantity;
        total += sub;
        msg += `${item.quantity}× ${item.name} - R$ ${sub.toFixed(2)}%0A`;
    });
    msg += `%0A*Total: R$ ${total.toFixed(2)}*%0A*Pagamento:* ${pagamento}`;
    if (pagamento === 'Dinheiro' && troco) msg += ` (troco para R$ ${troco})`;
    if (obs) msg += `%0A*Obs:* ${obs}`;

    window.open(`https://wa.me/${phoneNumber}?text=${msg}`, '_blank');
    cart = [];
    saveCart();
    closeModal('checkout-modal');
    showNotification('Pedido enviado com sucesso!');
};

document.querySelectorAll('input[name="pagamento"]').forEach(radio => {
    radio.onchange = () => {
        document.getElementById('troco-div').style.display = radio.value === 'Dinheiro' ? 'block' : 'none';
    };
});

// Tema Claro/Escuro (Melhorado)
document.getElementById('theme-button').onclick = () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    const icon = document.querySelector('#theme-button i');
    icon.classList.toggle('bi-moon-stars-fill', !isDark);
    icon.classList.toggle('bi-sun-fill', isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
};

// Chat IA Melhorado (Mais Inteligente, com Suporte a Todo Cardápio)
const chatContainer = document.getElementById('chat-container');
const chatBody = document.getElementById('chat-body');
const chatInput = document.getElementById('chat-input');
const sendBtn = document.getElementById('send-chat');
const closeChatBtn = document.getElementById('close-chat');

function addMessage(text, isUser = false) {
    const msg = document.createElement('div');
    msg.classList.add('message', isUser ? 'user' : 'bot');
    msg.innerHTML = text;
    chatBody.appendChild(msg);
    chatBody.scrollTop = chatBody.scrollHeight;
}

function showSuggestions() {
    const suggestions = Object.keys(menuData).flatMap(key => menuData[key].items.map(item => `Quero ${item.name}`));
    suggestions.push("Quanto é o X-Costela?", "Adicionar Combo Família", "Finalizar pedido");

    const div = document.createElement('div');
    div.className = 'quick-suggestions';
    suggestions.slice(0, 7).forEach(s => { // Limit to 7 for better UX
        const btn = document.createElement('button');
        btn.className = 'quick-btn';
        btn.textContent = s;
        btn.onclick = () => {
            chatInput.value = s;
            sendMessage();
        };
        div.appendChild(btn);
    });
    chatBody.appendChild(div);
}

function getBotResponse(message) {
    const lower = message.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    let quantity = 1;
    const qtyMatch = lower.match(/\b(\d+)\b/);
    if (qtyMatch) quantity = parseInt(qtyMatch[1]);

    const isPriceQuestion = lower.includes('quanto') || lower.includes('preco') || lower.includes('custa');

    if (lower.match(/oi|ola|e ai|bom dia|boa tarde|boa noite|hey/i)) {
        return "Oi! Tudo bem? 😄 Qual lanche delicioso você vai querer hoje na DêGusto? Experimente nossas jantinhas também!";
    }

    if (lower.includes('horario') || lower.includes('abre') || lower.includes('entrega') || lower.includes('funciona')) {
        return "Abrimos a partir das **19h**! Delivery em Monte Carmelo. Quer montar seu pedido agora? 🚀";
    }

    if (lower.includes('promo') || lower.includes('oferta') || lower.includes('destaque') || lower.includes('desconto')) {
        return "Temos promoções top! 🔥<br>• X-Costela R$30,00<br>• Combo Família R$50,00<br>• Jantinha R$12,00 com entrega grátis acima de 2<br>• Frete grátis acima de R$50!<br>Quer adicionar algum?";
    }

    // Suporte Inteligente a Todo Cardápio
    let foundItem = null;
    Object.keys(menuData).forEach(key => {
        menuData[key].items.forEach(item => {
            if (lower.includes(item.name.toLowerCase())) {
                foundItem = item;
            }
        });
    });

    if (foundItem) {
        if (isPriceQuestion) {
            return `O ${foundItem.name} custa R$ ${foundItem.price.toFixed(2)}! Quer adicionar ${quantity > 1 ? quantity + ' unidades' : 'uma'} ao carrinho?`;
        } else {
            addToCart(foundItem.name, foundItem.price, quantity);
            return `${foundItem.name} (R$ ${foundItem.price.toFixed(2)}) adicionada${quantity > 1 ? 's' : ''}! Deliciosa e quentinha! 😋`;
        }
    }

    if (lower.includes('finalizar') || lower.includes('pagar') || lower.includes('checkout') || lower.includes('fechar pedido')) {
        openCheckout();
        return "Te levei direto pro checkout! Preencha os dados e envie pro WhatsApp. 😊";
    }

    if (lower.includes('carrinho') || lower.includes('meu pedido')) {
        openModal('cartModal');
        return "Abri seu carrinho pra você ver tudo! 😄";
    }

    return "Hmm... não entendi bem, mas posso ajudar! 😄 Me diga o nome do item que quer (ex: 'Quero 2 X-Costela' ou 'Quanto custa a Jantinha?') e eu adiciono ou informo o preço!";
}

function sendMessage() {
    const text = chatInput.value.trim();
    if (!text) return;

    addMessage(text, true);
    chatInput.value = '';

    setTimeout(() => {
        const response = getBotResponse(text);
        addMessage(response);
        showSuggestions();
    }, 700 + Math.random() * 500);
}

sendBtn.onclick = sendMessage;
chatInput.addEventListener('keypress', e => {
    if (e.key === 'Enter') sendMessage();
});

closeChatBtn.onclick = () => {
    chatContainer.style.display = 'none';
};

// Rádio (Melhorado com Error Handling)
const radioPlayer = document.getElementById('radioPlayer');
const playPauseBtn = document.getElementById('playPauseBtn');
const muteBtn = document.getElementById('muteBtn');

let isPlaying = false;
let isMuted = false;

if (radioPlayer) {
    radioPlayer.src = "https://stream.zeno.fm/si5xey7akartv.mp3";

    playPauseBtn.addEventListener('click', () => {
        if (isPlaying) {
            radioPlayer.pause();
            playPauseBtn.innerHTML = '<i class="bi bi-play-fill"></i> Play';
        } else {
            radioPlayer.play().catch(() => showNotification("Erro ao iniciar rádio. Verifique sua conexão."));
            playPauseBtn.innerHTML = '<i class="bi bi-pause-fill"></i> Pause';
        }
        isPlaying = !isPlaying;
    });

    muteBtn.addEventListener('click', () => {
        radioPlayer.muted = !radioPlayer.muted;
        muteBtn.innerHTML = radioPlayer.muted ? '<i class="bi bi-volume-mute-fill"></i> Som' : '<i class="bi bi-volume-up-fill"></i> Som';
    });
}

// Inicialização
window.addEventListener('DOMContentLoaded', () => {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark') {
        document.body.classList.add('dark-mode');
        document.querySelector('#theme-button i').classList.replace('bi-moon-stars-fill', 'bi-sun-fill');
    }

    updateCartCount();
    renderTabs();

    setTimeout(() => {
        chatContainer.style.display = 'flex';
        addMessage("Oi! Eu sou o atendente virtual da DêGusto! 😄<br>Qual lanche incrível você vai querer hoje? Posso adicionar itens, dizer preços e até quantidades!");
        showSuggestions();
    }, 6000);
});