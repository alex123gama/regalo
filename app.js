// ══════════════════════════════════════════════════════
//  CURSOR
// ══════════════════════════════════════════════════════
(function () {
  var cross = document.getElementById('cur-cross');
  var dot   = document.getElementById('cur-dot');
  var ring  = document.getElementById('cur-ring');
  var rx = -100, ry = -100, tx = -100, ty = -100;
  document.addEventListener('mousemove', function (e) {
    tx = e.clientX; ty = e.clientY;
    cross.style.left = tx + 'px'; cross.style.top = ty + 'px';
    dot.style.left   = tx + 'px'; dot.style.top   = ty + 'px';
  });
  (function loop() {
    rx += (tx - rx) * 0.13; ry += (ty - ry) * 0.13;
    ring.style.left = Math.round(rx) + 'px';
    ring.style.top  = Math.round(ry) + 'px';
    requestAnimationFrame(loop);
  })();
})();

// ══════════════════════════════════════════════════════
//  BG HELPER
// ══════════════════════════════════════════════════════
var BG_MAP = {
  login:    'radial-gradient(ellipse at 50% 50%, #fce8f4, #fdf0f5 60%, #f8dcea)',
  lobby:    'radial-gradient(ellipse at 30% 50%, #fce4f0, #fdf0f5 50%, #f9e0ee)',
  heart:    'radial-gradient(ellipse at 60% 40%, #fde8f4, #fdf0f5 55%, #f5dcea)',
  album:    'radial-gradient(ellipse at 20% 70%, #fde4ef, #fdf0f5 50%, #f8dce8)',
  timeline: 'radial-gradient(ellipse at 80% 30%, #fce0ed, #fdf0f5 55%, #f7dcea)',
};
function setBG(v) { document.getElementById('bg').style.background = BG_MAP[v]; }

// ══════════════════════════════════════════════════════
//  TULIP DATA (generated once)
// ══════════════════════════════════════════════════════
function hpt(t) {
  return {
    x: 16 * Math.pow(Math.sin(t), 3),
    y: -(13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t))
  };
}
var TULIPS = (function () {
  var pts = [];
  for (var i = 0; i < 32; i++) {
    var t = (i / 32) * Math.PI * 2, p = hpt(t);
    pts.push({ cx: 200 + p.x * 8.2, cy: 200 + p.y * 8.2 - 10,
               s: .8 + Math.random() * .35, d: i * .065,
               h: Math.random() > .5 ? 0 : Math.random() > .5 ? 1 : 2,
               r: -15 + Math.random() * 30 });
  }
  var ct = 0, a = 0;
  while (ct < 14 && a < 350) {
    a++;
    var rx = (Math.random() * 2 - 1) * 115, ry2 = (Math.random() * 2 - 1) * 95;
    var nx = rx / 8.2, ny = -(ry2 / 8.2);
    var ang = Math.atan2(ny, nx);
    var qx = 16 * Math.pow(Math.sin(ang), 3);
    var qy = -(13*Math.cos(ang) - 5*Math.cos(2*ang) - 2*Math.cos(3*ang) - Math.cos(4*ang));
    if (Math.sqrt(Math.pow(nx-qx,2) + Math.pow(ny-qy,2)) < 5) {
      pts.push({ cx: 200+rx, cy: 200+ry2-10, s: .48+Math.random()*.38,
                 d: .9+Math.random()*.7, h: Math.random()>.3?1:2, r: -20+Math.random()*40 });
      ct++;
    }
  }
  return pts;
})();
var PETAL_COLORS = [
  ['#e0177a','#c40060','#4a7c59','#5a9c6a'],
  ['#f0318c','#d01070','#4a7c59','#5a9c6a'],
  ['#ff6bb5','#e8409a','#5a9c6a','#6aac7a']
];
var RC = { SR: '#a0c8f0', SSR: '#c8a0e8', UR: '#f0a8c8', LEGEND: '#f8d878' };
var SCAN = ['Inicializando protocolo de amor...','Verificando sentimientos...','Cargando recuerdos compartidos...','Sincronizando corazones...','Encontrando partida perfecta...','¡Partida encontrada! ♡'];

