// script.js - Lógica principal do site

let cart = JSON.parse(localStorage.getItem('degusto_cart')) || [];
const phoneNumber = "5534999537698";
const pixKey = "10738419605";
const logoUrl = "https://i.ibb.co/DPDZb4W1/Gemini-Generated-Image-40opkn40opkn40op-Photoroom.png";
const siteUrl = "www.degusto.store";

// =============================================
// Funções do carrinho
// =============================================
function saveCart() { 
    localStorage.setItem('degusto_cart', JSON.stringify(cart)); 
    updateCartCount(); 
    renderCart(); 
}

function updateCartCount() { 
    document.getElementById('cartCount').textContent = cart.reduce((s,i)=>s+i.quantity,0) || 0; 
}

function renderCart() {
    const el = document.getElementById('cartItems');
    if (cart.length === 0) {
        el.innerHTML = '<p class="text-center text-muted fs-4 my-5">Seu carrinho está vazio 😔</p>';
        return;
    }
    let html = '', total = 0;
    cart.forEach((item, i) => {
        const found = findItemByName(item.name);
        const img = found?.img ? `<img src="${found.img}" class="cart-item-img" alt="${item.name}">` : '<div class="bg-secondary cart-item-img d-flex align-items-center justify-content-center text-white fs-4">🍔</div>';
        const sub = item.price * item.quantity; 
        total += sub;
        html += `<div class="cart-item">
            ${img}
            <div class="cart-item-info">
                <strong>${item.quantity}× ${item.name}</strong><br>
                <small class="text-success">R$ ${item.price.toFixed(2)} cada</small>
                <div class="text-danger fw-bold mt-1">Subtotal: R$ ${sub.toFixed(2)}</div>
            </div>
            <div class="cart-item-controls">
                <button class="btn btn-sm btn-outline-secondary" onclick="changeQuantity(${i},-1)">−</button>
                <span class="fw-bold fs-5">${item.quantity}</span>
                <button class="btn btn-sm btn-outline-secondary" onclick="changeQuantity(${i},1)">+</button>
                <button class="btn btn-sm btn-danger" onclick="removeFromCart(${i})"><i class="bi bi-trash"></i></button>
            </div>
        </div>`;
    });
    html += `<div class="text-center mt-4 pt-3 border-top"><h3 class="text-danger fw-bold">Total: R$ ${total.toFixed(2)}</h3></div>`;
    el.innerHTML = html;
}

function findItemByName(name) {
    const normName = name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"");
    for (const cat in menuData) {
        for (const item of menuData[cat].items) {
            const normItem = item.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"");
            if (normItem === normName) return item;
        }
    }
    return null;
}

function changeQuantity(i,d){
    cart[i].quantity += d;
    if(cart[i].quantity<=0) cart.splice(i,1);
    saveCart();
}

function removeFromCart(i){ cart.splice(i,1); saveCart(); }
function clearCart(){ if(confirm("Limpar carrinho?")){ cart=[]; saveCart(); } }
function addToCart(n,p,q=1){ 
    const ex=cart.find(i=>i.name===n); 
    if(ex) ex.quantity+=q; 
    else cart.push({name:n,price:parseFloat(p),quantity:q}); 
    saveCart(); 
    showNotification(`Adicionado: ${q}× ${n}`); 
}

// =============================================
// Modais e notificações
// =============================================
function openModal(id){ 
    document.getElementById(id).style.display='flex'; 
    if(id==='cartModal') renderCart(); 
}

function closeModal(id){ document.getElementById(id).style.display='none'; }

function openCheckout(){
    if(cart.length===0) return showNotification("Carrinho vazio!");
    closeModal('cartModal');
    const t=cart.reduce((s,i)=>s+i.price*i.quantity,0);
    document.getElementById('checkout-total').textContent=`Total: R$ ${t.toFixed(2)}`;
    openModal('checkout-modal');
}

function showNotification(m){
    const n=document.getElementById('notification');
    n.textContent=m;
    n.style.display='block';
    setTimeout(()=>n.style.display='none',3000);
}

// =============================================
// Renderização das abas do cardápio
// =============================================
function renderTabs(){
    const btns=document.getElementById('tab-buttons'), panels=document.getElementById('tab-panels');
    Object.keys(menuData).forEach((k,idx)=>{
        const btn=document.createElement('button');
        btn.className=`tab-btn btn btn-lg btn-outline-danger ${idx===0?'active':''}`;
        btn.dataset.tab=k;
        btn.textContent=menuData[k].title.replace(/^[^\s]+ /,'');
        btns.appendChild(btn);

        const panel=document.createElement('div');
        panel.id=k;
        panel.className=`tab-panel ${idx===0?'active':''}`;
        panel.innerHTML=`<h3 class="text-center mb-4">${menuData[k].title}</h3><div class="menu-grid"></div>`;
        const grid=panel.querySelector('.menu-grid');

        menuData[k].items.forEach(it=>{
            const div=document.createElement('div');
            div.className='item';
            div.dataset.name=it.name;
            div.dataset.price=it.price;

            if(it.img){
                const img=document.createElement('img');
                img.src=it.img;
                img.alt=it.name;
                img.loading='lazy';
                img.onclick=()=>{ document.getElementById('fullImage').src=it.img; openModal('imageModal'); };
                div.appendChild(img);
            }

            div.innerHTML+=`<h3>${it.name}</h3>${it.desc?`<p>${it.desc}</p>`:''}<span>R$ ${it.price.toFixed(2)}</span><button class="add-to-cart btn btn-danger w-100 mt-2">Adicionar</button>`;
            grid.appendChild(div);
        });

        panels.appendChild(panel);
    });
}

