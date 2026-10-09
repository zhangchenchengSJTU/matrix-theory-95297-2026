window.MathJax = {
  startup: {typeset: false},
  tex: {
    inlineMath: [['\\(', '\\)']],
    displayMath: [['\\[', '\\]']],
    processEscapes: true,
    packages: {'[-]': ['autoload', 'require']},
    maxBuffer: 100000
  },
  svg: {fontCache: 'local'},
  options: {enableMenu: false}
};
