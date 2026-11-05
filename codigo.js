/* =====================================================
   1) DATOS DE CONTACTO (cámbialos solo aquí)
   ===================================================== */
const CONFIG = {
  telefono: "523313091801",            // 52 (México) + 10 dígitos, sin + ni espacios
  telefonoVisible: "+52 33 1309 1801", // como se muestra en la página
  mensaje: "Hola, me gustaría información para rentar una cabaña en Mazamitla.",
  airbnb: "https://www.airbnb.mx/",    // ← PEGA AQUÍ el enlace de Airbnb general
  mapa: "https://maps.google.com/maps?q=Mazamitla,Jalisco,Mexico&z=14&output=embed" // por ahora solo Mazamitla
};

/* =====================================================
   2) CABAÑAS Y FOTOS
   - Sube tus fotos .webp a la carpeta "fotos" del repositorio.
   - fotos[0] es la foto principal (se ve en la página principal); las demás salen en la página de cada cabaña.
   - id: es lo que va en el enlace, por ejemplo cabana.html?c=lagunita
   - Mientras no existan los archivos, se muestra una imagen de relleno.
   - capacidad: escribe por ejemplo "Hasta 6 personas" (vacío = no se muestra).
   - airbnb: pega el enlace propio de cada cabaña (vacío = usa el general).
   ===================================================== */
const cabanas = [
  {
    id: "lagunita",
    nombre: "La Lagunita Mazamitla",
    descripcion: "Un rincón tranquilo rodeado de naturaleza, con área de fogata para descansar y convivir. Ideal para parejas, familias o grupos.",
    capacidad: "",
    airbnb: "",
    fotos: ["fotos/lagunita-1.webp", "fotos/lagunita-2.webp", "fotos/lagunita-3.webp", "fotos/lagunita-4.webp"]
  },
  {
    id: "bonita",
    nombre: "La Bonita Mazamitla",
    descripcion: "Aire fresco, paisaje verde y noches de fogata para platicar sin prisa. Perfecta para una escapada en pareja o en familia.",
    capacidad: "",
    airbnb: "",
    fotos: ["fotos/bonita-1.webp", "fotos/bonita-2.webp", "fotos/bonita-3.webp", "fotos/bonita-4.webp"]
  },
  {
    id: "rosalia",
    nombre: "Rosalia",
    descripcion: "Un espacio acogedor entre la naturaleza, con fogata para reunirse y convivir. Pensada para familias y grupos de amigos.",
    capacidad: "",
    airbnb: "",
    fotos: ["fotos/rosalia-1.webp", "fotos/rosalia-2.webp", "fotos/rosalia-3.webp", "fotos/rosalia-4.webp"]
  },
  {
    id: "rafaela",
    nombre: "Rafaela",
    descripcion: "Tranquilidad, bosque alrededor y un área de fogata para compartir. Una buena opción para parejas, familias o grupos grandes.",
    capacidad: "",
    airbnb: "",
    fotos: ["fotos/rafaela-1.webp", "fotos/rafaela-2.webp", "fotos/rafaela-3.webp", "fotos/rafaela-4.webp"]
  }
];

/* =====================================================
   3) CÓDIGO (no necesitas tocar de aquí hacia abajo)
   ===================================================== */

// Imagen de relleno cuando todavía no existe la foto
const RELLENO = "data:image/svg+xml;utf8," + encodeURIComponent(
  "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 600'><defs><linearGradient id='g' x2='0' y2='1'><stop offset='0' stop-color='#d6e6da'/><stop offset='1' stop-color='#6f9a7c'/></linearGradient></defs><rect width='800' height='600' fill='url(#g)'/><path d='M0 600L190 340l120 130 200-220L800 600z' fill='#24503f' opacity='.85'/><circle cx='620' cy='140' r='46' fill='#fff' opacity='.7'/><text x='400' y='310' font-family='Arial' font-size='36' fill='#fff' text-anchor='middle'>Foto próximamente</text></svg>"
);
document.addEventListener("error", e => {
  const i = e.target;
  if (i.tagName === "IMG" && !i.dataset.relleno) { i.dataset.relleno = "1"; i.src = RELLENO; }
}, true);

