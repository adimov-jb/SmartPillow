/**
 * SMARTPILLOW — JAVASCRIPT DINÂMICO & INTERATIVO
 * Efeitos futuristas, simulador de anti-ronco com Canvas, sintetizador de áudio WebAudio,
 * calculadora de sono, scroll reveal, e gatilhos de alta conversão.
 */

document.addEventListener('DOMContentLoaded', () => {
  initCountdown();
  initStickyHeader();
  initScrollReveal();
  initAntiSnoreSimulator();
  initSoundBeamAudio();
  initMassageModes();
  initLayerAccordion();
  initSleepQuiz();
  initCheckoutModal();
  initLiveSalesProof();
  initHotspots();
  initCookieConsent();
  initLgpdModal();
});

/* ===================================================================
   1. CONTADOR REGRESSIVO DE URGÊNCIA (TOP BANNER)
   =================================================================== */
function initCountdown() {
  const countdownEl = document.getElementById('offerCountdown');
  if (!countdownEl) return;

  let totalSeconds = 4 * 3600 + 22 * 60 + 45; // 4h 22m 45s

  setInterval(() => {
    totalSeconds--;
    if (totalSeconds < 0) totalSeconds = 24 * 3600; // loop de 24h

    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    countdownEl.textContent = 
      `${String(hours).padStart(2, '0')}h : ${String(minutes).padStart(2, '0')}m : ${String(seconds).padStart(2, '0')}s`;
  }, 1000);
}

/* ===================================================================
   2. HEADER STICKY COM BLUR
   =================================================================== */
