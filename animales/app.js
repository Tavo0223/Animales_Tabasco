/**
 * Controlador de la experiencia interactiva con cuadros arrastrables y diseño premium
 * Proyecto: Dinámica de Dispersión de Semillas (Perico, Ratón, Mono Araña)
 */

let currentAnimal = null;       // null = Menú Principal; 'perico', 'raton', 'mono'
let currentSceneIndex = 0;     // Índice de escena del animal activo (0, 1, 2)
let experienceStarted = false;
let sceneScrollLocked = false;

const SCENE_SCROLL_COOLDOWN = 1050; // ms entre cambios de escena por scroll
const SCENE_TRANSITION_MS = 600;    // Duración de la animación de desenfoque y zoom

// Referencias a elementos del DOM
const videoPlayer = document.getElementById('scene-video');
const hotspotsLayer = document.getElementById('hotspots-layer');
const hotspotsSvg = document.getElementById('hotspots-lines');
const narrationAudio = document.getElementById('narration-audio');
const interactiveContainer = document.getElementById('interactive-container');

const startOverlay = document.getElementById('start-overlay');
const btnStartSound = document.getElementById('btn-start-sound');
const scrollIndicator = document.getElementById('scroll-indicator');

const btnBackMenu = document.getElementById('btn-back-menu');
const animalMenuContainer = document.getElementById('animal-menu-container');
const sceneControls = document.getElementById('scene-controls');
const sceneProgressDots = document.getElementById('scene-progress-dots');
const animalTargets = document.querySelectorAll('.animal-target');

const SVG_NS = 'http://www.w3.org/2000/svg';

// ==========================================
// 1. CARGA DE ESCENAS
// ==========================================

// Carga la Escena Común Principal (Menú de Selección)
function loadMenuScene() {
  videoPlayer.classList.add('scene-blur');
  hotspotsLayer.classList.add('hotspots-hidden');
  hotspotsSvg.classList.add('hotspots-hidden');

  btnBackMenu.classList.remove('btn-visible');
  sceneControls.classList.remove('controls-visible');

  setTimeout(() => {
    videoPlayer.src = menuScene.video;
    videoPlayer.play().catch(() => {});

    hotspotsLayer.innerHTML = '';
    hotspotsSvg.innerHTML = '';

    playAudio(menuScene.audio);

    animalMenuContainer.classList.remove('menu-hidden');

    requestAnimationFrame(() => {
      videoPlayer.classList.remove('scene-blur');
    });
  }, SCENE_TRANSITION_MS);
}

// Carga una escena específica de la historia del animal seleccionado
function loadAnimalScene(animalKey, sceneIdx) {
  const story = storiesData[animalKey];
  if (!story || !story.scenes[sceneIdx]) return;

  const scene = story.scenes[sceneIdx];

  videoPlayer.classList.add('scene-blur');
  hotspotsLayer.classList.add('hotspots-hidden');
  hotspotsSvg.classList.add('hotspots-hidden');

  animalMenuContainer.classList.add('menu-hidden');

  btnBackMenu.classList.add('btn-visible');
  sceneControls.classList.add('controls-visible');

  updateProgressDots(story.scenes.length, sceneIdx);

  setTimeout(() => {
    videoPlayer.src = scene.video;
    videoPlayer.play().catch(() => {});

    hotspotsLayer.innerHTML = '';
    hotspotsSvg.innerHTML = '';

    playAudio(scene.audio);

    renderSceneHotspots(scene);

    requestAnimationFrame(() => {
      videoPlayer.classList.remove('scene-blur');
      hotspotsLayer.classList.remove('hotspots-hidden');
      hotspotsSvg.classList.remove('hotspots-hidden');
    });
  }, SCENE_TRANSITION_MS);
}

// ==========================================
// 2. RENDERIZADO DE HOTSPOTS INTERACTIVOS Y ARRASTRABLES
// ==========================================

