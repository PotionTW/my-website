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