function initStickyHeader() {
  const header = document.querySelector('.header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

/* ===================================================================
   3. SCROLL REVEAL DINÂMICO (INTERSECTION OBSERVER)
   =================================================================== */
function initScrollReveal() {
  const reveals = document.querySelectorAll('[data-reveal]');
  if (!reveals.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -50px 0px'
  });

  reveals.forEach(el => observer.observe(el));
}

/* ===================================================================
   4. SHOWSTOPPER: SIMULADOR INTERATIVO ANTI-RONCO (CANVAS + AR)
   =================================================================== */
function initAntiSnoreSimulator() {
  const canvas = document.getElementById('soundWaveCanvas');
  const triggerBtn = document.getElementById('btnTriggerSimulation');
  const statusBadge = document.getElementById('simStatusBadge');
  const dbValueEl = document.getElementById('simDbValue');
  const pillowSchematic = document.getElementById('pillowSchematic');
  const stepItems = document.querySelectorAll('.sim-step-item');

  if (!canvas || !triggerBtn) return;

  const ctx = canvas.getContext('2d');
  let animationId;
  let wavePhase = 0;
  let currentAmplitude = 6;
  let targetAmplitude = 6;
  let waveFrequency = 0.05;
  let waveColor = '#38BDF8';
  let isSimulating = false;

  // Ajustar dimensões do canvas
  function resizeCanvas() {
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = canvas.parentElement.clientHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  // Render loop da onda sonora
  function renderWave() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Suavizar amplitude
    currentAmplitude += (targetAmplitude - currentAmplitude) * 0.08;

    ctx.beginPath();
    ctx.lineWidth = 2.5;
    ctx.strokeStyle = waveColor;

    const centerY = canvas.height / 2;

    for (let x = 0; x < canvas.width; x++) {
      const y = centerY + Math.sin(x * waveFrequency + wavePhase) * currentAmplitude * Math.sin(x / canvas.width * Math.PI);
      if (x === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }

    ctx.stroke();
    wavePhase += 0.08;
    animationId = requestAnimationFrame(renderWave);
  }

  renderWave();

  // Função para mudar o passo ativo da simulação
  function setStep(stepIndex) {
    stepItems.forEach((item, idx) => {
      if (idx === stepIndex) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
  }

  // Sequência cinematográfica da simulação
  triggerBtn.addEventListener('click', () => {
    if (isSimulating) return;
    isSimulating = true;
    triggerBtn.disabled = true;
    triggerBtn.style.opacity = '0.7';

    // FASE 1: Detecção de Ronco
    setStep(0);
    statusBadge.textContent = '● RONCO DETECTADO (68 dB)';
    statusBadge.className = 'sim-badge-status snoring';
    dbValueEl.textContent = '68';
    dbValueEl.className = 'sim-db-val high';
    targetAmplitude = 24;
    waveFrequency = 0.12;
    waveColor = '#EF4444';

    // FASE 2: Ativação da Bolsa Micropneumática
    setTimeout(() => {
      setStep(1);
      pillowSchematic.classList.add('inflating');
      statusBadge.textContent = '● AJUSTE MICROPNEUMÁTICO ATIVO (+8mm)';
      statusBadge.className = 'sim-badge-status';
      waveColor = '#F59E0B';
      targetAmplitude = 14;
      dbValueEl.textContent = '42';
    }, 2400);

    // FASE 3: Vias Aéreas Desobstruídas & Silêncio Restaurado
    setTimeout(() => {
      setStep(2);
      statusBadge.textContent = '● VIAS AÉREAS LIVRES • SILÊNCIO TOTAL (12 dB)';
      statusBadge.className = 'sim-badge-status';
      dbValueEl.textContent = '12';
      dbValueEl.className = 'sim-db-val';
      waveColor = '#10B981';
      targetAmplitude = 5;
      waveFrequency = 0.04;
    }, 4800);

    // Retorno ao repouso suave
    setTimeout(() => {
      pillowSchematic.classList.remove('inflating');
      isSimulating = false;
      triggerBtn.disabled = false;
      triggerBtn.style.opacity = '1';
      triggerBtn.innerHTML = '<span>▶</span> Repetir Demonstração Anti-Ronco';
    }, 7200);
  });
}

/* ===================================================================
   5. SOUNDBEAM: SIMULADOR DE ÁUDIO PRIVADO (WEBAUDIO SINTETIZADO)
   =================================================================== */
function initSoundBeamAudio() {
  const playBtn = document.getElementById('soundPlayBtn');
  const soundStatusText = document.getElementById('soundStatusText');
  if (!playBtn) return;

  let audioCtx = null;
  let noiseNode = null;
  let gainNode = null;
  let isPlaying = false;

  function createSoothingWaveSound() {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    
    // Gerar ruído suave para simular ondas do mar e chuva reconfortante
    const bufferSize = audioCtx.sampleRate * 2;
    const noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    let lastOut = 0.0;

    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      // Filtro passa-baixa Brown noise suave
      output[i] = (lastOut + (0.02 * white)) / 1.02;
      lastOut = output[i];
      output[i] *= 3.5;
    }

    noiseNode = audioCtx.createBufferSource();
    noiseNode.buffer = noiseBuffer;
    noiseNode.loop = true;

    // Filtro suave biônico
    const filter = audioCtx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(450, audioCtx.currentTime);

    gainNode = audioCtx.createGain();
    gainNode.gain.setValueAtTime(0.01, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.2, audioCtx.currentTime + 1.2);

    noiseNode.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    noiseNode.start();
  }

  playBtn.addEventListener('click', () => {
    if (!isPlaying) {
      try {
        createSoothingWaveSound();
        isPlaying = true;
        playBtn.innerHTML = '⏸';
        if (soundStatusText) soundStatusText.textContent = 'Ondas Theta Ativas (Apenas você escuta)';
        playBtn.style.background = 'var(--tech-cyan)';
        playBtn.style.color = '#0A1A3A';
      } catch (e) {
        console.log('Audio init prevented:', e);
      }
    } else {
      if (gainNode && audioCtx) {
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.5);
        setTimeout(() => {
          if (noiseNode) noiseNode.stop();
          if (audioCtx) audioCtx.close();
        }, 500);
      }
      isPlaying = false;
      playBtn.innerHTML = '▶';
      if (soundStatusText) soundStatusText.textContent = 'Clique para ouvir o som privado';
      playBtn.style.background = 'var(--navy)';
      playBtn.style.color = 'var(--straw)';
    }
  });
}

/* ===================================================================
   6. MASSAGE MODES SELECTOR
   =================================================================== */
function initMassageModes() {
  const modePills = document.querySelectorAll('.mode-pill');
  const activeModeDesc = document.getElementById('activeMassageDesc');

  const descriptions = {
    'cervical': 'Pulsos circulares lentos de 18Hz para descompressão da vértebra C1 a C7.',
    'miofascial': 'Micro-vibrações rítmicas com calor térmico suave de 38°C para soltar nós de tensão.',
    'drenagem': 'Ondas ascendentes que estimulam a oxigenação linfática do pescoço e nuca.',
    'theta': 'Frequência de 4Hz sincronizada com as ondas cerebrais do início do sono profundo.'
  };

  modePills.forEach(pill => {
    pill.addEventListener('click', () => {
      modePills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const modeKey = pill.getAttribute('data-mode');
      if (activeModeDesc && descriptions[modeKey]) {
        activeModeDesc.textContent = descriptions[modeKey];
      }
    });
  });
}

/* ===================================================================
   7. LAYER ACCORDION (ENGENHARIA EXPLODIDA)
   =================================================================== */
function initLayerAccordion() {
  const layerItems = document.querySelectorAll('.layer-item');
  layerItems.forEach(item => {
    item.addEventListener('click', () => {
      layerItems.forEach(i => i.classList.remove('active'));
      item.classList.add('active');
    });
  });
}

/* ===================================================================
   8. QUIZ INTERATIVO / CALCULADORA DE IMPACTO DO SONO
   =================================================================== */
function initSleepQuiz() {
  const quizSteps = document.querySelectorAll('.quiz-step');
  const optBtns = document.querySelectorAll('.quiz-opt-btn');
  let currentStep = 0;
  let userScore = 0;

  optBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const weight = parseInt(btn.getAttribute('data-weight') || '1', 10);
      userScore += weight;

      // Avançar passo
      if (currentStep < quizSteps.length - 1) {
        quizSteps[currentStep].classList.remove('active');
        currentStep++;
        quizSteps[currentStep].classList.add('active');

        // Se for o último passo (resultado), calcular dados
        if (currentStep === quizSteps.length - 1) {
          const scoreEl = document.getElementById('quizScoreResult');
          const recModelEl = document.getElementById('quizRecModel');
          if (scoreEl) {
            scoreEl.textContent = `${Math.min(96, 45 + userScore * 12)}%`;
          }
          if (recModelEl) {
            recModelEl.textContent = userScore >= 3 ? 'SmartPillow Ultra (Massagem + Anti-Ronco Ativo)' : 'SmartPillow Pro';
          }
        }
      }
    });
  });
}

