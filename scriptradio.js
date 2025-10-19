// scriptradio.js - JavaScript for Rádio DêGusto Player

document.addEventListener('DOMContentLoaded', function() {
    const playBtn = document.getElementById('play-btn');
    const pauseBtn = document.getElementById('pause-btn');
    const audio = document.getElementById('radio-audio');
    const vuMeter = document.getElementById('vu-meter');
    const bars = vuMeter.querySelectorAll('.bar');

    // Initialize audio
    audio.volume = 0.7; // Set default volume to 70%
    audio.load(); // Ensure the stream is loaded

    let isPlaying = false;
    let animationInterval;

    // Function to animate VU meter
    function animateVUMeter() {
        if (animationInterval) clearInterval(animationInterval);
        animationInterval = setInterval(() => {
            bars.forEach(bar => {
                const height = Math.random() * 100 + 20; // Random height between 20% and 120%
                bar.style.height = height + '%';
            });
        }, 150); // Update every 150ms for smooth animation
    }

    // Function to stop VU meter animation
    function stopVUMeter() {
        if (animationInterval) {
            clearInterval(animationInterval);
            animationInterval = null;
        }
        bars.forEach(bar => {
            bar.style.height = '20%'; // Reset to minimum height
        });
    }

    // Play button event
    playBtn.addEventListener('click', function() {
        if (!isPlaying) {
            audio.play().then(() => {
                isPlaying = true;
                playBtn.style.display = 'none';
                pauseBtn.style.display = 'inline-block';
                animateVUMeter();
                showNotification('Rádio tocando! 🎶');
            }).catch(error => {
                console.error('Erro ao reproduzir áudio:', error);
                showNotification('Erro ao conectar com a rádio. Tente novamente.');
            });
        }
    });

    // Pause button event
    pauseBtn.addEventListener('click', function() {
        if (isPlaying) {
            audio.pause();
            isPlaying = false;
            playBtn.style.display = 'inline-block';
            pauseBtn.style.display = 'none';
            stopVUMeter();
            showNotification('Rádio pausado. ⏸️');
        }
    });

    // Handle audio events
    audio.addEventListener('ended', function() {
        // For streams, this might not trigger, but just in case
        isPlaying = false;
        playBtn.style.display = 'inline-block';
        pauseBtn.style.display = 'none';
        stopVUMeter();
    });

    audio.addEventListener('error', function(e) {
        console.error('Erro no áudio:', e);
        isPlaying = false;
        playBtn.style.display = 'inline-block';
        pauseBtn.style.display = 'none';
        stopVUMeter();
        showNotification('Erro na conexão da rádio. Verifique sua internet.');
    });

    // Volume control (optional - if you add a slider later)
    // For now, no volume slider, but can be extended

    // Notification function (shared with main script)
    function showNotification(message) {
        const notification = document.getElementById('notification');
        if (notification) {
            notification.textContent = message;
            notification.classList.add('show');
            setTimeout(() => {
                notification.classList.remove('show');
            }, 3000);
        }
    }

    // Initial state: hide pause button
    pauseBtn.style.display = 'none';

    // Handle page visibility change to pause audio when tab is hidden
    document.addEventListener('visibilitychange', function() {
        if (document.hidden && isPlaying) {
            audio.pause();
            isPlaying = false;
            playBtn.style.display = 'inline-block';
            pauseBtn.style.display = 'none';
            stopVUMeter();
        }
    });
});