// =============================================
// Eventos gerais
// =============================================
document.addEventListener('click', e=>{
    if(e.target.closest('.add-to-cart')){
        const it=e.target.closest('.item');
        addToCart(it.dataset.name, it.dataset.price);
    }
    else if(e.target.closest('.tab-btn')){
        document.querySelectorAll('.tab-btn').forEach(b=>b.classList.remove('active'));
        document.querySelectorAll('.tab-panel').forEach(p=>p.classList.remove('active'));
        e.target.closest('.tab-btn').classList.add('active');
        const p=document.getElementById(e.target.closest('.tab-btn').dataset.tab);
        if(p) p.classList.add('active');
    }
});

document.getElementById('cart-button').onclick=()=>openModal('cartModal');

document.getElementById('share-button').onclick=()=>{
    if(navigator.share) {
        navigator.share({title:'DêGusto Lanchonete', text:'Melhores lanches! Confira em ' + siteUrl + '\nLogo: ' + logoUrl, url:location.href});
    } else {
        navigator.clipboard.writeText(location.href + ' - Logo: ' + logoUrl);
        showNotification('Link e logo copiados!');
    }
};

document.getElementById('help-button').onclick=()=>alert('🕖 Delivery a partir das 19h\n📱 WhatsApp: (34) 99953-7698\n\nComo comprar:\n1. Escolha o item no cardápio.\n2. Clique em "Adicionar" para colocar no carrinho.\n3. Abra o carrinho e finalize no WhatsApp.\n\nDúvidas? Use o chat ao lado!');

document.getElementById('copy-pix-cart').onclick=()=>{ navigator.clipboard.writeText(pixKey); showNotification('Chave PIX copiada!'); };

document.getElementById('support-button').onclick=()=>document.getElementById('chat-container').style.display='flex';

document.getElementById('top-button').onclick=()=>window.scrollTo({top: 0, behavior: 'smooth'});

// Busca
let st;
document.getElementById('searchInput').oninput=function(){
    clearTimeout(st);
    st=setTimeout(()=>{
        const term=this.value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"");
        const has=term.length>0;
        document.querySelectorAll('.tab-panel').forEach(p=>p.style.display=has?'block':'none');
        if(!has) document.querySelector('.tab-panel.active').style.display='block';
        document.querySelectorAll('.item').forEach(it=>{
            const txt=it.textContent.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"");
            it.style.display=txt.includes(term)?'block':'none';
        });
    },300);
};

// Finalizar pedido (WhatsApp)
document.getElementById('checkout-form').onsubmit=function(e){
    e.preventDefault();
    if(cart.length===0) return showNotification('Carrinho vazio');
    
    const nome=document.getElementById('nome-cliente').value.trim(),
          rua=document.getElementById('rua').value.trim(),
          num=document.getElementById('numero').value.trim(),
          bairro=document.getElementById('bairro').value.trim(),
          ref=document.getElementById('referencia').value.trim(),
          pag=document.querySelector('input[name="pagamento"]:checked')?.value,
          troco=document.getElementById('troco').value,
          obs=document.getElementById('observacoes').value.trim();

    if(!nome||!rua||!num||!bairro||!pag) return showNotification('Preencha todos os campos!');

    let msg=`*PEDIDO DÊGUSTO*%0A%0A*Nome:* ${nome}%0A*Endereço:* ${rua}, ${num} - ${bairro}${ref? ' ('+ref+')' : ''}%0A%0A*Itens:*%0A`,
        total=0;
    
    cart.forEach(it=>{ 
        const sub=it.price*it.quantity; 
        total+=sub; 
        msg+=`${it.quantity}× ${it.name} - R$ ${sub.toFixed(2)}%0A`; 
    });
    
    msg+=`%0A*Total: R$ ${total.toFixed(2)}*%0A*Pagamento:* ${pag}${pag==='Dinheiro'&&troco?` (troco para R$ ${troco})`:''}${obs?`%0A*Obs:* ${obs}`:''}`;
    
    window.open(`https://wa.me/${phoneNumber}?text=${msg}`,'_blank');
    cart=[]; saveCart();
    closeModal('checkout-modal');
    showNotification('Pedido enviado com sucesso!');
};