function renderSceneHotspots(scene) {
  if (!scene.hotspots || scene.hotspots.length === 0) return;

  scene.hotspots.forEach(spot => {
    const offset = spot.boxOffset || { x: 18, y: -16 };
    let boxX = spot.x + offset.x;
    let boxY = spot.y + offset.y;

    // 1. Línea conectora SVG estilo láser de precisión
    const line = document.createElementNS(SVG_NS, 'line');
    line.setAttribute('x1', spot.x);
    line.setAttribute('y1', spot.y);
    line.setAttribute('x2', boxX);
    line.setAttribute('y2', boxY);
    line.setAttribute('class', 'hotspot-line');
    hotspotsSvg.appendChild(line);

    // 2. Punto ancla pulsante en el video (permanece fijo sobre el elemento)
    const anchor = document.createElement('div');
    anchor.className = 'hotspot-anchor';
    anchor.style.left = `${spot.x}%`;
    anchor.style.top = `${spot.y}%`;
    hotspotsLayer.appendChild(anchor);

    // 3. Panel de información con diseño moderno 100% mejorado
    const panel = document.createElement('div');
    panel.className = 'hotspot-panel';
    panel.style.left = `${boxX}%`;
    panel.style.top = `${boxY}%`;

    // Barra superior de arrastre
    const dragBar = document.createElement('div');
    dragBar.className = 'panel-drag-bar';

    const dragHint = document.createElement('div');
    dragHint.className = 'drag-hint';
    dragHint.innerHTML = '<span class="drag-icon">⠿</span> Mover cuadro';

    const closeBtn = document.createElement('button');
    closeBtn.className = 'panel-close';
    closeBtn.innerHTML = '&times;';
    closeBtn.setAttribute('aria-label', 'Cerrar panel');

    dragBar.appendChild(dragHint);
    dragBar.appendChild(closeBtn);

    // Encabezado con título
    const header = document.createElement('div');
    header.className = 'panel-header';

    const title = document.createElement('span');
    title.className = 'panel-title';
    title.innerText = spot.title;

    header.appendChild(title);

    // Lista de viñetas con formato destacado
    const list = document.createElement('ul');
    spot.bullets.forEach(item => {
      const li = document.createElement('li');
      li.innerText = item;
      list.appendChild(li);
    });

    panel.appendChild(dragBar);
    panel.appendChild(header);
    panel.appendChild(list);
    hotspotsLayer.appendChild(panel);

    // 4. Botón circular de vidrio (Insignia)
    const box = document.createElement('div');
    box.className = 'hotspot-box';
    box.style.left = `${boxX}%`;
    box.style.top = `${boxY}%`;
    box.innerText = spot.label;
    box.setAttribute('title', 'Haz clic para abrir o arrastra para mover');
    hotspotsLayer.appendChild(box);

    // Determinar la orientación inicial del panel
    updatePanelOrientation(panel, boxX, boxY);

    // Hacer que el cuadro y el botón sean ARRASTRABLES y muevan la línea
    setupDraggable(box, panel, line, spot.x, spot.y);

    // Cierre desde la 'X'
    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      panel.classList.remove('panel-visible');
      box.classList.remove('box-active');
    });

    // Clic en el ancla abre/cierra
    anchor.addEventListener('click', () => {
      const isOpen = panel.classList.toggle('panel-visible');
      box.classList.toggle('box-active', isOpen);
    });
  });
}

// Orientación dinámica del panel para que NUNCA se salga de pantalla al moverlo
function updatePanelOrientation(panel, x, y) {
  panel.classList.remove('side-left', 'side-right', 'valign-top', 'valign-bottom');

  if (x < 36) {
    panel.classList.add('side-right');
  } else {
    panel.classList.add('side-left');
  }

  if (y < 28) {
    panel.classList.add('valign-top');
  } else if (y > 72) {
    panel.classList.add('valign-bottom');
  }
}

// Sistema de arrastre suave (Drag & Drop) para Mouse y Pantallas Táctiles
function setupDraggable(box, panel, line, anchorX, anchorY) {
  let isDragging = false;
  let startX = 0, startY = 0;
  let hasMoved = false;

  function onPointerDown(e) {
    if (e.target.closest('.panel-close')) return;

    isDragging = true;
    hasMoved = false;

    const pointer = e.touches ? e.touches[0] : e;
    startX = pointer.clientX;
    startY = pointer.clientY;

    document.body.classList.add('dragging-active');
    panel.classList.add('is-dragging');
    box.classList.add('is-dragging');

    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('touchmove', onPointerMove, { passive: false });
    window.addEventListener('mouseup', onPointerUp);
    window.addEventListener('touchend', onPointerUp);
  }

  function onPointerMove(e) {
    if (!isDragging) return;
    if (e.cancelable) e.preventDefault();

    const pointer = e.touches ? e.touches[0] : e;
    const dx = pointer.clientX - startX;
    const dy = pointer.clientY - startY;

    if (Math.abs(dx) > 4 || Math.abs(dy) > 4) {
      hasMoved = true;
    }

    const rect = interactiveContainer.getBoundingClientRect();
    let newX = ((pointer.clientX - rect.left) / rect.width) * 100;
    let newY = ((pointer.clientY - rect.top) / rect.height) * 100;

    // Limitar al área visible con margen seguro
    newX = Math.max(5, Math.min(95, newX));
    newY = Math.max(6, Math.min(94, newY));

    // 1. Mover botón
    box.style.left = `${newX}%`;
    box.style.top = `${newY}%`;

    // 2. Mover panel
    panel.style.left = `${newX}%`;
    panel.style.top = `${newY}%`;

    // 3. Estirar y mover la línea conectora en tiempo real
    line.setAttribute('x2', newX);
    line.setAttribute('y2', newY);

    // 4. Adaptar automáticamente hacia dónde abre para no cortarse
    updatePanelOrientation(panel, newX, newY);
  }

  function onPointerUp(e) {
    if (!isDragging) return;
    isDragging = false;

    document.body.classList.remove('dragging-active');
    panel.classList.remove('is-dragging');
    box.classList.remove('is-dragging');

    window.removeEventListener('mousemove', onPointerMove);
    window.removeEventListener('touchmove', onPointerMove);
    window.removeEventListener('mouseup', onPointerUp);
    window.removeEventListener('touchend', onPointerUp);
  }

  // Eventos en el botón del hotspot
  box.addEventListener('mousedown', onPointerDown);
  box.addEventListener('touchstart', onPointerDown, { passive: true });

  // Eventos en el encabezado y barra de arrastre del panel
  const dragBar = panel.querySelector('.panel-drag-bar');
  const header = panel.querySelector('.panel-header');
  if (dragBar) {
    dragBar.addEventListener('mousedown', onPointerDown);
    dragBar.addEventListener('touchstart', onPointerDown, { passive: true });
  }
  if (header) {
    header.addEventListener('mousedown', onPointerDown);
    header.addEventListener('touchstart', onPointerDown, { passive: true });
  }

  // Si fue un clic simple (sin arrastrar), abre o cierra el panel
  box.addEventListener('click', (e) => {
    if (hasMoved) {
      e.stopPropagation();
      hasMoved = false;
      return;
    }
    const isOpen = panel.classList.toggle('panel-visible');
    box.classList.toggle('box-active', isOpen);
  });
}