// ══════════════════════════════════════════════════════
//  REACT SHORTCUTS
// ══════════════════════════════════════════════════════
var h          = React.createElement;
var useState   = React.useState;
var useEffect  = React.useEffect;
var useRef     = React.useRef;

// ══════════════════════════════════════════════════════
//  LOGIN
// ══════════════════════════════════════════════════════
function Login(props) {
  var s1 = useState(''); var user = s1[0]; var setUser = s1[1];
  var s2 = useState(''); var pass = s2[0]; var setPass = s2[1];
  var s3 = useState(''); var err  = s3[0]; var setErr  = s3[1];
  var s4 = useState(0);  var errK = s4[0]; var setErrK = s4[1];

  function submit(e) {
    e.preventDefault();
    if (user === CONFIG.login.usuario && pass === CONFIG.login.contrasena) {
      props.onLogin();
    } else {
      setErr('Usuario o contraseña incorrectos');
      setErrK(function(k){ return k + 1; });
    }
  }

  return h('div', { className: 'login-screen' },
    h('div', { className: 'login-deco-top' }, '✦ ACCESO PRIVADO ✦'),
    h('div', { className: 'login-card glass' },
      h('div', { className: 'login-icon' }, '🌷'),
      h('div', { className: 'login-title' }, CONFIG.login.titulo),
      h('div', { className: 'login-sub'   }, CONFIG.login.subtitulo),
      h('div', { className: 'login-divider' }),

      h('form', { onSubmit: submit, style: { display:'flex', flexDirection:'column', gap:16 } },
        h('div', { className: 'login-field' },
          h('label', { className: 'login-label' }, 'Usuario'),
          h('input', {
            className: 'login-input', type: 'text',
            placeholder: 'tu usuario...', value: user, autoComplete: 'off',
            onChange: function(e){ setUser(e.target.value); setErr(''); }
          })
        ),
        h('div', { className: 'login-field' },
          h('label', { className: 'login-label' }, 'Contraseña'),
          h('input', {
            className: 'login-input', type: 'password',
            placeholder: '••••••••', value: pass,
            onChange: function(e){ setPass(e.target.value); setErr(''); }
          })
        ),
        err && h('div', { key: errK, className: 'login-error', style:{ animation:'shake .4s ease' } }, err),
        h('button', { className: 'login-btn', type: 'submit' },
          'ENTRAR',
          h('div', { className: 'login-btn-glare' })
        )
      )
    ),
    h('div', { className: 'login-footer' }, '✦ Solo para ojos especiales ✦')
  );
}

// ══════════════════════════════════════════════════════
//  NAVBAR
// ══════════════════════════════════════════════════════
function NavBar(props) {
  var cur = props.cur; var nav = props.nav;
  var links = [
    { v: 'heart',    l: 'Corazón',  i: '🌷' },
    { v: 'album',    l: 'Álbum',    i: '📸' },
    { v: 'timeline', l: 'Historia', i: '📅' },
  ];
  return h('nav', { className: 'navbar glass' },
    h('div', { className: 'nb-logo' },
      h('span', { className: 'nb-star' }, '✦'),
      h('span', { className: 'nb-text' }, CONFIG.general.nombreApp),
      h('span', { className: 'nb-badge' }, CONFIG.general.badge)
    ),
    h('ul', { className: 'nb-links' },
      links.map(function(x) {
        return h('li', { key: x.v },
          h('button', { className: 'nb-btn' + (cur === x.v ? ' active' : ''), onClick: function(){ nav(x.v); } },
            x.i, ' ', x.l
          )
        );
      })
    ),
    h('div', { className: 'nb-rank' },
      h('span', { className: 'nb-rl' }, 'RANGO'),
      h('span', { className: 'nb-rv' }, CONFIG.general.rango)
    )
  );
}

