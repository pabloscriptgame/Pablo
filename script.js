// script.js - Funcionalidades para DêGusto Lanchonete (versão corrigida e atualizada). Corrigidos bugs de modal ajuda e add to cart. Adicionadas validações extras, SEO via ARIA e notificações melhoradas.

document.addEventListener('DOMContentLoaded', function() {
    console.log('Site DêGusto carregado - Versão Atualizada 26/10/2025'); // Debug para confirmar carregamento

    // Função de sanitização básica para prevenir XSS
    function sanitizeInput(input) {
        const div = document.createElement('div');
        div.textContent = input;
        return div.innerHTML;
    }

    // Mobile menu toggle
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    if (mobileToggle && mainNav) {
        mobileToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
        });
    }

    // Tab switching for menu - Corrigido para garantir ativação
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanels = document.querySelectorAll('.tab-panel');
    tabButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            const targetTab = button.dataset.tab;
            const targetPanel = document.getElementById(targetTab);

            if (!targetPanel) {
                console.warn('Tab panel não encontrado:', targetTab);
                return;
            }

            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanels.forEach(panel => panel.classList.remove('active'));

            button.classList.add('active');
            targetPanel.classList.add('active');
            console.log('Tab ativado:', targetTab); // Debug
        });
    });

    // Inicializar primeira tab
    if (tabPanels.length > 0) {
        tabPanels[0].classList.add('active');
    }

    // Cart functionality - Corrigido com logs de debug e validações
    let cart = [];
    try {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            cart = JSON.parse(storedCart).filter(item =>
                item && item.name && typeof item.price === 'number' && item.price > 0 && typeof item.quantity === 'number' && item.quantity > 0
            );
            localStorage.setItem('cart', JSON.stringify(cart));
        }
    } catch (e) {
        console.error('Erro ao carregar carrinho:', e);
        localStorage.removeItem('cart');
        cart = [];
    }

    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartCount = document.getElementById('cart-count');
    const cartModal = document.getElementById('cart-modal');
    const openCartModal = document.getElementById('open-cart-modal');
    const closeCartModal = document.getElementById('close-cart-modal');
    const checkoutButton = document.getElementById('checkout-button');
    const clearCartButton = document.getElementById('clear-cart');
    const modalCartItems = document.getElementById('modal-cart-items');
    const modalTotal = document.getElementById('modal-total');

    function updateCartCount() {
        const count = cart.reduce((sum, item) => sum + (item.quantity || 0), 0);
        if (cartCount) cartCount.textContent = count;
        console.log('Carrinho atualizado - Itens:', count); // Debug
    }

    function renderCart() {
        if (!modalCartItems) return;
        modalCartItems.innerHTML = '';
        let total = 0;

        cart.forEach((item, index) => {
            if (!item || !item.name) return; // Validação extra
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item-modal');
            const safeName = sanitizeInput(item.name);
            cartItem.innerHTML = `
                <span>${safeName} (x${item.quantity}) - R$ ${ (item.price * item.quantity).toFixed(2) }</span>
                <button type="button" onclick="removeFromCart(${index})" aria-label="Remover ${safeName}">Remover</button>
            `;
            modalCartItems.appendChild(cartItem);
            total += item.price * item.quantity;
        });

        if (modalTotal) modalTotal.textContent = `Total: R$ ${total.toFixed(2)}`;
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    window.removeFromCart = function(index) {
        if (index >= 0 && index < cart.length) {
            const removedName = cart[index].name;
            cart.splice(index, 1);
            renderCart();
            updateCartCount();
            showNotification(`Item "${removedName}" removido!`, 'success');
        }
    };

    // Add to cart - Corrigido com event delegation e debug
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('add-to-cart')) {
            const button = e.target;
            const item = button.closest('.item');
            if (!item) {
                showNotification('Erro: Item não encontrado.', 'error');
                return;
            }

            const name = item.dataset.name;
            const priceStr = item.dataset.price;
            if (!name || !priceStr) {
                showNotification('Erro: Dados do item inválidos.', 'error');
                return;
            }

            const price = parseFloat(priceStr);
            if (isNaN(price) || price <= 0) {
                showNotification('Erro: Preço inválido.', 'error');
                return;
            }

            const safeName = sanitizeInput(name);
            const existingItem = cart.find(cItem => cItem.name === safeName);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({ name: safeName, price, quantity: 1 });
            }

            updateCartCount();
            showNotification(`"${safeName}" adicionado ao carrinho!`, 'success');
            console.log('Item adicionado:', safeName); // Debug
        }
    });

    // Open cart modal - Corrigido
    if (openCartModal) {
        openCartModal.addEventListener('click', function(e) {
            e.preventDefault();
            if (cartModal) {
                cartModal.style.display = 'flex';
                cartModal.setAttribute('aria-hidden', 'false');
                renderCart();
                console.log('Carrinho aberto'); // Debug
            }
        });
    }

    // Close cart modal - Corrigido
    if (closeCartModal) {
        closeCartModal.addEventListener('click', function(e) {
            e.preventDefault();
            if (cartModal) {
                cartModal.style.display = 'none';
                cartModal.setAttribute('aria-hidden', 'true');
            }
        });
    }

    // Checkout button
    if (checkoutButton) {
        checkoutButton.addEventListener('click', function(e) {
            e.preventDefault();
            if (cartModal) cartModal.style.display = 'none';
            const checkoutModal = document.getElementById('checkout-modal');
            if (checkoutModal) {
                checkoutModal.style.display = 'flex';
                checkoutModal.setAttribute('aria-hidden', 'false');
                const checkoutTotal = document.getElementById('checkout-total');
                if (checkoutTotal && modalTotal) {
                    checkoutTotal.textContent = modalTotal.textContent;
                }
            }
        });
    }

    // Clear cart com confirmação
    if (clearCartButton) {
        clearCartButton.addEventListener('click', function(e) {
            e.preventDefault();
            if (confirm('Limpar todo o carrinho? Esta ação não pode ser desfeita.')) {
                cart = [];
                localStorage.removeItem('cart');
                renderCart();
                updateCartCount();
                showNotification('Carrinho limpo com sucesso!', 'success');
            }
        });
    }

    // Checkout form - Atualizado com validação em tempo real
    const checkoutForm = document.getElementById('checkout-form');
    const checkoutModal = document.getElementById('checkout-modal');
    const closeCheckoutModal = document.getElementById('close-checkout-modal');
    const paymentRadios = document.querySelectorAll('input[name="pagamento"]');
    const trocoDiv = document.getElementById('troco-div');
    const pixDetails = document.getElementById('pix-details');
    const couponInput = document.getElementById('coupon-input');
    const couponApplyBtn = document.getElementById('coupon-apply-btn');
    const couponStatus = document.getElementById('coupon-status');
    const submitPedido = document.getElementById('submit-pedido');
    let discount = 0;

    // Pagamento radios
    if (paymentRadios.length > 0) {
        paymentRadios.forEach(radio => {
            radio.addEventListener('change', () => {
                const value = radio.value;
                if (trocoDiv) trocoDiv.style.display = value === 'Dinheiro' ? 'block' : 'none';
                if (pixDetails) pixDetails.style.display = value === 'PIX' ? 'block' : 'none';
            });
        });
    }

    // Cupom - Corrigido
    if (couponApplyBtn && couponInput && couponStatus) {
        couponApplyBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const code = sanitizeInput(couponInput.value.toUpperCase().trim());
            if (code === 'DEGUST0') {
                discount = 0.05;
                couponStatus.textContent = '✅ Cupom aplicado! 5% OFF no total.';
                couponStatus.style.color = '#4caf50';
                updateCheckoutTotal();
                showNotification('Desconto de 5% ativado!', 'success');
                couponInput.value = '';
            } else {
                couponStatus.textContent = '❌ Cupom inválido. Use DEGUSTO5.';
                couponStatus.style.color = '#ff4500';
                discount = 0;
                showNotification('Cupom não válido. Tente DEGUSTO5.', 'error');
            }
        });
    }

    function updateCheckoutTotal() {
        const subtotalText = modalTotal ? modalTotal.textContent.replace('Total: R$ ', '') : '0';
        const subtotal = parseFloat(subtotalText) || 0;
        const total = subtotal * (1 - discount);
        const checkoutTotal = document.getElementById('checkout-total');
        if (checkoutTotal) {
            checkoutTotal.textContent = `Total com desconto: R$ ${total.toFixed(2)}`;
        }
    }

    // Submit form - Atualizado
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Validações
            const nome = sanitizeInput(document.getElementById('nome-cliente').value.trim());
            const rua = sanitizeInput(document.getElementById('rua').value.trim());
            const numero = sanitizeInput(document.getElementById('numero').value.trim());
            const bairro = sanitizeInput(document.getElementById('bairro').value.trim());
            const pagamento = document.querySelector('input[name="pagamento"]:checked');
            const observacoes = sanitizeInput(document.getElementById('observacoes').value.trim());
            const referencia = sanitizeInput(document.getElementById('referencia').value.trim());
            const trocoValue = document.getElementById('troco').value;

            if (!nome || nome.length < 2) {
                showNotification('Nome inválido - digite pelo menos 2 letras.', 'error');
                return;
            }
            if (!rua || rua.length < 2 || !numero || !bairro || bairro.length < 2) {
                showNotification('Endereço incompleto - verifique rua, número e bairro.', 'error');
                return;
            }
            if (!pagamento) {
                showNotification('Selecione uma forma de pagamento.', 'error');
                return;
            }
            if (cart.length === 0) {
                showNotification('Carrinho vazio - adicione itens primeiro!', 'error');
                return;
            }

            // Mensagem WhatsApp
            let message = `Olá DêGusto! Pedido de Delivery em Monte Carmelo:\n\n`;
            cart.forEach(item => {
                message += `${item.name} (x${item.quantity}) - R$ ${(item.price * item.quantity).toFixed(2)}\n`;
            });
            message += `\nSubtotal: R$ ${parseFloat(modalTotal.textContent.replace('Total: R$ ', '')) || 0}\n`;
            if (discount > 0) {
                const desc = parseFloat(modalTotal.textContent.replace('Total: R$ ', '')) * 0.05;
                message += `Desconto 5%: -R$ ${desc.toFixed(2)}\n`;
            }
            message += `Total Final: R$ ${document.getElementById('checkout-total').textContent.replace('Total com desconto: R$ ', '')}\n\n`;
            message += `Cliente: ${nome}\nEndereço: ${rua}, ${numero} - ${bairro}`;
            if (referencia) message += ` (Ref: ${referencia})`;
            message += `\nPagamento: ${pagamento.value}`;
            if (pagamento.value === 'Dinheiro' && trocoValue) {
                message += ` (Troco para R$ ${parseFloat(trocoValue).toFixed(2)})`;
            }
            message += `\nObservações: ${observacoes || 'Nenhuma'}\n\nAguardando confirmação! 😊`;

            const whatsappNumber = '5534999537698';
            const whatsappURL = `https://wa.me/${5534999537698}?text=${encodeURIComponent(message)}`;
            window.open(whatsappURL, '_blank', 'noopener,noreferrer');

            showNotification('Pedido enviado! Verifique WhatsApp para confirmação.', 'success');
            checkoutForm.reset();
            if (checkoutModal) {
                checkoutModal.style.display = 'none';
                checkoutModal.setAttribute('aria-hidden', 'true');
            }
            cart = [];
            localStorage.removeItem('cart');
            updateCartCount();
            discount = 0;
            updateCheckoutTotal();
        });
    }

    if (closeCheckoutModal) {
        closeCheckoutModal.addEventListener('click', function(e) {
            e.preventDefault();
            if (checkoutModal) {
                checkoutModal.style.display = 'none';
                checkoutModal.setAttribute('aria-hidden', 'true');
            }
        });
    }

    // PIX copy - Corrigido
    const copyPixBtn = document.getElementById('copy-pix-btn');
    if (copyPixBtn) {
        copyPixBtn.addEventListener('click', function(e) {
            e.preventDefault();
            navigator.clipboard.writeText('10738419605').then(() => {
                showNotification('Chave PIX copiada! Envie comprovante após pedido.', 'success');
            }).catch(() => {
                showNotification('Erro ao copiar - use: 10738419605', 'error');
            });
        });
    }

    // Help modal - CORRIGIDO com event listeners diretos e debug
    const helpButton = document.getElementById('help-button');
    const helpModal = document.getElementById('help-modal');
    const closeHelpModal = document.getElementById('close-help-modal');

    if (helpButton && helpModal) {
        helpButton.addEventListener('click', function(e) {
            e.preventDefault();
            helpModal.style.display = 'flex';
            helpModal.setAttribute('aria-hidden', 'false');
            console.log('Ajuda aberta - sucesso!'); // Debug
            helpButton.blur(); // Remove foco para acessibilidade
        });
        helpButton.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                helpButton.click();
            }
        });
    }

    if (closeHelpModal && helpModal) {
        closeHelpModal.addEventListener('click', function(e) {
            e.preventDefault();
            helpModal.style.display = 'none';
            helpModal.setAttribute('aria-hidden', 'true');
            console.log('Ajuda fechada'); // Debug
        });
        closeHelpModal.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                closeHelpModal.click();
            }
        });
    }

    // Fechar modais com ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            [cartModal, checkoutModal, helpModal].forEach(modal => {
                if (modal && modal.style.display === 'flex') {
                    modal.style.display = 'none';
                    modal.setAttribute('aria-hidden', 'true');
                }
            });
        }
    });

    // Notification function - Adicionada classe error
    function showNotification(message, type = '') {
        const notification = document.getElementById('notification');
        if (notification) {
            notification.textContent = sanitizeInput(message);
            notification.className = `notification ${type}`;
            notification.style.display = 'block';
            setTimeout(() => {
                notification.style.display = 'none';
            }, 4000);
            console.log('Notificação:', message); // Debug
        }
    }

    // Inicialização - Garantir que tudo carregue
    updateCartCount();
    renderCart();
    console.log('Inicialização completa - Carrinho pronto, modais testados.'); // Debug final
});