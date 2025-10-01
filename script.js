// Loading
window.addEventListener("load", () => {
    document.getElementById("loading-screen").style.display = "none";
    loadReviews(); // Carrega avaliações salvas
});

// Função para abas principais
document.querySelectorAll(".tabs > .tab-buttons .tab-button").forEach(btn => {
    btn.addEventListener("click", () => {
        const tab = btn.dataset.tab;

        // desativa todos os botões do mesmo grupo
        btn.parentElement.querySelectorAll(".tab-button").forEach(b => b.classList.remove("active"));
        // ativa botão clicado
        btn.classList.add("active");

        // desativa todos conteúdos de mesmo nível
        document.querySelectorAll(".tabs > .tab-content").forEach(tc => tc.classList.remove("active"));
        // ativa a aba correspondente
        document.getElementById(tab).classList.add("active");
    });
});

// Função para subtabs do cardápio
document.querySelectorAll(".menu-subtabs .tab-button").forEach(btn => {
    btn.addEventListener("click", () => {
        const tab = btn.dataset.tab;

        btn.parentElement.querySelectorAll(".tab-button").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        // pega só os tab-content dentro do cardápio
        document.querySelectorAll("#menu .tab-content").forEach(tc => tc.classList.remove("active"));
        document.getElementById(tab).classList.add("active");
    });
});

// Rádio
const playBtn = document.getElementById("play-pause-btn");
const radio = document.getElementById("lanchonete-radio");
radio.src = "https://stream.zeno.fm/si5xey7akartv.mp3";
playBtn.addEventListener("click", () => {
    if (radio.paused) {
        radio.play();
        playBtn.textContent = "⏸️";
    } else {
        radio.pause();
        playBtn.textContent = "▶️";
    }
});

// Carrinho - Melhorado com remoção de itens e troco
let cart = [];

function showNotification(message) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.style.display = 'block';
    setTimeout(() => {
        notification.style.display = 'none';
    }, 3000);
}

function openCart() {
    document.getElementById("cart-modal").style.display = "flex";
    renderCart();
}

function closeCart() {
    document.getElementById("cart-modal").style.display = "none";
}

function addToCart(item, price) {
    cart.push({ item, price });
    renderCart();
    showNotification(`${item} adicionado ao carrinho!`);
}

function removeFromCart(index) {
    cart.splice(index, 1);
    renderCart();
}

function renderCart() {
    let container = document.getElementById("cart-items");
    container.innerHTML = "";
    let total = 0;
    cart.forEach((c, index) => {
        total += c.price;
        container.innerHTML += `
            <p>
                ${c.item} - R$ ${c.price.toFixed(2)}
                <button class="remove-btn" onclick="removeFromCart(${index})">Remover</button>
            </p>
        `;
    });
    document.getElementById("cart-total-price").innerText = "R$ " + total.toFixed(2);
    document.getElementById("cart-count").innerText = cart.length;
}

// Listener para mostrar/ocultar seção de troco
document.querySelectorAll('input[name="pagamento"]').forEach(radio => {
    radio.addEventListener('change', () => {
        const trocoSection = document.getElementById('troco-section');
        const trocoInput = document.getElementById('troco');
        if (radio.value === 'Dinheiro') {
            trocoSection.style.display = 'block';
            trocoInput.focus(); // Foco no mobile para facilitar
        } else {
            trocoSection.style.display = 'none';
            trocoInput.value = '';
        }
    });
});

function copyPIX() {
    navigator.clipboard.writeText('10738419605').then(() => {
        alert('Chave PIX copiada!');
    });
}

function checkout() {
    if (cart.length === 0) {
        alert("Carrinho vazio!");
        return;
    }
    let pagamento = document.querySelector("input[name='pagamento']:checked").value;
    let rua = document.getElementById("rua").value;
    let numero = document.getElementById("numero").value;
    let bairro = document.getElementById("bairro").value;
    let troco = document.getElementById("troco").value;
    let text = "Olá! Gostaria de fazer o pedido:\n";
    let total = 0;
    cart.forEach(c => {
        text += `- ${c.item} - R$ ${c.price.toFixed(2)}\n`;
        total += c.price;
    });
    text += `\nTotal: R$ ${total.toFixed(2)}\nPagamento: ${pagamento}`;
    if (pagamento === 'Dinheiro' && troco) {
        text += `\nTroco para: R$ ${parseFloat(troco).toFixed(2)}`;
    }
    if (rua || numero || bairro) {
        text += `\nEndereço: ${rua}, ${numero} - ${bairro}`;
    }
    if (pagamento === "PIX") {
        text += `\nChave PIX: 10738419605`;
    }
    window.open("https://wa.me/5534999537698?text=" + encodeURIComponent(text), "_blank");
    closeCart(); // Fecha o modal após envio
}

// Funcionalidade para Avaliações
let reviews = JSON.parse(localStorage.getItem('reviews')) || [];

function loadReviews() {
    const container = document.getElementById('reviews-list');
    if (reviews.length === 0) {
        container.innerHTML = '<p>Ainda sem avaliações. Seja o primeiro!</p>';
        return;
    }
    container.innerHTML = '';
    reviews.forEach(review => {
        const stars = '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating);
        container.innerHTML += `
            <div class="review-item">
                <div class="review-stars">${stars}</div>
                <p class="review-comment">${review.comment}</p>
                <small>Data: ${review.date}</small>
            </div>
        `;
    });
}

document.getElementById('reviewForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const rating = document.querySelector('input[name="rating"]:checked').value;
    const comment = document.getElementById('comment').value;
    const date = new Date().toLocaleDateString('pt-BR');
    reviews.push({ rating: parseInt(rating), comment, date });
    localStorage.setItem('reviews', JSON.stringify(reviews));
    loadReviews();
    document.getElementById('reviewForm').reset();
    alert('Avaliação enviada com sucesso!');
});