// NAVIGATION MOBILE MENU TOGGLE
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');

if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
        menuBtn.classList.toggle('active');
        mobileMenu.classList.toggle('hidden');
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            menuBtn.classList.remove('active');
            mobileMenu.classList.add('hidden');
        });
    });
}

// CUSTOM CURSOR ANIMATION (DIPERBAIKI)
const dot = document.getElementById('cursorDot');
const ring = document.getElementById('cursorRing');

let mouseX = 0;
let mouseY = 0;

window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function updateCursor() {
    if (dot && ring) {
        dot.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`;
        ring.style.transform = `translate(${mouseX - 20}px, ${mouseY - 20}px)`;
    }
    requestAnimationFrame(updateCursor);
}
updateCursor();

// INITIALIZE AOS (Animate On Scroll)
AOS.init({
    once: true
});

// FETCH DOMAIN DATA JSON & RENDER RESPONSIF
const foter = document.getElementById("footer");

const getData = async () => {
    try {
        const res = await fetch('./domain-data.json');
        const data = await res.json();

        const dataMap = data.map((items) => {
            return `
<div class="domain-card-wrapper">
        <div tabindex="0" class="domain-card bg-[#121212] border border-white/10 rounded-2xl p-6 sm:p-8 overflow-hidden flex flex-col items-center text-center shadow-xl hover:border-pink-500/40 transition duration-300" data-aos="fade-up" data-aos-delay="95" data-aos-duration="250">
            
            <!-- 1. IMAGE (Tampil utuh sesuai ukuran asli) -->
            <div class="w-full overflow-hidden rounded-xl mb-6 bg-black/40 flex justify-center items-center">
                <img src="${items.id === 'hirosaki-park' ? 'https://www.japan-guide.com/g20/740/3700_01.jpg' : items.image_url}" alt="${items.title}" class="w-full h-auto object-contain transform hover:scale-105 transition duration-500">
            </div>
        
            <div class="w-full flex flex-col items-center space-y-4">
                
                <!-- 2. TITLE (Nama Inggris - Diperbesar) -->
                <h3 class="text-2xl sm:text-3xl font-extrabold text-white tracking-wide">
                    ${items.title}
                </h3>

                <span class="text-lg sm:text-xl font-bold text-pink-400 font-mono tracking-widest">
                    ${items.japanese_name}
                </span>

                <p class="text-sm sm:text-base text-gray-200 italic text-center px-2 leading-relaxed">
                    "${items.description}"
                </p>

                <!-- BAGIAN BAWAH: HIGHLIGHT (Kanan) & RATE/LOCATION (Kiri) -->
                <div class="w-full grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 pt-5 border-t border-white/15 text-left">
                    
                    <div class="flex flex-col justify-center space-y-2">
                        <div class="text-sm text-gray-300">
                            Lokasi: <span class="text-white font-bold text-base">${items.location}</span>
                        </div>
                        <div class="text-sm text-gray-300">
                            Rating: <span class="text-pink-400 font-extrabold text-base">${items.rating} / 5.0</span>
                        </div>
                    </div>

                    <div class="flex flex-col justify-center bg-white/5 p-4 rounded-xl border border-white/10">
                        <span class="text-xs font-mono uppercase text-pink-400 tracking-wider font-bold mb-1">Highlight</span>
                        <p class="text-sm text-gray-200 leading-relaxed">
                            ${items.highlight}
                        </p>
                    </div>

                </div>

            </div>
        </div>
    </div>
            `;
        });

        foter.innerHTML = dataMap.join("");
    } catch (error) {
        console.error("Gagal memuat data lokal:", error);
    }
};

getData();

document.querySelectorAll('.interactive-svg-container').forEach(svgBox => {
    const pushDistance = 45; 
    const triggerRadius = 150; 

    document.addEventListener('mousemove', (e) => {
        const rect = svgBox.getBoundingClientRect();
        const svgCenterX = rect.left + rect.width / 2;
        const svgCenterY = rect.top + rect.height / 2;

        const deltaX = e.clientX - svgCenterX;
        const deltaY = e.clientY - svgCenterY;
        const distance = Math.hypot(deltaX, deltaY);

        if (distance < triggerRadius) {
            const angle = Math.atan2(deltaY, deltaX);
            const force = (triggerRadius - distance) / triggerRadius;

            const moveX = -Math.cos(angle) * force * pushDistance;
            const moveY = -Math.sin(angle) * force * pushDistance;

            svgBox.style.transform = `translate3d(${moveX}px, ${moveY}px, 0px)`;
            svgBox.classList.remove('floating-svg'); 
        } else {
            svgBox.style.transform = `translate3d(0px, 0px, 0px)`;
            svgBox.classList.add('floating-svg'); 
        }
    });
});