// Reproduce audio cortando el anterior
function playAudio(audioSrc) {
  narrationAudio.pause();
  narrationAudio.currentTime = 0;

  if (audioSrc) {
    narrationAudio.src = audioSrc;
    narrationAudio.play().catch(() => {});
  }
}

// Actualiza los puntos indicadores de la escena activa
function updateProgressDots(totalScenes, activeIndex) {
  sceneProgressDots.innerHTML = '';
  for (let i = 0; i < totalScenes; i++) {
    const dot = document.createElement('span');
    dot.className = `progress-dot ${i === activeIndex ? 'dot-active' : ''}`;
    sceneProgressDots.appendChild(dot);
  }
}

// ==========================================
// 3. NAVEGACIÓN ENTRE ESCENAS Y MENÚ
// ==========================================

function selectAnimal(animalKey) {
  currentAnimal = animalKey;
  currentSceneIndex = 0;
  loadAnimalScene(currentAnimal, currentSceneIndex);
  lockSceneScroll();
}

function returnToMenu() {
  currentAnimal = null;
  currentSceneIndex = 0;
  loadMenuScene();
  lockSceneScroll();
}

function goNextScene() {
  if (!currentAnimal) return;
  const total = storiesData[currentAnimal].scenes.length;
  if (currentSceneIndex < total - 1) {
    currentSceneIndex++;
    loadAnimalScene(currentAnimal, currentSceneIndex);
    lockSceneScroll();
  }
}

function goPrevScene() {
  if (!currentAnimal) return;
  if (currentSceneIndex > 0) {
    currentSceneIndex--;
    loadAnimalScene(currentAnimal, currentSceneIndex);
    lockSceneScroll();
  }
}

function lockSceneScroll() {
  sceneScrollLocked = true;
  setTimeout(() => {
    sceneScrollLocked = false;
  }, SCENE_SCROLL_COOLDOWN);
}

function handleSceneWheel(e) {
  if (!experienceStarted) return;
  if (sceneScrollLocked) return;

  if (e.deltaY > 0) {
    goNextScene();
  } else if (e.deltaY < 0) {
    goPrevScene();
  }
}

let touchStartY = 0;
function handleSceneTouchStart(e) {
  touchStartY = e.touches[0].clientY;
}

function handleSceneTouchEnd(e) {
  if (!experienceStarted) return;
  if (sceneScrollLocked) return;

  const touchEndY = e.changedTouches[0].clientY;
  const diff = touchStartY - touchEndY;

  if (Math.abs(diff) < 45) return;

  if (diff > 0) {
    goNextScene();
  } else {
    goPrevScene();
  }
}

// ==========================================
// 4. PANTALLA DE INICIO (OVERLAY DE BIENVENIDA)
// ==========================================

function startExperience() {
  if (experienceStarted) return;
  experienceStarted = true;

  startOverlay.classList.add('hidden');
  loadMenuScene();

  startOverlay.removeEventListener('wheel', handleStartScroll);
  startOverlay.removeEventListener('touchmove', handleStartScroll);
}

function handleStartScroll(e) {
  e.preventDefault();
  startExperience();
}

// ==========================================
// 5. REGISTRO DE EVENTOS
// ==========================================

btnStartSound.addEventListener('click', startExperience);
scrollIndicator.addEventListener('click', startExperience);
startOverlay.addEventListener('wheel', handleStartScroll, { passive: false });
startOverlay.addEventListener('touchmove', handleStartScroll, { passive: false });

btnBackMenu.addEventListener('click', returnToMenu);

animalTargets.forEach(target => {
  target.addEventListener('click', () => {
    const animalKey = target.getAttribute('data-animal');
    if (animalKey) {
      selectAnimal(animalKey);
    }
  });
});

document.addEventListener('wheel', handleSceneWheel, { passive: true });
document.addEventListener('touchstart', handleSceneTouchStart, { passive: true });
document.addEventListener('touchend', handleSceneTouchEnd, { passive: true });