/* ===================================================================
   9. MODAL DE PRÉ-VENDA / CHECKOUT RÁPIDO
   =================================================================== */
// E-mail que recebe as reservas de pré-venda
const RESERVATION_EMAIL = 'smartpillow10@gmail.com';

function initCheckoutModal() {
  const modalOverlay = document.getElementById('checkoutModalOverlay');
  const openBtns = document.querySelectorAll('[data-open-checkout]');
  const closeBtn = document.getElementById('modalCloseBtn');
  const checkoutForm = document.getElementById('checkoutForm');
  const modalModelSelect = document.getElementById('modalModelSelect');

  if (!modalOverlay) return;

  openBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const selectedModel = btn.getAttribute('data-model-target') || 'ultra';
      if (modalModelSelect) {
        modalModelSelect.value = selectedModel;
      }
      modalOverlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeModal() {
    modalOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  if (checkoutForm) {
    checkoutForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = checkoutForm.querySelector('button[type="submit"]');
      submitBtn.innerHTML = 'Processando com Criptografia Segura...';
      submitBtn.disabled = true;

      const modelPrices = { lite: 779, pro: 1098, ultra: 1599 };
      const model = modalModelSelect ? modalModelSelect.value : 'ultra';
      const reservationId = 'SP-' + Date.now() + '-' + Math.random().toString(36).slice(2, 8);
      const field = (id) => (document.getElementById(id) || {}).value || '';

      // Envia a reserva por e-mail (FormSubmit) para a equipe SmartPillow
      fetch('https://formsubmit.co/ajax/' + RESERVATION_EMAIL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          _subject: 'Nova reserva SmartPillow ' + model.toUpperCase() + ' — ' + field('clientName'),
          _template: 'table',
          _replyto: field('clientEmail'),
          'Reserva': reservationId,
          'Modelo': modalModelSelect ? modalModelSelect.options[modalModelSelect.selectedIndex].text : model,
          'Valor à vista': 'R$ ' + (modelPrices[model] || modelPrices.ultra).toLocaleString('pt-BR') + ',00',
          'Nome': field('clientName'),
          'E-mail': field('clientEmail'),
          'WhatsApp / Telefone': field('clientPhone'),
          'CEP': field('clientCep')
        })
      })
        .then(res => res.json().then(data => {
          if (!res.ok || String(data.success) !== 'true') throw new Error(data.message || 'Falha no envio');
        }))
        .then(() => {
          // Conversão do Google Ads: só conta reservas que chegaram por e-mail
          if (typeof gtag === 'function') {
            gtag('event', 'conversion', {
              send_to: 'AW-18539323021/jTDXCLHR6KodEI29nohF',
              value: modelPrices[model] || modelPrices.ultra,
              currency: 'BRL',
              transaction_id: reservationId
            });
          }
          alert('🎉 Parabéns! Seu pedido de pré-venda do SmartPillow foi reservado com sucesso com 35% OFF e 100 Noites de Teste Sem Risco! Em breve entraremos em contato pelo e-mail e WhatsApp informados.');
          closeModal();
          checkoutForm.reset();
        })
        .catch(err => {
          console.warn('Erro ao enviar reserva:', err);
          alert('Não foi possível concluir sua reserva agora. Verifique sua conexão e tente novamente em instantes.');
        })
        .finally(() => {
          submitBtn.innerHTML = 'Concluir Reserva com 35% OFF';
          submitBtn.disabled = false;
        });
    });
  }
}