// Restablece cookies, almacenamiento y cachés en cada visita
function restablecer() {
  try {
    document.cookie.split(";").forEach(c => {
      const n = c.split("=")[0].trim();
      if (n) {
        document.cookie = n + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
        document.cookie = n + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=" + location.hostname;
      }
    });
    localStorage.clear(); sessionStorage.clear();
  } catch (e) {}
  if ("caches" in window) caches.keys().then(k => k.forEach(n => caches.delete(n))).catch(() => {});
  if ("serviceWorker" in navigator) navigator.serviceWorker.getRegistrations().then(r => r.forEach(s => s.unregister())).catch(() => {});
}
restablecer();

// Íconos de línea (reemplazan a los emojis)
const P = {
  users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',
  tree: '<path d="M12 22v-5M12 3l-6 8h3l-5 7h16l-5-7h3z"/>',
  flame: '<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.07-2.14-.22-4.05 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.15.43-2.29 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>',
  heart: '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7z"/>',
  pin: '<path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/>',
  chat: '<path d="M21 11.5a8.4 8.4 0 0 1-12.3 7.4L3 21l1.9-5.5A8.4 8.4 0 1 1 21 11.5z"/>',
  phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/>'
};
const ic = n => `<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${P[n]}</svg>`;
const etiquetas = k => `<ul class="tags"><li>${ic("tree")}Naturaleza</li><li>${ic("flame")}Fogata</li><li>${ic("heart")}Parejas y familias</li>${k.capacidad ? `<li>${ic("users")}${k.capacidad}</li>` : ""}</ul>`;

// Página principal: solo foto principal, nombre y botón
function pintarCabanas() {
  const l = document.getElementById("lista-cabanas");
  if (!l) return;
  l.innerHTML = cabanas.map((k, i) => `
    <article class="cabana ${i % 2 ? "inv" : ""}">
      <img class="cab-foto" src="${k.fotos[0]}" alt="${k.nombre}" loading="lazy" width="800" height="600">
      <div class="cab-info">
        <h3>${k.nombre}</h3>
        <p>${k.descripcion}</p>
        <a class="btn" href="cabana.html?c=${k.id}">Saber más</a>
      </div>
    </article>`).join("");
}

// Página de cada cabaña (cabana.html?c=...)
function pintarDetalle() {
  const d = document.getElementById("detalle-cabana");
  if (!d) return;
  const k = cabanas.find(x => x.id === new URLSearchParams(location.search).get("c"));
  if (!k) { d.innerHTML = '<p class="sub">No encontramos esa cabaña. <a href="index.html#cabanas">Ver todas</a></p>'; return; }
  document.title = k.nombre + " | Cabañas La Lagunita y La Bonita";
  document.querySelector(".barra [data-airbnb]").dataset.airbnb = k.airbnb || "";
  d.innerHTML = `
    <a class="volver" href="index.html#cabanas">← Todas las cabañas</a>
    <h1>${k.nombre}</h1>
    <img class="portada-cab" src="${k.fotos[0]}" alt="${k.nombre}" width="1200" height="750">
    <p class="desc">${k.descripcion}</p>
    ${etiquetas(k)}
    <h2>Más fotos</h2>
    <div class="galeria">${k.fotos.slice(1).map((f, j) => `<img src="${f}" alt="${k.nombre}, foto ${j + 2}" loading="lazy" width="600" height="450">`).join("")}</div>
    <h2>${ic("pin")}Ubicación</h2>
    <iframe src="${CONFIG.mapa}" title="Mapa de Mazamitla" loading="lazy"></iframe>
    <div class="acciones">
      <a class="btn" href="${k.airbnb || CONFIG.airbnb}" target="_blank" rel="noopener">¿Quieres reservar?</a>
      <a class="btn ghost-d" data-wa="${k.nombre}">${ic("chat")}Preguntar por WhatsApp</a>
    </div>`;
}

