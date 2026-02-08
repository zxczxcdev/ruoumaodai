// === NUMBER ANIMATION ===
document.addEventListener('DOMContentLoaded', function() {
  
  function setupNumberAnimation() {
    const animateNumber = (element, target, decimals = 0) => {
      const duration = 2000;
      const start = 0;
      const increment = target / (duration / 16);
      let current = start;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        element.textContent = decimals ? current.toFixed(decimals) : Math.floor(current).toLocaleString('vi-VN');
      }, 16);
    };
    
    // Intersection Observer for stats
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const numbers = entry.target.querySelectorAll('[data-target]');
          numbers.forEach(num => {
            const target = parseFloat(num.getAttribute('data-target'));
            const decimals = target % 1 !== 0 ? 1 : 0;
            animateNumber(num, target, decimals);
          });
          statsObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    
    const statsGrid = document.querySelector('.stats-grid');
    if (statsGrid) {
      statsObserver.observe(statsGrid);
    }
  }
  
  // Initialize animation
  setupNumberAnimation();
});