/* ===================================================================
   10. TOASTS DE PROVA SOCIAL AO VIVO (VENDAS EM TEMPO REAL)
   =================================================================== */
function initLiveSalesProof() {
  const buyers = [
    { name: 'Dr. Roberto M.', city: 'São Paulo - SP', model: 'SmartPillow Ultra' },
    { name: 'Camila & Fernando', city: 'Curitiba - PR', model: '2x SmartPillow Ultra (Duo Casal)' },
    { name: 'Juliana P.', city: 'Belo Horizonte - MG', model: 'SmartPillow Pro' },
    { name: 'Eduardo G.', city: 'Rio de Janeiro - RJ', model: 'SmartPillow Ultra' },
    { name: 'Dra. Patrícia K.', city: 'Porto Alegre - RS', model: 'SmartPillow Ultra' }
  ];

  let buyerIndex = 0;

  function showToast() {
    const existing = document.getElementById('liveProofToast');
    if (existing) existing.remove();

    const buyer = buyers[buyerIndex];
    buyerIndex = (buyerIndex + 1) % buyers.length;

    const toast = document.createElement('div');
    toast.id = 'liveProofToast';
    toast.style.cssText = `
      position: fixed;
      bottom: 24px;
      left: 24px;
      background: rgba(10, 26, 58, 0.95);
      border: 1px solid var(--straw);
      border-radius: 16px;
      padding: 14px 18px;
      color: #FFFFFF;
      box-shadow: 0 15px 35px rgba(0, 0, 0, 0.4);
      display: flex;
      align-items: center;
      gap: 12px;
      z-index: 998;
      font-size: 0.84rem;
      backdrop-filter: blur(10px);
      animation: toastSlideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1);
    `;

    toast.innerHTML = `
      <div style="width: 36px; height: 36px; border-radius: 50%; background: #E8D9B5; color: #0A1A3A; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 0.9rem; flex-shrink: 0;">✓</div>
      <div>
        <div style="font-weight: 700; color: #E8D9B5;">${buyer.name} <span style="font-size: 0.72rem; color: #38BDF8; font-weight: normal;">• Há 4 min</span></div>
        <div style="color: rgba(255,255,255,0.85); font-size: 0.76rem;">Garantiram o <strong>${buyer.model}</strong> em ${buyer.city}</div>
      </div>
    `;

    document.body.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(20px)';
      toast.style.transition = 'all 0.5s ease';
      setTimeout(() => toast.remove(), 500);
    }, 6000);
  }

  // Primeiro disparo após 8s, depois a cada 32s
  setTimeout(() => {
    showToast();
    setInterval(showToast, 32000);
  }, 8000);
}

