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

// Busca melhorada
document.getElementById('searchInput').oninput = function() {
    const termo = this.value.toLowerCase();
    const hasTerm = termo.length > 0;

    document.querySelectorAll('.tab-panel').forEach(p => {
        p.style.display = hasTerm ? 'block' : 'none';
    });

    if (!hasTerm) {
        document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
        document.querySelector('.tab-panel.active').style.display = 'block';
    }

    document.querySelectorAll('.item').forEach(item => {
        const matches = item.textContent.toLowerCase().includes(termo);
        item.style.display = matches ? 'block' : 'none';
    });
};

document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.onclick = () => {
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.tab-panel').forEach(p => p.style.display = 'none');
        btn.classList.add('active');
        document.getElementById(btn.dataset.tab).style.display = 'block';
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

// Carregar Tema + Clique em Imagem
window.addEventListener('DOMContentLoaded', () => {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark') {
        document.body.classList.add('dark-mode');
        document.querySelector('#theme-button i').classList.replace('bi-moon-stars-fill', 'bi-sun-fill');
    }

    updateCartCount();

    document.querySelectorAll('.item img').forEach(img => {
        img.onclick = () => {
            document.getElementById('fullImage').src = img.src;
            openModal('imageModal');
        };
    });
});

// Chat IA
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
        "Me dá um Hot Dog Especial",
        "Quero uma Jantinha de Frango"
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

    if (lower.includes('jantinha')) {
        let type = 'Jantinha';
        let price = 12.00;
        if (lower.includes('frango')) type = 'Jantinha de Frango';
        else if (lower.includes('carne')) type = 'Jantinha de Carne';
        else if (lower.includes('calabresa')) type = 'Jantinha de Calabresa';

        if (isPriceQuestion) {
            return `A ${type} custa R$ ${price.toFixed(2)}! Quer adicionar ${quantity > 1 ? quantity + ' unidades' : 'uma'} ao carrinho?`;
        } else {
            addToCart(type, price, quantity);
            return `${type} (R$ ${price.toFixed(2)}) adicionada${quantity > 1 ? 's' : ''}! Deliciosa e quentinha! 😋`;
        }
    }

    if (lower.includes('x-costela') || lower.includes('costela')) {
        if (isPriceQuestion) {
            return "O X-Costela custa R$30,00! Quer adicionar?";
        } else {
            addToCart("X-COSTELA", 30.00, quantity);
            return `X-Costela (R$30,00) adicionado${quantity > 1 ? 's' : ''}! 🔥 Suuuper suculento!`;
        }
    }
    // Adicione condições semelhantes para os outros itens...

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

setTimeout(() => {
    chatContainer.style.display = 'flex';
    addMessage("Oi! Eu sou o atendente virtual da DêGusto! 😄<br>Qual lanche incrível você vai querer hoje? Posso adicionar itens, dizer preços e até quantidades!");
    showSuggestions();
}, 6000);

// Rádio
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