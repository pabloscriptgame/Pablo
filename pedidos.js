import pedidosFeitos from './pedidosfeitos.js';

document.addEventListener('DOMContentLoaded', () => {
    const ordersList = document.getElementById('orders-list');
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');

    // Renderizar pedidos
    function renderOrders() {
        ordersList.innerHTML = '';
        if (pedidosFeitos.length === 0) {
            ordersList.innerHTML = '<p style="text-align: center; color: #666;">Nenhum pedido registrado.</p>';
            return;
        }

        pedidosFeitos.forEach(order => {
            const orderDiv = document.createElement('div');
            orderDiv.classList.add('order-item');
            const date = new Date(order.timestamp).toLocaleString('pt-BR', {
                dateStyle: 'short',
                timeStyle: 'short'
            });
            orderDiv.innerHTML = `
                <h3>Pedido em ${date}</h3>
                <pre>${order.details}</pre>
            `;
            ordersList.appendChild(orderDiv);
        });
    }

    // Menu mobile
    mobileToggle.addEventListener('click', () => {
        mainNav.classList.toggle('active');
    });

    // Inicializar
    renderOrders();
});