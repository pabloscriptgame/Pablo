let cart = JSON.parse(localStorage.getItem('degusto_cart')) || [];
const phoneNumber = "5534999537698";
const pixKey = "10738419605";

// Funções do Carrinho
function saveCart() {
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

function addToCart(name, price) {
    const existing = cart.find(item => item.name === name);
    if (existing) existing.quantity++;
    else cart.push({ name, price: parseFloat(price), quantity: 1 });
    saveCart();
    showNotification(`Adicionado: ${name}`);
}

function openModal(id) {
    document.getElementById(id).style.display = 'flex';
    if (id === 'cartModal') renderCart();
}

function closeModal(id) {
    document.getElementById(id).style.display = 'none';
}

function closeIntro() {
    document.getElementById('introModal').style.display = 'none';
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

// Eventos Gerais
document.addEventListener('click', e => {
    if (e.target.closest('.add-to-cart')) {
        const item = e.target.closest('.item');
        addToCart(item.dataset.name, item.dataset.price);
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

document.getElementById('searchInput').oninput = function() {
    const termo = this.value.toLowerCase();
    document.querySelectorAll('.item').forEach(item => {
        item.style.display = item.textContent.toLowerCase().includes(termo) ? 'block' : 'none';
    });
};

document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.onclick = () => {
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
        document.getElementById(btn.dataset.tab).classList.add('active');
    };
});

document.getElementById('checkout-form').onsubmit = function(e) {
    e.preventDefault();
    if (cart.length === 0) return showNotification('Carrinho vazio!');

    const nome = document.getElementById('nome-cliente').value.trim();
    const rua = document.getElementById('rua').value.trim();
    const numero = document.getElementById('numero').value.trim();
    const bairro = document.getElementById('bairro').value.trim();
    const ref = document.getElementById('referencia').value.trim();
    const pagamento = document.querySelector('input[name="pagamento"]:checked').value;
    const troco = document.getElementById('troco').value;
    const obs = document.getElementById('observacoes').value.trim();

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

// Tema Claro/Escuro
document.getElementById('theme-button').onclick = () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    const icon = document.querySelector('#theme-button i');
    icon.classList.toggle('bi-moon-stars-fill', !isDark);
    icon.classList.toggle('bi-sun-fill', isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
};

// Carregar Tema + Intro
window.addEventListener('DOMContentLoaded', () => {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.body.classList.add('dark-mode');
        document.querySelector('#theme-button i').classList.replace('bi-moon-stars-fill', 'bi-sun-fill');
    }

    document.getElementById('introModal').style.display = 'flex';
    setTimeout(closeIntro, 10000);

    updateCartCount();
});

// ======================
//      CHAT IA - AGORA RECONHECE TODOS OS ITENS DO CARDÁPIO
// ======================
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
    const suggestions = [
        "Quero um X-Costela",
        "Adicionar Combo Família",
        "Quanto é o X-Bagunça?",
        "Quero Batata Gigante",
        "Adicionar Twix",
        "Me dá um Hot Dog Especial"
    ];

    const div = document.createElement('div');
    div.className = 'quick-suggestions';
    suggestions.forEach(s => {
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

    // Saudação
    if (lower.match(/oi|ola|e ai|bom dia|boa tarde|boa noite|hey/i)) {
        return "Oi! Tudo bem? 😄 Qual lanche delicioso você vai querer hoje na DêGusto?";
    }

    // Horário / Entrega
    if (lower.includes('horario') || lower.includes('abre') || lower.includes('entrega') || lower.includes('funciona')) {
        return "Abrimos a partir das **19h**! Delivery em Monte Carmelo. Quer montar seu pedido agora? 🚀";
    }

    // Promoções
    if (lower.includes('promo') || lower.includes('oferta') || lower.includes('destaque') || lower.includes('desconto')) {
        return "Temos promoções top! 🔥<br>• X-Costela R$30,00<br>• Combo Família R$50,00<br>• Frete grátis acima de R$50!<br>Quer adicionar algum?";
    }

    // Hambúrgueres (todos os 19 itens)
    if (lower.includes('x-costela') || lower.includes('costela')) {
        addToCart("X-COSTELA", 30.00);
        return "X-Costela (R$30,00) adicionado! 🔥 Suuuper suculento!";
    }
    if (lower.includes('x-tudo com creme de milho') || lower.includes('x tudo creme milho')) {
        addToCart("X-Tudo com Creme de Milho", 30.00);
        return "X-Tudo com Creme de Milho (R$30,00) no carrinho! 😋";
    }
    if (lower.includes('x-cheddar') || lower.includes('cheddar burguer') || lower.includes('x cheddar')) {
        addToCart("X-Cheddar Burguer com anél de cebola", 26.00);
        return "X-Cheddar Burguer com Anel de Cebola (R$26,00) adicionado!";
    }
    if (lower.includes('x-bacon') || lower.includes('x bacon goiabada')) {
        addToCart("X-Bacon com Goiabada", 26.00);
        return "X-Bacon com Goiabada (R$26,00) no carrinho!";
    }
    if (lower.includes('x-abacaxi')) {
        addToCart("X-Abacaxi", 30.00);
        return "X-Abacaxi (R$30,00) adicionado! Doce e salgado perfeito!";
    }
    if (lower.includes('especial tilapia') || lower.includes('tilápia')) {
        addToCart("ESPECIAL TILÁPIA", 30.00);
        return "Especial Tilápia (R$30,00) no carrinho! Fresquinho!";
    }
    if (lower.includes('artesanal goiabada')) {
        addToCart("ARTESANAL GOIABADA", 30.00);
        return "Artesanal Goiabada (R$30,00) adicionado!";
    }
    if (lower.includes('especial steak')) {
        addToCart("ESPECIAL STEAK", 30.00);
        return "Especial Steak (R$30,00) no carrinho!";
    }
    if (lower.includes('x-dê-gusto') || lower.includes('x degusto')) {
        addToCart("X-DÊ-GUSTO", 28.00);
        return "X-Dê-Gusto (R$28,00) adicionado! Nosso carro-chefe!";
    }
    if (lower.includes('artesanal clássico') || lower.includes('classico')) {
        addToCart("ARTESANAL CLÁSSICO", 28.00);
        return "Artesanal Clássico (R$28,00) no carrinho!";
    }
    if (lower.includes('artesanal doritos') || lower.includes('doritos')) {
        addToCart("ARTESANAL DORITOS", 30.00);
        return "Artesanal Doritos (R$30,00) adicionado! Crocante!";
    }
    if (lower.includes('artesanal duplo')) {
        addToCart("ARTESANAL DUPLO", 35.00);
        return "Artesanal Duplo (R$35,00) no carrinho!";
    }
    if (lower.includes('x-bolo gigante') || lower.includes('bolo gigante')) {
        addToCart("X-BOLO GIGANTE", 42.00);
        return "X-Bolo Gigante (R$42,00) adicionado! Monstro!";
    }
    if (lower.includes('x-tudo') || lower.includes('xtudo')) {
        addToCart("X-TUDO", 24.00);
        return "X-Tudo (R$24,00) no carrinho! Clássico!";
    }
    if (lower.includes('x-bacon') && !lower.includes('goiabada')) {
        addToCart("X-BACON", 22.00);
        return "X-Bacon (R$22,00) adicionado!";
    }
    if (lower.includes('x-calabresa')) {
        addToCart("X-CALABRESA", 22.00);
        return "X-Calabresa (R$22,00) no carrinho!";
    }
    if (lower.includes('x-salada')) {
        addToCart("X-SALADA", 16.00);
        return "X-Salada (R$16,00) adicionado! Fresquinho!";
    }
    if (lower.includes('x-bagunça') || lower.includes('bagunça')) {
        addToCart("X-BAGUNÇA", 35.00);
        return "X-Bagunça (R$35,00) no carrinho! Tudo junto e misturado!";
    }

    // Combos
    if (lower.includes('combo familia') || lower.includes('combo família')) {
        addToCart("COMBO FAMÍLIA", 50.00);
        return "Combo Família (R$50,00) adicionado! Perfeito pra dividir!";
    }
    if (lower.includes('combo duplo poder')) {
        addToCart("COMBO DUPLO PODER", 46.00);
        return "Combo Duplo Poder (R$46,00) no carrinho!";
    }
    if (lower.includes('combo x-tudo completo')) {
        addToCart("COMBO X-TUDO COMPLETO", 27.00);
        return "Combo X-Tudo Completo (R$27,00) adicionado!";
    }
    if (lower.includes('combo leve') || lower.includes('leve e saudável')) {
        addToCart("COMBO LEVE E SAUDÁVEL", 23.00);
        return "Combo Leve e Saudável (R$23,00) no carrinho!";
    }
    if (lower.includes('x-tudo + batata')) {
        addToCart("X-Tudo + Batata P", 24.00);
        return "X-Tudo + Batata P (R$24,00) adicionado!";
    }
    if (lower.includes('combo na caixa')) {
        addToCart("Combo na Caixa", 70.00);
        return "Combo na Caixa (R$70,00) no carrinho!";
    }
    if (lower.includes('super combo')) {
        addToCart("Super Combo", 28.00);
        return "Super Combo (R$28,00) adicionado!";
    }
    if (lower.includes('x-duplos')) {
        addToCart("X-Duplos", 46.00);
        return "X-Duplos (R$46,00) no carrinho!";
    }
    if (lower.includes('x steak + refri + batata')) {
        addToCart("X Steak + Refri + Batata P", 25.00);
        return "X Steak + Refri + Batata P (R$25,00) adicionado!";
    }
    if (lower.includes('black friday') || lower.includes('x-8carnes')) {
        addToCart("Black Friday - X-8Carnes", 50.00);
        return "Black Friday - X-8Carnes (R$50,00) no carrinho!";
    }
    if (lower.includes('3 x-saladas')) {
        addToCart("3 X-Saladas", 35.00);
        return "3 X-Saladas (R$35,00) adicionado!";
    }
    if (lower.includes('combo triplo') || lower.includes('3 x-tudo')) {
        addToCart("Combo Triplo 3 X-tudos, 3 Refri 200ml", 75.00);
        return "Combo Triplo (R$75,00) no carrinho!";
    }
    if (lower.includes('3 x-tudo completo')) {
        addToCart("3 X-Tudo Completo - TEMPO ILIMITADO", 62.00);
        return "3 X-Tudo Completo (R$62,00) adicionado!";
    }
    if (lower.includes('2 x-tudo') && lower.includes('batatas pequenas')) {
        addToCart("2 X-Tudo, 2 Refri 200 ml e 2 Batatas Pequenas", 60.00);
        return "2 X-Tudo + 2 Refri + 2 Batatas Pequenas (R$60,00) no carrinho!";
    }
    if (lower.includes('combo duplo') && lower.includes('batata fritas')) {
        addToCart("Combo Duplo 2-Xtudos, 2 Refri 200 ml e Batata Fritas", 55.00);
        return "Combo Duplo (R$55,00) adicionado!";
    }
    if (lower.includes('combo kids')) {
        addToCart("COMBO KIDS", 25.00);
        return "Combo Kids (R$25,00) no carrinho! Perfeito pras crianças!";
    }

    // Batatas
    if (lower.includes('batata') && lower.includes('petit')) {
        addToCart("BATATA PETIT", 10.00);
        return "Batata Petit (R$10,00) adicionado!";
    }
    if (lower.includes('batata') && lower.includes('media')) {
        addToCart("BATATA MÉDIA", 20.00);
        return "Batata Média (R$20,00) no carrinho!";
    }
    if (lower.includes('batata') && lower.includes('gigante')) {
        addToCart("BATATA GIGANTE", 35.00);
        return "Batata Gigante (R$35,00) adicionado! Vem recheada!";
    }

    // Hot Dogs
    if (lower.includes('hot dog') && lower.includes('1')) {
        addToCart("Hot Dog 1", 10.00);
        return "Hot Dog 1 (R$10,00) no carrinho!";
    }
    if (lower.includes('hot dog') && lower.includes('2')) {
        addToCart("Hot Dog 2", 14.00);
        return "Hot Dog 2 (R$14,00) adicionado!";
    }
    if (lower.includes('hot dog') && lower.includes('especial')) {
        addToCart("Hot Dog Especial", 18.00);
        return "Hot Dog Especial (R$18,00) no carrinho!";
    }

    // Chocolates
    if (lower.includes('sonho de valsa')) {
        addToCart("Sonho de Valsa", 3.00);
        return "Sonho de Valsa (R$3,00) adicionado!";
    }
    if (lower.includes('ouro branco')) {
        addToCart("Ouro Branco", 3.00);
        return "Ouro Branco (R$3,00) no carrinho!";
    }
    if (lower.includes('caribe')) {
        addToCart("Caribe", 4.00);
        return "Caribe (R$4,00) adicionado!";
    }
    if (lower.includes('trento') || lower.includes('banoffee')) {
        addToCart("Trento Massimo Banoffee", 4.00);
        return "Trento Massimo Banoffee (R$4,00) no carrinho!";
    }
    if (lower.includes('hershey') || lower.includes('choco tubes')) {
        addToCart("Hershey's + Choco Tubes", 4.00);
        return "Hershey's + Choco Tubes (R$4,00) adicionado!";
    }
    if (lower.includes('twix')) {
        addToCart("Twix", 6.00);
        return "Twix (R$6,00) no carrinho!";
    }
    if (lower.includes('5star')) {
        addToCart("5Star", 6.00);
        return "5Star (R$6,00) adicionado!";
    }
    if (lower.includes('charge')) {
        addToCart("Charge", 6.00);
        return "Charge (R$6,00) no carrinho!";
    }
    if (lower.includes('diamante negro')) {
        addToCart("Diamante Negro", 6.00);
        return "Diamante Negro (R$6,00) adicionado!";
    }

    // Bebidas
    if (lower.includes('coca') && lower.includes('2l')) {
        addToCart("COCA-COLA 2L", 14.00);
        return "Coca-Cola 2L (R$14,00) no carrinho!";
    }
    if (lower.includes('coca') && lower.includes('1l')) {
        addToCart("COCA-COLA 1L", 10.00);
        return "Coca-Cola 1L (R$10,00) adicionado!";
    }
    if (lower.includes('coca') && lower.includes('lata')) {
        addToCart("COCA-COLA LATA", 6.00);
        return "Coca-Cola Lata (R$6,00) no carrinho!";
    }
    if (lower.includes('fanta') && lower.includes('2l')) {
        addToCart("FANTA LARANJA 2L", 12.00);
        return "Fanta Laranja 2L (R$12,00) adicionado!";
    }
    if (lower.includes('fanta') && lower.includes('1l')) {
        addToCart("FANTA LARANJA 1L", 10.00);
        return "Fanta Laranja 1L (R$10,00) no carrinho!";
    }
    if (lower.includes('kuat')) {
        addToCart("KUAT 2L", 10.00);
        return "Kuat 2L (R$10,00) adicionado!";
    }
    if (lower.includes('mineiro')) {
        addToCart("MINEIRO 2L", 12.00);
        return "Mineiro 2L (R$12,00) no carrinho!";
    }
    if (lower.includes('pithulá') || lower.includes('pithula')) {
        addToCart("PITHULÁ", 3.00);
        return "Pithulá (R$3,00) adicionado!";
    }

    // Finalizar pedido
    if (lower.includes('finalizar') || lower.includes('pagar') || lower.includes('checkout') || lower.includes('fechar pedido')) {
        openCheckout();
        return "Te levei direto pro checkout! Preencha os dados e envie pro WhatsApp. 😊";
    }

    // Carrinho
    if (lower.includes('carrinho') || lower.includes('meu pedido')) {
        openModal('cartModal');
        return "Abri seu carrinho pra você ver tudo! 😄";
    }

    // Resposta padrão
    return "Hmm... me conta mais! 😄 O que você quer pedir? Posso adicionar qualquer item do cardápio no carrinho!";
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
    }, 700 + Math.random() * 500); // delay natural
}

sendBtn.onclick = sendMessage;
chatInput.addEventListener('keypress', e => {
    if (e.key === 'Enter') sendMessage();
});

closeChatBtn.onclick = () => {
    chatContainer.style.display = 'none';
};

// Abre o chat automaticamente após 6 segundos
setTimeout(() => {
    chatContainer.style.display = 'flex';
    addMessage("Oi! Eu sou o atendente virtual da DêGusto! 😄<br>Qual lanche incrível você vai querer hoje?");
    showSuggestions();
}, 6000);

// Player da Rádio (se você já tiver no HTML)
const radioPlayer = document.getElementById('radioPlayer');
const playPauseBtn = document.getElementById('playPauseBtn');
const muteBtn = document.getElementById('muteBtn');

let isPlaying = false;
let isMuted = false;

if (radioPlayer) {
    // Substitua pela URL real da rádio
    radioPlayer.src = "https://stream.zeno.fm/si5xey7akartv.mp3";

    playPauseBtn.addEventListener('click', () => {
        if (isPlaying) {
            radioPlayer.pause();
            playPauseBtn.innerHTML = '<i class="bi bi-play-fill"></i> Play';
        } else {
            radioPlayer.play().catch(() => showNotification("Erro ao iniciar rádio."));
            playPauseBtn.innerHTML = '<i class="bi bi-pause-fill"></i> Pause';
        }
        isPlaying = !isPlaying;
    });

    muteBtn.addEventListener('click', () => {
        radioPlayer.muted = !radioPlayer.muted;
        muteBtn.innerHTML = radioPlayer.muted ? '<i class="bi bi-volume-mute-fill"></i> Som' : '<i class="bi bi-volume-up-fill"></i> Som';
    });
}