// ══════════════════════════════════════════════════════
//  MUSIC PLAYER (VERSIÓN REAL)
// ══════════════════════════════════════════════════════
function MusicPlayer() {
  var s1 = useState(false); var exp  = s1[0]; var setExp  = s1[1];
  var s2 = useState(false); var play = s2[0]; var setPlay = s2[1];
  var s3 = useState(0);     var prog = s3[0]; var setProg = s3[1];
  var s4 = useState(0);     var idx  = s4[0]; var setIdx  = s4[1];
  var songs = CONFIG.musica;
  var song  = songs[idx];

  var audioRef = useRef(null);
  if (!audioRef.current) audioRef.current = new Audio();

  // Cambiar de canción
  useEffect(function() {
    var a = audioRef.current;
    if (song.archivo) {
      a.src = song.archivo;
      if (play) a.play().catch(function(e){ console.log("Clickea la página para reproducir"); });
    }
  }, [idx, song.archivo]);

  // Play / Pause
  useEffect(function() {
    var a = audioRef.current;
    if (song.archivo) {
      if (play) a.play().catch(function(e){ console.log("Bloqueado por el navegador"); });
      else a.pause();
    }
  }, [play, song.archivo]);

  // Progreso y tiempo
  useEffect(function() {
    var a = audioRef.current;
    var onTime = function() { if (a.duration) setProg((a.currentTime / a.duration) * 100); };
    var onEnd = function() { setIdx(function(i){ return (i+1)%songs.length; }); setProg(0); };
    a.addEventListener('timeupdate', onTime);
    a.addEventListener('ended', onEnd);
    return function() { a.removeEventListener('timeupdate', onTime); a.removeEventListener('ended', onEnd); };
  }, [songs.length]);

  function fmt(p) {
    var a = audioRef.current;
    var secs = Math.floor((p / 100) * (a && a.duration ? a.duration : 0)) || 0;
    return Math.floor(secs/60) + ':' + (secs % 60).toString().padStart(2,'0');
  }
  
  function seek(e) {
    var r = e.currentTarget.getBoundingClientRect();
    var pct = Math.max(0, Math.min(100, ((e.clientX - r.left) / r.width) * 100));
    var a = audioRef.current;
    if (a && a.duration) a.currentTime = (pct / 100) * a.duration;
    setProg(pct);
  }

  function setVol(e) {
    if (audioRef.current) audioRef.current.volume = e.target.value;
  }

  return h('div', { className: 'mp glass' },
    h('div', { className: 'mp-mini', onClick: function(){ setExp(function(e){ return !e; }); } },
      h('span', { className: 'mp-emo' }, song.emoji),
      h('div',  { className: 'mp-info' },
        h('span', { className: 'mp-song'   }, song.titulo),
        h('span', { className: 'mp-artist' }, song.artista)
      ),
      h('button', { className: 'mp-btn mp-playmini', onClick: function(e){ e.stopPropagation(); setPlay(function(p){ return !p; }); } }, play ? '⏸' : '▶'),
      h('span', { className: 'mp-arrow' + (exp ? ' open' : '') }, '▲')
    ),
    h('div', { className: 'mp-strip', onClick: seek },
      h('div', { className: 'mp-stripfill', style: { width: prog + '%' } })
    ),
    exp && h('div', { className: 'mp-expanded' },
      h('div', { className: 'mp-playlist' },
        songs.map(function(s, i) {
          return h('div', { key: i, className: 'mp-track' + (i === idx ? ' active' : ''),
            onClick: function(){ setIdx(i); setProg(0); setPlay(true); } },
            h('span', { className: 'mp-temo' }, s.emoji),
            h('span', { className: 'mp-tname' }, s.titulo),
            h('span', { className: 'mp-tartist' }, s.artista),
            i === idx && play && h('span', { className: 'mp-bars' }, h('span'), h('span'), h('span'))
          );
        })
      ),
      h('div', { className: 'mp-controls' },
        h('button', { className: 'mp-btn', style:{ fontSize:14 }, onClick: function(){ setIdx(function(i){ return (i-1+songs.length)%songs.length; }); setProg(0); setPlay(true); } }, '⏮'),
        h('button', { className: 'mp-btn mp-playbtn', onClick: function(){ setPlay(function(p){ return !p; }); } }, play ? '⏸' : '▶'),
        h('button', { className: 'mp-btn', style:{ fontSize:14 }, onClick: function(){ setIdx(function(i){ return (i+1)%songs.length; }); setProg(0); setPlay(true); } }, '⏭')
      ),
      h('div', { className: 'mp-seekrow' },
        h('span', { className: 'mp-time' }, fmt(prog)),
        h('div', { className: 'mp-seekbar', onClick: seek },
          h('div', { className: 'mp-seekfill', style:{ width: prog+'%' } },
            h('div', { className: 'mp-seekthumb' })
          )
        ),
        h('span', { className: 'mp-time' }, audioRef.current && audioRef.current.duration ? Math.floor(audioRef.current.duration/60) + ':' + (Math.floor(audioRef.current.duration)%60).toString().padStart(2,'0') : '0:00')
      ),
      h('div', { className: 'mp-volrow' },
        h('span', null, '🔊'),
        h('input', { type:'range', min:0, max:1, step:.01, defaultValue:.65, className:'mp-volslider', onChange: setVol })
      )
    )
  );
}