/* ===================================================================
   11. HOTSPOTS INTERATIVOS NO HERO
   =================================================================== */
function initHotspots() {
  const hotspots = document.querySelectorAll('.hotspot');
  
  hotspots.forEach(hs => {
    // Ao clicar no trigger +
    hs.addEventListener('click', (e) => {
      // Se clicou no botão fechar ou dentro de um link, não reabre
      if (e.target.closest('.hotspot-close-btn')) {
        e.stopPropagation();
        hs.classList.remove('active');
        return;
      }
      
      e.stopPropagation();
      const isCurrentlyActive = hs.classList.contains('active');
      hotspots.forEach(h => h.classList.remove('active'));
      
      if (!isCurrentlyActive) {
        hs.classList.add('active');
      }
    });

    // Evitar que cliques dentro do card do hotspot fechem o próprio card
    const card = hs.querySelector('.hotspot-card');
    if (card) {
      card.addEventListener('click', (e) => {
        if (!e.target.closest('.hotspot-close-btn')) {
          e.stopPropagation();
        }
      });
    }
  });

  // Fechar hotspots ao clicar fora da imagem
  document.addEventListener('click', () => {
    hotspots.forEach(h => h.classList.remove('active'));
  });
}

/* ===================================================================
   12. LGPD & COOKIE CONSENT SYSTEM (LEI 13.709/2018)
   =================================================================== */
