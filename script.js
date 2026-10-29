// NAVIGATION MOBILE MENU TOGGLE
const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");

if (menuBtn && mobileMenu) {
  menuBtn.addEventListener("click", () => {
    menuBtn.classList.toggle("active");
    mobileMenu.classList.toggle("hidden");
  });

  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menuBtn.classList.remove("active");
      mobileMenu.classList.add("hidden");
    });
  });
}

// CUSTOM CURSOR ANIMATION (DIPERBAIKI)
const dot = document.getElementById("cursorDot");
const ring = document.getElementById("cursorRing");

let mouseX = 0;
let mouseY = 0;

window.addEventListener("mousemove", (e) => {
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
  once: true,
});

// FETCH DOMAIN DATA JSON & RENDER RESPONSIF
const foter = document.getElementById("footer");

const getData = async () => {
  try {
    const res = await fetch("./domain-data.json");
    const data = await res.json();

    const dataMap = data.map((items) => {
      let targetPage = `${items.id}.html`;

      return `
<!-- WRAPPER LEBIH LEBAR KE SAMPING -->
<div class="domain-card-wrapper w-full flex justify-center px-4">
    <div onclick="window.location.href='${targetPage}'" tabindex="0" class="domain-card w-full max-w-[1000rem] bg-[#1c0c16]/85 border border-pink-500/30 rounded-3xl p-6 sm:p-12 overflow-hidden flex flex-col items-center text-center shadow-[0_0_40px_rgba(244,114,182,0.15)] hover:border-pink-500/80 hover:scale-[1.01] backdrop-blur-xl transition duration-300 cursor-pointer group" data-aos="fade-up" data-aos-delay="95" data-aos-duration="250">
        
        <div class="w-full h-[300px] sm:h-[420px] overflow-hidden rounded-2xl mb-6 bg-black/50 border border-pink-500/30 shadow-[0_0_25px_rgba(244,114,182,0.2)] flex justify-center items-center">
            <img src="${items.id === "hirosaki-park" ? "https://www.japan-guide.com/g20/740/3700_01.jpg" : items.image_url}" alt="${items.title}" class="w-full h-full object-cover transform group-hover:scale-105 transition duration-500">
        </div>
    
        <div class="w-full flex flex-col items-center space-y-4">
            
            <h3 class="text-2xl sm:text-4xl font-extrabold text-white tracking-wide group-hover:text-pink-300 transition">
                ${items.title}
            </h3>

            <span class="text-lg sm:text-2xl font-bold text-pink-300 font-mono tracking-widest">
                ${items.japanese_name}
            </span>

            <p class="text-sm sm:text-base text-gray-200 italic text-center px-4 leading-relaxed max-w-3xl">
                "${items.description}"
            </p>

            <!-- BAGIAN BAWAH -->
            <div class="w-full grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 pt-6 border-t border-pink-500/20 text-left">
                
                <div class="flex flex-col justify-center space-y-2">
                    <div class="text-sm sm:text-base text-gray-300">
                        Lokasi: <span class="text-white font-bold text-base sm:text-lg">${items.location}</span>
                    </div>
                    <div class="text-sm sm:text-base text-gray-300">
                        Rating: <span class="text-pink-400 font-extrabold text-base sm:text-lg">${items.rating} / 5.0</span>
                    </div>
                </div>

                <div class="flex flex-col justify-center bg-pink-500/5 p-4 rounded-xl border border-pink-500/20">
                    <span class="text-xs font-mono uppercase text-pink-400 tracking-wider font-bold mb-1">Highlight &rarr; Klik untuk Detail</span>
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

    const foter = document.getElementById("footer");
    if (foter) {
      foter.innerHTML = dataMap.join("");
    }
  } catch (error) {
    console.error("Gagal memuat data lokal:", error);
  }
};

getData();
document.querySelectorAll(".interactive-svg-container").forEach((svgBox) => {
  const pushDistance = 45;
  const triggerRadius = 150;

  document.addEventListener("mousemove", (e) => {
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
      svgBox.classList.remove("floating-svg");
    } else {
      svgBox.style.transform = `translate3d(0px, 0px, 0px)`;
      svgBox.classList.add("floating-svg");
    }
  });
});

const navLinks = document.querySelectorAll(".navbutton .nav-link");

navLinks.forEach((link) => {
  link.addEventListener("click", function () {
    navLinks.forEach((nav) => nav.classList.remove("active"));
    this.classList.add("active");
  });
});
