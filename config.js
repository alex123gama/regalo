// ╔══════════════════════════════════════════════════════╗
// ║           ARCHIVO DE CONFIGURACIÓN                  ║
// ║   Edita solo este archivo para personalizar todo    ║
// ╚══════════════════════════════════════════════════════╝

const CONFIG = {

  // ── LOGIN ────────────────────────────────────────────
  login: {
    usuario:    "anabola",
    contrasena: "18febrero",
    titulo:     "Para ti ♡",
    subtitulo:  "Solo para ojos especiales",
  },

  // ── NAVBAR / GENERAL ────────────────────────────────
  general: {
    nombreApp: "COLECCIÓN ESPECIAL",
    badge:     "EDICIÓN LIMITADA",
    rango:     "RADIANTE ♦",
  },

  // ── LOBBY ────────────────────────────────────────────
  lobby: {
    edicion:   "✦ COLECCIÓN ESPECIAL · EDICIÓN LIMITADA ✦",
    temporada: "Temporada del Amor · Episodio ∞",
    agente:    "Guardiana del Corazón",
  },

  // ── CORAZÓN DE TULIPANES ─────────────────────────────
  corazon: {
    textoMain: "Te quiero",
    textoSub:  "mucho más que todas estas flores",
    tag:       "✦ PARA TI · EDICIÓN ESPECIAL ✦",
  },

  // ── PHOTOCARDS (Álbum) ───────────────────────────────
  // Puedes añadir, quitar o editar cualquier carta
  photocards: [
    {
      emoji:   "🌷",
      imagen: "fotos/foto5.jpeg",
      label:   "ROSA ETERNA",
      series:  "Serie I",
      rarity:  "UR",           // SR | SSR | UR | LEGEND
      colores: ["#fce4f0", "#f5a8d0"],
      patron:  "dots",         // dots | lines | hearts | stars
      frente:  "La primera vez que te vi",
      dorso:   "Despúes de tanto hablar porfin pudimos cuadrar para vernos, iba a ser nuestra primera vez...",
      fecha:   "✦ Día 1 ✦",
    },
    {
      emoji:   "🌸",
      imagen: "fotos/foto4.jpeg",
      label:   "FLOR DE LUNA",
      series:  "Serie I",
      rarity:  "SSR",
      colores: ["#f0e4fc", "#c8a0e8"],
      patron:  "lines",
      frente:  "Nuestra primera cita",
      dorso:   "La primera vez que uso mascarilla y es contigo en nuestra primera cita jsjsj",
      fecha:   "✦ Primer Encuentro ✦",
    },
    {
      emoji:   "💌",
      imagen: "fotos/foto3.jpeg",
      label:   "CARTA SECRETA",
      series:  "Serie II",
      rarity:  "UR",
      colores: ["#fce8e4", "#f0a898"],
      patron:  "hearts",
      frente:  "El primer \"te quiero\"",
      dorso:   "Despues de enviarme un emoji por fin me dijiste te quiero...",
      fecha:   "✦ Para Siempre ✦",
    },
    {
      emoji:   "⭐",
      imagen: "fotos/foto2.jpeg",
      label:   "ESTRELLA POLAR",
      series:  "Serie II",
      rarity:  "SR",
      colores: ["#e4f0fc", "#a0c8f0"],
      patron:  "dots",
      frente:  "La despedidad",
      dorso:   "Los 2 juntos disfrutando del final de la primera cita, solo importaba que estabas a mi lado",
      fecha:   "✦ Una Noche Mágica ✦",
    },
    {
      emoji:   "🎂",
      imagen: "fotos/foto1.jpeg",
      label:   "CUMPLEAÑOS",
      series:  "Edición Especial",
      rarity:  "LEGEND",
      colores: ["#fff0e4", "#f8c878"],
      patron:  "stars",
      frente:  "¡Feliz Cumpleaños!",
      dorso:   "Hoy es tu día y quiero que sepas lo increíble que eres. ¡Te quiero muchísimo!",
      fecha:   "✦ Hoy ✦",
    },
    {
      emoji:   "🫶",
      label:   "AMOR INFINITO",
      series:  "Edición Especial",
      rarity:  "UR",
      colores: ["#fce4f8", "#e8a0d8"],
      patron:  "lines",
      frente:  "Cada día contigo",
      dorso:   "Gracias por llenar mi vida de colores. Eres mi persona favorita en el universo.",
      fecha:   "✦ Siempre ✦",
    },
  ],

  // ── TIMELINE (Historia) ──────────────────────────────
  // Puedes añadir, quitar o editar cualquier momento
  timeline: [
    {
      icon:    "✨",
      label:   "EL COMIENZO",
      titulo:  "El primer día",
      desc:    "El universo conspiró para que nuestros caminos se cruzaran. Gran asistencia de Valorant",
      fecha:   "Día 1",
      color:   "#e0177a",
      lado:    "left",         // left | right
    },
    {
      icon:    "☕",
      label:   "PRIMER MOMENTO",
      titulo:  "Nuestra primera cita",
      desc:    "Nervios, risas y una conversación que no quería terminar. El tiempo se detuvo solo para nosotros.",
      fecha:   "Semana 1",
      color:   "#c40060",
      lado:    "right",
    },
    {
      icon:    "🌷",
      label:   "SENTIMIENTOS",
      titulo:  "El primer \"te quiero\"",
      desc:    "Esas dos palabras que cambiaron todo. Las dije con el corazón a mil por hora y tú sonreíste.",
      fecha:   "Mes 1",
      color:   "#e0177a",
      lado:    "left",
    },
    {
      icon:    "🌙",
      label:   "RECUERDO MÁGICO",
      titulo:  "Noches increíbles",
      desc:    "Abrazados, sin importar nada.",
      fecha:   "Mes 1",
      color:   "#9b30c4",
      lado:    "right",
    },
    {
      icon:    "🎵",
      label:   "NUESTRA CANCIÓN",
      titulo:  "La canción que es nuestra",
      desc:    "Desde ese momento no puedo escucharla sin pensar en ti. Cada nota lleva tu nombre.",
      fecha:   "Mes 1",
      color:   "#c40060",
      lado:    "left",
    },
    {
      icon:    "🧳",
      label:   "AVENTURA",
      titulo:  "Primera aventura juntos",
      desc:    "Descubrí que contigo cualquier lugar se convierte en el mejor destino del mundo.",
      fecha:   "Mes 1",
      color:   "#e0177a",
      lado:    "right",
    },
    {
      icon:      "🎂",
      label:     "HOY",
      titulo:    "¡Feliz Cumpleaños!",
      desc:      "Hoy celebramos a la persona más especial de mi vida. Que este año esté lleno de magia, amor y todo lo que mereces.",
      fecha:     "Hoy ♡",
      color:     "#f0a800",
      lado:      "left",
      destacado: true,         // pone el brillo especial
    },
  ],

  // ── MÚSICA ───────────────────────────────────────────
  // Pon tus canciones en la carpeta /songs/ y escribe el nombre del archivo
  // Si no tienes archivos, déjalo como null y será modo demo
  musica: [
    { titulo: "Nuestra Canción",  artista: "Para ti",    emoji: "🌷", archivo: "songs/musica1.mp3" },
    { titulo: "Recuerdos",        artista: "Special Mix", emoji: "💌", archivo: "songs/musica2.mp3" },
    { titulo: "Te Quiero",        artista: "Siempre",    emoji: "🌸", archivo: null },
  ],

};
