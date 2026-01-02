// script3.js - Versão aprimorada com opção clara de ver todo o cardápio

// Funções auxiliares de formatação (já existentes ou adaptadas)
function formatCategoryTitle(title) {
    return `<strong style="color:#e63946; font-size:1.2em;">${title}</strong>`;
}

function formatItemLine(item) {
    let line = `• <strong>${item.name}</strong> — R$ ${item.price.toFixed(2)}`;
    if (item.desc) {
        line += ` <small style="color:#555;">(${item.desc})</small>`;
    }
    return line;
}

function showFullMenuInChat() {
    let message = `
        <div style="background:#1a1a1a; padding:12px; border-radius:8px; margin:8px 0;">
            <h3 style="margin:0; color:#ff4d4d; text-align:center;">🍔 CARDÁPIO COMPLETO DÊGUSTO 2026 🍔</h3>
        </div>
    `;

    Object.keys(menuData).forEach(category => {
        const cat = menuData[category];
        message += `<br>${formatCategoryTitle(cat.title)}<br><br>`;

        cat.items.forEach(item => {
            message += formatItemLine(item) + "<br>";
        });

        message += "<br>";
    });

    message += `
        <div style="margin-top:15px; padding:10px; background:#2d2d2d; border-radius:6px;">
            <strong>Como pedir?</strong><br>
            • Basta escrever o nome do item (ex: "x-costela", "jantinha", "coca 2l")<br>
            • Pode pedir quantidade (ex: "3 x-tudo" ou "x-bacon 2")<br>
            • Digite <strong>"carrinho"</strong> para ver o que já pediu<br>
            • Digite <strong>"finalizar"</strong> quando quiser fechar o pedido!
        </div>
    `;

    return message;
}

// Função principal de resposta do bot (substitua a botResp atual por esta)
function improvedBotResponse(message) {
    const text = message.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    let quantity = 1;
    const quantityMatch = text.match(/(\d+)/);
    if (quantityMatch) quantity = parseInt(quantityMatch[1]);

    // ── Comandos principais ─────────────────────────────────────────────
    if (text.match(/oi|ola|bom dia|boa tarde|boa noite|hey|e aí/i)) {
        return `
            👋 Olá, tudo bem? Bem-vindo(a) ao <strong>DêGusto</strong>! 😄<br><br>
            Quer ver o <strong>cardápio completo</strong> agora?<br>
            É só dizer:<br>
            • "cardápio"<br>
            • "menu"<br>
            • "ver cardápio"<br>
            • "mostra tudo"
        `;
    }

    // Mostrar cardápio completo (várias formas naturais de pedir)
    if (
        text.includes("cardapio") ||
        text.includes("menu") ||
        text.includes("lista") ||
        text.includes("ver cardapio") ||
        text.includes("mostra cardapio") ||
        text.includes("cardapio completo") ||
        text.includes("todos os lanches") ||
        text.match(/tudo|completo/i) && text.includes("lanche")
    ) {
        return showFullMenuInChat();
    }

    // Horário
    if (text.includes("horario") || text.includes("funciona") || text.includes("abre") || text.includes("fecha")) {
        return "🕖 Delivery todos os dias a partir das <strong>19h</strong>! 🌙<br>Até mais tarde! 😊";
    }

    // Categorias rápidas (opcional - pode manter ou remover)
    if (text.includes("hamburgue") || text.includes("x-")) {
        return showCategoryInChat("hamburgueres"); // se você ainda mantiver essa função
    }
    if (text.includes("combo")) {
        return showCategoryInChat("combo");
    }
    // ... outras categorias se desejar

    // Busca por produto específico
    let found = null;
    for (const cat in menuData) {
        for (const item of menuData[cat].items) {
            const normName = item.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            if (normName.includes(text) || text.includes(normName)) {
                found = item;
                break;
            }
        }
        if (found) break;
    }

    if (found) {
        if (text.includes("quanto") || text.includes("preco") || text.includes("valor")) {
            return `${found.name} está custando <strong>R$ ${found.price.toFixed(2)}</strong> hoje! 🔥<br>Quer adicionar?`;
        }

        addToCart(found.name, found.price, quantity);
        return `
            ${quantity > 1 ? quantity + '× ' : ''}<strong>${found.name}</strong> adicionado ao carrinho! ✓<br><br>
            Deseja mais alguma coisa? 😋
        `;
    }

    // Carrinho e finalizar
    if (text.includes("carrinho") || text.includes("ver carrinho")) {
        openModal('cartModal');
        return "🛒 Seu carrinho foi aberto! Dá uma olhada e finalize quando quiser!";
    }

    if (text.includes("finalizar") || text.includes("fechar pedido") || text.includes("pedir")) {
        openCheckout();
        return "✅ Vamos finalizar seu pedido agora! 🚀";
    }

    // Resposta padrão + sugestão forte para ver cardápio
    return `
        Hmm... não entendi direito o que você quis dizer 😅<br><br>
        <strong>Que tal ver nosso cardápio completo?</strong><br>
        É só escrever:<br>
        • cardápio<br>
        • menu<br>
        • ver tudo<br><br>
        Pode mandar o nome do lanche também que eu já adiciono pra você! 🍔
    `;
}

// Exporta para usar no script principal (se estiver usando módulos)
// ou simplesmente substitua a função botResp atual por:
function botResp(m) {
    return improvedBotResponse(m);
}