// ══════════════════════════════════════════════════════
//  LOBBY
// ══════════════════════════════════════════════════════
function Lobby(props) {
  var s1 = useState('idle'); var phase = s1[0]; var setPhase = s1[1];
  var s2 = useState(0);      var prog  = s2[0]; var setProg  = s2[1];
  var s3 = useState(0);      var mi    = s3[0]; var setMi    = s3[1];
  var s4 = useState(34);     var ping  = s4[0]; var setPing  = s4[1];
  var s5 = useState(false);  var found = s5[0]; var setFound = s5[1];

  useEffect(function() {
    var id = setInterval(function(){ setPing(Math.floor(Math.random()*12+28)); }, 2500);
    return function(){ clearInterval(id); };
  }, []);

  function start() {
    if (phase !== 'idle') return;
    setPhase('searching');
    var m = 0, p = 0;
    var mi_id = setInterval(function() {
      m++; if (m < SCAN.length) setMi(m); else clearInterval(mi_id);
    }, 900);
    var p_id = setInterval(function() {
      p += Math.random() * 3 + 1.5;
      if (p >= 100) {
        p = 100; clearInterval(p_id); clearInterval(mi_id);
        setMi(SCAN.length - 1);
        setTimeout(function(){ setFound(true); }, 200);
        setTimeout(function(){ props.onEnter(); }, 2800);
      }
      setProg(Math.min(p, 100));
    }, 80);
  }

  return h('div', { className: 'lobby' },
    h('div', { className: 'lobby-scanline' }),
    h('div', { className: 'lobby-grid' }),
    h('div', { className: 'lobby-hdr' },
      h('div', { className: 'lh-ed' }, CONFIG.lobby.edicion),
      h('div', { className: 'lh-rank' },
        h('span', { className: 'lh-diamond' }, '◆'),
        h('span', { className: 'lh-rt' }, 'RANGO ACTUAL'),
        h('span', { className: 'lh-rn' }, 'RADIANTE'),
        h('span', { className: 'lh-diamond' }, '◆')
      ),
      h('div', { className: 'lh-sub' }, CONFIG.lobby.temporada)
    ),
    h('div', { className: 'lobby-card glass' },
      h('div', { className: 'l-agent' },
        h('div', { className: 'l-agcircle' },
          h('span', { className: 'l-agemo' }, '🌷'),
          h('div', { className: 'l-agring' }),
          h('div', { className: 'l-agring l-agring2' })
        ),
        h('div', null,
          h('span', { className: 'l-agcode' }, 'AGENTE: AMOR'),
          h('span', { className: 'l-agrole' }, 'Rol: ' + CONFIG.lobby.agente)
        )
      ),
      h('div', { className: 'l-stats' },
        [['VICTORIAS','∞'],['K/D RATIO','♡/0'],['PRECISIÓN','100%'],['NIVEL','MAX']].map(function(x){
          return h('div', { key: x[0], className: 'l-stat' },
            h('span', { className: 'l-sl' }, x[0]),
            h('span', { className: 'l-sv' }, x[1])
          );
        })
      ),
      h('div', { className: 'l-search' },
        phase === 'idle' && h('button', { className: 'l-btn', onClick: start },
          h('span', null, 'BUSCAR PARTIDA'),
          h('div', { className: 'l-btn-glare' })
        ),
        phase === 'searching' && !found && h('div', { className: 'l-searching' },
          h('div', { className: 'l-msg' }, SCAN[mi]),
          h('div', { className: 'l-bartrack' },
            h('div', { className: 'l-barfill', style:{ width: prog+'%' } }),
            h('div', { className: 'l-pct' }, Math.round(prog) + '%')
          )
        ),
        found && h('div', { className: 'l-found' },
          h('div', { className: 'l-ficon' }, '♡'),
          h('div', { className: 'l-ftxt' }, '¡PARTIDA ENCONTRADA!'),
          h('div', { className: 'l-fsub' }, 'Conectando al servidor del amor…')
        )
      )
    ),
    h('div', { className: 'lobby-footer' },
      h('div', { className: 'lf-item' }, h('span',{className:'lf-lbl'},'PING'), h('span',{className:'lf-val',style:{color:'#4ade80'}}, ping+'ms')),
      h('div', { className: 'lf-sep' }, '|'),
      h('div', { className: 'lf-item' }, h('span',{className:'lf-lbl'},'SERVIDOR'), h('span',{className:'lf-val'},'CORAZÓN-ES-1')),
      h('div', { className: 'lf-sep' }, '|'),
      h('div', { className: 'lf-item' }, h('span',{className:'lf-lbl'},'MODO'), h('span',{className:'lf-val'},'AMOR COMPETITIVO'))
    )
  );
}

