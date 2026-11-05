(() => {
  'use strict';
  const stage = document.getElementById('stage');
  const poster = document.getElementById('poster');
  const fullscreen = document.getElementById('fullscreen');
  const loading = document.getElementById('loading');
  const notice = document.getElementById('notice');
  const sectionButtons = [...document.querySelectorAll('[data-section]')];
  const width = 841, height = 1189;
  // Bounds follow the five sections in the unchanged A0 poster (millimetres).
  const sections = [
    { name: '전체 보기', x: 0, y: 0, w: width, h: height },
    { name: '1 제목·요약', x: 20, y: 12, w: 801, h: 184 },
    { name: '2 문제·사용자', x: 20, y: 196, w: 801, h: 138 },
    { name: '3 미래 장면', x: 20, y: 334, w: 801, h: 496 },
    { name: '4 기술 방식', x: 20, y: 830, w: 801, h: 205 },
    { name: '5 검증·팀 소개', x: 20, y: 1035, w: 801, h: 154 }
  ];
  let selected = 0, scale = 1, centerX = width / 2, centerY = height / 2;
  let customView = false, ready = false, drag = null, noticeTimer;
  const fitScale = () => Math.min((stage.clientWidth - 24) / width, (stage.clientHeight - 24) / height);
  const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

  function render() {
    const halfW = stage.clientWidth / (2 * scale), halfH = stage.clientHeight / (2 * scale);
    if (customView) {
      centerX = halfW >= width / 2 ? width / 2 : clamp(centerX, halfW, width - halfW);
      centerY = halfH >= height / 2 ? height / 2 : clamp(centerY, halfH, height - halfH);
    }
    const area = sections[selected];
    poster.style.clipPath = customView || selected === 0 ? 'none'
      : `inset(${area.y}px ${width - area.x - area.w}px ${height - area.y - area.h}px ${area.x}px)`;
    const x = stage.clientWidth / 2 - centerX * scale;
    const y = stage.clientHeight / 2 - centerY * scale;
    poster.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
  }

  function fit() {
    const area = sections[selected];
    scale = Math.max(.01, Math.min((stage.clientWidth - 24) / area.w, (stage.clientHeight - 24) / area.h));
    centerX = area.x + area.w / 2;
    centerY = area.y + area.h / 2;
    customView = false;
    render();
  }

  function select(index) {
    selected = clamp(index, 0, sections.length - 1);
    sectionButtons.forEach((button, i) => button.setAttribute('aria-pressed', String(i === selected)));
    document.getElementById('position').textContent = sections[selected].name;
    document.getElementById('previous').disabled = selected === 0;
    document.getElementById('next').disabled = selected === sections.length - 1;
    sectionButtons[selected].scrollIntoView({ block: 'nearest', inline: 'nearest' });
    fit();
  }

  function zoom(factor, x = stage.clientWidth / 2, y = stage.clientHeight / 2) {
    const before = scale;
    scale = clamp(scale * factor, Math.max(.01, fitScale()), 8);
    centerX += (x - stage.clientWidth / 2) * (1 / before - 1 / scale);
    centerY += (y - stage.clientHeight / 2) * (1 / before - 1 / scale);
    customView = true;
    render();
  }

  function announce(message) {
    clearTimeout(noticeTimer);
    notice.textContent = message;
    notice.hidden = false;
    noticeTimer = setTimeout(() => { notice.hidden = true; }, 6500);
  }

  async function toggleFullscreen() {
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else if (document.documentElement.requestFullscreen) await document.documentElement.requestFullscreen();
      else announce('이 브라우저에서는 메뉴의 전체화면을 이용해 주세요. Windows PC에서는 F11을 누르세요.');
    } catch {
      announce('전체화면이 허용되지 않았습니다. Windows PC에서는 F11을 눌러 주세요.');
    }
  }

  document.addEventListener('fullscreenchange', () => {
    const active = Boolean(document.fullscreenElement);
    fullscreen.textContent = active ? '⛶ 전체화면 나가기' : '⛶ 전체화면';
    fullscreen.setAttribute('aria-pressed', String(active));
    if (active) announce('← → 순서대로 확대 · 0 전체 보기 · Esc 전체화면 종료');
    else notice.hidden = true;
  });
  fullscreen.addEventListener('click', toggleFullscreen);
  sectionButtons.forEach(button => button.addEventListener('click', () => select(Number(button.dataset.section))));
  document.getElementById('previous').addEventListener('click', () => select(selected - 1));
  document.getElementById('next').addEventListener('click', () => select(selected + 1));
  document.getElementById('fit').addEventListener('click', fit);
  document.getElementById('zoom-in').addEventListener('click', () => zoom(1.25));
  document.getElementById('zoom-out').addEventListener('click', () => zoom(.8));
  document.addEventListener('keydown', event => {
    if (event.ctrlKey || event.metaKey || event.altKey || /INPUT|TEXTAREA|SELECT/.test(event.target.tagName) || event.target.isContentEditable) return;
    const key = event.key.toLowerCase();
    if (key === 'f') { event.preventDefault(); toggleFullscreen(); }
    else if (/^[0-5]$/.test(key)) { event.preventDefault(); select(Number(key)); }
    else if (['arrowright', 'pagedown'].includes(key) || (key === ' ' && !event.target.closest('button, a'))) { event.preventDefault(); select(selected + 1); }
    else if (['arrowleft', 'pageup'].includes(key)) { event.preventDefault(); select(selected - 1); }
    else if (key === '+' || key === '=') { event.preventDefault(); zoom(1.25); }
    else if (key === '-') { event.preventDefault(); zoom(.8); }
    else if (key === 'home') { event.preventDefault(); select(0); }
  });
  stage.addEventListener('wheel', event => {
    if (event.ctrlKey || event.metaKey) return;
    event.preventDefault();
    const rect = stage.getBoundingClientRect();
    zoom(Math.exp(-clamp(event.deltaY, -200, 200) * .002), event.clientX - rect.left, event.clientY - rect.top);
  }, { passive: false });
  stage.addEventListener('pointerdown', event => {
    if (event.button !== 0 || !event.isPrimary) return;
    stage.focus({ preventScroll: true });
    drag = { id: event.pointerId, x: event.clientX, y: event.clientY, cx: centerX, cy: centerY };
    stage.setPointerCapture(event.pointerId);
    stage.classList.add('dragging');
  });
  stage.addEventListener('pointermove', event => {
    if (!drag || drag.id !== event.pointerId) return;
    centerX = drag.cx - (event.clientX - drag.x) / scale;
    centerY = drag.cy - (event.clientY - drag.y) / scale;
    customView = true;
    render();
  });
  function stopDrag() { drag = null; stage.classList.remove('dragging'); }
  stage.addEventListener('pointerup', stopDrag);
  stage.addEventListener('pointercancel', stopDrag);
  stage.addEventListener('lostpointercapture', stopDrag);
  new ResizeObserver(() => { if (ready) customView ? render() : fit(); }).observe(stage);

  function onReady() {
    if (ready) return;
    ready = true;
    loading.hidden = true;
    poster.classList.add('ready');
    select(0);
  }
  poster.addEventListener('load', onReady);
  function imageError() {
    loading.hidden = false;
    loading.textContent = '포스터를 불러오지 못했습니다. 새로고침하거나 ';
    const link = document.createElement('a');
    link.href = 'NEURO_ROAD_2050_A0.pdf';
    link.textContent = 'PDF로 보기';
    loading.append(link);
  }
  poster.addEventListener('error', imageError);
  if (poster.complete && poster.naturalWidth) onReady();
  else if (poster.complete) imageError();
  // Load the small preview first, then replace it without changing framing.
  const detailed = new Image();
  detailed.onload = () => { poster.src = detailed.src; loading.hidden = true; };
  detailed.onerror = () => announce('기본 이미지로 표시 중입니다. 고해상도 보기가 필요하면 새로고침해 주세요.');
  detailed.src = '../assets/neuro-road-2050/poster-presentation.jpg';
})();
