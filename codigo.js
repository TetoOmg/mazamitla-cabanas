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
  d.innerHTML = `
    <a class="volver" href="index.html#cabanas">← Todas las cabañas</a>
    <h1>${k.nombre}</h1>
    <img class="portada-cab" src="${k.fotos[0]}" alt="${k.nombre}" width="1200" height="750">
    <p class="desc">${k.descripcion}</p>
    <ul class="tags"><li>🌲 Naturaleza</li><li>🔥 Fogata</li><li>💞 Parejas y familias</li>${k.capacidad ? `<li>👥 ${k.capacidad}</li>` : ""}</ul>
    <h2>Más fotos</h2>
    <div class="galeria">${k.fotos.slice(1).map((f, j) => `<img src="${f}" alt="${k.nombre}, foto ${j + 2}" loading="lazy" width="600" height="450">`).join("")}</div>
    <h2>📍 Ubicación</h2>
    <iframe src="${CONFIG.mapa}" title="Mapa de Mazamitla" loading="lazy"></iframe>
    <div class="acciones">
      <a class="btn" href="${k.airbnb || CONFIG.airbnb}" target="_blank" rel="noopener">¿Quieres reservar?</a>
      <a class="btn ghost-d" data-wa="${k.nombre}">Preguntar por WhatsApp</a>
    </div>`;
}

// Enlaces de WhatsApp, teléfono y Airbnb
function enlaces() {
  document.querySelectorAll("[data-wa]").forEach(a => {
    const n = a.dataset.wa;
    a.href = "https://wa.me/" + CONFIG.telefono + "?text=" + encodeURIComponent(CONFIG.mensaje + (n ? " Me interesa: " + n + "." : ""));
    a.target = "_blank"; a.rel = "noopener";
  });
  document.querySelectorAll("[data-tel]").forEach(a => { a.href = "tel:+" + CONFIG.telefono; a.textContent = CONFIG.telefonoVisible; });
  document.querySelectorAll("[data-airbnb]").forEach(a => { a.href = CONFIG.airbnb; a.target = "_blank"; a.rel = "noopener"; });
}

pintarCabanas();
pintarDetalle();
enlaces();

// Menú del celular y encabezado
const top_ = document.getElementById("top"), burger = document.querySelector(".burger");
burger.addEventListener("click", () => {
  const o = top_.classList.toggle("open");
  burger.setAttribute("aria-expanded", o);
});
document.querySelectorAll("#menu a").forEach(a => a.addEventListener("click", () => { top_.classList.remove("open"); burger.setAttribute("aria-expanded", false); }));
const interna = document.body.classList.contains("interna");
addEventListener("scroll", () => top_.classList.toggle("solid", interna || scrollY > 60), { passive: true });

// Fotos de portada que cambian solas (solo en la página principal)
const slides = document.querySelectorAll(".slides img");
let actual = 0;
if (slides.length > 1) setInterval(() => {
  slides[actual].classList.remove("on");
  actual = (actual + 1) % slides.length;
  slides[actual].classList.add("on");
}, 5000);