// ══════════════════════════════════════════════════════
//  TULIP HEART
// ══════════════════════════════════════════════════════
function TulipSVG(props) {
  if (!props.bloomed) return h('svg', { viewBox:'60 60 280 260', className:'tul-svg' },
    h('defs', null, h('radialGradient', { id:'hg', cx:'50%', cy:'50%', r:'50%' },
      h('stop',{offset:'0%',stopColor:'rgba(224,23,122,0.14)'}),
      h('stop',{offset:'100%',stopColor:'rgba(224,23,122,0)'})
    ))
  );
  return h('svg', { viewBox:'60 60 280 260', className:'tul-svg' },
    h('defs', null, h('radialGradient', { id:'hg', cx:'50%', cy:'50%', r:'50%' },
      h('stop',{offset:'0%',stopColor:'rgba(224,23,122,0.14)'}),
      h('stop',{offset:'100%',stopColor:'rgba(224,23,122,0)'})
    )),
    h('ellipse', { cx:200, cy:195, rx:112, ry:100, fill:'url(#hg)' }),
    TULIPS.map(function(t, i) {
      var c = PETAL_COLORS[t.h];
      return h('g', { key: i, transform: 'translate('+t.cx+','+t.cy+') rotate('+t.r+') scale('+t.s+')' },
        h('g', { style: { animation:'bloom .7s '+t.d+'s ease both', transformOrigin:'0px 0px', transformBox:'fill-box' } },
          h('line',    { x1:0, y1:0, x2:0, y2:18, stroke:c[2], strokeWidth:1.8, strokeLinecap:'round' }),
          h('ellipse', { cx:-4, cy:10, rx:5, ry:2.5, fill:c[3], opacity:.9, transform:'rotate(-30,-4,10)' }),
          h('ellipse', { cx:0,  cy:-10, rx:4.5, ry:8, fill:c[0] }),
          h('ellipse', { cx:-4.5, cy:-7, rx:3.5, ry:7, fill:c[1], transform:'rotate(-25)' }),
          h('ellipse', { cx:4.5,  cy:-7, rx:3.5, ry:7, fill:c[1], transform:'rotate(25)'  }),
          h('ellipse', { cx:0, cy:-14, rx:1.5, ry:2, fill:'rgba(255,255,255,0.34)' })
        )
      );
    })
  );
}

