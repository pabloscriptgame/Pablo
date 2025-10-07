// Carregar pedidos do JSON para o painel
if (document.getElementById('pedidos-lista')) { // Verifica se é a página do painel
    fetch('pedidos.json')
        .then(response => response.json())
        .then(orders => {
                const lista = document.getElementById('pedidos-lista');
                if (orders.length === 0) {
                    lista.innerHTML = '<p>Nenhum pedido ainda.</p>';
                } else {
                    orders.forEach(order => {
                                const div = document.createElement('div');
                                div.classList.add('pedido-item'); // Adicione CSS se precisar
                                div.innerHTML = `
                        <p><strong>Data:</strong> ${new Date(order.timestamp).toLocaleString('pt-BR')}</p>
                        <p><strong>Total:</strong> R$ ${order.total.toFixed(2).replace('.', ',')}</p>
                        <p><strong>Endereço:</strong> ${order.address}</p>
                        <p><strong>Pagamento:</strong> ${order.payment}</p>
                        <ul>${order.items.map(item => `<li>${item.name} x${item.quantity}</li>`).join('')}</ul>
                    `;
                    lista.appendChild(div);
                });
            }
        })
        .catch(() => {
            document.getElementById('pedidos-lista').innerHTML = '<p>Erro ao carregar pedidos.</p>';
        });
}