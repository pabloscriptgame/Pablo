let cart = JSON.parse(localStorage.getItem('degusto_cart')) || [];
const phoneNumber = "5534999537698";
const pixKey = "10738419605";

function saveCart() {
    localStorage.setItem('degusto_cart', JSON.stringify(cart));
    updateCartCount();
    renderCart();
}

function updateCartCount() {
    const total = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cartCount').textContent = total;
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
                </div>
                <button class="btn btn-danger btn-sm" onclick="removeFromCart(${i})">
                    Remover
                </button>
            </div>`;
    });

    html += `<div class="text-end mt-3">
        <h4 class="text-danger fw-bold">Total: R$ ${total.toFixed(2)}</h4>
    </div>`;

    el.innerHTML = html;
}

function addToCart(name, price) {
    const existing = cart.find(item => item.name === name);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ name, price: parseFloat(price), quantity: 1 });
    }
    saveCart();
    showNotification('Adicionado ao carrinho!');
}

function removeFromCart(index) {
    cart.splice(index, 1);
    saveCart();
}

function openModal(id) {
    document.getElementById(id).style.display = 'flex';
    if (id === 'cartModal') renderCart();
}

function closeModal(id) {
    document.getElementById(id).style.display = 'none';
}

function openCheckout() {
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

// Eventos
document.addEventListener('click', function(e) {
    if (e.target.closest('.add-to-cart')) {
        const item = e.target.closest('.item');
        const name = item.dataset.name;
        const price = item.dataset.price;
        addToCart(name, price);
    }
});

document.getElementById('cart-button').addEventListener('click', () => openModal('cartModal'));
document.getElementById('share-button').addEventListener('click', () => {
    if (navigator.share) {
        navigator.share({ title: 'DêGusto', text: 'Melhores lanches!', url: location.href });
    } else {
        navigator.clipboard.writeText(location.href);
        showNotification('Link copiado!');
    }
});
document.getElementById('help-button').addEventListener('click', () => {
    alert('Horário: a partir das 19h\nWhatsApp: (34) 99953-7698');
});

document.getElementById('copy-pix-cart').addEventListener('click', () => {
    navigator.clipboard.writeText(pixKey);
    showNotification('Chave PIX copiada!');
});

// Busca
document.getElementById('searchInput').addEventListener('input', function() {
    const termo = this.value.toLowerCase();
    document.querySelectorAll('.item').forEach(item => {
        const texto = item.textContent.toLowerCase();
        item.style.display = texto.includes(termo) ? 'block' : 'none';
    });
});

// Abas
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
        document.getElementById(btn.dataset.tab).classList.add('active');
    });
});

// Checkout
document.getElementById('checkout-form').addEventListener('submit', function(e) {
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
});

// Mostrar troco apenas se for dinheiro
document.querySelectorAll('input[name="pagamento"]').forEach(radio => {
    radio.addEventListener('change', function() {
        document.getElementById('troco-div').style.display = this.value === 'Dinheiro' ? 'block' : 'none';
    });
});

// Iniciar
updateCartCount();