function TulipHeart() {
  var s1 = useState(false); var bloomed = s1[0]; var setBloomed = s1[1];
  var s2 = useState(false); var txt = s2[0]; var setTxt = s2[1];
  useEffect(function() {
    var t1 = setTimeout(function(){ setBloomed(true); }, 350);
    var t2 = setTimeout(function(){ setTxt(true); }, 3300);
    return function(){ clearTimeout(t1); clearTimeout(t2); };
  }, []);
  return h('div', { className: 'tulip-screen' },
    h('div', { className: 'tul-tag' }, CONFIG.corazon.tag),
    h('div', { className: 'tul-stage' },
      h(TulipSVG, { bloomed: bloomed }),
      txt && h('div', { className: 'tul-text', style:{ animation:'scaleIn 1s ease both' } },
        h('span', { className: 'tul-main' }, CONFIG.corazon.textoMain),
        h('span', { className: 'tul-sub'  }, CONFIG.corazon.textoSub)
      )
    ),
    h('div', { className: 'tul-corner tc-tl' }, '✦'),
    h('div', { className: 'tul-corner tc-tr' }, '✦'),
    h('div', { className: 'tul-corner tc-bl' }, '✦'),
    h('div', { className: 'tul-corner tc-br' }, '✦')
  );
}

// ══════════════════════════════════════════════════════
//  ALBUM
// ══════════════════════════════════════════════════════
function PhotoCard(props) {
  var card = props.card;
  var s1 = useState(false); var fl = s1[0]; var setFl = s1[1];
  var s2 = useState({ x:50, y:50, on:false }); var glare = s2[0]; var setGlare = s2[1];
  return h('div', {
    className: 'pc-wrap' + (fl ? ' flipped' : ''),
    onClick: function(){ setFl(function(f){ return !f; }); },
    onMouseMove: function(e) {
      var r = e.currentTarget.getBoundingClientRect();
      setGlare({ x:((e.clientX-r.left)/r.width)*100, y:((e.clientY-r.top)/r.height)*100, on:true });
    },
    onMouseLeave: function(){ setGlare(function(g){ return Object.assign({},g,{on:false}); }); }
  },
    h('div', { className: 'pc-inner' },
      h('div', { className:'pc-face pat-'+card.patron, style:{ background:'linear-gradient(145deg,'+card.colores[0]+','+card.colores[1]+')' } },
        glare.on && !fl && h('div', { className:'pc-glare', style:{ background:'radial-gradient(circle at '+glare.x+'% '+glare.y+'%,rgba(255,255,255,.44) 0%,rgba(255,255,255,.1) 40%,transparent 70%)' } }),
        h('div', { className:'pc-holo' }),
        h('div', { className:'pc-rarity', style:{ color:RC[card.rarity] } }, card.rarity),
        h('div', { className:'pc-emo-wrap' },
          card.imagen
            ? h('img', { src: card.imagen, style: { width: '100px', height: '100px', objectFit: 'cover', borderRadius: '14px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', zIndex: 3 } })
            : h(React.Fragment, null,
                h('div', { className:'pc-emo' }, card.emoji),
                h('div', { className:'pc-emo-shadow' }, card.emoji)
              )
        ),
        h('div', { className:'pc-info' },
          h('div', { className:'pc-series' }, card.series),
          h('div', { className:'pc-label'  }, card.label),
          h('div', { className:'pc-fmsg'   }, card.frente)
        ),
        h('div', { className:'pc-hint' }, 'toca para voltear ↩')
      ),
      h('div', { className:'pc-face pc-back-face', style:{ background:'linear-gradient(145deg,'+card.colores[1]+','+card.colores[0]+')' } },
        h('div', { className:'pc-bpat' }),
        h('div', { className:'pc-bcontent' },
          h('div', { className:'pc-bemo'    }, card.emoji),
          h('div', { className:'pc-bdate'   }, card.fecha),
          h('div', { className:'pc-bmsg'    }, card.dorso),
          h('div', { className:'pc-bseries' }, card.series + ' · ' + card.rarity)
        ),
        h('div', { className:'pc-bborder' })
      )
    )
  );
}

