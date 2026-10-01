(() => {
  // Fit the unchanged 210 mm document layout to 94% of the window.
  const update = () => {
    const pageWidth = 210 * 96 / 25.4;
    const scale = window.innerWidth > 820 ? window.innerWidth * 0.94 / pageWidth : 1;
    document.documentElement.style.setProperty('--view-scale', String(scale));
  };
  update();
  window.addEventListener('resize', update);
})();