function initCookieConsent() {
  const cookieBanner = document.getElementById('cookieBanner');
  const btnAcceptAll = document.getElementById('btnAcceptAllCookies');
  const btnAcceptEssential = document.getElementById('btnAcceptEssentialCookies');
  const btnOpenSettings = document.getElementById('btnOpenCookieSettings');
  const cookieModal = document.getElementById('cookiePreferencesModal');
  const cookieModalCloseBtn = document.getElementById('cookieModalCloseBtn');
  const btnSavePreferences = document.getElementById('btnSaveCookiePreferences');
  const btnModalAcceptAll = document.getElementById('btnModalAcceptAllCookies');
  const privacyFloatingBtn = document.getElementById('privacyFloatingBtn');
  const openCookiesLinks = document.querySelectorAll('[data-open-cookies]');

  const analyticsToggle = document.getElementById('cookieAnalyticsToggle');
  const functionalToggle = document.getElementById('cookieFunctionalToggle');
  const marketingToggle = document.getElementById('cookieMarketingToggle');

  const STORAGE_KEY = 'smartpillow_cookie_preferences';

  // Carregar preferências salvas ou exibir banner
  const savedPreferences = localStorage.getItem(STORAGE_KEY);
  if (!savedPreferences) {
    setTimeout(() => {
      if (cookieBanner) cookieBanner.classList.add('visible');
    }, 1200);
  } else {
    try {
      const prefs = JSON.parse(savedPreferences);
      if (analyticsToggle) analyticsToggle.checked = !!prefs.analytics;
      if (functionalToggle) functionalToggle.checked = !!prefs.functional;
      if (marketingToggle) marketingToggle.checked = !!prefs.marketing;
    } catch (e) {
      console.warn('Erro ao carregar preferências de cookies:', e);
    }
  }

  function saveConsent(preferences) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));

    // Atualiza o Consent Mode do Google Ads conforme a escolha do usuário
    if (typeof gtag === 'function') {
      const mkt = preferences.marketing ? 'granted' : 'denied';
      gtag('consent', 'update', {
        ad_storage: mkt,
        ad_user_data: mkt,
        ad_personalization: mkt,
        analytics_storage: preferences.analytics ? 'granted' : 'denied'
      });
    }

    if (cookieBanner) cookieBanner.classList.remove('visible');
    if (cookieModal) cookieModal.classList.remove('open');
    document.body.style.overflow = '';

    // Notificação sutil
    const toast = document.createElement('div');
    toast.style.cssText = `
      position: fixed;
      bottom: 24px;
      right: 24px;
      background: var(--navy);
      border: 1px solid var(--straw);
      color: var(--white);
      padding: 12px 20px;
      border-radius: 999px;
      font-size: 0.84rem;
      font-weight: 700;
      box-shadow: 0 10px 30px rgba(0,0,0,0.4);
      z-index: 1001;
      display: flex;
      align-items: center;
      gap: 8px;
    `;
    toast.innerHTML = '<span>🔒</span> Preferências de privacidade e cookies salvas!';
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transition = 'opacity 0.4s';
      setTimeout(() => toast.remove(), 400);
    }, 3000);
  }

  if (btnAcceptAll) {
    btnAcceptAll.addEventListener('click', () => {
      saveConsent({ necessary: true, analytics: true, functional: true, marketing: true });
    });
  }

  if (btnModalAcceptAll) {
    btnModalAcceptAll.addEventListener('click', () => {
      if (analyticsToggle) analyticsToggle.checked = true;
      if (functionalToggle) functionalToggle.checked = true;
      if (marketingToggle) marketingToggle.checked = true;
      saveConsent({ necessary: true, analytics: true, functional: true, marketing: true });
    });
  }

  if (btnAcceptEssential) {
    btnAcceptEssential.addEventListener('click', () => {
      if (analyticsToggle) analyticsToggle.checked = false;
      if (functionalToggle) functionalToggle.checked = false;
      if (marketingToggle) marketingToggle.checked = false;
      saveConsent({ necessary: true, analytics: false, functional: false, marketing: false });
    });
  }

  function openCookieModal(e) {
    if (e) e.preventDefault();
    if (cookieModal) {
      cookieModal.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeCookieModal() {
    if (cookieModal) {
      cookieModal.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  if (btnOpenSettings) btnOpenSettings.addEventListener('click', openCookieModal);
  if (privacyFloatingBtn) privacyFloatingBtn.addEventListener('click', openCookieModal);
  if (cookieModalCloseBtn) cookieModalCloseBtn.addEventListener('click', closeCookieModal);

  openCookiesLinks.forEach(link => {
    link.addEventListener('click', openCookieModal);
  });

  if (cookieModal) {
    cookieModal.addEventListener('click', (e) => {
      if (e.target === cookieModal) closeCookieModal();
    });
  }

  if (btnSavePreferences) {
    btnSavePreferences.addEventListener('click', () => {
      const preferences = {
        necessary: true,
        analytics: analyticsToggle ? analyticsToggle.checked : false,
        functional: functionalToggle ? functionalToggle.checked : false,
        marketing: marketingToggle ? marketingToggle.checked : false
      };
      saveConsent(preferences);
    });
  }
}

/* ===================================================================
   13. LGPD TRANSPARENCY & PRIVACY MODAL
   =================================================================== */
function initLgpdModal() {
  const lgpdModal = document.getElementById('lgpdPrivacyModal');
  const openLgpdLinks = document.querySelectorAll('[data-open-lgpd]');
  const closeBtn = document.getElementById('lgpdModalCloseBtn');
  const understoodBtn = document.getElementById('btnLgpdUnderstood');

  if (!lgpdModal) return;

  function openLgpd(e) {
    if (e) e.preventDefault();
    lgpdModal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLgpd() {
    lgpdModal.classList.remove('open');
    document.body.style.overflow = '';
  }

  openLgpdLinks.forEach(link => {
    link.addEventListener('click', openLgpd);
  });

  if (closeBtn) closeBtn.addEventListener('click', closeLgpd);
  if (understoodBtn) understoodBtn.addEventListener('click', closeLgpd);

  lgpdModal.addEventListener('click', (e) => {
    if (e.target === lgpdModal) closeLgpd();
  });
}


