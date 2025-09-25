document.addEventListener('DOMContentLoaded', function() {

    // --- Fungsionalitas yang Sudah Ada ---

    // Countdown Timer
    const countDownDate = new Date("Sep 27, 2025 09:00:00").getTime(); // Sesuaikan tanggal
    const timerElement = document.getElementById("timer");

    const timerInterval = setInterval(function() {
        const now = new Date().getTime();
        const distance = countDownDate - now;

        if (distance < 0) {
            clearInterval(timerInterval);
            if (timerElement) {
                timerElement.innerHTML = "ACARA TELAH BERLANGSUNG";
            }
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        if (timerElement) {
            timerElement.innerHTML = days + "h " + hours + "j " + minutes + "m " + seconds + "d ";
        }
    }, 1000);

    // RSVP Form Handling
    const rsvpForm = document.getElementById('rsvp-form');
    const thankYouMessage = document.getElementById('thank-you-message');

    if (rsvpForm) {
        rsvpForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const nameInput = document.getElementById('name');
            if (nameInput) {
                console.log(`Konfirmasi diterima dari: ${nameInput.value}`);
            }
            if (rsvpForm) rsvpForm.style.display = 'none';
            if (thankYouMessage) thankYouMessage.style.display = 'block';
        });
    }


    // --- LOGIKA BARU UNTUK ANIMASI SCROLL ---

    // 1. Pilih semua elemen yang ingin dianimasikan
    const targets = document.querySelectorAll('.animate-on-scroll');

    // 2. Buat observer
    const observer = new IntersectionObserver((entries, observer) => {
        // Loop melalui setiap elemen yang diamati
        entries.forEach(entry => {
            // Jika elemen masuk ke dalam layar (isIntersecting)
            if (entry.isIntersecting) {
                // Tambahkan kelas 'is-visible' untuk memicu animasi CSS
                entry.target.classList.add('is-visible');
                // Hentikan pengamatan pada elemen ini agar animasi tidak berulang
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null, // Menggunakan viewport browser
        rootMargin: '0px',
        threshold: 0.1 // Memicu animasi saat 10% elemen terlihat
    });

    // 3. Terapkan observer ke setiap elemen target
    targets.forEach(target => {
        observer.observe(target);
    });

});


    // script.js

document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('backgroundAudio');
    const popup = document.getElementById('audioConsentPopup');
    const button = document.getElementById('activateAudioButton');

    button.addEventListener('click', () => {
        // 1. Coba putar audio
        audio.play()
            .then(() => {
                // Berhasil: Audio mulai diputar (unmuted)
                console.log("Audio berhasil diaktifkan dan diputar.");
                // 2. Sembunyikan popup
                popup.style.display = 'none';
            })
            .catch(error => {
                // Gagal: Walaupun dengan interaksi, terkadang masih ada batasan (jarang terjadi)
                console.error("Gagal memutar audio setelah klik:", error);
                
                // Sebagai cadangan (fallback):
                // Coba putar audio dalam keadaan muted terlebih dahulu
                audio.muted = true;
                audio.play();
                
                // Sembunyikan popup dan berikan pesan kepada pengguna
                popup.style.display = 'none';
                alert("Browser Anda mungkin sangat ketat. Anda harus mengklik ikon speaker untuk mengaktifkan suara.");
            });
    });
});