function Album() {
  var cards = CONFIG.photocards;
  return h('div', { className:'album' },
    h('div', { className:'alb-hdr' },
      h('div', { className:'alb-tag'   }, '✦ COLECCIÓN ESPECIAL ✦'),
      h('h1',  { className:'alb-title' }, 'Álbum de Recuerdos'),
      h('p',   { className:'alb-sub'   }, cards.length + ' photocards · Edición Limitada · Solo para ti')
    ),
    h('div', { className:'alb-grid' },
      cards.map(function(c, i) {
        return h('div', { key:i, style:{ animation:'fadeUp .5s '+(i*.1)+'s ease both' } },
          h(PhotoCard, { card:c })
        );
      })
    ),
    h('div', { className:'alb-foot' }, '✦ Haz clic en las cartas para descubrir los mensajes ✦')
  );
}

// ══════════════════════════════════════════════════════
//  TIMELINE
// ══════════════════════════════════════════════════════
function TLCard(props) {
  var m = props.m; var idx = props.idx;
  var ref = useRef(null);
  var s = useState(false); var vis = s[0]; var setVis = s[1];
  useEffect(function() {
    var el = ref.current; if (!el) return;
    var obs = new IntersectionObserver(function(entries) {
      if (entries[0].isIntersecting) { setVis(true); obs.disconnect(); }
    }, { threshold: .12 });
    obs.observe(el);
    return function(){ obs.disconnect(); };
  }, []);
  return h('div', { ref:ref, className:'tl-item '+m.lado+(m.destacado?' highlight':'') },
    h('div', { className:'tl-dot', style:{ background:m.color, justifySelf:'center' } },
      h('span', { className:'tl-dot-icon' }, m.icon),
      h('div',  { className:'tl-dot-pulse', style:{ borderColor:m.color } })
    ),
    h('div', { className:'tl-card glass'+(vis?' visible':''), style:{ transitionDelay:(idx*.08)+'s' } },
      h('div', { className:'tl-accent', style:{ background:m.color } }),
      h('div', { className:'tl-inner' },
        h('div', { className:'tl-label', style:{ color:m.color } }, m.label),
        h('div', { className:'tl-title' }, m.titulo),
        h('p',   { className:'tl-desc'  }, m.desc),
        h('div', { className:'tl-tag2', style:{ borderColor:m.color+'44', color:m.color } }, m.fecha)
      )
    )
  );
}

function Timeline() {
  var items = CONFIG.timeline;
  return h('div', { className:'timeline' },
    h('div', { className:'tl-hdr' },
      h('div', { className:'tl-tag'    }, '✦ HISTORIA DE AMOR ✦'),
      h('h1',  { className:'tl-htitle' }, 'Nuestra Historia'),
      h('p',   { className:'tl-hsub'   }, 'Cada capítulo contigo es el favorito')
    ),
    h('div', { className:'tl-container' },
      h('div', { className:'tl-line' }),
      items.map(function(m, i){ return h(TLCard, { key:i, m:m, idx:i }); }),
      h('div', { className:'tl-end' },
        h('span', { className:'tl-end-icon' }, '♡'),
        h('span', { className:'tl-end-text' }, 'Continuará…')
      )
    )
  );
}

// ══════════════════════════════════════════════════════
//  APP ROOT
// ══════════════════════════════════════════════════════
function App() {
  var s1 = useState('login'); var view = s1[0]; var setView = s1[1];

  function nav(v) { setBG(v); setView(v); }
  function onLogin() { setBG('lobby'); setView('lobby'); }

  useEffect(function(){ setBG('login'); }, []);

  return h(React.Fragment, null,
    view !== 'login' && h(NavBar, { cur: view, nav: nav }),
    h('div', { className:'view', key: view },
      view === 'login'    && h(Login,      { onLogin: onLogin }),
      view === 'lobby'    && h(Lobby,      { onEnter: function(){ nav('heart'); } }),
      view === 'heart'    && h(TulipHeart, null),
      view === 'album'    && h(Album,      null),
      view === 'timeline' && h(Timeline,   null)
    ),
    view !== 'login' && view !== 'lobby' && h(MusicPlayer, null)
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(h(App, null));