document.querySelectorAll('input[name="pagamento"]').forEach(r=>{
    r.onchange=()=>{ document.getElementById('troco-div').style.display=r.value==='Dinheiro'?'block':'none'; };
});

// Tema claro/escuro
document.getElementById('theme-button').onclick=()=>{
    document.body.classList.toggle('dark-mode');
    const dark=document.body.classList.contains('dark-mode');
    const ic=document.querySelector('#theme-button i');
    ic.classList.toggle('bi-moon-stars-fill',!dark);
    ic.classList.toggle('bi-sun-fill',dark);
    localStorage.setItem('theme',dark?'dark':'light');
};

// Chat IA simples
const chatCont=document.getElementById('chat-container'),
      chatBody=document.getElementById('chat-body'),
      chatInp=document.getElementById('chat-input'),
      sendBtn=document.getElementById('send-chat'),
      closeChat=document.getElementById('close-chat');

function addMsg(t,u=false){ 
    const m=document.createElement('div'); 
    m.className='message '+(u?'user':'bot'); 
    m.innerHTML=t; 
    chatBody.appendChild(m); 
    chatBody.scrollTop=chatBody.scrollHeight; 
}

function showSugg(){
    const s=["Quero X-Costela","Jantinha","Combo Família","Twix","Ver carrinho","Finalizar"];
    const d=document.createElement('div'); d.className='quick-suggestions';
    s.forEach(txt=>{
        const b=document.createElement('button');
        b.className='quick-btn';
        b.textContent=txt;
        b.onclick=()=>{ chatInp.value=txt; sendMsg(); };
        d.appendChild(b);
    });
    chatBody.appendChild(d);
}

function botResp(m){
    const l=m.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"");
    let q=1;
    const qm=l.match(/(\d+)/);
    if(qm) q=parseInt(qm[1]);

    if(l.match(/oi|ola|bom dia/)) return "Olá! 😄 Bem-vindo ao DêGusto! Qual lanche hoje?";
    if(l.includes('horario')) return "🕖 Delivery a partir das 19h todos os dias!";
    if(l.includes('cardapio') || l.includes('menu')) return `Aqui está o cardápio completo:<br>${getFullMenu()} O que deseja adicionar?`;

    let found=null;
    for(const c in menuData){
        menuData[c].items.forEach(i=>{
            const normItem=i.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"");
            if(l.includes(normItem)) found=i;
        });
    }

    if(found){
        if(l.includes('quanto')||l.includes('preco')) return `${found.name} custa R$ ${found.price.toFixed(2)}! Quer adicionar?`;
        addToCart(found.name,found.price,q);
        return `${q>1?q+'× ':''}${found.name} adicionado${q>1?'s':''}!`;
    }

    if(l.includes('carrinho')){ openModal('cartModal'); return "🛒 Abri seu carrinho!"; }
    if(l.includes('finalizar')){ openCheckout(); return "✅ Indo para finalização!"; }

    return "Me diga o nome do lanche que eu te ajudo 😊";
}

function sendMsg(){
    const t=chatInp.value.trim();
    if(!t) return;
    addMsg(t,true);
    chatInp.value='';
    setTimeout(()=>{ addMsg(botResp(t)); showSugg(); },800);
}

sendBtn.onclick=sendMsg;
chatInp.addEventListener('keypress',e=>{if(e.key==='Enter') sendMsg();});
closeChat.onclick=()=>chatCont.style.display='none';

// Rádio
const radio=document.getElementById('radioPlayer'),
      playBtn=document.getElementById('playPauseBtn'),
      muteBtn=document.getElementById('muteBtn');
let playing=false;

if(radio){
    radio.src="https://stream.zeno.fm/si5xey7akartv.mp3";
    playBtn.onclick=()=>{
        if(playing){
            radio.pause();
            playBtn.innerHTML='<i class="bi bi-play-fill"></i> Play';
        } else {
            radio.play().catch(()=>showNotification("Erro na rádio"));
            playBtn.innerHTML='<i class="bi bi-pause-fill"></i> Pause';
        }
        playing=!playing;
    };
    muteBtn.onclick=()=>{
        radio.muted=!radio.muted;
        muteBtn.innerHTML=radio.muted?'<i class="bi bi-volume-mute-fill"></i> Som':'<i class="bi bi-volume-up-fill"></i> Som';
    };
}

// Inicialização
window.onload=()=>{
    if(localStorage.getItem('theme')==='dark'){
        document.body.classList.add('dark-mode');
        document.querySelector('#theme-button i').classList.replace('bi-moon-stars-fill','bi-sun-fill');
    }
    
    updateCartCount();
    renderTabs();

    setTimeout(()=>{
        chatCont.style.display='flex';
        addMsg("👋 Olá! Estou online para te atender!<br>Peça seu lanche que eu monto o pedido 😄");
        showSugg();
    },6000);
};