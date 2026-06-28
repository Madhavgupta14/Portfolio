// let scrollPercentage = () => {
//     let scrollProgress = document.getElementById("progress");
//     let progressValue = document.getElementById("progress-value");
//     let pos = document.documentElement.scrollTop;
//     let calcHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
//     let scrollValue = Math.round( pos * 100 / calcHeight);

//     scrollProgress.style.background = `conic-gradient(#008fff ${scrollValue}%, rgba(255, 255, 255, 0.2) ${scrollValue}%)`;
//     progressValue.textContent = `${scrollValue}%`;
// }

// window.onscroll = scrollPercentage;
// window.onload = scrollPercentage;

// contactBtn.addEventListener('click',()=>{
//     window.scrollTo(0,document.body.scrollHeight);
// })
// Clickjacking guard. GitHub Pages can't set X-Frame-Options / frame-ancestors
// HTTP headers, so break out of any frame that isn't this page itself.
(() => {
  try {
    if (window.top !== window.self) window.top.location = window.self.location;
  } catch (e) {
    // Cross-origin framing blocks the redirect — hide content as a last resort.
    document.documentElement.style.display = 'none';
  }
})();

// Activate web fonts (loaded as media="print" to avoid render-blocking).
// Replaces the old inline onload handler so the CSP can stay strict (script-src 'self').
(() => {
  const fontCss = document.getElementById('font-css');
  if (fontCss && fontCss.media !== 'all') fontCss.media = 'all';
})();

// ── Mobile nav (hamburger) ──
(() => {
  const header = document.querySelector('header');
  const toggle = document.getElementById('nav-toggle');
  const nav = document.getElementById('primary-nav');
  if (!header || !toggle || !nav) return;

  const setOpen = (open) => {
    header.classList.toggle('nav-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
  };

  toggle.addEventListener('click', (e) => {
    e.stopPropagation();
    setOpen(!header.classList.contains('nav-open'));
  });

  // Close after picking a destination
  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => setOpen(false));
  });

  // Close when tapping outside the menu
  document.addEventListener('click', (e) => {
    if (header.classList.contains('nav-open') && !header.contains(e.target)) setOpen(false);
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') setOpen(false);
  });

  // Reset state when leaving mobile breakpoint
  window.addEventListener('resize', () => {
    if (window.innerWidth > 900) setOpen(false);
  });
})();

// ── Certifications carousel (prev/next + end-state) ──
(() => {
  const track = document.getElementById('certs-grid');
  const prev = document.querySelector('.certs-prev');
  const next = document.querySelector('.certs-next');
  if (!track || !prev || !next) return;

  const stepBy = () => {
    const card = track.querySelector('.achievement-card');
    const styles = getComputedStyle(track);
    const gap = parseFloat(styles.columnGap || styles.gap) || 18;
    return card ? card.getBoundingClientRect().width + gap : track.clientWidth * 0.8;
  };

  const update = () => {
    const maxScroll = track.scrollWidth - track.clientWidth - 2;
    prev.disabled = track.scrollLeft <= 0;
    next.disabled = track.scrollLeft >= maxScroll;
  };

  prev.addEventListener('click', () => track.scrollBy({ left: -stepBy(), behavior: 'smooth' }));
  next.addEventListener('click', () => track.scrollBy({ left: stepBy(), behavior: 'smooth' }));
  track.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);

  // Recompute once the carousel is actually laid out / scrolled into view
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) update();
    }, { threshold: 0.05 });
    io.observe(track);
  }
  update();
})();

// Navbar ScrollSpy
let sections= document.querySelectorAll('.page-scroll');
let navLinks= document.querySelectorAll('header ul li a');
let temp = sections[sections.length-1];

sections.forEach(section=>{
    section.addEventListener('click',()=>{
        let id= section.getAttribute('id');
            navLinks.forEach(links=>{
                links.classList.remove('active');
                document.querySelector('.page[href*=' + id + ']').classList.add('active');
            })
    })
})

window.onscroll=()=>{

    sections.forEach(section=>{

        let top= window.scrollY;
        let offset = section.offsetTop;
        let height = section.offsetHeight;
        let id= section.getAttribute('id');
        let viewportHeight= window.innerHeight;
        let viewportWidth= window.innerWidth;
        let scrollheight= document.body.scrollHeight;
        if(top+ viewportHeight/2>=offset && top<offset+ height){
            flg=1;
            navLinks.forEach(links=>{
                links.classList.remove('active');
                document.querySelector('.page[href*=' + id + ']').classList.add('active');
            })
        }
        if(top<100){
            let id="top";
            navLinks.forEach(links=>{
                links.classList.remove('active');
                document.querySelector('.page[href*=' + id + ']').classList.add('active');
            })
        }

        if(viewportWidth<900){
        if((top+viewportHeight-scrollheight<=viewportWidth/10&&top+viewportHeight-scrollheight>0)||(scrollheight-top-viewportHeight<=viewportWidth/10&& scrollheight-top-viewportHeight>0)){
                let id="contact";
            navLinks.forEach(links=>{
                links.classList.remove('active');
                document.querySelector('.page[href*=' + id + ']').classList.add('active');
            })
            
        }
    }





    })
    
}