// Enlaces de WhatsApp, teléfono y Airbnb + íconos
function enlaces() {
  document.querySelectorAll("[data-i]").forEach(e => { e.innerHTML = ic(e.dataset.i); });
  document.querySelectorAll("[data-wa]").forEach(a => {
    const n = a.dataset.wa;
    a.href = "https://wa.me/" + CONFIG.telefono + "?text=" + encodeURIComponent(CONFIG.mensaje + (n ? " Me interesa: " + n + "." : ""));
    a.target = "_blank"; a.rel = "noopener";
  });
  document.querySelectorAll("[data-tel]").forEach(a => { a.href = "tel:+" + CONFIG.telefono; a.textContent = CONFIG.telefonoVisible; });
  document.querySelectorAll("[data-airbnb]").forEach(a => { a.href = a.dataset.airbnb || CONFIG.airbnb; a.target = "_blank"; a.rel = "noopener"; });
}

// Fotos a pantalla completa (toca una foto; desliza o usa las flechas)
function lightbox() {
  const imgs = [...document.querySelectorAll(".portada-cab,.galeria img")];
  if (!imgs.length) return;
  const lb = document.createElement("div");
  lb.className = "lb";
  lb.innerHTML = `<button class="lb-x" aria-label="Cerrar">×</button><button class="lb-p" aria-label="Anterior">‹</button><img alt=""><button class="lb-n" aria-label="Siguiente">›</button>`;
  document.body.appendChild(lb);
  const im = lb.querySelector("img");
  let i = 0, x0 = 0;
  const ver = n => { i = (n + imgs.length) % imgs.length; im.src = imgs[i].currentSrc || imgs[i].src; im.alt = imgs[i].alt; };
  const cerrar = () => { lb.classList.remove("on"); document.body.classList.remove("sin-scroll"); };
  imgs.forEach((g, n) => {
    g.classList.add("zoom");
    g.addEventListener("click", () => { ver(n); lb.classList.add("on"); document.body.classList.add("sin-scroll"); });
  });
  lb.querySelector(".lb-x").onclick = cerrar;
  lb.querySelector(".lb-p").onclick = () => ver(i - 1);
  lb.querySelector(".lb-n").onclick = () => ver(i + 1);
  lb.addEventListener("click", e => { if (e.target === lb) cerrar(); });
  lb.addEventListener("touchstart", e => { x0 = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener("touchend", e => { const d = e.changedTouches[0].clientX - x0; if (Math.abs(d) > 50) ver(i + (d < 0 ? 1 : -1)); });
  addEventListener("keydown", e => {
    if (!lb.classList.contains("on")) return;
    if (e.key === "Escape") cerrar();
    if (e.key === "ArrowRight") ver(i + 1);
    if (e.key === "ArrowLeft") ver(i - 1);
  });
}

// Aparición suave al hacer scroll
function revelar() {
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
  }), { threshold: .12 });
  document.querySelectorAll(".sec h2,.sub,.feats div,.cabana,.det>*,.contacto>*").forEach(el => {
    el.classList.add("rev");
    el.style.transitionDelay = Math.min([...el.parentNode.children].indexOf(el), 3) * 90 + "ms";
    io.observe(el);
  });
}

pintarCabanas();
pintarDetalle();
enlaces();
lightbox();
revelar();

// Menú del celular, encabezado y barra de reservar
const top_ = document.getElementById("top"), burger = document.querySelector(".burger"), barra = document.querySelector(".barra");
burger.addEventListener("click", () => {
  const o = top_.classList.toggle("open");
  burger.setAttribute("aria-expanded", o);
});
document.querySelectorAll("#menu a").forEach(a => a.addEventListener("click", () => { top_.classList.remove("open"); burger.setAttribute("aria-expanded", false); }));
const interna = document.body.classList.contains("interna");
const alScroll = () => {
  top_.classList.toggle("solid", interna || scrollY > 60);
  barra.classList.toggle("on", interna || scrollY > innerHeight * .6);
};
addEventListener("scroll", alScroll, { passive: true });
alScroll();

// Fotos de portada que cambian solas (solo en la página principal)
const slides = document.querySelectorAll(".slides img");
let actual = 0;
if (slides.length > 1) setInterval(() => {
  slides[actual].classList.remove("on");
  actual = (actual + 1) % slides.length;
  slides[actual].classList.add("on");
}, 6000);