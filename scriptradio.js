// JavaScript Ultra-Avançado: Media Session API para lock screen, play contínuo em background, prev/next simulados, status indicator
document.addEventListener('DOMContentLoaded', function() {
    const playBtn = document.getElementById('play-btn');
    const pauseBtn = document.getElementById('pause-btn');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const audio = document.getElementById('radio-audio');
    const vuMeter = document.getElementById('vu-meter');
    const bars = vuMeter.querySelectorAll('.bar');
    const volumeSlider = document.getElementById('volume-slider');
    const statusIndicator = document.getElementById('status-indicator');

    // Inicialização
    audio.volume = 0.7;
    audio.load();

    let isPlaying = false;
    let animationInterval;
    let currentTrack = 0;
    const tracks = ['Faixa 1 - Vibes Noturnas', 'Faixa 2 - Ritmos Quentes', 'Faixa 3 - Clássicos Premium']; // Simulado

    // Media Session API para controles na lock screen e background play
    if ('mediaSession' in navigator) {
        navigator.mediaSession.metadata = new MediaMetadata({
            title: 'Rádio DêGusto',
            artist: 'DêGusto Lanchonete Premium',
            artwork: [
                { src: 'https://i.ibb.co/gBM97H1/Background-Eraser-20250817-112249455.png', sizes: '96x96', type: 'image/png' },
                { src: 'https://i.ibb.co/gBM97H1/Background-Eraser-20250817-112249455.png', sizes: '128x128', type: 'image/png' },
                { src: 'https://i.ibb.co/gBM97H1/Background-Eraser-20250817-112249455.png', sizes: '192x192', type: 'image/png' },
                { src: 'https://i.ibb.co/gBM97H1/Background-Eraser-20250817-112249455.png', sizes: '256x256', type: 'image/png' },
                { src: 'https://i.ibb.co/gBM97H1/Background-Eraser-20250817-112249455.png', sizes: '384x384', type: 'image/png' },
                { src: 'https://i.ibb.co/gBM97H1/Background-Eraser-20250817-112249455.png', sizes: '512x512', type: 'image/png' }
            ]
        });

        navigator.mediaSession.setActionHandler('play', () => playBtn.click());
        navigator.mediaSession.setActionHandler('pause', () => pauseBtn.click());
        navigator.mediaSession.setActionHandler('previoustrack', () => prevBtn.click());
        navigator.mediaSession.setActionHandler('nexttrack', () => nextBtn.click());
    }

    // Animação VU Meter aprimorada com easing e randomização
    function animateVUMeter() {
        if (animationInterval) clearInterval(animationInterval);
        animationInterval = setInterval(() => {
            bars.forEach((bar, index) => {
                const height = Math.random() * 90 + 10 + Math.sin(Date.now() / 200 + index) * 20; // Mais orgânico
                const rotation = Math.random() * 20 - 10;
                bar.style.height = height + '%';
                bar.style.transform = `rotateX(${30 + rotation}deg) scaleY(${height / 100})`;
            });
        }, 100); // Ultra-fluido
    }

    function stopVUMeter() {
        if (animationInterval) {
            clearInterval(animationInterval);
            animationInterval = null;
        }
        bars.forEach(bar => {
            bar.style.height = '10%';
            bar.style.transform = 'rotateX(30deg) scaleY(0.1)';
        });
    }

    // Função play com status
    function playAudio() {
        audio.play().then(() => {
            isPlaying = true;
            playBtn.style.display = 'none';
            pauseBtn.style.display = 'inline-block';
            statusIndicator.style.display = 'block';
            animateVUMeter();
            updateNowPlaying();
            showNotification('Rádio tocando! 🎶 Continua no background.');
        }).catch(error => {
            console.error('Erro ao reproduzir áudio:', error);
            showNotification('Erro ao conectar com a rádio. Tente novamente.');
        });
    }

    // Eventos de play/pause
    playBtn.addEventListener('click', playAudio);

    pauseBtn.addEventListener('click', function() {
        if (isPlaying) {
            audio.pause();
            isPlaying = false;
            playBtn.style.display = 'inline-block';
            pauseBtn.style.display = 'none';
            statusIndicator.style.display = 'none';
            stopVUMeter();
            showNotification('Rádio pausado. ⏸️');
        }
    });

    // Prev/Next simulados (para demo; em produção, integre com playlist real)
    prevBtn.addEventListener('click', function() {
        currentTrack = (currentTrack - 1 + tracks.length) % tracks.length;
        updateNowPlaying();
        showNotification(`Tocando: ${tracks[currentTrack]}`);
    });

    nextBtn.addEventListener('click', function() {
        currentTrack = (currentTrack + 1) % tracks.length;
        updateNowPlaying();
        showNotification(`Tocando: ${tracks[currentTrack]}`);
    });

    function updateNowPlaying() {
        document.querySelector('.now-playing').textContent = tracks[currentTrack] || 'Tocando ao vivo... 🎵';
    }

    // Controle de volume com feedback
    volumeSlider.addEventListener('input', function() {
        audio.volume = this.value;
        const volPercent = (this.value * 100).toFixed(0);
        showNotification(`Volume: ${volPercent}% 🔊`);
    });

    // Eventos de áudio
    audio.addEventListener('ended', function() {
        isPlaying = false;
        playBtn.style.display = 'inline-block';
        pauseBtn.style.display = 'none';
        statusIndicator.style.display = 'none';
        stopVUMeter();
    });

    audio.addEventListener('error', function(e) {
        console.error('Erro no áudio:', e);
        isPlaying = false;
        playBtn.style.display = 'inline-block';
        pauseBtn.style.display = 'none';
        statusIndicator.style.display = 'none';
        stopVUMeter();
        showNotification('Erro na conexão da rádio. Verifique sua internet.');
    });

    // NÃO pausa no background/lock screen - permite play contínuo
    document.addEventListener('visibilitychange', function() {
        // Removido o pause; agora continua tocando
        if (!document.hidden && isPlaying) {
            statusIndicator.style.display = 'block'; // Reativa indicator se visível
        }
    });

    // Notificação
    function showNotification(message) {
        const notification = document.getElementById('notification');
        notification.textContent = message;
        notification.classList.add('show');
        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    }

    // Auto-play inicial se permitido (para demo; browsers bloqueiam autoplay sem interação)
    // playAudio(); // Descomente para teste, mas requer interação do user
});