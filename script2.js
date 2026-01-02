// script2.js - Dados do cardápio (somente menuData e funções auxiliares)

const menuData = {
    hamburgueres: {
        title: "🍔 Hambúrgueres",
        items: [
            { name: "X-COSTELA", price: 30.00, img: "https://i.ibb.co/QjhNdtMh/20251009-134607.jpg", desc: "Costela desfiada + cheddar + bacon" },
            { name: "X-Tudo com Creme de Milho", price: 30.00, img: "https://i.ibb.co/YFwNVZMd/20251031-205644.jpg" },
            { name: "X-Cheddar com Anéis", price: 26.00, img: "https://i.ibb.co/LDYypj6Q/20251031-205800.jpg" },
            { name: "X-Bacon Goiabada", price: 26.00, img: "https://i.ibb.co/4n86G96b/20251031-205913.jpg" },
            { name: "X-Abacaxi", price: 30.00, img: "https://i.ibb.co/QFLZqn5z/20251029-174738.jpg" },
            { name: "ESPECIAL TILÁPIA", price: 30.00, img: "https://i.ibb.co/7cYcLrD/IMG-20250924-WA0010.jpg" },
            { name: "ARTESANAL GOIABADA", price: 30.00, img: "https://i.ibb.co/4nfgvWGn/IMG-20250924-WA0009.jpg" },
            { name: "ESPECIAL STEAK", price: 30.00, img: "https://i.ibb.co/MxtW5hX2/IMG-20250928-WA0026.jpg" },
            { name: "X-DÊ-GUSTO", price: 28.00, img: "https://i.ibb.co/NgtBB7Nb/20251004-234747.jpg" },
            { name: "ARTESANAL CLÁSSICO", price: 28.00, img: "https://i.ibb.co/0pRMs7CM/20251004-235952.jpg" },
            { name: "ARTESANAL DORITOS", price: 30.00, img: "https://i.ibb.co/ZpvH013t/20251004-235135.jpg" },
            { name: "ARTESANAL DUPLO", price: 35.00, img: "https://i.ibb.co/JR70qRfW/20251004-235417.jpg" },
            { name: "X-BOLO GIGANTE", price: 42.00, img: "https://i.ibb.co/23rd6PGY/20251004-235801.jpg" },
            { name: "X-TUDO", price: 24.00, img: "https://i.ibb.co/Z1d5Q46K/x-tudo.png" },
            { name: "X-BACON", price: 22.00, img: "https://i.ibb.co/Pv8DLymw/IMG-20251004-WA0057.jpg" },
            { name: "X-CALABRESA", price: 22.00, img: "https://i.ibb.co/4wFq4fLJ/IMG-20251004-WA0058.jpg" },
            { name: "X-CHEDDAR", price: 22.00, img: "https://i.ibb.co/TMWKbdX5/IMG-20251004-WA0056.jpg" }
        ]
    },
    combo: {
        title: "🔥 Combos",
        items: [
            { name: "COMBO FAMÍLIA", price: 50.00, img: "https://i.ibb.co/Tq79qZsF/unnamed.png", desc: "2 X-Tudo + 2 refri 2L" }
        ]
    },
    batatas: {
        title: "🍟 Batatas",
        items: [
            { name: "BATATA GIGANTE", price: 30.00, img: "https://i.ibb.co/0wxzgcT/Design-sem-nome-2.png" }
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
    chocolates: {
        title: "🍫 Chocolates",
        items: [
            { name: "Sonho de Valsa", price: 3.00, img: "https://i.ibb.co/8D5KSnxs/Sonho-de-Valsa.jpg" },
            { name: "Ouro Branco", price: 3.00, img: "https://i.ibb.co/2GPfKvj/Ouro-branco.jpg" },
            { name: "Caribe", price: 4.00, img: "https://i.ibb.co/XfYhYL0w/Caribe.jpg" },
            { name: "Trento Banoffee", price: 4.00, img: "https://i.ibb.co/VW8TpqpB/Trento-Massimo-Banofrree.jpg" },
            { name: "Hershey's Tubes", price: 4.00, img: "https://i.ibb.co/RkYmhv92/Hershey-s-Choco-Tubes.jpg" },
            { name: "Twix", price: 6.00, img: "https://i.ibb.co/5CX2tKs/Twix.jpg" },
            { name: "5Star", price: 6.00, img: "https://i.ibb.co/2Y3kXMzK/5Star.jpg" },
            { name: "Charge", price: 6.00, img: "https://i.ibb.co/zhmbQVSP/Charge.jpg" },
            { name: "Diamante Negro", price: 6.00, img: "https://i.ibb.co/sppd4VXm/Lacta-Diamante-Negro.jpg" }
        ]
    },
    bebidas: {
        title: "🥤 Bebidas",
        items: [
            { name: "COCA-COLA 2L", price: 14.00 },
            { name: "COCA-COLA 1L", price: 10.00 },
            { name: "COCA-COLA LATA", price: 6.00 },
            { name: "FANTA 2L", price: 12.00 },
            { name: "FANTA 1L", price: 10.00 },
            { name: "KUAT 2L", price: 10.00 },
            { name: "MINEIRO 2L", price: 12.00 },
            { name: "PITHULÁ", price: 3.00 }
        ]
    },
    jantinha: {
        title: "🍲 Jantinhas",
        items: [
            { name: "Jantinha", price: 12.00, img: "https://i.ibb.co/0wxzgcT/Design-sem-nome-2.png", desc: "Marmita 500g completa" }
        ]
    }
};

function getFullMenu() {
    let menuText = '';
    Object.keys(menuData).forEach(cat => {
        menuText += menuData[cat].title + '<br>';
        menuData[cat].items.forEach(item => {
            menuText += item.name + ' - R$ ' + item.price.toFixed(2) + (item.desc ? ' (' + item.desc + ')' : '') + '<br>';
        });
        menuText += '<br>';
    });
    return menuText;
}