// script.js - DêGusto Lanchonete Premium 2026 - VERSÃO FINAL COMPLETA COM BUSCA GLOBAL APRIMORADA (CONFIGURAÇÕES NORMAIS FORA DA BUSCA)
// Apenas melhorei a busca para pesquisar em TODO o cardápio + descrições, com visão limpa de resultados, botão limpar e inclusão dos Caldinhos.

let cart = JSON.parse(localStorage.getItem('degusto_cart')) || [];
let caldosQuantities = {};
let currentCategory = Object.keys(menuData)[0];
const phoneNumber = "5534999537698";
const pixKey = "10738419605";
const logoUrl = "https://i.ibb.co/DPDZb4W1/Gemini-Generated-Image-40opkn40opkn40op-Photoroom.png";

// CONFIGURAÇÃO DELIVERY GRÁTIS
const FREE_DELIVERY_MIN = 25.00;
const DELIVERY_FEE = 5.00;

// =============================================
// DETECÇÃO DE iOS
// =============================================
function isIOS() {
    return /iPad|iPhone|iPod/.test(navigator.platform) ||
        (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
}

// =============================================
// MENU DATA
// =============================================
const menuData = {
    hamburgueres: {
        title: "🍔 Hambúrgueres",
        items: [
            { name: "X-DÊ-GUSTO", price: 28.00, img: "https://iili.io/fOXbiFI.png", desc: "Destaque 1ª" },
            { name: "X-Cheddar com Anéis", price: 26.00, img: "https://i.ibb.co/LDYypj6Q/20251031-205800.jpg" },
            { name: "X-Bacon Goiabada", price: 26.00, img: "https://i.ibb.co/4n86G96b/20251031-205913.jpg" },
            { name: "ESPECIAL TILÁPIA", price: 30.00, img: "https://i.ibb.co/7cYcLrD/IMG-20250924-WA0010.jpg" },
            { name: "ARTESANAL GOIABADA", price: 30.00, img: "https://i.ibb.co/4nfgvWGn/IMG-20250924-WA0009.jpg" },
            { name: "ESPECIAL STEAK", price: 30.00, img: "https://i.ibb.co/MxtW5hX2/IMG-20250928-WA0026.jpg" },
            { name: "ARTESANAL CLÁSSICO", price: 28.00, img: "https://i.ibb.co/0pRMs7CM/20251004-235952.jpg" },
            { name: "ARTESANAL DORITOS", price: 30.00, img: "https://i.ibb.co/ZpvH013t/20251004-235135.jpg" },
            { name: "ARTESANAL DUPLO", price: 35.00, img: "https://i.ibb.co/JR70qRfW/20251004-235417.jpg" },
            { name: "X-BOLO GIGANTE", price: 42.00, img: "https://i.ibb.co/23rd6PGY/20251004-235801.jpg" },
            { name: "X-TUDO", price: 22.00, img: "https://i.ibb.co/Z1d5Q46K/x-tudo.png" },
            { name: "X-BACON", price: 22.00, img: "https://i.ibb.co/Pv8DLymw/IMG-20251004-WA0057.jpg" },
            { name: "X-CALABRESA", price: 22.00, img: "https://i.ibb.co/4wFq4fLJ/IMG-20251004-WA0058.jpg" },
            { name: "X-CHEDDAR", price: 22.00, img: "https://i.ibb.co/TMWKbdX5/IMG-20251004-WA0056.jpg" }
        ]
    },
    combo: {
        title: "🔥 Combos",
        items: [
            { name: "COMBO FAMÍLIA", price: 50.00, img: "https://i.ibb.co/d4txStn2/combo-5.png", desc: "2 X-Tudo + 2 refri 200ml" },
            { name: "Combo: X-Saladas + 1 Batata P", price: 32.00, img: "https://i.ibb.co/dJW3mXxR/combo-3.png", desc: "-" },
            { name: "Combo: Artesanal + Batata + Refri 200ml", price: 38.00, img: "https://i.ibb.co/KzLhFRrj/combo-1.png", desc: "-" },
            { name: "Combo: 2 X-Duplo", price: 46.00, img: "https://iili.io/fjgwEwx.jpg", desc: "-" },
            { name: "Combo: 2 X-Tudo + 2 Refrigerantes + 2 Batatas Fritas", price: 70.00, img: "https://i.ibb.co/GvY9F6kP/combo-2.png", desc: "-" },
            { name: "Combo: X-Salada + Batata Frita", price: 20.00, img: "https://iili.io/fjgOiTG.jpg", desc: "-" },
            { name: "Combo: X-Tudo + Batata Frita", price: 24.00, img: "https://iili.io/fjgk7xj.jpg", desc: "-" },
            { name: "Combo na Caixa: 2 X-tudo + Anel de Cebola + Batata Frita com Cheddar e Bacon + Steak de Frango + Molhos", price: 70.00, img: "https://iili.io/fjg8NSI.jpg", desc: "-" },
            { name: "Combo Familia: 3 X-Tudos", price: 60.00, img: "https://iili.io/fjgSYWG.jpg", desc: "-" },
            { name: "Super Combo: X-Tudo + Batata + Refri", price: 25.00, img: "https://iili.io/fjgU7kP.jpg", desc: "-" },
            { name: "Combo: 3 X-Tudos + 3 Refri 200ml", price: 65.00, img: "https://iili.io/fjgrasa.jpg", desc: "-" },
            { name: "Combo: Artesanal + Batata Frita e Crocantes", price: 20.00, img: "https://iili.io/fjgg5Pf.jpg", desc: "-" }
        ]
    },
    batatas: {
        title: "🍟 Batatas",
        items: [
            { name: "BATATA P", price: 15.00, img: "https://iili.io/fjgIomv.jpg" },
            { name: "BATATA M", price: 20.00, img: "https://iili.io/fjg5qOu.jpg" },
            { name: "BATATA G", price: 30.00, img: "https://iili.io/fjg5X5X.jpg" }
        ]
    },
    hotdogs: {
        title: "🌭 Hot Dogs",
        items: [
            { name: "Hot Dog 1", price: 10.00, img: "https://i.ibb.co/wFt4J1r5/dog1.png" },
            { name: "Hot Dog 2", price: 14.00, img: "https://i.ibb.co/hJph2sSL/dog-2-2.png" },
            { name: "Hot Dog Especial", price: 18.00, img: "https://i.ibb.co/Z6TSQVKx/dog-especial-degusto.png" }
        ]
    },
    bebidas: {
        title: "🥤 Bebidas",
        items: [
            { name: "COCA-COLA 2L", price: 14.00 },
            { name: "COCA-COLA 1L", price: 10.00 },
            { name: "COCA-COLA LATA", price: 5.00 },
            { name: "FANTA 2L", price: 12.00 },
            { name: "FANTA 1L", price: 10.00 },
            { name: "KUAT 2L", price: 10.00 },
            { name: "MINEIRO 2L", price: 12.00 },
            { name: "PITHULÁ", price: 3.00 }
        ]
    },
    molhos: {
        title: "🍯 Molhos",
        items: [
            { name: "Molho de Alho", price: 0.50, img: "https://iili.io/fOWUha2.png" }
        ]
    }
};

// =============================================
// FUNÇÃO PARA CRIAR CARD DE ITEM
// =============================================
function createItemCard(item) {
    const col = document.createElement('div');
    col.className = 'col-6 col-md-4 col-lg-3';

    const imgHtml = item.img ?
        `<img src="${item.img}" class="card-img-top" alt="${item.name}" loading="lazy" onclick="openImageModal('${item.img}')">` :
        `<div class="card-img-top bg-secondary d-flex align-items-center justify-content-center text-white fs-3" style="height: 220px;">🍔</div>`;

    col.innerHTML = `
        <div class="card h-100 shadow-sm border-0">
            ${imgHtml}
            <div class="card-body d-flex flex-column">
                <h5 class="card-title text-danger fw-bold">${item.name}</h5>
                ${item.desc ? `<p class="card-text text-muted small">${item.desc}</p>` : ''}
                <div class="mt-auto text-center">
                    <p class="text-danger fw-bold fs-3 mb-3">R$ ${item.price.toFixed(2)}</p>
                    <button class="btn btn-danger w-100 shadow-sm" onclick="addToCart('${item.name.replace(/'/g, "\\'")}', ${item.price})">
                        Adicionar 🛒
                    </button>
                </div>
            </div>
        </div>
    `;
    return col;
}

// =============================================
// RENDERIZAÇÃO DO CARDÁPIO
// =============================================
function renderTabs() {
    const tabButtons = document.getElementById('tab-buttons');
    const tabPanels = document.getElementById('tab-panels');
    tabButtons.innerHTML = '';
    tabPanels.innerHTML = '';

    Object.keys(menuData).forEach((key, index) => {
        const cat = menuData[key];

        const btn = document.createElement('button');
        btn.className = 'btn btn-outline-danger me-2 mb-2 px-4';
        btn.textContent = cat.title;
        btn.onclick = () => {
            currentCategory = key;
            showCategory(key);
        };
        tabButtons.appendChild(btn);

        const panel = document.createElement('div');
        panel.id = `panel-${key}`;
        panel.className = 'tab-panel row g-4';
        panel.style.display = index === 0 ? 'flex' : 'none';
        tabPanels.appendChild(panel);

        // Renderiza itens da categoria
        menuData[key].items.forEach(item => {
            panel.appendChild(createItemCard(item));
        });
    });

    // Botão especial Caldinhos
    const caldosBtn = document.createElement('button');
    caldosBtn.className = 'btn btn-success me-2 mb-2 px-4 fw-bold';
    caldosBtn.innerHTML = '🍲 2 Caldinhos + Torradas<br><small>R$ 22,00</small>';
    caldosBtn.onclick = openCaldosModal;
    tabButtons.appendChild(caldosBtn);

    currentCategory = Object.keys(menuData)[0];
    showCategory(currentCategory);
}

function showCategory(key) {
    currentCategory = key;
    const searchInput = document.getElementById('searchInput');
    const hasQuery = searchInput.value.trim() !== '';

    if (!hasQuery) {
        document.querySelectorAll('.tab-panel').forEach(p => p.style.display = 'none');
        const panel = document.getElementById(`panel-${key}`);
        if (panel) panel.style.display = 'flex';
    }
    // Se tiver busca ativa, a função de busca cuida da exibição
}

// =============================================
// BUSCA GLOBAL APRIMORADA
// =============================================
function setupSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchContainer = searchInput.parentElement;
    searchContainer.style.position = 'relative';

    // Botão limpar busca
    const clearBtn = document.createElement('button');
    clearBtn.type = 'button';
    clearBtn.className = 'position-absolute end-0 top-50 translate-middle-y btn btn-sm btn-outline-secondary rounded-circle me-2';
    clearBtn.innerHTML = '&times;';
    clearBtn.style.display = 'none';
    clearBtn.style.zIndex = '10';
    clearBtn.onclick = () => {
        searchInput.value = '';
        clearBtn.style.display = 'none';
        searchInput.focus();
        searchInput.dispatchEvent(new Event('input'));
    };
    searchContainer.appendChild(clearBtn);

    searchInput.addEventListener('input', (e) => {
        const rawValue = e.target.value.trim();
        const query = rawValue.toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[^a-z0-9]/g, "");

        const hasQuery = rawValue !== '';
        clearBtn.style.display = hasQuery ? 'block' : 'none';

        const tabButtons = document.getElementById('tab-buttons');
        const tabPanelsContainer = document.getElementById('tab-panels');
        const searchResults = document.getElementById('search-results');

        if (!hasQuery) {
            tabButtons.style.display = '';
            tabPanelsContainer.style.display = '';
            searchResults.style.display = 'none';
            showCategory(currentCategory);
            return;
        }

        // Modo busca ativa
        tabButtons.style.display = 'none';
        tabPanelsContainer.style.display = 'none';
        searchResults.style.display = 'flex';
        searchResults.innerHTML = '';

        // Cabeçalho da busca
        const header = document.createElement('div');
        header.className = 'col-12 text-center my-4';
        header.innerHTML = `<h3 class="fw-bold text-danger">🔍 Resultados para: "${rawValue}"</h3>`;
        searchResults.appendChild(header);

        let foundAny = false;

        Object.keys(menuData).forEach(key => {
            const cat = menuData[key];
            const matchingItems = cat.items.filter(item => {
                let text = item.name;
                if (item.desc) text += " " + item.desc;
                text = text.toLowerCase()
                    .normalize("NFD")
                    .replace(/[\u0300-\u036f]/g, "")
                    .replace(/[^a-z0-9]/g, "");
                return text.includes(query);
            });

            if (matchingItems.length > 0) {
                foundAny = true;
                const catHeader = document.createElement('div');
                catHeader.className = 'col-12';
                catHeader.innerHTML = `<h4 class="fw-bold text-danger mt-4">${cat.title}</h4>`;
                searchResults.appendChild(catHeader);

                matchingItems.forEach(item => {
                    searchResults.appendChild(createItemCard(item));
                });
            }
        });

        // Caldinhos especiais na busca
        if (query.includes('caldo') || query.includes('caldinho') || query.includes('caldos') || query.includes('torrada')) {
            foundAny = true;
            const caldosHeader = document.createElement('div');
            caldosHeader.className = 'col-12';
            caldosHeader.innerHTML = `<h4 class="fw-bold text-success mt-4">🍲 Caldinhos Especiais</h4>`;
            searchResults.appendChild(caldosHeader);

            const col = document.createElement('div');
            col.className = 'col-6 col-md-4 col-lg-3';
            col.innerHTML = `
                <div class="card h-100 shadow-sm border-success">
                    <div class="card-img-top bg-success d-flex align-items-center justify-content-center text-white fs-2" style="height: 220px;">🍲</div>
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title text-success fw-bold">2 Caldinhos + Torradas crocantes!</h5>
                        <p class="card-text small text-muted">Sabores: Frango • Feijão com Bacon • Calabresa</p>
                        <div class="mt-auto text-center">
                            <p class="text-success fw-bold fs-3 mb-3">R$ 22,00</p>
                            <button class="btn btn-success w-100 shadow-sm" onclick="openCaldosModal()">
                                Escolher sabores 🛒
                            </button>
                        </div>
                    </div>
                </div>
            `;
            searchResults.appendChild(col);
        }

        if (!foundAny) {
            const noResult = document.createElement('div');
            noResult.className = 'col-12 text-center py-5';
            noResult.innerHTML = `
                <h4 class="text-muted">Nenhum item encontrado 😔</h4>
                <p class="text-muted">Tente outro termo ou limpe a busca.</p>
            `;
            searchResults.appendChild(noResult);
        }
    });
}

// =============================================
// RESTANTE DO CÓDIGO (mantido igual ao original, só com pequenas correções)
// =============================================

// ... (todo o resto do código original: modal caldos, carrinho, checkout, notificações, chat, rádio, header, etc.)

// Só colei as partes modificadas acima. O resto do seu script original permanece exatamente igual.

// =============================================
// INICIALIZAÇÃO
// =============================================
window.onload = () => {
    function updateVH() {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    updateVH();
    window.addEventListener('resize', updateVH);
    window.addEventListener('orientationchange', () => setTimeout(updateVH, 100));

    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
        document.querySelector('#theme-button i')?.classList.replace('bi-moon-stars-fill', 'bi-sun-fill');
    }

    // Cria container de resultados da busca
    const searchResults = document.createElement('div');
    searchResults.id = 'search-results';
    searchResults.className = 'row g-4';
    searchResults.style.display = 'none';

    const tabPanelsContainer = document.getElementById('tab-panels');
    tabPanelsContainer.parentNode.insertBefore(searchResults, tabPanelsContainer);

    updateCartCount();
    renderTabs();
    setupSearch();
    createModernHeader();
    createCaldosModal();
};
