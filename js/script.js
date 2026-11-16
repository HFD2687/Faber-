/* FABER — lógica del sitio. Lee el contenido de data/products.js y arma cada vista.
   Rutas (hash, compatibles con GitHub Pages):  #/   #/dp2   #/dp2/banco-matero   #/mp1/pava  ... */
(function () {
  "use strict";
  var D = window.FABER_DATA;
  var app = document.getElementById("app");
  var topbar = document.getElementById("topbar");
  var footer = document.getElementById("footer");

  /* ---------- utilidades ---------- */
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  function subject(id) { for (var i = 0; i < D.subjects.length; i++) if (D.subjects[i].id === id) return D.subjects[i]; return null; }
  function productUrl(id) { return "#/" + D.products[id].subject + "/" + id; }
  function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }

  /* ---------- barra superior y pie ---------- */
  function renderChrome() {
    var items = '<li><a class="top" href="#/" data-nav="home">Inicio</a></li>';
    D.subjects.forEach(function (s) {
      var drop = s.products.map(function (pid) {
        return '<a href="' + productUrl(pid) + '" data-nav="' + pid + '">' + esc(D.products[pid].name) + "</a>";
      }).join("");
      items += '<li><a class="top" href="#/' + s.id + '" data-nav="' + s.id + '">' + esc(s.title) + '</a><div class="drop">' + drop + "</div></li>";
    });
    topbar.innerHTML =
      '<a class="brand" href="#/" aria-label="FABER — Inicio"><img src="' + D.brand.emblem + '" alt=""><span>FABER</span></a>' +
      '<button class="burger" type="button" aria-label="Abrir menú" aria-expanded="false">☰</button>' +
      '<ul class="menu" id="menu">' + items + "</ul>";
    var burger = $(".burger", topbar), menu = $("#menu", topbar);
    burger.addEventListener("click", function () {
      var open = menu.classList.toggle("open");
      burger.setAttribute("aria-expanded", open ? "true" : "false");
    });
    footer.innerHTML = '<span>FABER · Diseño industrial</span><span>Diseño de Productos 2 · Materiales y Procesos 1</span><a href="#/" >Volver al inicio</a>';
  }

  function setActive(key, subjectId) {
    $$("[data-nav]", topbar).forEach(function (a) {
      var on = a.getAttribute("data-nav") === key || a.getAttribute("data-nav") === subjectId;
      a.classList.toggle("active", on);
      if (on) a.setAttribute("aria-current", "page"); else a.removeAttribute("aria-current");
    });
    $("#menu", topbar).classList.remove("open");
    $(".burger", topbar).setAttribute("aria-expanded", "false");
  }

  /* ---------- vistas ---------- */
  function viewHome() {
    var mods = D.subjects.map(function (s) {
      var first = s.products.length === 1 ? "1 producto" : s.products.length + " productos";
      return '<a class="module" href="#/' + s.id + '" aria-label="' + esc(s.title) + '">' +
        '<div class="art ' + s.tileStyle + '"><img src="' + s.tile + '" alt=""></div><div class="shade"></div>' +
        '<span class="code">' + esc(s.code) + '</span><span class="arrow" aria-hidden="true">→</span>' +
        '<div class="meta"><b>' + esc(s.title) + "</b><small>" + first + "</small></div></a>";
    }).join("");
    return '<section class="view hero"><div class="wrap">' +
      '<img class="hero-logo" src="' + D.brand.logo + '" alt="FABER — logo">' +
      '<p class="hero-tag">' + esc(D.brand.tagline) + "</p>" +
      '<div class="modules">' + mods + "</div></div></section>";
  }

  function viewSubject(s) {
    var cards = s.products.map(function (pid) {
      var p = D.products[pid];
      return '<a class="card" href="' + productUrl(pid) + '"><div class="thumb ' + p.tileStyle + '"><img src="' + p.tile + '" alt="' + esc(p.name) + '" loading="lazy"></div>' +
        '<div class="body"><h3>' + esc(p.name) + '</h3><p>' + esc(s.title) + '</p><span class="go">Ver producto →</span></div></a>';
    }).join("");
    var docs = (s.documents || []).map(function (d) {
      return '<a class="btn" href="' + d.href + '" download>' + esc(d.label) + "</a>";
    }).join("");
    return '<section class="view"><div class="wrap">' +
      '<div class="page-head"><div class="crumbs"><a href="#/">Inicio</a> / ' + esc(s.code) + '</div>' +
      '<div class="eyebrow">' + esc(s.code) + '</div><h1>' + esc(s.title) + '</h1><p class="lead">' + esc(s.intro) + "</p></div>" +
      '<div class="cards ' + (s.products.length === 1 ? "one" : "") + '">' + cards + "</div>" +
      '<div class="downloads" style="padding-bottom:1.2rem">' + docs + "</div>" +
      '<p class="credits" style="padding-bottom:3rem">' + esc(s.credits || "") + "</p></div></section>";
  }

  function listHTML(title, list, style) {
    if (!list) return "";
    var lis = list.map(function (r) {
      return style === "table" ? "<li><b>" + esc(r[0]) + "</b><span>" + esc(r[1]) + "</span></li>"
                                : "<li><b>" + esc(r[0]) + ":</b> " + esc(r[1]) + "</li>";
    }).join("");
    return '<div><p class="dl-title">' + esc(title) + '</p><ul class="dl ' + (style || "") + '">' + lis + "</ul></div>";
  }

  function viewerHTML(p) {
    var m = p.model;
    return '<div class="viewer" id="viewer">' +
      '<model-viewer id="mv" src="' + m.glb + '" ios-src="' + m.usdz + '" alt="Modelo 3D: ' + esc(p.name) + '" ' +
      'camera-controls touch-action="pan-y" interaction-prompt="auto" camera-orbit="' + (m.orbit || "35deg 70deg auto") + '" ' +
      'min-camera-orbit="auto auto 15%" max-camera-orbit="auto auto 500%" scale="0.001 0.001 0.001" ' +
      'shadow-intensity="1" shadow-softness="0.9" exposure="1.05" environment-image="neutral" ' +
      'ar ar-modes="webxr scene-viewer quick-look" ar-scale="auto">' +
      '<div class="vbtns" slot="ar-button"><button class="vbtn" type="button">Ver en AR</button></div>' +
      '</model-viewer>' +
      '<div class="vload" id="vload"><div>Cargando modelo 3D<i><span id="vbar"></span></i></div></div>' +
      '<div class="verror" id="verror"><div><p>No se pudo cargar el modelo 3D en este navegador o conexión. El resto de la página sigue disponible.</p>' +
      '<a class="btn" href="' + m.glb + '" download>Descargar modelo (GLB)</a></div></div>' +
      '<div class="hint" id="vhint">Arrastrá para rotar · rueda o pellizco para acercar</div>' +
      '<div class="vbtns" style="right:auto;left:1rem;bottom:3.6rem"><button class="vbtn ghost" id="vreset" type="button">Restablecer vista</button></div>' +
      "</div>" +
      '<p class="ar-note">La realidad aumentada está disponible en dispositivos compatibles (Quick Look en iPhone/iPad, o Android con ARCore). Si tu dispositivo no la admite, el botón no aparece y el visor funciona igual.</p>';
  }

  function plansHTML(p) {
    return '<div class="plans">' + p.plans.map(function (pl, i) {
      return '<figure><button class="zoomable" type="button" data-gallery="plans" data-i="' + i + '" aria-label="Ampliar: ' + esc(pl.title) + '">' +
        '<img src="' + pl.src + '" alt="' + esc(pl.title) + '" loading="lazy"></button>' +
        "<figcaption><b>" + esc(pl.title) + "</b> — " + esc(pl.caption) + "</figcaption></figure>";
    }).join("") + "</div>";
  }

  function boardsHTML(p) {
    var multi = p.boards.length > 1;
    var tabs = multi ? '<div class="pager"><div class="tabs">' + p.boards.map(function (b, i) {
      return '<button type="button" data-board="' + i + '" aria-current="' + (i === 0) + '">' + esc(b.title) + "</button>";
    }).join("") + '</div><span class="count" id="bcount">1 / ' + p.boards.length + "</span></div>" : "";
    return tabs + '<figure class="board"><button class="zoomable" type="button" id="boardBtn" aria-label="Ampliar lámina">' +
      '<img id="boardImg" src="' + p.boards[0].src + '" alt="' + esc(p.boards[0].title) + '" loading="lazy"></button>' +
      '<figcaption id="boardCap"><b>' + esc(p.boards[0].title) + "</b> — " + esc(p.boards[0].caption) + "</figcaption></figure>";
  }

  function viewProduct(pid) {
    var p = D.products[pid], s = subject(p.subject);
    var ids = s.products, idx = ids.indexOf(pid);
    var prev = idx > 0 ? ids[idx - 1] : null, next = idx < ids.length - 1 ? ids[idx + 1] : null;
    var sibs = ids.length > 1 ? '<div class="subnav-sibs" style="display:flex;gap:.5rem;flex-wrap:wrap;margin-top:1.2rem">' + ids.map(function (id) {
      return '<a class="btn' + (id === pid ? " solid" : "") + '" href="' + productUrl(id) + '">' + esc(D.products[id].name) + "</a>";
    }).join("") + "</div>" : "";
    var n = 0;
    function num() { n++; return '<span class="num">0' + n + "</span>"; }
    var sections = [];
    sections.push(["model", "Modelo 3D"]);
    if (p.plans && p.plans.length) sections.push(["plans", "Planos"]);
    if (p.boards && p.boards.length) sections.push(["boards", "Láminas"]);
    sections.push(["docs", "Documentación"]);
    var sub = sections.map(function (x) { return '<button type="button" data-scroll="' + x[0] + '">' + x[1] + "</button>"; }).join("");

    var html = '<article class="view">' +
      '<div class="wrap"><div class="prod-head"><div>' +
      '<div class="crumbs"><a href="#/">Inicio</a> / <a href="#/' + s.id + '">' + esc(s.code) + '</a> / ' + esc(p.name) + "</div>" +
      '<div class="eyebrow">' + esc(p.kicker) + "</div><h1>" + esc(p.name) + "</h1><p>" + esc(p.intro) + "</p>" + sibs + "</div>" +
      '<div class="card" style="pointer-events:none"><div class="thumb ' + p.tileStyle + '" style="aspect-ratio:1/1"><img src="' + p.tile + '" alt="' + esc(p.name) + '"></div></div></div></div>' +
      '<nav class="subnav" aria-label="Secciones del producto"><div class="wrap">' + sub + "</div></nav>" +
      '<div class="wrap">';

    if (p.list) {
      html += '<section class="section"><div class="info">' + listHTML(p.listTitle, p.list, p.listStyle) +
        (p.list2 ? listHTML(p.list2Title, p.list2, "table") : "") + "</div></section>";
    }
    html += '<section class="section" id="model"><div class="sec-head">' + num() + "<h2>Modelo 3D</h2></div>" + viewerHTML(p) + "</section>";
    if (p.plans && p.plans.length) html += '<section class="section" id="plans"><div class="sec-head">' + num() + "<h2>Planos</h2></div>" + plansHTML(p) + "</section>";
    if (p.boards && p.boards.length) html += '<section class="section" id="boards"><div class="sec-head">' + num() + "<h2>Láminas</h2></div>" + boardsHTML(p) + "</section>";
    html += '<section class="section" id="docs"><div class="sec-head">' + num() + "<h2>Documentación</h2></div><div class=\"downloads\">" +
      p.downloads.map(function (d) { return '<a class="btn solid" href="' + d.href + '" download>' + esc(d.label) + "</a>"; }).join("") +
      '<a class="btn" href="' + p.model.glb + '" download>Modelo 3D (GLB)</a><a class="btn" href="' + p.model.usdz + '" download>Modelo para AR en Apple (USDZ)</a>' +
      '</div><p class="credits">' + esc(p.credits || "") + "</p></section>";
    html += '<div class="prodnav"><div>' + (prev ? '<a class="btn" href="' + productUrl(prev) + '">← ' + esc(D.products[prev].name) + "</a>" : '<a class="btn" href="#/' + s.id + '">← ' + esc(s.title) + "</a>") +
      "</div><div>" + (next ? '<a class="btn" href="' + productUrl(next) + '">' + esc(D.products[next].name) + " →</a>" : '<a class="btn" href="#/">Inicio →</a>') + "</div></div>";
    html += "</div></article>";
    return html;
  }

  /* ---------- comportamiento de cada vista ---------- */
  function wireProduct(pid) {
    var p = D.products[pid];
    $$("[data-scroll]", app).forEach(function (b) {
      b.addEventListener("click", function () {
        var t = document.getElementById(b.getAttribute("data-scroll"));
        if (t) t.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
    $$(".zoomable[data-gallery]", app).forEach(function (b) {
      b.addEventListener("click", function () {
        openLB(p.plans.map(function (x) { return { src: x.src, title: x.title }; }), parseInt(b.getAttribute("data-i"), 10));
      });
    });
    var cur = 0;
    var boardBtn = $("#boardBtn", app);
    if (boardBtn) {
      var items = p.boards.map(function (x) { return { src: x.src, title: x.title }; });
      boardBtn.addEventListener("click", function () { openLB(items, cur); });
      $$("[data-board]", app).forEach(function (t) {
        t.addEventListener("click", function () {
          cur = parseInt(t.getAttribute("data-board"), 10);
          var b = p.boards[cur];
          $("#boardImg", app).src = b.src; $("#boardImg", app).alt = b.title;
          $("#boardCap", app).innerHTML = "<b>" + esc(b.title) + "</b> — " + esc(b.caption);
          $("#bcount", app).textContent = (cur + 1) + " / " + p.boards.length;
          $$("[data-board]", app).forEach(function (o) { o.setAttribute("aria-current", o === t ? "true" : "false"); });
        });
      });
    }
    // visor 3D
    var mv = $("#mv", app), load = $("#vload", app), bar = $("#vbar", app), err = $("#verror", app), hint = $("#vhint", app);
    if (!mv) return;
    var settled = false;
    function fail() { if (settled) return; settled = true; load.classList.add("done"); err.classList.add("show"); }
    mv.addEventListener("progress", function (e) { bar.style.width = Math.round((e.detail.totalProgress || 0) * 100) + "%"; });
    mv.addEventListener("load", function () { settled = true; load.classList.add("done"); });
    mv.addEventListener("error", fail);
    mv.addEventListener("camera-change", function (e) { if (e.detail && e.detail.source === "user-interaction") hint.classList.add("off"); });
    setTimeout(function () { if (!window.customElements.get("model-viewer")) fail(); }, 9000);
    $("#vreset", app).addEventListener("click", function () {
      mv.cameraOrbit = p.model.orbit || "35deg 70deg auto"; mv.fieldOfView = "auto";
      if (mv.jumpCameraToGoal) mv.jumpCameraToGoal();
    });
  }

  /* ---------- router ---------- */
  function route() {
    closeLB();
    var parts = (location.hash || "#/").replace(/^#\/?/, "").split("/").filter(Boolean);
    var html, key = "home", sid = null, title = "FABER — Diseño industrial", pid = null;
    var s = parts[0] ? subject(parts[0]) : null;
    if (!parts.length || !s) {
      html = viewHome();
    } else if (parts.length === 1) {
      html = viewSubject(s); key = s.id; sid = s.id; title = s.title + " — FABER";
    } else if (D.products[parts[1]] && D.products[parts[1]].subject === s.id) {
      pid = parts[1]; html = viewProduct(pid); key = pid; sid = s.id; title = D.products[pid].name + " — " + s.code + " — FABER";
    } else {
      html = viewSubject(s); key = s.id; sid = s.id; title = s.title + " — FABER";
    }
    app.innerHTML = html;
    document.title = title;
    setActive(key, sid);
    window.scrollTo(0, 0);
    if (pid) wireProduct(pid);
  }

  /* ---------- lightbox con zoom y desplazamiento ---------- */
  var lb = $("#lightbox"), lbImg = $("#lbImg"), stage = $("#lbStage");
  var gal = [], gi = 0, st = { s: 1, x: 0, y: 0 }, lastFocus = null;
  function apply() { lbImg.style.transform = "translate(" + st.x + "px," + st.y + "px) scale(" + st.s + ")"; }
  function resetZoom() { st = { s: 1, x: 0, y: 0 }; apply(); }
  function zoomBy(f, cx, cy) {
    var ns = Math.min(8, Math.max(1, st.s * f));
    if (ns === st.s) return;
    var r = stage.getBoundingClientRect();
    var px = (cx === undefined ? 0 : cx - (r.left + r.width / 2)), py = (cy === undefined ? 0 : cy - (r.top + r.height / 2));
    var k = ns / st.s;
    st.x = px - (px - st.x) * k; st.y = py - (py - st.y) * k; st.s = ns;
    if (ns === 1) { st.x = 0; st.y = 0; }
    apply();
  }
  function show(i) {
    gi = (i + gal.length) % gal.length;
    lbImg.src = gal[gi].src; lbImg.alt = gal[gi].title;
    $("#lbTitle").textContent = gal[gi].title;
    $("#lbCount").textContent = gal.length > 1 ? (gi + 1) + "/" + gal.length : "";
    $("#lbOpen").href = gal[gi].src;
    $$("[data-lb=prev],[data-lb=next]", lb).forEach(function (b) { b.style.display = gal.length > 1 ? "" : "none"; });
    resetZoom();
  }
  function openLB(items, i) {
    gal = items; lastFocus = document.activeElement;
    lb.hidden = false; document.body.style.overflow = "hidden";
    show(i || 0); $("[data-lb=close]", lb).focus();
  }
  function closeLB() {
    if (lb.hidden) return;
    lb.hidden = true; document.body.style.overflow = "";
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }
  lb.addEventListener("click", function (e) {
    var a = e.target.closest("[data-lb]"); if (!a) return;
    var k = a.getAttribute("data-lb");
    if (k === "close") closeLB(); else if (k === "prev") show(gi - 1); else if (k === "next") show(gi + 1);
    else if (k === "in") zoomBy(1.5); else if (k === "out") zoomBy(1 / 1.5); else if (k === "reset") resetZoom();
  });
  stage.addEventListener("click", function (e) { if (e.target === stage && !moved) closeLB(); });
  stage.addEventListener("wheel", function (e) { e.preventDefault(); zoomBy(e.deltaY < 0 ? 1.15 : 1 / 1.15, e.clientX, e.clientY); }, { passive: false });
  stage.addEventListener("dblclick", function (e) { if (st.s > 1) resetZoom(); else zoomBy(2.5, e.clientX, e.clientY); });
  var ptrs = {}, moved = false, pinch0 = 0;
  stage.addEventListener("pointerdown", function (e) {
    ptrs[e.pointerId] = { x: e.clientX, y: e.clientY }; moved = false; stage.setPointerCapture(e.pointerId); stage.classList.add("drag");
    var k = Object.keys(ptrs); if (k.length === 2) pinch0 = dist();
  });
  function dist() { var k = Object.keys(ptrs); var a = ptrs[k[0]], b = ptrs[k[1]]; return Math.hypot(a.x - b.x, a.y - b.y); }
  stage.addEventListener("pointermove", function (e) {
    var p = ptrs[e.pointerId]; if (!p) return;
    var k = Object.keys(ptrs);
    if (k.length === 2) {
      p.x = e.clientX; p.y = e.clientY;
      var d = dist(); if (pinch0) { var a = ptrs[k[0]], b = ptrs[k[1]]; zoomBy(d / pinch0, (a.x + b.x) / 2, (a.y + b.y) / 2); } pinch0 = d; moved = true;
    } else if (st.s > 1) {
      st.x += e.clientX - p.x; st.y += e.clientY - p.y; p.x = e.clientX; p.y = e.clientY; moved = true; apply();
    }
  });
  function up(e) { delete ptrs[e.pointerId]; pinch0 = 0; if (!Object.keys(ptrs).length) { stage.classList.remove("drag"); setTimeout(function () { moved = false; }, 0); } }
  stage.addEventListener("pointerup", up); stage.addEventListener("pointercancel", up);
  document.addEventListener("keydown", function (e) {
    if (lb.hidden) return;
    if (e.key === "Escape") closeLB();
    else if (e.key === "ArrowLeft") show(gi - 1);
    else if (e.key === "ArrowRight") show(gi + 1);
    else if (e.key === "+" || e.key === "=") zoomBy(1.5);
    else if (e.key === "-") zoomBy(1 / 1.5);
    else if (e.key === "0") resetZoom();
  });

  renderChrome();
  window.addEventListener("hashchange", route);
  route();
})();
