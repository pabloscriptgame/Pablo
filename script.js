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
        html += `<div class="d-flex justify-content-between align-items-center p-3 border-bottom">
            <div><strong>${item.quantity}× ${item.name}</strong><br><small class="text-success">R$ ${item.price.toFixed(2)} cada</small></div>
            <button class="btn btn-danger btn-sm" onclick="removeFromCart(${i})">Remover</button>
        </div>`;
    });
    html += `<div class="text-end mt-3"><h4 class="text-danger fw-bold">Total: R$ ${total.toFixed(2)}</h4></div>`;
    el.innerHTML = html;
}

function addToCart(name, price) {
    const existing = cart.find(item => item.name === name);
    if (existing) existing.quantity += 1;
    else cart.push({ name, price: parseFloat(price), quantity: 1 });
    saveCart();
    showNotification('Adicionado ao carrinho!');
}

function removeFromCart(index) {
    cart.splice(index, 1);
    saveCart();
}

function openModal(id) { document.getElementById(id).style.display = 'flex'; if (id === 'cartModal') renderCart(); }

function closeModal(id) { document.getElementById(id).style.display = 'none'; }

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
    radio.onchange = () => document.getElementById('troco-div').style.display = radio.value === 'Dinheiro' ? 'block' : 'none';
});

updateCartCount();

// Código para animação de neve de Natal (falling snow)
document.addEventListener("DOMContentLoaded", function() {
    const snowContainer = document.querySelector(".snow-container");

    const particlesPerThousandPixels = 0.1;
    const fallSpeed = 1.25;
    const pauseWhenNotActive = true;
    const maxSnowflakes = 200;
    const snowflakes = [];

    let snowflakeInterval;
    let isTabActive = true;

    function resetSnowflake(snowflake) {
        const size = Math.random() * 5 + 1;
        const viewportWidth = window.innerWidth - size; // Adjust for snowflake size
        const viewportHeight = window.innerHeight;

        snowflake.style.width = `${size}px`;
        snowflake.style.height = `${size}px`;
        snowflake.style.left = `${Math.random() * viewportWidth}px`; // Constrain within viewport width
        snowflake.style.top = `-${size}px`;

        const animationDuration = (Math.random() * 3 + 2) / fallSpeed;
        snowflake.style.animationDuration = `${animationDuration}s`;
        snowflake.style.animationTimingFunction = "linear";
        snowflake.style.animationName =
            Math.random() < 0.5 ? "fall" : "diagonal-fall";

        setTimeout(() => {
            if (parseInt(snowflake.style.top, 10) < viewportHeight) {
                resetSnowflake(snowflake);
            } else {
                snowflake.remove(); // Remove when it goes off the bottom edge
            }
        }, animationDuration * 1000);
    }

    function createSnowflake() {
        if (snowflakes.length < maxSnowflakes) {
            const snowflake = document.createElement("div");
            snowflake.classList.add("snowflake");
            snowflakes.push(snowflake);
            snowContainer.appendChild(snowflake);
            resetSnowflake(snowflake);
        }
    }

    function generateSnowflakes() {
        const numberOfParticles =
            Math.ceil((window.innerWidth * window.innerHeight) / 1000) *
            particlesPerThousandPixels;
        const interval = 5000 / numberOfParticles;

        clearInterval(snowflakeInterval);
        snowflakeInterval = setInterval(() => {
            if (isTabActive && snowflakes.length < maxSnowflakes) {
                requestAnimationFrame(createSnowflake);
            }
        }, interval);
    }

    function handleVisibilityChange() {
        if (!pauseWhenNotActive) return;

        isTabActive = !document.hidden;
        if (isTabActive) {
            generateSnowflakes();
        } else {
            clearInterval(snowflakeInterval);
        }
    }

    generateSnowflakes();

    window.addEventListener("resize", () => {
        clearInterval(snowflakeInterval);
        setTimeout(generateSnowflakes, 1000);
    });

    document.addEventListener("visibilitychange", handleVisibilityChange);
});