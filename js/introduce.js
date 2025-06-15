// 頂部欄位邏輯
const topBar = document.getElementById('top-bar');
const triggerHeight = 55;

document.addEventListener('mousemove', (e) => {
  if (e.clientY < triggerHeight) {
    topBar.classList.add('show');
  } else if (!topBar.matches(':hover')) {
    topBar.classList.remove('show');
  }
});

topBar.addEventListener('mouseleave', () => {
  if (window.scrollY > 0) {
    topBar.classList.remove('show');
  }
});

// IntersectionObserver 觸發動畫
function setupIntersectionObserver() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const title = entry.target.querySelector('.intro-title');
          if (title) {
            title.style.setProperty('--delay', '0.1s');
          }
  
          const texts = entry.target.querySelectorAll('.intro-text, .intro-text_wait_talk');
          texts.forEach((el, idx) => {
            if (el.classList.contains('intro-text_wait_talk')) {
              const delay = el.getAttribute('data-delay') || '0s';
              el.style.setProperty('--delay', delay);
            } else {
              el.style.setProperty('--delay', `${(idx + 1) * 0.2}s`);
            }
          });
  
          entry.target.classList.add('animate-in');
  
        } else {
          entry.target.classList.remove('animate-in');
  
          const title = entry.target.querySelector('.intro-title');
          if (title) {
            title.style.removeProperty('--delay');
          }
  
          const texts = entry.target.querySelectorAll('.intro-text');
          texts.forEach(el => el.style.removeProperty('--delay'));
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });
  
    document.querySelectorAll('.intro-section').forEach(section => {
      observer.observe(section);
    });
  }
  
  document.addEventListener('DOMContentLoaded', setupIntersectionObserver);


  document.addEventListener('DOMContentLoaded', () => {
    const sleepBtn = document.getElementById('sleep-mode');
  
    const imgDecorate1 = document.querySelector('.img-decorate1 img');
    const imgDecorate2 = document.querySelector('.img-decorate2 img'); 
    const imgDecorate3 = document.querySelector('.img-decorate3 img'); 
    const imgDecorate4 = document.querySelector('.img-decorate4 img'); 
    const imgDecorate5 = document.querySelector('.img-decorate5 img');
    const imgDecorate6 = document.querySelector('.img-decorate6 img');
  
    const changetimebg = document.getElementById('footer-bar');
  
    sleepBtn.addEventListener('click', () => {
      document.body.classList.toggle('sleep-mode');
  
      const isSleepMode = document.body.classList.contains('sleep-mode');
  
      imgDecorate1.src = isSleepMode 
        ? 'assets/images/monster/day_baby_zombie.png' 
        : 'assets/images/monster/night_baby_zombie.png';
  
      imgDecorate2.src = isSleepMode 
        ? 'assets/images/monster/iron.png' 
        : 'assets/images/monster/steve.png';
  
      imgDecorate3.src = isSleepMode 
        ? 'assets/images/monster/black_skeleton.png' 
        : 'assets/images/monster/skeleton.png';
  
      imgDecorate4.src = isSleepMode 
        ? 'assets/images/monster/pig_n_z.png' 
        : 'assets/images/monster/pig_n.png';
  
      imgDecorate5.src = isSleepMode 
        ? 'assets/images/monster/f_slime.png' 
        : 'assets/images/monster/fly_fire.png';
  
      imgDecorate6.src = isSleepMode 
        ? 'assets/images/monster/endmen_tnt.png' 
        : 'assets/images/monster/endmen.png';
  
      changetimebg.style.backgroundImage = isSleepMode
        ? "url(assets/images/sky_mc.png)" // 睡眠模式
        : "url(assets/images/night_mc.png)";  // 白天模式
    });
  });
  