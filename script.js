document.addEventListener('DOMContentLoaded', () => {
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            const cartCount = document.getElementById('cart-count');
            const notification = document.getElementById('notification');
            const pagamentoRadios = document.querySelectorAll('input[name="pagamento"]');
            const trocoDiv = document.getElementById('troco-div');
            const pixDetails = document.getElementById('pix-details');
            const checkoutForm = document.getElementById('checkout-form');
            const modal = document.getElementById('cart-modal');
            const openModalBtn = document.getElementById('open-cart-modal');
            const closeModal = document.querySelector('#cart-modal .close-modal');
            const modalCartItems = document.getElementById('modal-cart-items');
            const modalTotal = document.getElementById('modal-total');
            const clearCartBtn = document.getElementById('clear-cart');
            const checkoutButton = document.getElementById('checkout-button');
            const mobileToggle = document.querySelector('.mobile-menu-toggle');
            const mainNav = document.querySelector('.main-nav');
            const helpButton = document.getElementById('help-button');
            const helpModal = document.getElementById('help-modal');
            const closeHelpModal = document.querySelector('#help-modal .close-modal');
            const checkoutTotal = document.getElementById('checkout-total');
            const radio = document.getElementById("radio-audio");
            const playBtn = document.getElementById("play-btn");
            const pauseBtn = document.getElementById("pause-btn");
            const vuMeter = document.getElementById("vu-meter");

            function formatCurrency(value) {
                return 'R$ ' + parseFloat(value).toFixed(2).replace('.', ',');
            }

            function updateCartButton() { cartCount.textContent = cart.length; }

            function calculateTotal() { return cart.reduce((sum, i) => sum + parseFloat(i.price), 0); }

            function updateCheckoutTotal() {
                const total = calculateTotal();
                checkoutTotal.textContent = `Total: ${formatCurrency(total)}`;
                modalTotal.textContent = `Total: ${formatCurrency(total)}`;
            }

            function populateModal() {
                modalCartItems.innerHTML = '';
                const total = calculateTotal();
                if (cart.length === 0) {
                    modalCartItems.innerHTML = '<p style="text-align:center;color:#ccc;padding:20px;">🛒 Carrinho vazio!</p>';
                    modalTotal.textContent = 'R$ 0,00';
                    checkoutButton.style.display = 'none';
                } else {
                    cart.forEach((item, index) => {
                        const div = document.createElement('div');
                        div.classList.add('cart-item-modal');
                        div.innerHTML = `<span>${item.name} - ${formatCurrency(item.price)}</span>
                                 <button onclick="removeFromCart(${index})">Remover</button>`;
                        modalCartItems.appendChild(div);
                    });
                    modalTotal.textContent = `Total: ${formatCurrency(total)}`;
                    checkoutButton.style.display = 'block';
                }
                updateCheckoutTotal();
            }

            document.querySelectorAll('.add-to-cart').forEach(button => {
                button.addEventListener('click', e => {
                    const item = e.target.closest('.item');
                    const name = item.dataset.name;
                    const price = item.dataset.price;
                    cart.push({ name, price });
                    localStorage.setItem('cart', JSON.stringify(cart));
                    updateCartButton();
                    updateCheckoutTotal();
                    showNotification(`${name} adicionado!`, 'success');
                });
            });

            window.removeFromCart = index => {
                cart.splice(index, 1);
                localStorage.setItem('cart', JSON.stringify(cart));
                updateCartButton();
                populateModal();
                showNotification('Item removido.');
            };

            clearCartBtn.addEventListener('click', () => {
                if (confirm('Limpar o carrinho?')) {
                    cart.length = 0;
                    localStorage.setItem('cart', JSON.stringify(cart));
                    updateCartButton();
                    populateModal();
                    showNotification('Carrinho limpo!');
                }
            });

            function showNotification(message, type = '') {
                notification.textContent = message;
                notification.className = `notification ${type}`;
                notification.style.display = 'block';
                setTimeout(() => notification.style.display = 'none', 3000);
            }

            openModalBtn.addEventListener('click', () => {
                populateModal();
                modal.style.display = 'flex';
            });
            closeModal.addEventListener('click', () => modal.style.display = 'none');
            checkoutButton.addEventListener('click', () => {
                modal.style.display = 'none';
                checkoutForm.style.display = 'flex';
                updateCheckoutTotal();
            });

            document.querySelector('#checkout-form .close-modal').addEventListener('click', () => {
                checkoutForm.style.display = 'none';
            });

            pagamentoRadios.forEach(radioBtn => {
                radioBtn.addEventListener('change', () => {
                    trocoDiv.style.display = radioBtn.value === 'Dinheiro' ? 'block' : 'none';
                    pixDetails.style.display = radioBtn.value === 'PIX' ? 'block' : 'none';
                });
            });

            window.copyPix = () => {
                navigator.clipboard.writeText('10738419605')
                    .then(() => showNotification('PIX copiado!'))
                    .catch(() => showNotification('Erro ao copiar PIX.'));
            };

            // 🧾 Enviar pedido + salvar no GitHub
            checkoutForm.addEventListener('submit', async(e) => {
                        e.preventDefault();
                        if (cart.length === 0) return showNotification('Carrinho vazio!');
                        const pagamento = document.querySelector('input[name="pagamento"]:checked');
                        if (!pagamento) return showNotification('Selecione pagamento!');

                        const rua = document.getElementById('rua').value;
                        const numero = document.getElementById('numero').value;
                        const bairro = document.getElementById('bairro').value;
                        const referencia = document.getElementById('referencia').value;
                        const metodo = pagamento.value;
                        const troco = document.getElementById('troco').value || '';
                        if (!rua || !numero || !bairro) return showNotification('Endereço incompleto!');

                        const total = calculateTotal();
                        const pedidoTxt = `
🧾 NOVO PEDIDO DÊGUSTO
----------------------------
${cart.map(i => `• ${i.name} - ${formatCurrency(i.price)}`).join('\n')}
----------------------------
💰 Total: ${formatCurrency(total)}
📍 Rua ${rua}, Nº ${numero}, Bairro ${bairro}
Ref: ${referencia || '---'}
💳 Pagamento: ${metodo}${metodo === 'Dinheiro' && troco ? ` (Troco para R$ ${troco})` : ''}
📅 ${new Date().toLocaleString('pt-BR')}
----------------------------
`;

        // Abre WhatsApp
        const whatsappUrl = `https://wa.me/+5534999537698?text=${encodeURIComponent(pedidoTxt)}`;
        window.open(whatsappUrl, '_blank');

        // Salva local e envia pro GitHub
        let pedidosSalvos = localStorage.getItem("pedidosTexto") || "";
        pedidosSalvos += `\n\n${pedidoTxt}`;
        localStorage.setItem("pedidosTexto", pedidosSalvos);

        try {
            const resp = await fetch("https://api.github.com/repos/pabloscriptgame/Pablo/contents/pedidos.txt", {
                method: "PUT",
                headers: {
                    "Authorization": "token SEU_TOKEN_GITHUB_AQUI",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    message: "Novo pedido adicionado",
                    content: btoa(pedidosSalvos),
                    sha: localStorage.getItem("shaArquivoPedidos") || undefined
                })
            });
            const data = await resp.json();
            if (data.content?.sha) localStorage.setItem("shaArquivoPedidos", data.content.sha);
            showNotification('Pedido salvo no GitHub!', 'success');
        } catch (err) {
            console.error(err);
            showNotification('Erro ao salvar no GitHub.');
        }

        // Limpa tudo
        cart.length = 0;
        localStorage.setItem('cart', JSON.stringify(cart));
        checkoutForm.reset();
        checkoutForm.style.display = 'none';
        populateModal();
        updateCartButton();
    });

    helpButton.addEventListener('click', () => helpModal.style.display = 'flex');
    closeHelpModal.addEventListener('click', () => helpModal.style.display = 'none');
    mobileToggle.addEventListener('click', () => mainNav.classList.toggle('active'));
    updateCartButton();
    populateModal();

    (function () {
        if (!radio || !playBtn || !pauseBtn || !vuMeter) return;
        playBtn.addEventListener('click', () => { radio.play(); vuMeter.style.display = 'flex'; });
        pauseBtn.addEventListener('click', () => { radio.pause(); vuMeter.style.display = 'none'; });
        radio.pause(); vuMeter.style.display = 'none';
    })();
});