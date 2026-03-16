/*! Blayden - Portfolio & Resume Template */

// Módulo de carga inicial (crítico)
const initCriticalFeatures = () => {
  // Registro del plugin ScrollTrigger
  gsap.registerPlugin(ScrollTrigger);

  // Loader y animación inicial
  const content = document.querySelector('body');
  const imgLoad = imagesLoaded(content);
  const loadingWrap = document.querySelector('.loading-wrap');
  const loadingItems = loadingWrap.querySelectorAll('.loading__item');
  const fadeInItems = document.querySelectorAll('.loading__fade');

  function startLoader() {
    let counterElement = document.querySelector(".loader__count .count__text");
    let currentValue = 0;
    const updateCounter = () => {
      if (currentValue < 100) {
        currentValue = Math.min(currentValue + Math.floor(Math.random() * 10) + 1, 100);
        counterElement.textContent = currentValue;
        setTimeout(updateCounter, Math.floor(Math.random() * 120) + 25);
      }
    };
    updateCounter();
  }

  const hideLoader = () => {
    gsap.to(".loader__count", { duration: 0.8, ease: 'power2.in', y: "100%", delay: 1.8 });
    gsap.to(".loader__wrapper", { duration: 0.8, ease: 'power4.in', y: "-100%", delay: 2.2 });
    setTimeout(() => document.getElementById("loader").classList.add("loaded"), 3200);
  };

  const pageAppearance = () => {
    gsap.set(loadingItems, { opacity: 0 });
    gsap.to(loadingItems, { 
      duration: 1.1,
      ease: 'power4',
      startAt: {y: 120},
      y: 0,
      opacity: 1,
      delay: 0.8,
      stagger: 0.05
    }, '>-=1.1');
    gsap.set(fadeInItems, { opacity: 0 });
    gsap.to(fadeInItems, { duration: 0.8, ease: 'none', opacity: 1, delay: 3.2 });
  };

  startLoader();
  imgLoad.on('done', () => {
    hideLoader();
    pageAppearance();
  });

  // ScrollSpy y botón de scroll
  new bootstrap.ScrollSpy(document.body, {
    target: '#menu',
    smoothScroll: true,
    rootMargin: '0px 0px -40%'
  });

  const toTop = document.querySelector("#to-top");
  if (toTop) {
    toTop.addEventListener("click", (e) => {
      e.preventDefault();
      gsap.to(window, { scrollTo: 0, ease: 'power4.inOut', duration: 2 });
    });

    gsap.set(toTop, { opacity: 0 });
    gsap.to(toTop, {
      opacity: 1,
      autoAlpha: 1,
      scrollTrigger: {
        trigger: "body",
        start: "top -20%",
        end: "top -20%",
        toggleActions: "play none reverse none"
      }
    });
  }
};

// Módulo de animaciones (cargado después del contenido crítico)
const loadAnimations = () => {
  // Animaciones de scroll
  document.querySelectorAll(".animate-in-up").forEach((element) => {
    gsap.fromTo(element, {
      opacity: 0,
      y: 50,
      ease: 'sine'
    }, {
      y: 0,
      opacity: 1,
      scrollTrigger: {
        trigger: element,
        toggleActions: 'play none none reverse'
      }
    });
  });

  // Efecto de tipo fade-in
  document.querySelectorAll(".reveal-type").forEach((char) => {
    const text = new SplitType(char, { types: 'words, chars' });
    gsap.from(text.chars, {
      scrollTrigger: {
        trigger: char,
        start: 'top 80%',
        end: 'top 20%',
        scrub: true
      },
      opacity: 0.2,
      stagger: 0.1
    });
  });

  // Parallax
  gsap.to("[data-speed]", {
    y: (i, el) => (1 - parseFloat(el.getAttribute("data-speed"))) * ScrollTrigger.maxScroll(window),
    ease: "none",
    scrollTrigger: {
      start: 0,
      end: "max",
      invalidateOnRefresh: true,
      scrub: 0
    }
  });
};

// Módulo de características interactivas (cargado bajo demanda)
const loadInteractiveFeatures = () => {
  // Magnific Popup
  $(".popup-trigger").magnificPopup({
    type: "inline",
    fixedContentPos: true,
    fixedBgPos: true,
    overflowY: "scroll",
    preloader: false,
    midClick: true,
    removalDelay: 600,
    mainClass: "mfp-fade"
  });

  // Masonry Layout
  $('.my-gallery').imagesLoaded().progress(() => {
    $('.my-gallery').masonry('layout');
  });

  // Hover effects
  $('.hover-default, .hover-circle, .circle, .inner-video-trigger, .socials-cards__link')
    .on('mouseenter mouseleave', function(e) {
      const parentOffset = $(this).offset();
      const relX = e.pageX - parentOffset.left;
      const relY = e.pageY - parentOffset.top;
      $(this).find('em').css({top: relY, left: relX});
    });
};

// Módulo de tema oscuro/claro
const initThemeSwitch = () => {
  const themeBtn = document.querySelector('.color-switcher');
  if (!themeBtn) return;

  const getCurrentTheme = () => {
    return localStorage.getItem('template.theme') || 
           (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  };

  const loadTheme = (theme) => {
    document.querySelector(':root').setAttribute('color-scheme', theme);
  };

  themeBtn.addEventListener('click', () => {
    const theme = getCurrentTheme() === 'dark' ? 'light' : 'dark';
    localStorage.setItem('template.theme', theme);
    loadTheme(theme);
  });

  loadTheme(getCurrentTheme());
};

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
  initCriticalFeatures();
  
  // Carga diferida de características no críticas
  requestIdleCallback(() => {
    loadAnimations();
    initThemeSwitch();
  });

  // Carga de características interactivas cuando el usuario interactúa
  const loadInteractive = () => {
    loadInteractiveFeatures();
    document.removeEventListener('mousemove', loadInteractive);
    document.removeEventListener('scroll', loadInteractive);
  };

  document.addEventListener('mousemove', loadInteractive, { once: true });
  document.addEventListener('scroll', loadInteractive, { once: true });
});